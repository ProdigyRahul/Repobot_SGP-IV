// Import required modules
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

// Initialize Express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Define a port (default to 5000 if not defined in .env)
const PORT = process.env.PORT || 5001;

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
