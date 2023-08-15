// const express = require('express');
// const mysql = require('mysql2');
// const router = express.Router();
// const bcrypt = require('bcryptjs');



// // Handle registration request
// router.post('/', async(req, res) => {
//   const { name, email, password } = req.body;

//   // Check if the user with the given email already exists
//   pool.query(
//     'SELECT * FROM users WHERE email = ?',
//     [email],
//     (error, results) => {
//       if (error) {
//         console.error('Error during registration:', error);
//         res.status(500).json({ error: 'Registration failed' });
//       } else {
//         if (results.length > 0) {
//           res.status(409).json({ error: 'User with this email already exists' });
//         } else {
//           // Hash the password
//       const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with a salt of 10 rounds
//           // Insert user data into the database
//           pool.query(
//             'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
//             [name, email, password],
//             (error, results) => {
//               if (error) {
//                 console.error('Error during registration:', error);
//                 res.status(500).json({ error: 'Registration failed' });
//               } else {
//                 if (results && results.insertId) {
//                   const userId = results.insertId;
//                   res.status(200).json({
//                     message: 'Registration successful',
//                     userId: userId,
//                     name: name,
//                   });
//                 } else {
//                   console.error('No insertId found in the database results:', results);
//                   res.status(500).json({ error: 'Registration failed' });
//                 }
//               }
//             }
//           );
//         }
//       }
//     }
//   );
// });

// module.exports = router;

const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs'); // Import bcryptjs
const router = express.Router();

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'kickervideo-db.cpp0rtsplxx9.eu-north-1.rds.amazonaws.com',
  user: 'hankis',
  password: 'ESYN1dqjY6mIp3kOep8y',
  database: 'kickervideo',
  connectionLimit: 10,
});
// Handle registration request
router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user with the given email already exists
    const emailExists = await new Promise((resolve, reject) => {
      pool.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.length > 0);
        }
      });
    });

    if (emailExists) {
      res.status(409).json({ error: 'User with this email already exists' });
    } else {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with a salt of 10 rounds

      // Insert user data into the database
      pool.query(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, hashedPassword], // Use the hashed password
        (error, results) => {
          if (error) {
            console.error('Error during registration:', error);
            res.status(500).json({ error: 'Registration failed' });
          } else {
            if (results && results.insertId) {
              const userId = results.insertId;
              res.status(200).json({
                message: 'Registration successful',
                userId: userId,
                name: name,
              });
            } else {
              console.error('No insertId found in the database results:', results);
              res.status(500).json({ error: 'Registration failed' });
            }
          }
        }
      );
    }
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

module.exports = router;
