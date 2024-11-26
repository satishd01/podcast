const bcrypt = require('bcrypt');
const db = require('../db');

exports.signup = async (req, res) => {
  const { name, email, password, confirm_password } = req.body;

  // Input validation
  if (!name || !email || !password || !confirm_password) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  // Check if passwords match
  if (password !== confirm_password) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    // Check if the user already exists
    const userCheckSQL = `SELECT * FROM Signup WHERE email = ?`;
    db.query(userCheckSQL, [email], async (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Error checking user existence', error: err });
      }

      if (results.length > 0) {
        return res.status(409).json({ message: 'User already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert the new user into the database
      const insertUserSQL = `INSERT INTO Signup (full_name, email, password) VALUES (?, ?, ?)`;
      db.query(insertUserSQL, [name, email, hashedPassword], (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Error creating user', error: err });
        }

        // Return a success message
        res.status(201).json({ message: 'User created successfully' });
      });
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};
