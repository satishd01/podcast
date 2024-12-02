const express = require('express');
const router = express.Router();

// Import the controller functions
const { createStory, getAllStories, getStoryById,likeStory,getAllLikesStory,removeLikeStory } = require('../controller/storyController');
const verifyToken = require('../middleware/verifyToken');
  // Adjust path as needed

// Define routes
router.post('/stories', createStory);  // Create story (admin only)
router.get('/stories', getAllStories);  // Get all stories
router.get('/stories/:id', getStoryById);  // Get story by ID
router.post('/like-story', verifyToken, likeStory);

router.get('/liked-stories', verifyToken, getAllLikesStory);
router.post('/remove-like', verifyToken, removeLikeStory);



module.exports = router;
