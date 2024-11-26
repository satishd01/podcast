const express = require('express');
const router = express.Router();
const { login } = require('../controller/loginController'); // Correct path

// Login route
router.post('/login', login);

module.exports = router;
