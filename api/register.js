const express = require("express");
const mysql = require("mysql");
const router = express.Router();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Route handler for register POST requests
router.post("/", (req, res) => {
  const { username, password } = req.body;

  // Check if username already exists in the database
  const checkUsernameQuery = "SELECT * FROM students WHERE username = ?";
  db.query(checkUsernameQuery, [username], (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Insert new user into the database
    const insertUserQuery = "INSERT INTO students (username, password) VALUES (?, ?)";
    db.query(insertUserQuery, [username, password], (err, results) => {
      if (err) {
        console.error("Error inserting user into database:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      // Registration successful
      res.status(200).json({ message: "Registration successful" });
    });
  });
});

module.exports = router;
