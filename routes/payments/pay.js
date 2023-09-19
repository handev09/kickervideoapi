const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs"); // Import bcryptjs
const router = express.Router();

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: "kickervideo-db.cpp0rtsplxx9.eu-north-1.rds.amazonaws.com",
  user: "hankis",
  password: "ESYN1dqjY6mIp3kOep8y",
  database: "kickervideo",
  connectionLimit: 10,
});

// Handle subscription update request
router.post("/", async (req, res) => {
  const { userId, subStart, subEnd, daysLeft } = req.body;

  try {
    // Update the user's subscription information in the database
    pool.query(
      "UPDATE users SET sub_start = ?, sub_end = ?, sub_days = ? WHERE user_id = ?",
      [subStart, subEnd, daysLeft, userId],
      (error, results) => {
        if (error) {
          console.error("Error during subscription update:", error);
          res.status(500).json({ error: "Subscription update failed" });
        } else {
          res.status(200).json({
            message: "Subscription updated successfully",
            userId: userId,
          });
        }
      }
    );
  } catch (error) {
    console.error("Error during subscription update:", error);
    res.status(500).json({ error: "Subscription update failed" });
  }
});

module.exports = router;
