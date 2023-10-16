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
  const { id, name, description, reimburse, job, cost, userId, createdAt, createdBy, status, receipt,budgetNumber} = req.body;

  try {
    // Insert crew member data into the database using promise-compatible query interface
    const result = await pool
      .promise()
      .query(
        "INSERT INTO expenses (expense_id, expense_name, description, reimburse, job, cost, user_id, created_at, createdBy, status, receipts,budget_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)",
        [id, name, description, reimburse, job, cost, userId, createdAt, createdBy, status, receipt,budgetNumber]
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
