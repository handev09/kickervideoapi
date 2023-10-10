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

// Update a client's data
router.put("/:clientId", async (req, res) => {
  const clientId = req.params.clientId;
  const {
    companyName,
    companyEmail,
    phoneNumber,
    street1,
    street2,
    city,
    country,
    zip,
  } = req.body;

  try {
    // Update client data in the database
    await pool.promise().query(
      "UPDATE clients SET company_name=?, email=?, phone_number=?, street_1=?, street_2=?, city=?, country=?, zip=? WHERE client_id=?",
      [
        companyName,
        companyEmail,
        phoneNumber,
        street1,
        street2,
        city,
        country,
        zip,
        clientId,
      ]
    );

    res.status(200).json({ message: "Client updated successfully" });
  } catch (error) {
    console.error("Error during client update:", error);
    res.status(500).json({ error: "Client update failed" });
  }
});

module.exports = router;
