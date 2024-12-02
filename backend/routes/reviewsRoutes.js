// const express = require('express');
// const router = express.Router();
// const { createReview, getReviewsByPodcast } = require('../controller/reviewController');

// // Create a review for a podcast
// router.post('/reviews', createReview);

// // Get all reviews for a podcast
// router.get('/podcast/:podcastId/reviews', getReviewsByPodcast);

// module.exports = router;


const express = require('express');
const router = express.Router();
const { createReview } = require('../controller/reviewController');
const verifyToken = require('../middleware/verifyToken');

router.post('/create-review', verifyToken, createReview);

module.exports = router;
