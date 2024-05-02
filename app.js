// Import necessary modules
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables
dotenv.config();

// Create an Express application
const app = express();

// Set up port number
const port = process.env.PORT || 4321;

// Import route handlers
const students = require("./api/students");
const login = require("./api/login");
const register = require("./api/register"); // Add registration route handler

// Middleware
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use("/api/students", students);
app.use("/api/login", login);
app.use("/api/register", register); // Use registration route handler

// Default route
app.get("/", (req, res) => {
  res.render("index.html");
});

// Login route
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// Register route
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "register.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
