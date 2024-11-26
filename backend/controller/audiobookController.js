const db = require('../db'); 

const AudiobookController = {
    createAudiobook: (req, res) => {
        const newAudiobook = req.body;
        const query = 'INSERT INTO audiobook (title, author_id, duration, release_year) VALUES (?, ?, ?, ?)';
        
        db.query(query, [newAudiobook.title, newAudiobook.author_id, newAudiobook.duration, newAudiobook.release_year], (error, results) => {
            if (error) return res.status(500).json({ error });
            return res.status(201).json({ message: 'Audiobook created successfully', audiobookId: results.insertId });
        });
    },

    getAllAudiobooks: (req, res) => {
        const query = 'SELECT * FROM audiobook';
        
        db.query(query, (error, results) => {
            if (error) return res.status(500).json({ error });
            return res.status(200).json(results);
        });
    },

    getAudiobookById: (req, res) => {
        const { id } = req.params;
        const query = 'SELECT * FROM audiobook WHERE audiobook_id = ?';
        
        db.query(query, [id], (error, results) => {
            if (error) return res.status(500).json({ error });
            if (results.length === 0) return res.status(404).json({ message: 'Audiobook not found' });
            return res.status(200).json(results[0]);
        });
    },

    updateAudiobook: (req, res) => {
        const { id } = req.params;
        const updatedData = req.body;
        const query = 'UPDATE audiobook SET title = ?, author_id = ?, duration = ?, release_year = ? WHERE audiobook_id = ?';
        
        db.query(query, [updatedData.title, updatedData.author_id, updatedData.duration, updatedData.release_year, id], (error, results) => {
            if (error) return res.status(500).json({ error });
            return res.status(200).json({ message: 'Audiobook updated successfully' });
        });
    },

    deleteAudiobook: (req, res) => {
        const { id } = req.params;
        const query = 'DELETE FROM audiobook WHERE audiobook_id = ?';
        
        db.query(query, [id], (error, results) => {
            if (error) return res.status(500).json({ error });
            return res.status(200).json({ message: 'Audiobook deleted successfully' });
        });
    },
};

module.exports = AudiobookController;
