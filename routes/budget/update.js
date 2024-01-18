const express = require("express");
const mysql = require("mysql2/promise");
const router = express.Router();

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: "kickervideo-db.cpp0rtsplxx9.eu-north-1.rds.amazonaws.com",
  user: "hankis",
  password: "ESYN1dqjY6mIp3kOep8y",
  database: "kickervideo",
  connectionLimit: 10,
});

// Handle budget update request
router.put("/:budgetId", async (req, res) => {
  const budgetId = req.params.budgetId;
  const {
    client,
    projectTitle,
    subtotal,
    total,
    internalNotes,
    userId,
    status,
    attachmentsUrl,
    budgetNumber,
    clientName,
    serviceData,
    tax,
    discount,
  } = req.body;

  try {
    // Update budget data in the database
    await pool.query(
      "UPDATE budgets SET budget_name=?, created_at=?, client_name=?, project_title=?, subtotal=?, total=?, internal_notes=?, user_id=?, status=?, attachments=?, budget_numb=?, company_client=?, tax=?, discount=? WHERE budget_id=?",
      [
        projectTitle,
        new Date(),
        clientName,
        projectTitle,
        subtotal,
        total,
        internalNotes,
        userId,
        status,
        attachmentsUrl,
        budgetNumber,
        clientName,
        tax,
        discount,
        budgetId,
      ]
    );

    // Update existing services and insert new services into the services table
    for (const service of serviceData) {
      console.log(service.id)
      const [selectResults] = await pool.query(
        "SELECT * FROM budgetItems WHERE item_id=?",
        [service.id]
      );
      console.log(selectResults.length)

      if (selectResults.length > 0) {
        // If the item already exists, update it
        await pool.query(
          "UPDATE budgetItems SET item_name=?, budget_id=?, item_description=?, item_rate=?, item_cost=?, item_markup=?, item_unitPrice=?, item_quantity=?, user_id=?, created_at=? WHERE item_id=?",
          [
            service.name,
            service.budgetId,
            service.description,
            service.item_rate,
            service.cost,
            service.markup,
            service.unitPrice,
            service.quantity,
            service.userId,
            service.createdAt,
            service.id,
          ]
        );
      } else {
        // If the item doesn't exist, insert a new one
        console.log("Executing else Block");
        await pool.query(
          "INSERT INTO budgetItems (item_id, item_name, budget_id, item_description, item_rate, item_cost, item_markup, item_unitPrice, item_quantity, user_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            service.id,
            service.name,
            service.budgetId,
            service.description,
            service.item_rate,
            service.cost,
            service.markup,
            service.unitPrice,
            service.quantity,
            service.userId,
            service.createdAt,
          ]
        );
      }
    }

    res.status(200).json({
      message: "Budget and items update successful",
      budgetId: budgetId,
      client: client,
    });
  } catch (error) {
    console.error("Error during budget update:", error);
    res.status(500).json({ error: "Budget update failed" });
  }
});

module.exports = router;
