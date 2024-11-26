
// const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const db = require('./db');
// const cron = require('node-cron');
// const express = require('express');
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

// const app = express();
// const server = http.createServer(app); 
// const io = socketIo(server); 

// app.use(bodyParser.json());

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/public/index.html', (err) => {
//         if (err) {
//             console.error('Error serving index.html:', err);
//             res.status(err.status).end();
//         }
//     });
// });

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

// const JWT_SECRET = '8cc4510a207f10f3a4170bf15c114b6ff73deafd20d05c3384ee34175fa0fe98';

// const verifyToken = (req, res, next) => {
//     const token = req.headers['authorization']?.split(' ')[1];

//     if (!token) {
//         return res.sendStatus(403);
//     }

//     jwt.verify(token, JWT_SECRET, (err, decoded) => {
//         if (err) {
//             return res.sendStatus(401);
//         }
//         req.user = decoded;
//         next();
//     });
// };

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

// server.listen(8081, () => {
//     console.log('Server is running on port 8081');
// });




const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./db');
const cron = require('node-cron');
const http = require('http');
const socketIo = require('socket.io');

const userRoutes = require('./routes/userroutes');
const podcastRoutes = require('./routes/podcastRoutes');
const profileRoutes = require('./routes/profileRoutes');
const audiobookRoutes = require('./routes/audiobookRoutes');
const storyRoutes = require('./routes/storyRoutes');
const libraryRoutes = require('./routes/libraryRoutes');
const planRoutes = require('./routes/planRoutes');
const signupRoutes = require('./routes/signupRoutes');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(bodyParser.json());

const JWT_SECRET = '8cc4510a207f10f3a4170bf15c114b6ff73deafd20d05c3384ee34175fa0fe98';

// Route to generate a token
app.get('/api/token', (req, res) => {
    const payload = { user: 'demoUser' }; // Add a payload for token validation
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }); // Generate token
    res.json({ token });
});

// Middleware to verify token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(403).json({ message: 'Authorization header is missing' });
    }

    const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"
    if (!token) {
        return res.status(403).json({ message: 'Token is missing' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
        req.user = decoded; // Attach decoded token payload to request
        next();
    });
};

// WebSocket connections
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.emit('welcome', 'Welcome to the chat!');

    socket.on('chat message', (msg) => {
        console.log('Message received:', msg);
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
});

// Schedule task to deactivate expired plans
cron.schedule('0 0 * * *', () => {
    const query = 'UPDATE plans SET is_active = FALSE WHERE valid_until < CURDATE() AND is_active = TRUE';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error updating plans:', err);
        } else {
            console.log(`Deactivated ${results.affectedRows} expired plan(s)`);
        }
    });
});

// Routes
app.use('/api', verifyToken, userRoutes);
app.use('/api', verifyToken, podcastRoutes);
app.use('/api', verifyToken, profileRoutes);
app.use('/api', verifyToken, audiobookRoutes);
app.use('/stories', verifyToken, storyRoutes);
app.use('/api', verifyToken, libraryRoutes);
app.use('/api/plans', verifyToken, planRoutes);
app.use('/api', verifyToken, signupRoutes);

// Start server
server.listen(8081, () => {
    console.log('Server is running on port 8081');
});
