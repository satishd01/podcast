const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connection = require('../db');

// // Signup Logic
// exports.signup = (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({ message: 'Username and password are required.' });
//   }

//   // Check if username already exists
//   connection.query('SELECT * FROM admin WHERE username = ?', [username], async (err, result) => {
//     if (err) {
//       return res.status(500).json({ message: 'Database error', error: err });
//     }

//     if (result.length > 0) {
//       return res.status(400).json({ message: 'Username already exists.' });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Insert new admin into the database
//     connection.query('INSERT INTO admin (username, password) VALUES (?, ?)', [username, hashedPassword], (err, result) => {
//       if (err) {
//         return res.status(500).json({ message: 'Database error', error: err });
//       }

//       return res.status(201).json({ message: 'Admin created successfully.' });
//     });
//   });
// };

// // Login logic
// exports.login = (req, res) => {
//     const { username, password } = req.body;

//     if (!username || !password) {
//         return res.status(400).json({ message: 'Please provide both username and password.' });
//     }

//     connection.query('SELECT * FROM admin WHERE username = ?', [username], async (err, result) => {
//         if (err) {
//             return res.status(500).json({ message: 'Database error', error: err });
//         }

//         if (result.length === 0) {
//             return res.status(400).json({ message: 'Invalid credentials.' });
//         }

//         const admin = result[0];
//         const isMatch = await bcrypt.compare(password, admin.password);

//         if (!isMatch) {
//             return res.status(400).json({ message: 'Invalid credentials.' });
//         }

//         // Generate a JWT token
//         const token = jwt.sign(
//             { id: admin.id, username: admin.username },
//             process.env.JWT_SECRET || 'fallback-secret-key',
//             { expiresIn: '1h' }
//         );

//         return res.status(200).json({ token });
//     });
// };




exports.signup = (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }
  
    // Check if username already exists
    connection.query('SELECT * FROM admin WHERE username = ?', [username], async (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Database error', error: err });
      }
  
      if (result.length > 0) {
        return res.status(400).json({ message: 'Username already exists.' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Insert new admin into the database
      connection.query('INSERT INTO admin (username, password) VALUES (?, ?)', [username, hashedPassword], (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Database error', error: err });
        }
  
        return res.status(201).json({ message: 'Admin created successfully.' });
      });
    });
  };

  exports.login = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Please provide both username and password.' });
    }

    connection.query('SELECT * FROM admin WHERE username = ?', [username], async (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }

        if (result.length === 0) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        const admin = result[0];
        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: admin.id, username: admin.username },
            process.env.JWT_SECRET || 'fallback-secret-key',
            { expiresIn: '1h' }
        );

        return res.status(200).json({ token });
    });
};
