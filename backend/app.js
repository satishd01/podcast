// const express = require('express');
// const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const db = require('./db');
// const cron = require('node-cron');
// const http = require('http');
// const socketIo = require('socket.io');

// const userRoutes = require('./routes/userroutes');
// const podcastRoutes = require('./routes/podcastRoutes');
// const profileRoutes = require('./routes/profileRoutes');
// const audiobookRoutes = require('./routes/audiobookRoutes');
// const storyRoutes = require('./routes/storyRoutes');
// const libraryRoutes = require('./routes/libraryRoutes');
// const planRoutes = require('./routes/planRoutes');
// const signupRoutes = require('./routes/signupRoutes');
// const loginRoutes = require('./routes/loginRoutes');
// const creatorRoutes = require('./routes/creatorRoutes');
// const adminRoutes = require('./routes/adminRoutes');

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// app.use(bodyParser.json());

// const JWT_SECRET = '8cc4510a207f10f3a4170bf15c114b6ff73deafd20d05c3384ee34175fa0fe98';

// app.get('/api/token', (req, res) => {
//     const payload = { user: 'demoUser' };
//     const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
//     res.json({ token });
// });

// const verifyToken = (req, res, next) => {
//     const authHeader = req.headers['authorization'];

//     if (!authHeader) {
//         return res.status(403).json({ message: 'Authorization header is missing' });
//     }

//     const token = authHeader.split(' ')[1];
//     if (!token) {
//         return res.status(403).json({ message: 'Token is missing' });
//     }

//     jwt.verify(token, JWT_SECRET, (err, decoded) => {
//         if (err) {
//             return res.status(401).json({ message: 'Invalid or expired token' });
//         }
//         req.user = decoded;
//         next();
//     });
// };

// io.on('connection', (socket) => {
//     console.log('A user connected:', socket.id);

//     socket.emit('welcome', 'Welcome to the chat!');

//     socket.on('chat message', (msg) => {
//         console.log('Message received:', msg);
//         io.emit('chat message', msg);
//     });

//     socket.on('disconnect', () => {
//         console.log('A user disconnected:', socket.id);
//     });
// });

// cron.schedule('0 0 * * *', () => {
//     const query = 'UPDATE plans SET is_active = FALSE WHERE valid_until < CURDATE() AND is_active = TRUE';

//     db.query(query, (err, results) => {
//         if (err) {
//             console.error('Error updating plans:', err);
//         } else {
//             console.log(`Deactivated ${results.affectedRows} expired plan(s)`);
//         }
//     });
// });

// app.use('/api', verifyToken, userRoutes);
// app.use('/api', verifyToken, podcastRoutes);
// app.use('/api', verifyToken, profileRoutes);
// app.use('/api', verifyToken, audiobookRoutes);
// app.use('/stories', verifyToken, storyRoutes);
// app.use('/api', verifyToken, libraryRoutes);
// app.use('/api/plans', verifyToken, planRoutes);
// app.use('/api', verifyToken, signupRoutes);
// app.use('/api/auth',verifyToken, loginRoutes);
// app.use('/api/creators',verifyToken, creatorRoutes);

// // Admin routes do not require JWT token verification
// app.use('/api/admin', adminRoutes);

// server.listen(8081, () => {
//     console.log('Server is running on port 8081');
// });

const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const db = require("./db");
const http = require("http");
const path = require("path"); // Add this line to import the 'path' module
const socketIo = require("socket.io");
require("dotenv").config();

// Import your routes
const userRoutes = require("./routes/userroutes");
const podcastRoutes = require("./routes/podcastRoutes");
const profileRoutes = require("./routes/profileRoutes");
const audiobookRoutes = require("./routes/audiobookRoutes");
const libraryRoutes = require("./routes/libraryRoutes");
const planRoutes = require("./routes/planRoutes");
const signupRoutes = require("./routes/signupRoutes");
const loginRoutes = require("./routes/loginRoutes");
const creatorRoutes = require("./routes/creatorRoutes");
const adminRoutes = require("./routes/adminRoutes");
const reviewRoutes = require("./routes/reviewsRoutes");
const followRoutes = require("./routes/followRoutes");
const likePodcastRoutes = require("./routes/likePodcastRoutes");
const genreRoutes = require("./routes/genreRoutes");
const playlistRoutes = require("./routes/playlistRoutes");
const storyRoutes = require("./routes/storyRoutes");
const cors = require("cors");
const { credential } = require("firebase-admin");

const app = express();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const server = http.createServer(app);
const io = socketIo(server);
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

// Middlewares
app.use(bodyParser.json());

const JWT_SECRET =
  "8cc4510a207f10f3a4170bf15c114b6ff73deafd20d05c3384ee34175fa0fe98";

// Token generation route
app.get("/api/token", (req, res) => {
  const payload = { user: "demoUser" };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(403).json({ message: "Authorization header is missing" });
  }

  const token = authHeader.split(" ")[1]; // Extract token from Bearer <token>
  if (!token) {
    return res.status(403).json({ message: "Token is missing" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    req.user = decoded; // Attach user info to the request object
    next(); // Proceed to the next middleware or route handler
  });
};

// Admin routes - No token required
app.use("/api/admin", adminRoutes);
app.use("/api", reviewRoutes);
app.use("/api", profileRoutes);
app.use("/api/likePodcast", likePodcastRoutes);
app.use("/api", storyRoutes);

// Routes that require token verification
app.use("/api", verifyToken, userRoutes);
app.use("/api", verifyToken, podcastRoutes);
// app.use('/api', verifyToken, profileRoutes);
app.use("/api", verifyToken, audiobookRoutes);
app.use("/stories", verifyToken, storyRoutes);
app.use("/api", verifyToken, libraryRoutes);
app.use("/api/plans", verifyToken, planRoutes);
app.use("/api", verifyToken, signupRoutes);
app.use("/api/auth", verifyToken, loginRoutes);
app.use("/api/creators", verifyToken, creatorRoutes);
app.use("/api/follow", followRoutes);
app.use("/api/genre", verifyToken, genreRoutes);
app.use("/api/playlist", verifyToken, playlistRoutes);

server.listen(8081, () => {
  console.log("Server is running on port 8081");
});
