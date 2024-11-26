// /routes/notificationRoutes.js
const express = require('express');
const router = express.Router();
const notificationController = require('../controller/notificationController');

// POST route to receive FCM token
router.post('/token', notificationController.receiveToken);

// POST route to send notifications
router.post('/send', notificationController.sendNotification);

module.exports = router;
