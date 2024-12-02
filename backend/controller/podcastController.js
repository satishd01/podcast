
const db = require('../db');
const multer = require('multer');
const upload = require('../middleware/multerConfig');
const authenticateAdmin = require('../middleware/authenticateAdmin');


// exports.createPodcast = [
//   authenticateAdmin, // Middleware to authenticate and extract adminId
//   upload.single('image'), // Only image upload
//   (err, req, res, next) => {
//       if (err instanceof multer.MulterError || err.message === 'File type not supported') {
//           return res.status(400).json({ message: err.message });
//       }
//       next(err); // Pass other errors to default error handler
//   },
//   (req, res) => {
//       try {
//           const {
//               name,
//               listens,
//               authorId,
//               creatorId,
//               showTitle,
//               description,
//               creatorName,
//               episodes,
//               reviews,
//               moreLikeThis,
//               genre // New genre field
//           } = req.body;

//           const image = req.file ? req.file.path : null;

//           if (!name || !creatorName || !creatorId) {
//               return res.status(400).json({ message: 'Name, creator name, and creator ID are required' });
//           }

//           const sql = `
//               INSERT INTO podcast (
//                   name, listens, author_id, creator_id, show_title, description, creator_name,
//                   episodes, image, reviews, more_like_this, genre, created_at, admin_id
//               ) 
//               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//           `;

//           const values = [
//               name,
//               listens && !isNaN(listens) ? parseInt(listens, 10) : 0,
//               authorId && !isNaN(authorId) ? parseInt(authorId, 10) : null,
//               creatorId && !isNaN(creatorId) ? parseInt(creatorId, 10) : null,
//               showTitle || null,
//               description || null,
//               creatorName,
//               episodes && !isNaN(episodes) ? parseInt(episodes, 10) : 0,
//               image,
//               reviews || null,
//               moreLikeThis || null,
//               genre || null, // Include genre
//               new Date(), // Automatically add created_at timestamp
//               req.adminId // Pass the adminId from the JWT token
//           ];

//           db.query(sql, values, (err, result) => {
//               if (err) {
//                   console.error('Database error:', err);
//                   return res.status(500).json({ message: 'Database error', error: err });
//               }
//               res.status(201).json({
//                   message: 'Podcast created successfully',
//                   podcastId: result.insertId,
//               });
//           });
//       } catch (error) {
//           res.status(500).json({ message: 'Internal Server Error', error: error.message });
//       }
//   },
// ];

exports.createPodcast = [
  authenticateAdmin, // Middleware to authenticate and extract adminId
  upload.single('image'), // Only image upload
  (err, req, res, next) => {
      if (err instanceof multer.MulterError || err.message === 'File type not supported') {
          return res.status(400).json({ message: err.message });
      }
      next(err); // Pass other errors to default error handler
  },
  (req, res) => {
      try {
          const {
              name,
              listens,
              authorId,
              creatorId,
              showTitle,
              description,
              creatorName,
              episodes,
              reviews,
              moreLikeThis,
              genre // New genre field
          } = req.body;

          // Construct the image URL
          const image = req.file
              ? `${req.protocol}://${req.get('host')}/uploads/images/${req.file.filename}`
              : null;

          if (!name || !creatorName || !creatorId) {
              return res.status(400).json({ message: 'Name, creator name, and creator ID are required' });
          }

          const sql = `
              INSERT INTO podcast (
                  name, listens, author_id, creator_id, show_title, description, creator_name,
                  episodes, image, reviews, more_like_this, genre, created_at, admin_id
              ) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `;

          const values = [
              name,
              listens && !isNaN(listens) ? parseInt(listens, 10) : 0,
              authorId && !isNaN(authorId) ? parseInt(authorId, 10) : null,
              creatorId && !isNaN(creatorId) ? parseInt(creatorId, 10) : null,
              showTitle || null,
              description || null,
              creatorName,
              episodes && !isNaN(episodes) ? parseInt(episodes, 10) : 0,
              image,
              reviews || null,
              moreLikeThis || null,
              genre || null, // Include genre
              new Date(), // Automatically add created_at timestamp
              req.adminId // Pass the adminId from the JWT token
          ];

          db.query(sql, values, (err, result) => {
              if (err) {
                  console.error('Database error:', err);
                  return res.status(500).json({ message: 'Database error', error: err });
              }
              res.status(201).json({
                  message: 'Podcast created successfully',
                  podcastId: result.insertId,
                  imageURL: image, // Include the image URL in the response
              });
          });
      } catch (error) {
          res.status(500).json({ message: 'Internal Server Error', error: error.message });
      }
  },
];


 
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
    const { id } = req.params; // `id` is still taken from the request parameters
  
    const sql = 'DELETE FROM podcast WHERE podcast_id = ?'; // Use `podcast_id` instead of `id`

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Database error:', err);
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

  db.query(
    `SELECT podcast.*, creator.showTitle as creator_showTitle, creator.creatorName as creator_name
     FROM podcast 
     JOIN creator ON podcast.creator_id = creator.id 
     WHERE podcast.id = ?`,
    [id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Database error', error: err });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: 'Podcast not found' });
      }
      res.status(200).json(result[0]);
    }
  );
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

const path = require('path');

exports.createEpisode = (req, res) => {
    upload.fields([
        { name: 'image', maxCount: 1 },  
        { name: 'audio', maxCount: 1 }   
    ])(req, res, (uploadErr) => {
        if (uploadErr) {
            return res.status(400).json({ message: 'File upload failed', error: uploadErr });
        }

        const {
            title,
            duration,
            podcastId,
            name,
            season,
            episode,
            description,
            creator
        } = req.body;

        const serverUrl = `${req.protocol}://${req.get('host')}`; 
        const imagePath = req.files && req.files.image ? `${serverUrl}/${req.files.image[0].path.replace(/\\/g, '/')}` : null;
        const audioPath = req.files && req.files.audio ? `${serverUrl}/${req.files.audio[0].path.replace(/\\/g, '/')}` : null;

        if (!title || !podcastId || !audioPath) {
            return res.status(400).json({ message: 'Title, podcast ID, and audio file are required' });
        }

        const query = `
            INSERT INTO episode (title, duration, podcast_id, name, season, episode, description, creator, image, audio_file) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            title,
            duration || null,
            podcastId,
            name || null,
            season || null,
            episode || null,
            description || null,
            creator || null,
            imagePath,
            audioPath
        ];

        db.query(query, values, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Database error', error: err });
            }

            res.status(201).json({
                message: 'Episode created successfully',
                episodeId: result.insertId,
                data: {
                    title,
                    duration,
                    podcastId,
                    name,
                    season,
                    episode,
                    description,
                    creator,
                    image: imagePath,
                    audio: audioPath,
                },
            });
        });
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

  exports.getAllPodcastsOfCreator = (req, res) => {
    const { creatorId } = req.params;
  
    // Query to select all podcasts related to a specific creator
    const sql = `
      SELECT podcast.*, creator.showTitle as creator_showTitle, creator.creatorName as creator_name
      FROM podcast
      JOIN creator ON podcast.creator_id = creator.id
      WHERE podcast.creator_id = ?
    `;
    
    db.query(sql, [creatorId], (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ message: 'Database error', error: err });
      }
  
      if (result.length === 0) {
        return res.status(404).json({ message: 'No podcasts found for this creator' });
      }
  
      res.status(200).json(result);
    });
  };
  
    
  exports.getAllEpisodesOfAllPodcasts = (req, res) => {
    // SQL query to join podcast and episode tables and fetch relevant data
    const sql = `
      SELECT 
        episode.*, 
        podcast.name AS podcast_name, 
        podcast.show_title AS podcast_show_title, 
        podcast.creator_name AS podcast_creator_name 
      FROM episode
      JOIN podcast ON episode.podcast_id = podcast.id
    `;
  
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ message: 'Database error', error: err });
      }
  
      // Check if no episodes are found
      if (result.length === 0) {
        return res.status(404).json({ message: 'No episodes found for any podcast', result: [] });
      }
  
      // Return the result with podcast and episode details
      res.status(200).json(result);
    });
  };
  

  exports.getPodcastByGenre = (req, res) => {
    const { genre_id } = req.params;

    if (!genre_id) {
        return res.status(400).json({ message: 'Genre ID is required' });
    }

    console.log('Received genre_id:', genre_id);

    // Step 1: Fetch the podcast_id(s) for the given genre_id from the genre table
    const sqlGetPodcastIds = 'SELECT podcast_id FROM genre WHERE id = ?';
    db.query(sqlGetPodcastIds, [genre_id], (err, genrePodcasts) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Database error', error: err });
        }

        // Step 2: If no podcast ids are found for this genre, return a message
        if (genrePodcasts.length === 0) {
            return res.status(404).json({ message: 'No podcasts associated with this genre' });
        }

        // Step 3: Now retrieve the podcasts using the podcast_id(s) from the podcast table
        const podcastIds = genrePodcasts.map(podcast => podcast.podcast_id);  // Extract podcast_id(s)
        
        // Update query to match the correct column name in your podcast table
        const sqlGetPodcasts = 'SELECT * FROM podcast WHERE podcast_id IN (?)';  // Changed `id` to `podcast_id`
        db.query(sqlGetPodcasts, [podcastIds], (err, podcasts) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ message: 'Database error', error: err });
            }

            console.log('Podcasts found:', podcasts);

            // Step 4: If no podcasts are found, return a 404 response
            if (podcasts.length === 0) {
                return res.status(404).json({ message: 'No podcasts found for this genre' });
            }

            // Step 5: Return the found podcasts
            res.status(200).json({
                message: 'Podcasts retrieved successfully',
                podcasts: podcasts
            });
        });
    });
};


exports.deleteEpisode = (req, res) => {
  const { id } = req.params;

  if (!id) {
      return res.status(400).json({ message: 'Episode ID is required' });
  }

  // Query to fetch episode details before deletion
  const fetchQuery = `SELECT image, audio_file FROM episode WHERE id = ?`;

  db.query(fetchQuery, [id], (fetchErr, fetchResult) => {
      if (fetchErr) {
          return res.status(500).json({ message: 'Database error', error: fetchErr });
      }

      if (fetchResult.length === 0) {
          return res.status(404).json({ message: 'Episode not found' });
      }

      const { image, audio_file: audioFile } = fetchResult[0];

      // Query to delete the episode
      const deleteQuery = `DELETE FROM episode WHERE id = ?`;

      db.query(deleteQuery, [id], (deleteErr, deleteResult) => {
          if (deleteErr) {
              return res.status(500).json({ message: 'Database error', error: deleteErr });
          }

          // Optionally delete the files from the server
          if (image) {
              const imagePath = path.join(__dirname, '..', image.split('uploads/')[1]);
              fs.unlink(imagePath, (err) => {
                  if (err) console.error(`Failed to delete image file: ${err.message}`);
              });
          }

          if (audioFile) {
              const audioPath = path.join(__dirname, '..', audioFile.split('uploads/')[1]);
              fs.unlink(audioPath, (err) => {
                  if (err) console.error(`Failed to delete audio file: ${err.message}`);
              });
          }

          res.status(200).json({ message: 'Episode deleted successfully' });
      });
  });
};

