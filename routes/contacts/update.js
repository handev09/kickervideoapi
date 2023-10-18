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

router.put("/:contactId", async (req, res) => {
  const contactId = req.params.contactId;
  const {
    contactName,
    contactEmail,
    phoneNumber,
    userId,
    companyName,
    companyId,
    createdAt,
    role,
  } = req.body;

  try {
    // Update item data in the database using promise-compatible query interface
    const result = await pool
      .promise()
      .query(
        "UPDATE contacts SET contact_name=?, contact_email=?, phone_number=?, user_id=?, company_name=?, company_id=?, created_at=?, role=? WHERE contact_id=?",
        [
          contactName,
          contactEmail,
          phoneNumber,
          userId,
          companyName,
          companyId,
          createdAt,
          role,
          contactId,
        ]
      );

    if (result[0].affectedRows > 0) {
      res.status(200).json({ message: " Contact updated successfully" });
    } else {
      res.status(404).json({ error: " Contact not found" });
    }
  } catch (error) {
    console.error("Error during   Contact update:", error);
    res.status(500).json({ error: " Contact update failed" });
  }
});

module.exports = router;
