const express = require("express");
const mysql = require("mysql");
const router = express.Router();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Route handler for login POST requests
router.post("/", (req, res) => {
  const { username, password } = req.body;

  // Query the database to check login credentials
  const sql = "SELECT * FROM students WHERE username = ? AND password = ?";
  db.query(sql, [username, password], (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // If login is successful, redirect to index.html
    res.redirect("/");
  });
});

module.exports = router;
