const express = require('express');
const router = express.Router();
const signupController = require('../controller/signupController');

// Route for signup
router.post('/signup', signupController.signup);

module.exports = router;
