const { v4: uuidv4 } = require('uuid');
const { db, store } = require('../config/db');

// 1. Get all verified places with search & category filter from PostgreSQL
exports.getAllPlaces = async (req, res, next) => {
  try {
    const { category, search } = req.query;
    const results = await db.places.getAll({ category, search });

    res.json({
      success: true,
      count: results.length,
      data: results
    });
  } catch (error) {
    next(error);
  }
};

// 2. Get specific place by place_key or ID with attached verified reviews
exports.getPlaceByKey = async (req, res, next) => {
  try {
    const { key } = req.params;
    const place = await db.places.findByKey(key);

    if (!place) {
      return res.status(404).json({
        success: false,
        error: `Place not found: ${key}`
      });
    }

    // Attach reviews for this place from PostgreSQL
    const reviews = await db.places.getReviewsForPlace(place.id);

    res.json({
      success: true,
      data: {
        ...place,
        reviews: reviews || []
      }
    });
  } catch (error) {
    next(error);
  }
};

// 3. Add Verified Review (Scope requirement #16: Tourist must have active Journey ID)
exports.createReview = async (req, res, next) => {
  try {
    const { place_id, journey_code, rating, review_text, scam_flag = false } = req.body;

    if (!place_id || !journey_code || !rating) {
      return res.status(400).json({
        success: false,
        error: 'place_id, journey_code, and rating (1-5) are required.'
      });
    }

    // Verify journey exists in PostgreSQL
    const journey = await db.journeys.findByCodeOrId(journey_code);
    if (!journey) {
      return res.status(403).json({
        success: false,
        error: 'Only tourists with an authentic TravelMate Journey ID can submit place reviews.'
      });
    }

    const place = await db.places.findByKey(place_id);
    if (!place) {
      return res.status(404).json({ success: false, error: 'Place does not exist.' });
    }

    // Scope #16: Tourist may ONLY rate/review places present in their own Journey ID history (i.e., actually visited)
    const isVisited = journey.visited_places && (journey.visited_places.includes(place.id) || journey.visited_places.includes(place.place_key));
    if (!isVisited) {
      return res.status(403).json({
        success: false,
        error: 'Fake-Review & Scam Prevention Rule: You may only review monuments recorded in your active Journey visit history. Please check in to this monument first.'
      });
    }

    const reviewData = {
      id: uuidv4(),
      place_id: place.id,
      journey_id: journey.id,
      rating: Math.min(5, Math.max(1, parseInt(rating, 10))),
      review_text: review_text ? review_text.trim() : '',
      scam_flag: Boolean(scam_flag),
      verification_badge: 'Verified Traveler (Active Journey)',
      created_at: new Date().toISOString()
    };

    const review = await db.places.createReview(reviewData);

    res.status(201).json({
      success: true,
      message: 'Review saved with Verified Traveler status.',
      data: review
    });
  } catch (error) {
    next(error);
  }
};
