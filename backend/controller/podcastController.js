const db = require('../db');

exports.createPodcast = (req, res) => {
  const { name, listens, authorId } = req.body;

  db.query('INSERT INTO podcast (name, listens, author_id) VALUES (?, ?, ?)', [name, listens, authorId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err });
    }
    res.status(201).json({ message: 'Podcast created successfully', podcastId: result.insertId });
  });
};
exports.updatePodcastById = (req, res) => {
    const { id } = req.params;
    const { name, listens, authorId } = req.body;
  
    db.query('UPDATE podcast SET name = ?, listens = ?, author_id = ? WHERE id = ?', [name, listens, authorId, id], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Database error', error: err });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Podcast not found' });
      }
      res.status(200).json({ message: 'Podcast updated successfully' });
    });
  };
exports.deletePodcastById = (req, res) => {
    const { id } = req.params;
  
    db.query('DELETE FROM podcast WHERE id = ?', [id], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Database error', error: err });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Podcast not found' });
      }
      res.status(200).json({ message: 'Podcast deleted successfully' });
    });
  };
  
  

exports.getAllPodcasts = (req, res) => {
  db.query('SELECT podcast.*, author.name as author_name, author.email as author_email FROM podcast JOIN author ON podcast.author_id = author.id', (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err });
    }
    res.status(200).json(result);
  });
};

exports.getPodcastById = (req, res) => {
  const { id } = req.params;

  db.query('SELECT podcast.*, author.name as author_name, author.email as author_email FROM podcast JOIN author ON podcast.author_id = author.id WHERE podcast.id = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'Podcast not found' });
    }
    res.status(200).json(result[0]);
  });
};

exports.getPodcastsByAuthor = (req, res) => {
  const { authorId } = req.params;

  db.query('SELECT * FROM podcast WHERE author_id = ?', [authorId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err });
    }
    res.status(200).json(result);
  });
};

exports.createAuthor = (req, res) => {
  const { name, email } = req.body;

  db.query('INSERT INTO author (name, email) VALUES (?, ?)', [name, email], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ message: 'Email already exists' });
      }
      return res.status(500).json({ message: 'Database error', error: err });
    }
    res.status(201).json({ message: 'Author created successfully', authorId: result.insertId });
  });
};

exports.createEpisode = (req, res) => {
  const { title, duration, podcastId } = req.body;

  db.query('INSERT INTO episode (title, duration, podcast_id) VALUES (?, ?, ?)', [title, duration, podcastId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err });
    }
    res.status(201).json({ message: 'Episode created successfully', episodeId: result.insertId });
  });
};

exports.getEpisodesByPodcast = (req, res) => {
    const { podcastId } = req.params;
  
    db.query('SELECT * FROM episode WHERE podcast_id = ?', [podcastId], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Database error', error: err });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: 'No episodes found for this podcast' });
      }
      res.status(200).json(result);
    });
  };
  

  
exports.getAllAuthors = (req, res) => {
    db.query('SELECT * FROM author', (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Database error', error: err });
      }
      res.status(200).json(result);
    });
  };
  
  
  exports.getAuthorById = (req, res) => {
    const { id } = req.params;
  
    db.query('SELECT * FROM author WHERE id = ?', [id], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Database error', error: err });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: 'Author not found' });
      }
      res.status(200).json(result[0]);
    });
  };
  
  
  exports.updateAuthor = (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
  
    db.query('UPDATE author SET name = ?, email = ? WHERE id = ?', [name, email, id], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Database error', error: err });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Author not found' });
      }
      res.status(200).json({ message: 'Author updated successfully' });
    });
  };
  
  
  exports.deleteAuthor = (req, res) => {
    const { id } = req.params;
  
    db.query('DELETE FROM author WHERE id = ?', [id], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Database error', error: err });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Author not found' });
      }
      res.status(200).json({ message: 'Author deleted successfully' });
    });
  };

exports.getAllEpisodes = (req, res) => {
    db.query('SELECT * FROM episode', (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Database error', error: err });
      }
      res.status(200).json(result);
    });
  };
  
  
  exports.getEpisodeById = (req, res) => {
    const { id } = req.params;
  
    db.query('SELECT * FROM episode WHERE id = ?', [id], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Database error', error: err });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: 'Episode not found' });
      }
      res.status(200).json(result[0]);
    });
  };
  
  
  exports.updateEpisode = (req, res) => {
    const { id } = req.params;
    const { title, duration } = req.body;
  
    db.query('UPDATE episode SET title = ?, duration = ? WHERE id = ?', [title, duration, id], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Database error', error: err });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Episode not found' });
      }
      res.status(200).json({ message: 'Episode updated successfully' });
    });
  };
  
  
  exports.deleteEpisode = (req, res) => {
    const { id } = req.params;
  
    db.query('DELETE FROM episode WHERE id = ?', [id], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Database error', error: err });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Episode not found' });
      }
      res.status(200).json({ message: 'Episode deleted successfully' });
    });
  };
    

