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
  const { id, companyName, companyEmail, phoneNumber, street1, street2, city, country, userId, createdAt} = req.body;

  try {
    // Insert crew member data into the database using promise-compatible query interface
    const result = await pool
      .promise()
      .query(
        "INSERT INTO clients (client_id, company_name, email, phone_number, street_1, street_2, city, country, user_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [id, companyName, companyEmail, phoneNumber, street1, street2, city, country, userId, createdAt ]
      );

    if (result[0].insertId) {
      res.status(201).json({
        message: "Expense added successfully",
        expenseId: result[0].insertId,
      });
    } else {
      res.status(500).json({ error: "Expense creation failed" });
    }
  } catch (error) {
    console.error("Error during Expense creation:", error);
    res.status(500).json({ error: "Expense creation failed" });
  }
});

module.exports = router;
