const express = require('express');
const AudiobookController = require('../controller/audiobookController');

const router = express.Router();

router.post('/audiobooks', AudiobookController.createAudiobook); // Ensure this line exists
router.get('/audiobooks', AudiobookController.getAllAudiobooks);
router.get('/audiobooks/:id', AudiobookController.getAudiobookById);
router.put('/audiobooks/:id', AudiobookController.updateAudiobook);
router.delete('/audiobooks/:id', AudiobookController.deleteAudiobook);

module.exports = router;
