

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
  const {
    id,
    companyName,
    companyEmail,
    phoneNumber,
    street1,
    street2,
    city,
    country,
    userId,
    createdAt,
    prId,
    prName,
    prPhone,
    prRole,
    prEmail,
    isPrimary,
  } = req.body;

  try {
    // Insert client data into the database
    const clientResult = await pool
      .promise()
      .query(
        "INSERT INTO clients (client_id, company_name, email, phone_number, street_1, street_2, city, country, user_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          id,
          companyName,
          companyEmail,
          phoneNumber,
          street1,
          street2,
          city,
          country,
          userId,
          createdAt,
        ]
      );

    // Check if the client data insertion was successful
    if (clientResult[0].insertId) {
      // Insert contact data into the database
      const contactResult = await pool
        .promise()
        .query(
          "INSERT INTO contacts (contact_id, contact_name, contact_email, phone_number, user_id, company_name, company_id, created_at, role,isPrimary) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)",
          [
            prId,
            prName,
            prEmail,
            prPhone,
            userId,
            companyName,
            id,
            createdAt,
            prRole,
            isPrimary,
          ]
        );

      if (contactResult[0].insertId) {
        res.status(201).json({
          message: "Client and contact added successfully",
          clientId: clientResult[0].insertId,
          contactId: contactResult[0].insertId,
        });
      } else {
        res.status(500).json({ error: "Contact creation failed" });
      }
    } else {
      res.status(500).json({ error: "Client creation failed" });
    }
  } catch (error) {
    console.error("Error during client and contact creation:", error);
    res.status(500).json({ error: "Client and contact creation failed" });
  }
});

module.exports = router;
