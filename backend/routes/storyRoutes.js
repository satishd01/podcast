const express = require('express');
const router = express.Router();
const storyController = require('../controller/storyController');


router.post('/', storyController.createStory);

router.get('/', storyController.getAllStories);

router.get('/stories/:id', storyController.getStoryById);


router.put('/:id', storyController.updateStory);

router.delete('/:id', storyController.deleteStory);

module.exports = router;
