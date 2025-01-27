const express = require("express");
const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const router = express.Router();

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check for existing user
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password, // Password will be hashed by the User model pre-save middleware
      phone
    });

    if (user) {
      res.status(201).json({
        id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
        message: "User created successfully"
      });
    }
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: "Server error during signup." });
  }
});

// Login (Change GET to POST)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    // Find user and check password
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
        message: "Login successful"
      });
    } else {
      res.status(401).json({ message: "Invalid email or password." });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: "Server error during login." });
  }
});


module.exports = router;