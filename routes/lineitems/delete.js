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

// Delete Expense
router.delete("/:itemId", async (req, res) => {
  const itemId = req.params.itemId;

  try {
    // Delete expense with the specified ID from the database
    const result = await pool
      .promise()
      .query("DELETE FROM items WHERE item_id = ?", [itemId]);

    if (result[0].affectedRows > 0) {
      res.status(200).json({
        message: "Item deleted successfully",
      });
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  } catch (error) {
    console.error("Error during Item deletion:", error);
    res.status(500).json({ error: "Item deletion failed" });
  }
});

module.exports = router;
