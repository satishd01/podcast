const db = require('../db');

exports.createLibrary = (req, res) => {
    const { name, location, established_year } = req.body;
    const query = 'INSERT INTO libraries (name, location, established_year) VALUES (?, ?, ?)';
    
    db.query(query, [name, location, established_year], (err, results) => {
        if (err) {
            console.error('Error creating library:', err);
            return res.status(500).json({ error: 'Error creating library' });
        }
        res.status(201).json({ message: 'Library created', libraryId: results.insertId });
    });
};

exports.getLibraries = (req, res) => {
    db.query('SELECT * FROM libraries', (err, results) => {
        if (err) {
            console.error('Error fetching libraries:', err);
            return res.status(500).json({ error: 'Error fetching libraries' });
        }
        res.status(200).json(results);
    });
};


exports.getLibraryById = (req, res) => {
    const { id } = req.params;
    
    console.log(`Received request to fetch library with ID: ${id}`);
    
    if (isNaN(id)) {
        console.error('Invalid ID format');
        return res.status(400).json({ error: 'Invalid ID format' });
    }
    
    db.query('SELECT * FROM libraries WHERE library_id = ?', [id], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            console.log('SQL Query:', 'SELECT * FROM libraries WHERE library_id = ' + db.escape(id)); // Log the exact query
            return res.status(500).json({ error: 'Error fetching library' });
        }
        
        if (results.length === 0) {
            console.log(`Library not found for ID: ${id}`);
            return res.status(404).json({ error: 'Library not found' });
        }
        
        res.status(200).json(results[0]);
    });
};


exports.updateLibrary = (req, res) => {
    const { id } = req.params;
    const { name, location, established_year } = req.body;
    const query = 'UPDATE libraries SET name = ?, location = ?, established_year = ? WHERE library_id = ?';

    db.query(query, [name, location, established_year, id], (err, results) => {
        if (err) {
            console.error('Error updating library:', err);
            return res.status(500).json({ error: 'Error updating library' });
        }
        res.status(200).json({ message: 'Library updated' });
    });
};


exports.deleteLibrary = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM libraries WHERE library_id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error deleting library:', err);
            return res.status(500).json({ error: 'Error deleting library' });
        }
        res.status(200).json({ message: 'Library deleted' });
    });
};
