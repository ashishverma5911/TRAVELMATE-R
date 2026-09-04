const express = require('express');
const router = express.Router();
const journeyController = require('../controllers/journeyController');

// POST /api/journeys/onboard - Tourist minimal onboarding & SafeVisit Pass creation
router.post('/onboard', journeyController.createJourney);

// GET /api/journeys/:codeOrId - Fetch Journey details
router.get('/:codeOrId', journeyController.getJourney);

// POST /api/journeys/location - Update GPS & check soft deviation
router.post('/location', journeyController.updateLocation);

// POST /api/journeys/checkin - Check in to a verified place to unlock reviews
router.post('/checkin', journeyController.checkinPlace);

// POST /api/journeys/expire - Conclude journey & purge personal data (Scope #18)
router.post('/expire', journeyController.expireJourney);

module.exports = router;

