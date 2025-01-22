const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Define a port (default to 5000 if not defined in .env)
const PORT = process.env.PORT || 5000;

// MongoDB connection
const uri = process.env.MONGO_URI; // Make sure to set this in your .env file
if (!uri) {
    console.error('MongoDB connection string (MONGO_URI) is not defined in .env');
    process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));


// Define a test route
app.get('/', (req, res) => {
    res.send('Backend server is running!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
