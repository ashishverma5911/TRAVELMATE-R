const express = require('express');
const router = express.Router();
const fareController = require('../controllers/fareController');

// POST /api/fare/estimate - Fair Fare calculation, range output, non-accusatory warning
router.post('/estimate', fareController.estimateFare);

// GET /api/fare/flagged - List overcharge disputes for admin audit
router.get('/flagged', fareController.getFlaggedFares);

// GET & POST /api/fare/route - Google Maps Safe Navigation corridor comparison
router.get('/route', fareController.getSafeRoute);
router.post('/route', fareController.getSafeRoute);

module.exports = router;
