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
// Handle budget edit request
router.put("/:budgetId", async (req, res) => {
  const budgetId = req.params.budgetId;
  const {
    project_title,

    internal_notes,

    status,
  } = req.body;

  try {
    // Update budget data in the database
    pool.query(
      "UPDATE budgets SET budget_name=?,project_title=?,internal_notes=?, status=? WHERE budget_id=?",
      [project_title, project_title, internal_notes, status, budgetId],
      async (error, results) => {
        if (error) {
          console.error("Error during budget update:", error);
          res.status(500).json({ error: "Budget update failed" });
        } else {
          res.status(200).json({
            message: "Budget update successful",
            budgetId: budgetId,
        
          });
        }
      }
    );
  } catch (error) {
    console.error("Error during budget update:", error);
    res.status(500).json({ error: "Budget update failed" });
  }
});

module.exports = router;
