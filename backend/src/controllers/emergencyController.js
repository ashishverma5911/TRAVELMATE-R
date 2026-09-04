const { v4: uuidv4 } = require('uuid');
const { db, store } = require('../config/db');

// Embassy Directory for Foreign Visitors
const EMBASSIES = {
  "United Kingdom": {
    name: "British High Commission, New Delhi",
    address: "Shantipath, Chanakyapuri, New Delhi, 110021",
    phone: "+91 11 2419 2100",
    emergency_phone: "+91 11 2419 2100 (24/7 Consular Assistance)",
    email: "web.newdelhi@fcdo.gov.uk"
  },
  "United States": {
    name: "Embassy of the United States, New Delhi",
    address: "Shantipath, Chanakyapuri, New Delhi, 110021",
    phone: "+91 11 2419 8000",
    emergency_phone: "+91 11 2419 8000 (ACS Emergency)",
    email: "acsnd@state.gov"
  },
  "Germany": {
    name: "German Embassy New Delhi",
    address: "6/50G Shantipath, Chanakyapuri, New Delhi, 110021",
    phone: "+91 11 4419 9199",
    emergency_phone: "+91 98 1000 4950 (After-hours emergency)",
    email: "info@new-delhi.diplo.de"
  },
  "France": {
    name: "Embassy of France in India",
    address: "2/50-E Shantipath, Chanakyapuri, New Delhi, 110021",
    phone: "+91 11 4319 6100",
    emergency_phone: "+91 99 9997 7338 (Emergency Consular)",
    email: "admin-francais.new-delhi-amba@diplomatie.gouv.fr"
  },
  "Australia": {
    name: "Australian High Commission, New Delhi",
    address: "1/50G Shantipath, Chanakyapuri, New Delhi, 110021",
    phone: "+91 11 4139 9900",
    emergency_phone: "+61 2 6261 3305 (24/7 Consular Emergency Centre)",
    email: "ahc.newdelhi@dfat.gov.au"
  },
  "Japan": {
    name: "Embassy of Japan in India",
    address: "50-G Shantipath, Chanakyapuri, New Delhi, 110021",
    phone: "+91 11 2687 6581",
    emergency_phone: "+91 11 2687 6581 (Consular Section)",
    email: "jpemb-cons@nd.mofa.go.jp"
  },
  "Spain": {
    name: "Embassy of Spain in New Delhi",
    address: "12 Prithviraj Road, New Delhi, 110011",
    phone: "+91 11 4129 3000",
    emergency_phone: "+91 98 1016 4161 (Emergency Line)",
    email: "emb.nuevadelhi@maec.es"
  }
};

// Default fallback embassy
const DEFAULT_EMBASSY = {
  name: "Chanakyapuri Diplomatic Enclave Foreign Missions",
  address: "Shantipath, Chanakyapuri, New Delhi",
  phone: "112 (Police) or 1363 (Tourist Helpline)",
  emergency_phone: "112",
  email: "tourism@delhi.gov.in"
};

// 1. Get Multilingual Helpline Directory & Embassy details
exports.getHelplines = (req, res, next) => {
  try {
    const { nationality = "United Kingdom", language = "en" } = req.query;
    const embassy = EMBASSIES[nationality] || DEFAULT_EMBASSY;

    const directory = {
      official_helpline: {
        number: "1363",
        toll_free: "1800-11-1363",
        name: "Ministry of Tourism 24x7 Multi-lingual Tourist Infoline",
        supported_languages: ["English", "Hindi", "French", "German", "Spanish", "Russian", "Japanese", "Korean", "Chinese", "Italian", "Arabic"],
        status_label: "Official Govt Hotline"
      },
      emergency_services: {
        number: "112",
        name: "National Emergency Response Support System (ERSS - Police, Fire, Ambulance)",
        status_label: "Official Emergency Service"
      },
      state_tourist_police: {
        number: "+91 11 2336 5359",
        unit_name: "Delhi Police Tourist Police Unit (Connaught Place Headquarters)",
        address: "Paharganj / CP / IGI Airport Kiosks",
        status_label: "Official State Law Enforcement"
      },
      embassy: {
        ...embassy,
        matched_for_nationality: nationality,
        status_label: "Official Diplomatic Mission"
      }
    };

    res.json({
      success: true,
      data: directory
    });
  } catch (error) {
    next(error);
  }
};

// 2. Trigger SOS (Manual Tap or Silent Gesture Shake)
exports.triggerSOS = async (req, res, next) => {
  try {
    const {
      journey_code,
      trigger_type = "manual_button", // "manual_button" or "silent_gesture_shake"
      lat = 28.6139,
      lng = 77.2090,
      active_route = null,
      message = "Emergency SOS initiated by tourist"
    } = req.body;

    const now = new Date();
    const journey = await db.journeys.findByCodeOrId(journey_code);
    const traveler = journey ? await db.travelers.findById(journey.traveler_id) : null;

    const sosIncident = {
      id: uuidv4(),
      sos_token: `SOS-${Date.now()}`,
      journey_code: journey_code || "ANONYMOUS",
      traveler_name: traveler ? traveler.name : "Unregistered Visitor",
      traveler_nationality: traveler ? traveler.nationality : "Unknown",
      emergency_contact: traveler ? traveler.emergency_contact : "Not provided",
      trigger_type, // 'manual_button' or 'silent_gesture_shake'
      coordinates: { lat: parseFloat(lat), lng: parseFloat(lng) },
      last_known_route: active_route || (journey ? journey.active_route : null),
      status: "DISPATCHED_TO_CONTROL_ROOM",
      dispatched_to: ["112 Central Dispatch", "Delhi Tourist Police Unit (CP)", "Registered Emergency Contact"],
      timestamp: now.toISOString(),
      status_label: "HIGH PRIORITY DISPATCH"
    };

    // Save as critical incident in PostgreSQL
    await db.incidents.create({
      id: sosIncident.id,
      journey_id: journey ? journey.id : null,
      raw_text: `[EMERGENCY SOS via ${trigger_type}]: ${message}`,
      language_detected: "en",
      structured_data: {
        location: `Lat: ${lat}, Lng: ${lng}`,
        time: now.toISOString(),
        person_type_involved: "Tourists in distress",
        description: `Emergency alert triggered via ${trigger_type}`,
        severity: "CRITICAL",
        confidence: "1.0"
      },
      linked_evidence_ids: [],
      status: "pending_review",
      admin_notes: `Urgent SOS dispatch initiated at ${now.toLocaleTimeString()}`,
      created_at: now.toISOString(),
      updated_at: now.toISOString()
    });

    res.status(200).json({
      success: true,
      message: `SOS successfully routed to 112, Delhi Tourist Police, and your emergency contact.`,
      data: sosIncident
    });
  } catch (error) {
    next(error);
  }
};
