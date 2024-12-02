const express = require('express');
const router = express.Router();
const genreController = require('../controller/genreController'); 
const podcastController = require('../controller/podcastController');
const upload = require('../middleware/multerConfig'); // Import multer config

// Genre creation route with image upload
router.post('/', upload.single('image'), genreController.createGenre);

// Get all genres route
router.get('/All', genreController.getAllGenres);

// Get genre by ID route
router.get('/:id', genreController.getGenreById);

// Update genre route
router.put('/:id', genreController.updateGenre);

// Delete genre route
router.delete('/:id', genreController.deleteGenre);
router.get('/genres/:genre_id/podcasts', podcastController.getPodcastByGenre);


module.exports = router;
