const express = require("express");
const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sendMail = require("../utils/mailer");

const router = express.Router();

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};



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
    if (name.length < 2 || name.length > 50) {
      return res.status(400).json({
        message: "Name must be between 2 and 50 characters.",
      });
    }

    // Validate email format
    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "Please enter a valid email address.",
      });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match.",
      });
    }

    // Validate password strength
    if (!validatePassword(password)) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      });
    }

    // Validate phone number (optional)
    if (phone) {
      const phoneRegex = /^\+?[\d\s-]{10,}$/;
      if (!phoneRegex.test(phone)) {
        return res.status(400).json({
          message: "Please enter a valid phone number.",
        });
      }
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists." });
    }

    const user = await User.create({
      name,
      email,
      password,
      phone,
    });

    if (user) {
      res.status(201).json({
        id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
        message: "User created successfully",
      });
    }
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error during signup." });
  }
});

// Login 
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Received login request:", email, password);

    if (!email || !password) {
      console.log("Missing email or password");
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email });
    console.log("User found:", user);

    if (!user) {
      console.log("User not found in database");
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isMatch = await user.matchPassword(password);
    console.log("Password match:", isMatch);

    if (!isMatch) {
      console.log("Password does not match");
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = generateToken(user._id);
    console.log("Generated token:", token);


    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token,
      message: "Login successful",
    });


    const subject = "Login Successful!";
    const text = `Hello ${user.name},\n\nYou have successfully logged into your account.\nIf this wasn't you, please contact support immediately.`;

    sendMail(user.email, subject, text)
      .then(() => console.log("Login email sent successfully"))
      .catch((err) => console.error("Error sending email:", err.message));
  } catch (error) {
    console.error("Login error:", error);
    res
      .status(500)
      .json({ message: "Server error during login.", error: error.message });
  }
});

module.exports = router;
