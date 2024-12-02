
const db = require('../db'); 


exports.createUserInfo = async (req, res) => {
  const { name, email, mobileNumber, genre } = req.body;

  if (!name || !email || !mobileNumber || !genre) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  console.log('Inserting user info:', { name, email, mobileNumber, genre }); // Log the values being inserted

  db.query(
    'INSERT INTO userinfo (name, email, mobile_number, genre) VALUES (?, ?, ?, ?)',
    [name, email, mobileNumber, genre],
    (err, result) => {
      if (err) {
        console.error('Insert Error:', err); // Log the error if any
        return res.status(500).json({ message: 'Database error', error: err });
      }

      console.log('Insert Result:', result); // Log the result to check if the insert was successful
      res.status(201).json({ message: 'User info created successfully' });
    }
  );
};
  
exports.getAllUserInfo = (req, res) => {
    db.query('SELECT * FROM userinfo', (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Database error', error: err });
      }
      res.status(200).json(results);
    });
  };

  
exports.getUserInfoById = (req, res) => {
    const { id } = req.params;
  
    db.query('SELECT * FROM userinfo WHERE id = ?', [id], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Database error', error: err });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(result[0]);
    });
  };

  
exports.updateUserInfo = (req, res) => {
    const { id } = req.params;
    const { name, email, mobileNumber, genre } = req.body;
  
    if (!name || !email || !mobileNumber || !genre) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    db.query(
      'UPDATE userinfo SET name = ?, email = ?, mobile_number = ?, genre = ? WHERE id = ?',
      [name, email, mobileNumber, genre, id],
      (err, result) => {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Email already exists' });
          }
          return res.status(500).json({ message: 'Database error', error: err });
        }
        if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User info updated successfully' });
      }
    );
  };

exports.deleteUserInfo = (req, res) => {
    const { id } = req.params;
  
    db.query('DELETE FROM userinfo WHERE id = ?', [id], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Database error', error: err });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User info deleted successfully' });
    });
  };
  exports.getUserInfoByEmail = (req, res) => {
    const { email } = req.params;
  
    db.query('SELECT * FROM userinfo WHERE email = ?', [email], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Database error', error: err });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(result[0]);
    });
  };
  
    
  

  
  

