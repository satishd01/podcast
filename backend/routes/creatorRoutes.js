// routes/creatorRoutes.js
const express = require('express');
const router = express.Router();
const { createCreator, getCreators , getPodcastByCreatorId,getTopPodcastCreator} = require('../controller/creatorController');

// Route to create a creator
router.post('/create', createCreator);

// Route to get all creators
router.get('/', getCreators);
router.get('/podcasts/:creatorId', getPodcastByCreatorId); 
router.get('/top-podcast-creators', getTopPodcastCreator);



module.exports = router;
