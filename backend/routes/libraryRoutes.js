const express = require('express');
const router = express.Router();
const libraryController = require('../controller/libraryController');

router.post('/libraries', libraryController.createLibrary);

router.get('/libraries', libraryController.getLibraries);

router.get('/libraries/:id', libraryController.getLibraryById);

router.put('/libraries/:id', libraryController.updateLibrary);

router.delete('/libraries/:id', libraryController.deleteLibrary);

module.exports = router;
