const express = require('express');
const router = express.Router();
const { saveLike, getAllLikes } = require('../controller/likePodcastController');
const verifyToken = require('../middleware/verifyToken');

// Save a podcast to likes
router.post('/save', verifyToken, saveLike);

// Get all liked podcasts
router.get('/getAll', verifyToken, getAllLikes);

module.exports = router;
