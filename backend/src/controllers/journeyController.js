const { v4: uuidv4 } = require('uuid');
const { db, store } = require('../config/db');

// Helper to generate temporary journey code: TM-DEL-2026-XXXX
function generateJourneyCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `TM-DEL-2026-${code}`;
}

// 1. Tourist Onboarding -> Creates Traveler & SafeVisit Journey ID in PostgreSQL
exports.createJourney = async (req, res, next) => {
  try {
    const { name, nationality, preferred_language = 'en', emergency_contact = '' } = req.body;

    if (!name || !nationality) {
      return res.status(400).json({
        success: false,
        error: 'Name and nationality are required for passport-free onboarding.'
      });
    }

    const travelerId = uuidv4();
    const journeyId = uuidv4();
    const journeyCode = generateJourneyCode();
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 7-day validity

    const travelerData = {
      id: travelerId,
      temp_id: `TRV-${journeyCode.slice(12)}`,
      name: name.trim(),
      nationality: nationality.trim(),
      preferred_language,
      emergency_contact: emergency_contact.trim(),
      opt_in_location: true,
      created_at: now.toISOString(),
      expires_at: expiresAt.toISOString()
    };

    const journeyData = {
      id: journeyId,
      traveler_id: travelerId,
      journey_code: journeyCode,
      status: 'active',
      current_lat: 28.6139, // Default to New Delhi center
      current_lng: 77.2090,
      last_location_update: now.toISOString(),
      active_route: {},
      visited_places: [],
      checkin_history: [],
      start_time: now.toISOString(),
      expires_at: expiresAt.toISOString()
    };

    const traveler = await db.travelers.create(travelerData);
    const journey = await db.journeys.create(journeyData);

    res.status(201).json({
      success: true,
      data: {
        journey,
        traveler,
        safe_pass: {
          journey_code: journeyCode,
          qr_payload: JSON.stringify({
            code: journeyCode,
            holder: traveler.name,
            nationality: traveler.nationality,
            valid_until: expiresAt.toISOString(),
            status: "Authorized Visitor"
          }),
          expires_at: expiresAt.toISOString(),
          status_label: "Official Temporary Pass"
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// 2. Fetch Journey by Code or ID from PostgreSQL
exports.getJourney = async (req, res, next) => {
  try {
    const { codeOrId } = req.params;
    const journey = await db.journeys.findByCodeOrId(codeOrId);

    if (!journey) {
      return res.status(404).json({
        success: false,
        error: `Journey not found for identifier: ${codeOrId}`
      });
    }

    const traveler = await db.travelers.findById(journey.traveler_id);

    res.json({
      success: true,
      data: {
        journey,
        traveler: traveler || { name: 'Verified Traveler', nationality: 'International' },
        is_expired: new Date(journey.expires_at) < new Date()
      }
    });
  } catch (error) {
    next(error);
  }
};

// 3. Update Location (GPS ping) & Soft Route Deviation Check
exports.updateLocation = async (req, res, next) => {
  try {
    const { journey_code, lat, lng } = req.body;

    if (!journey_code || lat === undefined || lng === undefined) {
      return res.status(400).json({
        success: false,
        error: 'journey_code, lat, and lng are required.'
      });
    }

    const journey = await db.journeys.findByCodeOrId(journey_code);
    if (!journey) {
      return res.status(404).json({ success: false, error: 'Journey not found.' });
    }

    const nowIso = new Date().toISOString();
    await db.journeys.updateLocation(journey_code, parseFloat(lat), parseFloat(lng), nowIso);

    // Check soft deviation if active route is set
    let deviationWarning = null;
    if (journey.active_route && journey.active_route.expected_waypoints) {
      const target = journey.active_route.destination_coords || { lat: 28.6562, lng: 77.2410 };
      const distKm = Math.sqrt(
        Math.pow(parseFloat(lat) - target.lat, 2) +
        Math.pow(parseFloat(lng) - target.lng, 2)
      ) * 111;

      if (distKm > 5.0) {
        deviationWarning = {
          flagged: true,
          deviation_meters: Math.round(distKm * 1000),
          message: "Soft Advisory: Your current route seems slightly different from the primary corridor. No alarm needed; tap here to re-center navigation or notify emergency contact.",
          severity: "Soft Warning"
        };
      }
    }

    res.json({
      success: true,
      data: {
        current_lat: parseFloat(lat),
        current_lng: parseFloat(lng),
        last_updated: nowIso,
        deviation_advisory: deviationWarning
      }
    });
  } catch (error) {
    next(error);
  }
};

// 4. Check in / Record Visit to a Verified Place in PostgreSQL
exports.checkinPlace = async (req, res, next) => {
  try {
    const { journey_code, place_id } = req.body;

    if (!journey_code || !place_id) {
      return res.status(400).json({
        success: false,
        error: 'journey_code and place_id are required for verified check-in.'
      });
    }

    const journey = await db.journeys.findByCodeOrId(journey_code);
    if (!journey) {
      return res.status(404).json({ success: false, error: 'Journey not found.' });
    }

    const place = await db.places.findByKey(place_id);
    if (!place) {
      return res.status(404).json({ success: false, error: 'Verified place not found.' });
    }

    const visited = Array.isArray(journey.visited_places) ? [...journey.visited_places] : [];
    const history = Array.isArray(journey.checkin_history) ? [...journey.checkin_history] : [];

    const alreadyVisited = visited.includes(place.id) || visited.includes(place.place_key);
    if (!alreadyVisited) {
      visited.push(place.id);
      history.push({
        place_id: place.id,
        place_key: place.place_key,
        place_name: place.name,
        timestamp: new Date().toISOString()
      });

      await db.journeys.checkinPlace(journey.journey_code, visited, history);
    }

    res.json({
      success: true,
      message: `Verified visit to ${place.name} recorded under Journey ID ${journey.journey_code}. Review unlocked!`,
      data: {
        journey_code: journey.journey_code,
        visited_places: visited,
        checkin_history: history,
        place_name: place.name
      }
    });
  } catch (error) {
    next(error);
  }
};

// 5. Conclude & Expire Journey (Scope #18: Data Retention & Privacy Purge)
exports.expireJourney = async (req, res, next) => {
  try {
    const { journey_code } = req.body;

    if (!journey_code) {
      return res.status(400).json({
        success: false,
        error: 'journey_code is required to expire journey.'
      });
    }

    const journey = await db.journeys.findByCodeOrId(journey_code);
    if (!journey) {
      return res.status(404).json({ success: false, error: 'Journey not found.' });
    }

    const nowIso = new Date().toISOString();
    await db.journeys.expire(journey.journey_code, nowIso);
    await db.travelers.anonymize(journey.traveler_id);

    const traveler = await db.travelers.findById(journey.traveler_id);

    // Retain only aggregate anonymized statistics
    const retainedStats = {
      journey_code: journey.journey_code,
      total_visited_places: (journey.visited_places || []).length,
      nationality: traveler?.nationality || 'International',
      language: traveler?.preferred_language || 'en',
      concluded_at: nowIso,
      status: 'expired'
    };

    res.json({
      success: true,
      message: 'Journey successfully concluded. All personal identifying data has been permanently purged under Scope #18 Privacy Retention Policy.',
      data: {
        journey_code: journey.journey_code,
        status: 'expired',
        purged_fields: ['name', 'emergency_contact', 'exact_gps_track'],
        anonymized_retained_stats: retainedStats
      }
    });
  } catch (error) {
    next(error);
  }
};
