// const bcrypt = require('bcrypt');
// const db = require('../db');

// // exports.login = (req, res) => {
// //   const { name, email, password } = req.body;

// //   if (!name || !email || !password) {
// //     return res.status(400).json({ message: 'Please provide all required fields' });
// //   }

// //   try {
// //     const userCheckSQL = 'SELECT * FROM Signup WHERE email = ? AND full_name = ?';
// //     db.query(userCheckSQL, [email, name], async (err, results) => {
// //       if (err) {
// //         return res.status(500).json({ message: 'Error checking user', error: err });
// //       }

// //       if (results.length === 0) {
// //         return res.status(404).json({ message: 'User not found' });
// //       }

// //       const user = results[0];
// //       const isMatch = await bcrypt.compare(password, user.password);
// //       if (!isMatch) {
// //         return res.status(401).json({ message: 'Invalid credentials' });
// //       }

// //       res.status(200).json({ message: 'Login successful', user: { name: user.full_name, email: user.email } });
// //     });
// //   } catch (error) {
// //     res.status(500).json({ message: 'Server error', error });
// //   }
// // };



// exports.login = (req, res) => {
//   const { email, password } = req.body;  // Assuming these fields are sent in the body

//   if (!email || !password) {
//     return res.status(400).json({ message: 'Please provide email and password' });
//   }

//   try {
//     // Check if user exists in the database
//     const userCheckSQL = 'SELECT * FROM Signup WHERE email = ?';
//     db.query(userCheckSQL, [email], async (err, results) => {
//       if (err) {
//         return res.status(500).json({ message: 'Error checking user', error: err });
//       }

//       if (results.length === 0) {
//         return res.status(404).json({ message: 'User not found' });
//       }

//       const user = results[0];

//       // Compare passwords
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) {
//         return res.status(401).json({ message: 'Invalid credentials' });
//       }

//       // If credentials match, generate JWT Token (Assuming you're using JWT)
//       const jwt = require('jsonwebtoken');
//       const token = jwt.sign({ id: user.id, email: user.email }, 'your-secret-key', { expiresIn: '1h' });

//       // Send success response with the token
//       res.status(200).json({
//         message: 'Login successful',
//         token: token,  // Send JWT token in the response
//         user: { name: user.full_name, email: user.email }
//       });
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error during login', error });
//   }
// };


// // Assuming that you are using JWT authentication and storing the token in cookies or headers
// exports.logout = (req, res) => {
//   try {
//     // Clear the token in cookies (if you're using cookies to store the JWT token)
//     res.clearCookie('token');  // Make sure your token is stored in a cookie named 'token'

//     // Optionally, if you are using authorization header, you might want to clear the token on the client side

//     res.status(200).json({
//       message: 'Logout successful. Token cleared from the client-side.'
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error during logout', error });
//   }
// };



const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  try {
    // Check if user exists in the database
    const userCheckSQL = 'SELECT * FROM Signup WHERE email = ?';
    db.query(userCheckSQL, [email], async (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Error checking user', error: err });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      const user = results[0];

      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // If credentials match, generate JWT Token
      const token = jwt.sign(
        { id: user.id, email: user.email },
        '8cc4510a207f10f3a4170bf15c114b6ff73deafd20d05c3384ee34175fa0fe98', 
        { expiresIn: '1h' } // Token expires in 1 hour
      );

      // Send success response with the token
      res.status(200).json({
        message: 'Login successful',
        token: token, // Send JWT token in the response
        user: { name: user.full_name, email: user.email }
      });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error during login', error });
  }
};


exports.logout = (req, res) => {
  try {
    // Check if the token exists in the request header
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Bearer <token>

    if (!token) {
      return res.status(400).json({ message: 'No token provided' });
    }

    // Clear the token from cookies (if you're using cookies to store the JWT token)
    res.clearCookie('token'); // Clear the token cookie

    // If you're using localStorage or sessionStorage on the client side, instruct the client to clear the token

    res.status(200).json({
      message: 'Logout successful. Token cleared from the client-side.'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error during logout', error });
  }
};
