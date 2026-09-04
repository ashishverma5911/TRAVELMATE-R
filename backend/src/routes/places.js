const express = require('express');
const router = express.Router();
const placesController = require('../controllers/placesController');

// GET /api/places - Get all 10 verified Delhi places with dual fee & safety notes
router.get('/', placesController.getAllPlaces);

// GET /api/places/:key - Get single place by key/id
router.get('/:key', placesController.getPlaceByKey);

// POST /api/places/reviews - Submit review (verified travelers with active Journey ID only)
router.post('/reviews', placesController.createReview);

module.exports = router;
