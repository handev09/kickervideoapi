const express = require("express");
const mysql = require("mysql2/promise"); // Import the promise-compatible version
const router = express.Router();

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: "kickervideo-db.cpp0rtsplxx9.eu-north-1.rds.amazonaws.com",
  user: "hankis",
  password: "ESYN1dqjY6mIp3kOep8y",
  database: "kickervideo",
  connectionLimit: 10,
});

// Handle budget creation request
router.get("/", async (req, res) => {
  const companyId = req.query.companyId; // Get the user ID from the query parameters

  try {
    // Query for budgets where userId matches the current user's ID
    const [rows] = await pool.query(
      "SELECT * FROM contacts WHERE company_id = ?",
      [companyId]
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching Contacts:", error);
    res.status(500).json({ error: "Failed to fetch Contacts" });
  }
});

module.exports = router;
