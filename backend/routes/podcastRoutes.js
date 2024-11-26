const express = require('express');
const router = express.Router();
const podcastController = require('../controller/podcastController');

router.post('/podcasts', podcastController.createPodcast);
router.get('/podcasts', podcastController.getAllPodcasts);
router.put('/podcast/:id', podcastController.updatePodcastById);

router.delete('/podcast/:id', podcastController.deletePodcastById);
router.get('/podcasts/:id', podcastController.getPodcastById);
router.get('/authors/:authorId/podcasts', podcastController.getPodcastsByAuthor);

router.post('/authors', podcastController.createAuthor);

router.post('/episodes', podcastController.createEpisode);
router.get('/podcasts/:podcastId/episodes', podcastController.getEpisodesByPodcast);




router.get('/authors', podcastController.getAllAuthors);
router.get('/authors/:id', podcastController.getAuthorById);
router.put('/authors/:id', podcastController.updateAuthor);
router.delete('/authors/:id', podcastController.deleteAuthor);

router.get('/episodes', podcastController.getAllEpisodes);
router.get('/episodes/:id', podcastController.getEpisodeById);
router.put('/episodes/:id', podcastController.updateEpisode);
router.delete('/episodes/:id', podcastController.deleteEpisode);


module.exports = router;
