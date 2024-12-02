const jwt = require('jsonwebtoken');

const authenticateAdmin = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get the token from the 'Authorization' header

    if (!token) {
        return res.status(401).json({ message: 'Authorization token is required.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key');
        req.adminId = decoded.id; // Add the adminId to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token.' });
    }
};

module.exports = authenticateAdmin;
