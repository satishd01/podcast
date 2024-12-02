const express = require('express');
const router = express.Router();
const { login,logout} = require('../controller/loginController'); 

router.post('/login', login);
router.post('/logout', logout);


module.exports = router;
