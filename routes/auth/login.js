const express = require('express');
const mysql = require('mysql2');
const router = express.Router();

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'kickervideo-db.cpp0rtsplxx9.eu-north-1.rds.amazonaws.com',
  user: 'hankis',
  password: 'ESYN1dqjY6mIp3kOep8y',
  database: 'kickervideo',
  connectionLimit: 10,
});

// Handle login request
router.post('/', (req, res) => {
  const { email, password } = req.body;

  // Check user credentials in the database
  pool.query(
    'SELECT * FROM users WHERE email = ? AND password = ?',
    [email, password],
    (error, results) => {
      if (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Login failed' });
      } else {
        if (results.length > 0) {
          const user = results[0];
          res.status(200).json({
            message: 'Login successful',
            userId: user.id,
            name: user.name,
          });
        } else {
          res.status(401).json({ error: 'Invalid credentials' });
        }
      }
    }
  );
});

module.exports = router;
