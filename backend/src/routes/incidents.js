const express = require('express');
const router = express.Router();
const incidentController = require('../controllers/incidentController');

// POST /api/incidents - Report incident for Gemini AI structuring & admin review
router.post('/', incidentController.submitIncident);

// GET /api/incidents/:id - Status of report
router.get('/:id', incidentController.getIncidentById);

// POST /api/incidents/evidence - Save vehicle photo + confirmed OCR plate into RideSafe vault
router.post('/evidence', incidentController.saveEvidence);

// GET /api/incidents/evidence/:journey_code - Get all evidence for journey
router.get('/evidence/:journey_code', incidentController.getEvidenceByJourney);

module.exports = router;
