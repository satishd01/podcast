
const db = require('../db');
const multer = require('multer');
const upload = require('../middleware/multerConfig');  // Assuming this is where your multer config is set up

// Create genre with image upload
exports.createGenre = (req, res) => {
    const { genre_name, podcast_id } = req.body;

    // Log the received data for debugging
    console.log('Received genre name:', genre_name);
    console.log('Received podcast id:', podcast_id);

    // Check if genre_name and podcast_id are provided
    if (!genre_name || !podcast_id) {
        return res.status(400).json({ message: 'Genre name and podcast ID are required' });
    }

    // Check if image file is provided
    if (!req.file) {
        return res.status(400).json({ message: 'Image file is required' });
    }

    const imagePath = req.file.path;  // Path to the uploaded image
    console.log('Uploaded image path:', imagePath); // Log the image path

    // Check if podcast exists
    const sqlCheckPodcast = 'SELECT * FROM podcast WHERE podcast_id = ?';  // Corrected to podcast_id
    db.query(sqlCheckPodcast, [podcast_id], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Database error', error: err });
        }

        if (result.length === 0) {
            return res.status(400).json({ message: 'Podcast ID not found' });
        }

        // Insert genre with image path (removed created_by_user_id as it does not exist in the table)
        const sql = `INSERT INTO genre (genre_name, podcast_id, image)
                     VALUES (?, ?, ?)`;
        const values = [genre_name, podcast_id, imagePath];  // Attach image path to the query

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ message: 'Database error', error: err });
            }
            res.status(201).json({
                message: 'Genre created successfully',
                genreId: result.insertId,
                image: imagePath
            });
        });
    });
};

// Update genre with image upload
exports.updateGenre = (req, res) => {
    const { id } = req.params;
    const { genre_name, podcast_id } = req.body;

    if (!genre_name || !podcast_id) {
        return res.status(400).json({ message: 'Genre name and podcast ID are required' });
    }

    // Check if image is uploaded
    let imagePath = null;
    if (req.file) {
        imagePath = req.file.path;  // Get the path of the uploaded image
    }

    // Check if podcast exists
    const sqlCheckPodcast = 'SELECT * FROM podcast WHERE podcast_id = ?';  // Corrected to podcast_id
    db.query(sqlCheckPodcast, [podcast_id], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Database error', error: err });
        }

        if (result.length === 0) {
            return res.status(400).json({ message: 'Podcast ID not found' });
        }

        // Update genre with new image path if provided
        const sql = 'UPDATE genre SET genre_name = ?, podcast_id = ?, image = ? WHERE id = ?';
        const values = [genre_name, podcast_id, imagePath || null, id];
        
        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ message: 'Database error', error: err });
            }
            res.status(200).json({
                message: 'Genre updated successfully',
            });
        });
    });
};
// Get all genres
exports.getAllGenres = (req, res) => {
    const sql = 'SELECT * FROM genre';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.status(200).json(result);
    });
};

// Get genre by ID
exports.getGenreById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM genre WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Database error', error: err });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'Genre not found' });
        }

        res.status(200).json(result[0]);
    });
};

// Delete genre
exports.deleteGenre = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM genre WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Database error', error: err });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Genre not found' });
        }

        res.status(200).json({ message: 'Genre deleted successfully' });
    });
};


// Get podcasts by genre
exports.getPodcastByGenre = (req, res) => {
    const { genre_id } = req.params;

    // Validate genre_id
    if (!genre_id) {
        return res.status(400).json({ message: 'Genre ID is required' });
    }

    // Check if genre exists
    const sqlCheckGenre = 'SELECT * FROM genre WHERE id = ?';
    db.query(sqlCheckGenre, [genre_id], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Database error', error: err });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'Genre not found' });
        }

        // Get podcasts associated with the genre
        const sql = 'SELECT * FROM podcast WHERE genre_id = ?';
        db.query(sql, [genre_id], (err, podcasts) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ message: 'Database error', error: err });
            }

            if (podcasts.length === 0) {
                return res.status(404).json({ message: 'No podcasts found for this genre' });
            }

            // Return the list of podcasts
            res.status(200).json({
                message: 'Podcasts retrieved successfully',
                podcasts: podcasts
            });
        });
    });
};

