const express = require("express");
const mysql = require("mysql2/promise");
const router = express.Router();

const pool = mysql.createPool({
  host: "kickervideo-db.cpp0rtsplxx9.eu-north-1.rds.amazonaws.com",
  user: "hankis",
  password: "ESYN1dqjY6mIp3kOep8y",
  database: "kickervideo",
  connectionLimit: 10,
});

// Endpoint to fetch user data by user ID
router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE user_id = ?",
      [userId]
    );

    if (rows.length > 0) {
      console.log(rows[0])
      res.status(200).json({
        message: "User Fetched! Succesfully",
        daysLeft: rows[0].sub_days,
                userId: rows[0].user_id,
                name: rows[0].name,
                userNum: rows[0].id,
                email: rows[0].email,
                isPaid: rows[0].paid===0?false:true
      }); // Respond with user data
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});

module.exports = router;
