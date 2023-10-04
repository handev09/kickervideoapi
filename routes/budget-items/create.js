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
  const { id, contactName, contactEmail, phoneNumber,userId,companyName,companyId, createdAt, role} = req.body;

  try {
    // Insert crew member data into the database using promise-compatible query interface
    const result = await pool
      .promise()
      .query(
        "INSERT INTO contacts (contact_id, contact_name, contact_email, phone_number, user_id, company_name, company_id, created_at, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [id, contactName, contactEmail, phoneNumber,userId,companyName,companyId, createdAt,role]
      );

    if (result[0].insertId) {
      res.status(201).json({
        message: "Contact added successfully",
        contactId: result[0].insertId,
      });
    } else {
      res.status(500).json({ error: "Contact creation failed" });
    }
  } catch (error) {
    console.error("Error during Contact creation:", error);
    res.status(500).json({ error: "Contact creation failed" });
  }
});

module.exports = router;
