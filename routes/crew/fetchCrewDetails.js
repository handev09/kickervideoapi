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
  const crewId = req.query.crewId; // Get the user ID from the query parameters
  // console.log(budgetId)

  try {
    // Query for budgets where userId matches the current user's ID
    const [rows] = await pool.query(
      "SELECT * FROM crew_members WHERE crew_id = ?",
      [crewId]
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching crew details:", error);
    res.status(500).json({ error: "Failed to crew details" });
  }
});

module.exports = router;

