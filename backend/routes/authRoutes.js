
const express = require("express");
const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sendMail = require("../utils/mailer"); 

const router = express.Router();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;


    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists." });
    }

    const user = await User.create({
      name,
      email,
      password,
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

// Login (POST)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
 
      const token = generateToken(user._id);

      const subject = "Login Successful!";
      const text = `Hello ${user.name},\n\nYou have successfully logged into your account.\nIf this wasn't you, please contact support immediately.`;
      await sendMail(user.email, subject, text); 

      res.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email,
        token,
        message: "Login successful",
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
