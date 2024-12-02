// const jwt = require('jsonwebtoken');

// const verifyToken = (req, res, next) => {
//     const token = req.headers['authorization']?.split(' ')[1]; // Extract token from 'Authorization' header

//     if (!token) {
//         return res.status(403).json({ message: 'No token provided.' });
//     }

//     jwt.verify(token, '8cc4510a207f10f3a4170bf15c114b6ff73deafd20d05c3384ee34175fa0fe98-secret-key', (err, decoded) => {
//         if (err) {
//             return res.status(401).json({ message: 'Invalid or expired token' });
//         }

//         req.userId = decoded.profile_id; // Attach profile_id to the request object
//         next(); // Proceed to the next middleware or route handler
//     });
// };

// module.exports = verifyToken;



const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header

    if (!token) {
        return res.status(403).json({ message: 'No token provided.' });
    }

    jwt.verify(token, '8cc4510a207f10f3a4170bf15c114b6ff73deafd20d05c3384ee34175fa0fe98-secret-key', (err, decoded) => {
        if (err) {
            console.error('JWT Verification Error:', err); // Log error details
            return res.status(401).json({ message: 'Invalid or expired token' });
        }

        console.log('Decoded Token:', decoded); // Log the decoded payload
        req.userId = decoded.profile_id; // Attach profile_id to req.userId
        next();
    });
};

module.exports = verifyToken;
