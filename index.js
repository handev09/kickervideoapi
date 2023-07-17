const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(cors());
app.use(cors());

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'kickervideo-db.cpp0rtsplxx9.eu-north-1.rds.amazonaws.com',
  user: 'hankis',
  password: 'ESYN1dqjY6mIp3kOep8y',
  database: 'kickervideo',
  connectionLimit: 10,
});

// Handle registration request
app.post('/api/v1/register', (req, res) => {
  const { name, email, password } = req.body;

  // Insert user data into the database
  pool.query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, password],
    (error, results) => {
      if (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'Registration failed' });
      } else {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
        res.setHeader(
          'Access-Control-Allow-Headers',
          'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
        );
        res.status(200).json({
          message: 'Registration successful',
          redirectUrl: `/dashboard?userId=${userId}&name=${encodeURIComponent(name)}`,
        });
      }
    }
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
