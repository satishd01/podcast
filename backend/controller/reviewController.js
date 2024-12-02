const db = require('../db');
exports.createReview = (req, res) => {
    const { podcastId, reviewText, rating } = req.body;
    const profileId = req.userId;  // This is extracted from the JWT in the middleware

    if (!podcastId || !reviewText || !rating) {
        return res.status(400).json({ message: 'Podcast ID, review text, and rating are required.' });
    }

    // Check if the podcast exists
    const checkPodcastSQL = 'SELECT * FROM podcast WHERE podcast_id = ?';
    db.query(checkPodcastSQL, [podcastId], (podcastError, podcastResult) => {
        if (podcastError) {
            return res.status(500).json({ message: 'Error checking podcast', error: podcastError });
        }

        if (podcastResult.length === 0) {
            return res.status(400).json({ message: `No podcast found with ID: ${podcastId}` });
        }

        // Insert the review into the reviews table
        const insertReviewSQL = 'INSERT INTO review (podcast_id, profile_id, review_text, rating) VALUES (?, ?, ?, ?)';
        const reviewValues = [podcastId, profileId, reviewText, rating];

        db.query(insertReviewSQL, reviewValues, (reviewError, reviewResult) => {
            if (reviewError) {
                return res.status(500).json({ message: 'Error adding review', error: reviewError });
            }
            res.status(201).json({ message: 'Review added successfully', reviewId: reviewResult.insertId });
        });
    });
};

// Get all reviews for a podcast
exports.getReviewsByPodcast = (req, res) => {
    const podcastId = req.params.podcastId;

    // Fetch reviews for the given podcast
    const getReviewsSQL = 'SELECT reviews.review_id, reviews.review_text, reviews.rating, reviews.created_at, profile.name AS reviewer_name FROM reviews JOIN profile ON reviews.profile_id = profile.profile_id WHERE reviews.podcast_id = ? ORDER BY reviews.created_at DESC';

    db.query(getReviewsSQL, [podcastId], (reviewsError, reviewsResult) => {
        if (reviewsError) {
            return res.status(500).json({ message: 'Error fetching reviews', error: reviewsError });
        }

        if (reviewsResult.length === 0) {
            return res.status(404).json({ message: 'No reviews found for this podcast' });
        }

        res.status(200).json({ reviews: reviewsResult });
    });
};
