const express = require('express');
const router = express.Router();
const emergencyController = require('../controllers/emergencyController');

// GET /api/emergency/helplines - Multilingual helpline & embassy directory
router.get('/helplines', emergencyController.getHelplines);
router.get('/directory', emergencyController.getHelplines);

// POST /api/emergency/sos - Trigger manual button or silent gesture shake SOS
router.post('/sos', emergencyController.triggerSOS);

module.exports = router;
