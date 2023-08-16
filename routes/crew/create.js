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
    } = req.body;
  
    try {
      // Insert crew member data into the database using promise-compatible query interface
      const result = await pool.promise().query(
        "INSERT INTO crew_members (name, phone_number, email, address, street, state, city, zip, role, contrat_type, cost, markup, unitPrice) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
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
        ]
      );
  
      if (result[0].insertId) {
        res.status(201).json({
          message: "Crew member added successfully",
          crewMemberId: result[0].insertId,
        });
      } else {
        res.status(500).json({ error: "Crew member creation failed" });
      }
    } catch (error) {
      console.error("Error during crew member creation:", error);
      res.status(500).json({ error: "Crew member creation failed" });
    }
  });
  

module.exports = router;


