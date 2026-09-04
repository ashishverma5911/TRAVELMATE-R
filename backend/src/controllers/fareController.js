const { v4: uuidv4 } = require('uuid');
const { db, store } = require('../config/db');

// Delhi Transport Department Reference Rates
const RATES = {
  auto: {
    baseFare: 30.0, // First 1.5 km
    baseDistanceKm: 1.5,
    perKmRate: 11.0,
    waitingPerHour: 45.0,
    nightMultiplier: 1.25 // 23:00 - 05:00
  },
  taxi_non_ac: {
    baseFare: 40.0, // First 1.0 km
    baseDistanceKm: 1.0,
    perKmRate: 17.0,
    waitingPerHour: 60.0,
    nightMultiplier: 1.25
  },
  taxi_ac: {
    baseFare: 40.0, // First 1.0 km
    baseDistanceKm: 1.0,
    perKmRate: 20.0,
    waitingPerHour: 75.0,
    nightMultiplier: 1.25
  }
};

// Calculate Fair Fare Range based on official Delhi reference rates
function calculateFareRange(distanceKm, vehicleType = 'auto', isNight = false) {
  const model = RATES[vehicleType] || RATES.auto;
  let baseCalc = 0;

  if (distanceKm <= model.baseDistanceKm) {
    baseCalc = model.baseFare;
  } else {
    const extraKm = distanceKm - model.baseDistanceKm;
    baseCalc = model.baseFare + (extraKm * model.perKmRate);
  }

  if (isNight) {
    baseCalc *= model.nightMultiplier;
  }

  // Realistic traffic/waiting buffer (10% to 25% range)
  const minFare = Math.round(baseCalc * 0.95);
  const maxFare = Math.round(baseCalc * 1.25);

  return {
    minFare,
    maxFare,
    medianFare: Math.round(baseCalc * 1.10),
    officialReferenceRate: `₹${model.baseFare} for first ${model.baseDistanceKm}km, then ₹${model.perKmRate}/km`
  };
}

// 1. Estimate Fare & Compare Quoted Fare
exports.estimateFare = async (req, res, next) => {
  try {
    const {
      origin_name = "New Delhi Railway Station (NDLS)",
      destination_name = "Red Fort (Lal Qila)",
      distance_km = 4.8,
      duration_min = 18,
      vehicle_type = "auto",
      quoted_fare = null,
      journey_code = null
    } = req.body;

    const dist = parseFloat(distance_km);
    if (isNaN(dist) || dist <= 0) {
      return res.status(400).json({
        success: false,
        error: "Valid distance_km is required."
      });
    }

    const currentHour = new Date().getHours();
    const isNight = req.body.is_night !== undefined ? Boolean(req.body.is_night) : (currentHour >= 23 || currentHour < 5);

    const range = calculateFareRange(dist, vehicle_type, isNight);

    let overchargeEvaluation = {
      is_overcharge: false,
      discrepancy_percent: 0,
      advisory_status: "Fair / Expected Range",
      advisory_message: "Quoted fare matches the official Delhi Transport Department reference range."
    };

    if (quoted_fare !== null && quoted_fare !== undefined) {
      const quoted = parseFloat(quoted_fare);
      if (!isNaN(quoted)) {
        if (quoted > range.maxFare) {
          const discrepancy = Math.round(((quoted - range.maxFare) / range.maxFare) * 100);
          overchargeEvaluation = {
            is_overcharge: true,
            discrepancy_percent: discrepancy,
            advisory_status: "Advisory Warning (Above Estimated Range)",
            advisory_message: `Fare Advisory: Quoted ₹${quoted} is ~${discrepancy}% higher than the typical Delhi rate range (₹${range.minFare} - ₹${range.maxFare}). Suggest asking the driver politely: 'Bhaiya, meter se chaliye' (Please use meter) or checking prepaid booths nearby.`
          };
        }
      }
    }

    // Save calculation log to PostgreSQL
    const estimateRecord = {
      id: uuidv4(),
      journey_code,
      origin_name,
      destination_name,
      vehicle_type,
      distance_km: dist,
      duration_min: parseInt(duration_min) || 15,
      expected_fare_min: range.minFare,
      expected_fare_max: range.maxFare,
      quoted_fare: quoted_fare ? parseFloat(quoted_fare) : null,
      is_overcharge: overchargeEvaluation.is_overcharge,
      discrepancy_percent: overchargeEvaluation.discrepancy_percent,
      status_label: "Estimated",
      created_at: new Date().toISOString()
    };

    await db.fares.create(estimateRecord);

    res.json({
      success: true,
      data: {
        estimate: estimateRecord,
        breakdown: {
          reference_rate: range.officialReferenceRate,
          night_rate_applied: isNight,
          expected_range: `₹${range.minFare} - ₹${range.maxFare}`,
          status_label: "Estimated (Based on Delhi Govt Gazette)"
        },
        advisory: overchargeEvaluation
      }
    });
  } catch (error) {
    next(error);
  }
};

// 2. Fetch logged fare disputes for Admin Dashboard review
exports.getFlaggedFares = (req, res, next) => {
  try {
    const flagged = store.fare_estimates.filter(f => f.is_overcharge);
    res.json({
      success: true,
      count: flagged.length,
      data: flagged
    });
  } catch (error) {
    next(error);
  }
};

// 3. Safe Route Navigation & Corridor Advisory (Scope #14)
exports.getSafeRoute = (req, res, next) => {
  try {
    const origin = req.query.origin || req.body.origin || "New Delhi Railway Station (NDLS)";
    const destination = req.query.destination || req.body.destination || "Red Fort (Lal Qila)";

    const routeData = {
      origin: {
        name: origin,
        coordinates: { lat: 28.6429, lng: 77.2195 }
      },
      destination: {
        name: destination,
        coordinates: { lat: 28.6562, lng: 77.2410 }
      },
      recommended_corridor: {
        corridor_id: "corridor-arterial-01",
        name: "Primary Arterial Corridor (Subhash Marg / Asaf Ali Rd)",
        safety_rating: "Optimal Night Route (Continuous Lighting & Active Police Beats)",
        distance_km: 5.2,
        estimated_duration_min: 16,
        is_recommended: true,
        police_stations_en_route: ["Daryaganj Police Station", "Paharganj Beat Box"],
        safety_features: [
          "Well-illuminated multi-lane arterial road",
          "Continuous Delhi Traffic Police CCTV coverage",
          "Rapid emergency vehicle accessibility"
        ],
        waypoints: [
          { lat: 28.6429, lng: 77.2195, instruction: "Depart NDLS Ajmeri Gate via Bhavbhuti Marg" },
          { lat: 28.6465, lng: 77.2340, instruction: "Turn right onto Asaf Ali Road via Delhi Gate" },
          { lat: 28.6520, lng: 77.2400, instruction: "Continue North on Netaji Subhash Marg" },
          { lat: 28.6562, lng: 77.2410, instruction: "Arrive at Red Fort (Lahori Gate Main Entrance)" }
        ]
      },
      cautionary_shortcut: {
        corridor_id: "corridor-shortcut-02",
        name: "Old City Alleyway Shortcut (Chawri Bazaar Katras)",
        safety_rating: "Caution: Congested with Poor Emergency Access after 21:00",
        distance_km: 4.1,
        estimated_duration_min: 24,
        is_recommended: false,
        advisory: "Dense pedestrian bottlenecks, narrow turns impassable for PCR vans, unlit side alleys."
      }
    };

    res.json({
      success: true,
      data: routeData
    });
  } catch (error) {
    next(error);
  }
};
