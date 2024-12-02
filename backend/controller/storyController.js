const db = require('../db');
const multer = require('multer');
const upload = require('../middleware/multerConfig');
const authenticateAdmin = require('../middleware/authenticateAdmin');

// Create a new story (only accessible by admin)
exports.createStory = [
  authenticateAdmin,  // Admin authentication middleware
  upload.single('image'),  // Image upload middleware
  (err, req, res, next) => {
      if (err instanceof multer.MulterError || err.message === 'File type not supported') {
          return res.status(400).json({ message: err.message });
      }
      next(err);  // Pass any other errors to default error handler
  },
  (req, res) => {
      try {
          const { 
              genre, 
              season, 
              story_title, 
              description, 
              more_like_this, 
              episode_id, 
              review_id, 
              creator_id 
          } = req.body;

          const image = req.file 
              ? `${req.protocol}://${req.get('host')}/uploads/images/${req.file.filename}`
              : null;

          if (!story_title || !episode_id || !creator_id) {
              return res.status(400).json({ message: 'Story title, episode ID, and creator ID are required' });
          }

          const sql = `
              INSERT INTO story (
                  image, genre, season, story_title, description, more_like_this, 
                  episode_id, review_id, creator_id, admin_id
              ) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `;

          const values = [
              image, 
              genre || null, 
              season || null, 
              story_title, 
              description || null, 
              more_like_this || null, 
              episode_id, 
              review_id || null, 
              creator_id, 
              req.adminId // adminId from the JWT token
          ];

          db.query(sql, values, (err, result) => {
              if (err) {
                  console.error('Database error:', err);
                  return res.status(500).json({ message: 'Database error', error: err });
              }
              res.status(201).json({
                  message: 'Story created successfully',
                  storyId: result.insertId,
                  imageURL: image  // Include image URL in the response
              });
          });
      } catch (error) {
          res.status(500).json({ message: 'Internal Server Error', error: error.message });
      }
  }
];

// Get all stories (accessible by users with a valid token)
exports.getAllStories = (req, res) => {
  const query = `SELECT * FROM story`;

  db.query(query, (err, result) => {
      if (err) {
          return res.status(500).json({ message: 'Database error', error: err });
      }
      res.status(200).json({ stories: result });
  });
};

// Get story by ID (accessible by users with a valid token)
exports.getStoryById = (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM story WHERE id = ?`;

  db.query(query, [id], (err, result) => {
      if (err) {
          return res.status(500).json({ message: 'Database error', error: err });
      }

      if (result.length === 0) {
          return res.status(404).json({ message: 'Story not found' });
      }

      res.status(200).json({ story: result[0] });
  });
};




exports.likeStory = (req, res) => {
  const { story_id } = req.body;  // Expecting the story_id from the client
  const profile_id = req.userId; // Assuming userId is attached to req by the verifyToken middleware

  if (!story_id) {
      return res.status(400).json({ message: 'Story ID is required' });
  }

  // Check if the story exists
  const checkStorySQL = 'SELECT * FROM story WHERE id = ?';
  db.query(checkStorySQL, [story_id], (storyError, storyResult) => {
      if (storyError) {
          return res.status(500).json({ message: 'Error checking story', error: storyError });
      }

      if (storyResult.length === 0) {
          return res.status(400).json({ message: `No story found with story_id: ${story_id}` });
      }

      const episode_id = storyResult[0].episode_id; // Get the episode_id from the story table

      // Check if the user has already liked this story (episode_id linked)
      const checkLikeSQL = 'SELECT * FROM like_story WHERE profile_id = ? AND episode_id = ?';
      db.query(checkLikeSQL, [profile_id, episode_id], (likeError, likeResult) => {
          if (likeError) {
              return res.status(500).json({ message: 'Error checking like status', error: likeError });
          }

          if (likeResult.length > 0) {
              return res.status(400).json({ message: 'You have already liked this story' });
          }

          const insertLikeSQL = 'INSERT INTO like_story (profile_id, episode_id) VALUES (?, ?)';
          db.query(insertLikeSQL, [profile_id, episode_id], (insertError, insertResult) => {
              if (insertError) {
                  return res.status(500).json({ message: 'Error liking story', error: insertError });
              }

              res.status(201).json({
                  message: 'Story liked successfully',
                  likeId: insertResult.insertId
              });
          });
      });
  });
};

exports.getAllLikesStory = (req, res) => {
  const profileId = req.userId;  // Ensure req.userId contains the authenticated user's ID
  
  // Query to get liked stories by the profile_id
  const query = `
      SELECT s.* 
      FROM story s 
      JOIN like_story ls ON s.episode_id = ls.episode_id
      WHERE ls.profile_id = ?;
  `;

  db.query(query, [profileId], (err, result) => {
      if (err) {
          console.error('Error fetching liked stories:', err);
          return res.status(500).json({ message: 'Database error', error: err });
      }

      if (result.length === 0) {
          return res.status(404).json({ message: 'No liked stories found' });
      }

      res.status(200).json({ likedStories: result });
  });
};



// Remove like from a story (accessible by users with a valid token)
exports.removeLikeStory = (req, res) => {
  const { story_id } = req.body;  // Expecting the story_id from the client
  const profile_id = req.userId; // Assuming userId is attached to req by the verifyToken middleware

  if (!story_id) {
      return res.status(400).json({ message: 'Story ID is required' });
  }

  // Check if the story exists
  const checkStorySQL = 'SELECT * FROM story WHERE id = ?';
  db.query(checkStorySQL, [story_id], (storyError, storyResult) => {
      if (storyError) {
          return res.status(500).json({ message: 'Error checking story', error: storyError });
      }

      if (storyResult.length === 0) {
          return res.status(400).json({ message: `No story found with story_id: ${story_id}` });
      }

      const episode_id = storyResult[0].episode_id; // Get the episode_id from the story table

      // Check if the user has liked this story (episode_id linked)
      const checkLikeSQL = 'SELECT * FROM like_story WHERE profile_id = ? AND episode_id = ?';
      db.query(checkLikeSQL, [profile_id, episode_id], (likeError, likeResult) => {
          if (likeError) {
              return res.status(500).json({ message: 'Error checking like status', error: likeError });
          }

          if (likeResult.length === 0) {
              return res.status(400).json({ message: 'You have not liked this story yet' });
          }

          // Remove the like
          const removeLikeSQL = 'DELETE FROM like_story WHERE profile_id = ? AND episode_id = ?';
          db.query(removeLikeSQL, [profile_id, episode_id], (removeError, removeResult) => {
              if (removeError) {
                  return res.status(500).json({ message: 'Error removing like', error: removeError });
              }

              res.status(200).json({
                  message: 'Like removed successfully',
              });
          });
      });
  });
};

