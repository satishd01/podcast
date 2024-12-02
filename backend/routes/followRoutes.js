const express = require('express');
const router = express.Router();
const followController = require('../controller/followController');

// Route to follow a podcast
router.post('/follow', followController.followPodcast);

// Route to unfollow a podcast
router.post('/unfollow', followController.unfollowPodcast);

// Route to get all podcasts a user is following
router.get('/:profileId/followed-podcasts', followController.getUserFollowedPodcasts);

// Route to get all followers of a podcast
router.get('/:podcastId/followers', followController.getPodcastFollowers);

module.exports = router;
