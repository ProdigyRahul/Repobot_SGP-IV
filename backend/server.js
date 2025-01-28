const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");


dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Dynamically Import Octokit for GitHub API
let Octokit;
(async () => {
  const { Octokit: OctokitModule } = await import("@octokit/rest");
  Octokit = OctokitModule;
})();

// GitHub API Route - Fetch Repository Contents
app.get("/api/github/repos", async (req, res) => {
  if (!Octokit) {
    return res.status(500).json({ error: "GitHub API is not initialized yet. Try again later." });
  }

  const { owner, repo } = req.query;
  if (!owner || !repo) {
    return res.status(400).json({ error: "Owner and repository name are required" });
  }

  try {
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

    const response = await octokit.repos.getContent({ owner, repo, path: "" });

    const files = response.data.map((file) => ({
      name: file.name,
      path: file.path,
      type: file.type,
      download_url: file.download_url,
    }));

    res.json({ repository: `${owner}/${repo}`, files });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
