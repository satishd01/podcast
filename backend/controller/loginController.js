const bcrypt = require('bcrypt');
const db = require('../db');

exports.login = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    const userCheckSQL = 'SELECT * FROM Signup WHERE email = ? AND full_name = ?';
    db.query(userCheckSQL, [email, name], async (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Error checking user', error: err });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      res.status(200).json({ message: 'Login successful', user: { name: user.full_name, email: user.email } });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
