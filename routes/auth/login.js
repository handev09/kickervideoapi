const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const router = express.Router();

const pool = mysql.createPool({
  host: "kickervideo-db.cpp0rtsplxx9.eu-north-1.rds.amazonaws.com",
  user: "hankis",
  password: "ESYN1dqjY6mIp3kOep8y",
  database: "kickervideo",
  connectionLimit: 10,
});

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (error, results) => {
        if (error) {
          console.error("Error during login:", error);
          res.status(500).json({ error: "Login failed" });
        } else {
          if (results.length > 0) {
            const user = results[0];

            const passwordsMatch = await bcrypt.compare(
              password,
              user.password
            );

            if (passwordsMatch) {
              // Calculate the daysLeft
              const subEndDate = new Date(user.sub_end);
              const currentDate = new Date();
              const timeDifference = subEndDate - currentDate;
              const daysLeft = Math.max(Math.ceil(timeDifference / (1000 * 60 * 60 * 24)), 0);

              // Define the response object
              const response = {
                message: "Login successful",
                userId: user.user_id,
                name: user.name,
                userNum: user.id,
                email: user.email,
                daysLeft,
              };

              // Update the paid field based on the daysLeft
              if (daysLeft <= 0) {
                // Subscription expired
                response.isPaid = false;
                pool.query(
                  "UPDATE users SET paid = 0 WHERE user_id = ?",
                  [user.user_id],
                  (updateError, updateResults) => {
                    if (updateError) {
                      console.error("Error updating paid field:", updateError);
                    }
                  }
                );
              } else {
                response.isPaid = true;
              }

              res.status(200).json(response);
            } else {
              res.status(401).json({ error: "Invalid credentials" });
            }
          } else {
            res.status(401).json({ error: "Invalid credentials" });
          }
        }
      }
    );
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;
