const db = require('../db');

exports.createStory = (req, res) => {
  const { title, author_id, genre, publication_year } = req.body;
  const query = 'INSERT INTO stories (title, author_id, genre, publication_year) VALUES (?, ?, ?, ?)';
  
  db.query(query, [title, author_id, genre, publication_year], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error creating story', error: err });
    }
    res.status(201).json({ message: 'Story created', story_id: results.insertId });
  });
};

exports.getAllStories = (req, res) => {
  const query = 'SELECT * FROM stories';
  
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving stories', error: err });
    }
    res.status(200).json(results);
  });
};

exports.getStoryById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM stories WHERE story_id = ?';
  
    db.query(query, [id], (err, results) => {
      if (err) {
        console.error('Database error:', err); // Log the error for debugging
        return res.status(500).json({ message: 'Error retrieving story', error: err });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: 'Story not found' });
      }
      res.status(200).json(results[0]);
    });
  };
  

exports.updateStory = (req, res) => {
  const { id } = req.params;
  const { title, author_id, genre, publication_year } = req.body;
  const query = 'UPDATE stories SET title = ?, author_id = ?, genre = ?, publication_year = ? WHERE story_id = ?';
  
  db.query(query, [title, author_id, genre, publication_year, id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error updating story', error: err });
    }
    res.status(200).json({ message: 'Story updated' });
  });
};

exports.deleteStory = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM stories WHERE story_id = ?';
  
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting story', error: err });
    }
    res.status(200).json({ message: 'Story deleted' });
  });
};
