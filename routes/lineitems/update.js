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

router.put("/:itemId", async (req, res) => {
  const itemId = req.params.itemId;
  const { name, description, markup, optionValue, cost } = req.body;

  try {
    // Update item data in the database using promise-compatible query interface
    const result = await pool
      .promise()
      .query(
        "UPDATE items SET item_name=?, item_desc=?, markup=?, item_rate=?, cost=? WHERE item_id=?",
        [name, description, markup, optionValue, cost, itemId]
      );

    if (result[0].affectedRows > 0) {
      res.status(200).json({ message: "Item updated successfully" });
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  } catch (error) {
    console.error("Error during item update:", error);
    res.status(500).json({ error: "Item update failed" });
  }
});

module.exports = router;
