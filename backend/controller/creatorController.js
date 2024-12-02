const db = require('../db');
const upload = require('../middleware/multerConfig');

const createCreator = (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Image upload failed', error: err });
    }

    const { showTitle, creatorName, creatorType, genre, ageRestriction, starRating, description, listens } = req.body;
    const imagePath = req.file ? req.file.path : null;

    const query = `INSERT INTO creator (showTitle, creatorName, creatorType, genre, ageRestriction, starRating, description, listens, image) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(query, [showTitle, creatorName, creatorType, genre, ageRestriction, starRating, description, listens, imagePath], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to add creator', error: err });
      }
      return res.status(201).json({
        message: 'Creator created successfully',
        creator: {
          id: result.insertId,
          showTitle,
          creatorName,
          creatorType,
          genre,
          ageRestriction,
          starRating,
          description,
          listens,
          image: imagePath,
        },
      });
    });
  });
};

const getCreators = (req, res) => {
  const query = 'SELECT * FROM creator';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to fetch creators', error: err });
    }
    return res.status(200).json(results);
  });
};

const getPodcastByCreatorId = (req, res) => {
  const creatorId = req.params.creatorId;  // Get creatorId from request params

  // Query to fetch podcasts by creator_id
  const query = 'SELECT * FROM podcast WHERE creator_id = ?';

  db.query(query, [creatorId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to fetch podcasts', error: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'No podcasts found for this creator' });
    }

    return res.status(200).json(results);  // Return podcasts associated with creator_id
  });
};
// creatorController.js

const getTopPodcastCreator = (req, res) => {
  const query = `SELECT * FROM creator ORDER BY starRating DESC LIMIT 10`; // Adjust the LIMIT value as needed

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to fetch top podcast creators', error: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'No creators found' });
    }

    return res.status(200).json({
      message: 'Top podcast creators fetched successfully',
      creators: results,
    });
  });
};

module.exports = {
  createCreator,
  getCreators,
  getPodcastByCreatorId,
  getTopPodcastCreator,
};


