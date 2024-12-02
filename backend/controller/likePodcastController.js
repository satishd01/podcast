const db = require('../db');

// Save a podcast to likes
const saveLike = (req, res) => {
    console.log('UserId from Token:', req.userId);
    console.log('Request Body:', req.body);

    const { podcast_id } = req.body;

    if (!req.userId || !podcast_id) {
        return res.status(400).json({ message: 'profile_id and podcastId are required.' });
    }

    const sql = 'INSERT INTO LikePodcast (profile_id, podcast_id, liked_at) VALUES (?, ?, ?)';
    const values = [req.userId, podcast_id, new Date()];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Database Error:', err);
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.status(201).json({ message: 'Podcast liked successfully', likeId: result.insertId });
    });
};

// Get all liked podcasts for a user
const getAllLikes = (req, res) => {
    if (!req.userId) {
        return res.status(401).json({ message: 'User not authenticated' });
    }

    const sql = 'SELECT * FROM LikePodcast WHERE profile_id = ?';
    db.query(sql, [req.userId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.status(200).json({ message: 'Likes fetched successfully', data: result });
    });
};
module.exports = { saveLike, getAllLikes };
