const express = require("express");
const mysql = require("mysql2");
const router = express.Router();

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: "kickervideo-db.cpp0rtsplxx9.eu-north-1.rds.amazonaws.com",
  user: "hankis",
  password: "ESYN1dqjY6mIp3kOep8y",
  database: "kickervideo",
  connectionLimit: 10,
});

// Handle budget creation request
router.post("/", async (req, res) => {
  const { client, projectTitle, subtotal, total, budgetId, internalNotes, createdAt, userId, services, status, attachmentsUrl } = req.body;
  console.log(attachmentsUrl)

  try {
    // Insert budget data into the database
    pool.query(
      "INSERT INTO budgets ( budget_id, budget_name, created_at, client_name, project_title, subtotal, total, internal_notes, user_id, status, attachments ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [budgetId, projectTitle, createdAt, client, projectTitle, subtotal, total, internalNotes, userId, status, attachmentsUrl],
      async (error, results) => {
        if (error) {
          console.error("Error during budget creation:", error);
          res.status(500).json({ error: "Budget creation failed" });
        } else {
          if (results && results.insertId) {
            const budgetId = results.budget_id;
            
            // Insert services into the services table
            const serviceInsertPromises = services.map(async service => {
              return new Promise((resolve, reject) => {
                pool.query(
                  "INSERT INTO services (service_name, budget_id, description, crew, cost, markup, unit_price, quantity) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                  [service.name, budgetId, service.description, service.crew, service.cost, service.markup, service.unitPrice, service.quantity, budgetId],
                  (error, serviceResults) => {
                    if (error) {
                      reject(error);
                    } else {
                      resolve(serviceResults);
                    }
                  }
                );
              });
            });
            
            await Promise.all(serviceInsertPromises);
            
            res.status(200).json({
              message: "Budget and services creation successful",
              budgetId: budgetId,
              client: client,
            });
          } else {
            console.error(
              "No insertId found in the database results:",
              results
            );
            res.status(500).json({ error: "Budget creation failed" });
          }
        }
      }
    );
  } catch (error) {
    console.error("Error during budget creation:", error);
    res.status(500).json({ error: "Budget creation failed" });
  }
});

module.exports = router;
