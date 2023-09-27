const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: "kickervideo-db.cpp0rtsplxx9.eu-north-1.rds.amazonaws.com",
  user: "hankis",
  password: "ESYN1dqjY6mIp3kOep8y",
  database: "kickervideo",
  connectionLimit: 10,
});

router.post("/", async (req, res) => {
  const { id, name, description, markup, jobId, cost, userId, createdAt } = req.body;

  try {
    // Insert crew member data into the database using promise-compatible query interface
    const result = await pool
      .promise()
      .query(
        "INSERT INTO items (item_id, item_name, item_desc, markup, job_id, cost, user_id, created_at ) VALUES (?, ?, ?, ?, ?, ?, ?, ? )",
        [id, name, description, markup, jobId, cost, userId, createdAt]
      );

    if (result[0].insertId) {
      res.status(201).json({
        message: "Item added successfully",
        itemId: result[0].insertId,
      });
    } else {
      res.status(500).json({ error: "Item creation failed" });
    }
  } catch (error) {
    console.error("Error during Item creation:", error);
    res.status(500).json({ error: "Item creation failed" });
  }
});

module.exports = router;
