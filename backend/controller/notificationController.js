// /controllers/notificationController.js
const admin = require('../services/firebaseService');

// Store FCM tokens (you might want to save this in a database)
let fcmTokens = [];

// Endpoint to receive the token from the client
// /controllers/notificationController.js
exports.receiveToken = (req, res) => {
    const { token } = req.body;  // This line extracts the token from the request body
  
    if (!token) {
      return res.status(400).json({ error: 'Token is required' }); // This will trigger if the token is missing
    }
  
    // Proceed to store the token or perform any other logic
    // ...
  };
  
// Send notification to all stored tokens
exports.sendNotification = async (req, res) => {
  const { title, body } = req.body;

  if (!title || !body) {
    return res.status(400).json({ error: 'Title and body are required' });
  }

  const message = {
    notification: {
      title: title,
      body: body,
    },
    tokens: fcmTokens,  // Use tokens for multiple recipients
  };

  try {
    const response = await admin.messaging().sendMulticast(message);
    res.status(200).json({ message: 'Notification sent successfully', response });
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).json({ error: 'Error sending notification', details: error });
  }
};
