const express = require("express");
const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sendMail = require("../utils/mailer");
const passport = require("passport");

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

// Signup with email and password
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, confirmPassword, phone, photoURL } = req.body;

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
      photoURL: photoURL || null,
    });

    if (user) {
      const token = generateToken(user._id);
      
      res.status(201).json({
        id: user._id,
        name: user.name,
        email: user.email,
        photoURL: user.photoURL,
        token,
        message: "User created successfully",
      });
    }
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error during signup." });
  }
});

// Login with email and password
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    
    // Generate JWT token
    const token = generateToken(user._id);
    
    // Send success response with photoURL
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      photoURL: user.photoURL || null,
      token,
      message: "Login successful",
    });
    
    // Optional: Send login notification email
    const subject = "Login Successful!";
    const text = `Hello ${user.name},\n\nYou have successfully logged into your account.\nIf this wasn't you, please contact support immediately.`;

    sendMail(user.email, subject, text)
      .then(() => console.log("Login email sent successfully"))
      .catch((err) => console.error("Error sending email:", err.message));
  })(req, res, next);
});

// Google OAuth login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:5173/login" }),
  (req, res) => {
    // Generate JWT token
    const token = generateToken(req.user._id);
    
    // Redirect to frontend with token
    res.redirect(`http://localhost:5173/auth/success?token=${token}`);
  }
);

// GitHub OAuth login
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

// GitHub OAuth callback
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "http://localhost:5173/login" }),
  (req, res) => {
    // Generate JWT token
    const token = generateToken(req.user._id);
    
    // Redirect to frontend with token
    res.redirect(`http://localhost:5173/auth/success?token=${token}`);
  }
);

// Get current user info
router.get("/user", async (req, res) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user by id
    const user = await User.findById(decoded.id).select("-password");
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Return user data including photoURL
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      photoURL: user.photoURL || null,
      phone: user.phone || null,
    });
  } catch (error) {
    console.error("Auth error:", error);
    res.status(401).json({ message: "Token is not valid" });
  }
});

// Logout
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Error during logout" });
    }
    res.json({ message: "Logged out successfully" });
  });
});

module.exports = router;
