const { v4: uuidv4 } = require('uuid');
const { db, store } = require('../config/db');

// 1. Submit Plate Evidence to Vault (MANDATORY: Must be confirmed by tourist!)
exports.saveEvidence = async (req, res, next) => {
  try {
    const {
      journey_code,
      photo_url = "data:image/svg+xml;utf8,<svg ... />", // Base64 or URL
      vehicle_type = "auto",
      ocr_detected_plate,
      tourist_confirmed_plate,
      is_confirmed_by_tourist,
      location = "New Delhi"
    } = req.body;

    // Strict safety check: Never auto-accept unconfirmed plate!
    if (!is_confirmed_by_tourist || !tourist_confirmed_plate) {
      return res.status(400).json({
        success: false,
        error: "Privacy & Integrity Rule: The tourist MUST review and manually confirm the vehicle plate number before saving."
      });
    }

    const journey = await db.journeys.findByCodeOrId(journey_code);

    const evidenceRecord = {
      id: uuidv4(),
      journey_id: journey ? journey.id : null,
      journey_code: journey_code || "UNLINKED",
      photo_url,
      vehicle_type,
      ocr_detected_plate: ocr_detected_plate || tourist_confirmed_plate,
      tourist_confirmed_plate: tourist_confirmed_plate.trim().toUpperCase(),
      is_confirmed_by_tourist: true,
      metadata: {
        location,
        timestamp: new Date().toISOString(),
        verified_by_user: true
      },
      created_at: new Date().toISOString()
    };

    const saved = await db.evidence.create(evidenceRecord);

    res.status(201).json({
      success: true,
      message: "Vehicle evidence securely archived into RideSafe Vault.",
      data: saved
    });
  } catch (error) {
    next(error);
  }
};

// 2. Fetch Evidence linked to a Journey from PostgreSQL
exports.getEvidenceByJourney = async (req, res, next) => {
  try {
    const { journey_code } = req.params;
    const records = await db.evidence.findByJourney(journey_code);

    res.json({
      success: true,
      count: records.length,
      data: records
    });
  } catch (error) {
    next(error);
  }
};

// 3. Submit Incident Report (Pre-structured or raw for Gemini AI parsing)
exports.submitIncident = async (req, res, next) => {
  try {
    const {
      journey_code,
      raw_text,
      language_detected = 'en',
      structured_data = null,
      linked_evidence_ids = []
    } = req.body;

    if (!raw_text || raw_text.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: "Incident description text is required."
      });
    }

    const journey = await db.journeys.findByCodeOrId(journey_code);
    const now = new Date();

    // Default structure if AI service isn't invoked synchronously
    const fallbackStructure = structured_data || {
      location: "Central Delhi / En-route",
      time: now.toISOString(),
      person_type_involved: "Service provider / Local vendor",
      description: raw_text.slice(0, 200),
      confidence: "Pending AI Structuring",
      severity: "Moderate"
    };

    const incidentData = {
      id: uuidv4(),
      journey_id: journey ? journey.id : null,
      journey_code: journey_code || "ANONYMOUS",
      raw_text: raw_text.trim(),
      language_detected,
      structured_data: fallbackStructure,
      linked_evidence_ids,
      status: 'pending_review',
      created_at: now.toISOString(),
      updated_at: now.toISOString()
    };

    const saved = await db.incidents.create(incidentData);

    res.status(201).json({
      success: true,
      message: "Incident report logged and securely queued for human review.",
      data: saved
    });
  } catch (error) {
    next(error);
  }
};

// 4. Fetch Incident by ID
exports.getIncidentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let incident = null;
    const pool = db.getPool();
    if (db.isPostgresConnected() && pool) {
      try {
        const res = await pool.query('SELECT * FROM incidents WHERE id = $1;', [id]);
        if (res.rows.length > 0) {
          incident = {
            ...res.rows[0],
            structured_data: typeof res.rows[0].structured_data === 'string' ? JSON.parse(res.rows[0].structured_data) : res.rows[0].structured_data
          };
        }
      } catch (err) {
        console.error('[DB DAL] getIncidentById error:', err.message);
      }
    }
    if (!incident) {
      incident = store.incidents.find(i => i.id === id);
    }
    if (!incident) {
      return res.status(404).json({ success: false, error: 'Incident not found.' });
    }
    res.json({ success: true, data: incident });
  } catch (error) {
    next(error);
  }
};

