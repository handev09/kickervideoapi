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

router.put("/:crewId", async (req, res) => {
  const crewId = req.params.crewId;
  const {
    fullName,
    phone,
    email,
    address,
    street,
    state,
    city,
    zip,
    role,
    contractType,
    cost,
    markup,
    unitPrice,
    userId,
    profileUrl,
    employmentType
  } = req.body;

  try {
    // Update item data in the database using promise-compatible query interface
    const result = await pool
      .promise()
      .query(
        "UPDATE crew_members SET name=?, phone_number=?, email=?, address=?, street=?, state=?, city=?, zip=?, role=?, contrat_type=?, cost=?, markup=?, unitPrice=?, user_id=?, profileUrl=?, employment_type=? WHERE crew_id=?",
        [
          fullName,
          phone,
          email,
          address,
          street,
          state,
          city,
          zip,
          role,
          contractType,
          cost,
          markup,
          unitPrice,
          userId,
          profileUrl,
          employmentType,
          crewId
        ]
      );

    if (result[0].affectedRows > 0) {
      res.status(200).json({ message: "Crew Member updated successfully" });
    } else {
      res.status(404).json({ error: "Crew Member not found" });
    }
  } catch (error) {
    console.error("Error during Crew Member update:", error);
    res.status(500).json({ error: "Crew Member update failed" });
  }
});

module.exports = router;
