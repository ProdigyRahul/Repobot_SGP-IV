const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const { OpenAI } = require("openai");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));


const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


let Octokit;
(async () => {
  const { Octokit: OctokitModule } = await import("@octokit/rest");
  Octokit = OctokitModule;
})();


app.get("/api/github/summary", async (req, res) => {
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

    const files = response.data.map((file) => file.name).join(", ");


    const prompt = `
    Given the following repository: **${owner}/${repo}**, analyze the files and provide a summary of what has already been implemented and what might be missing. 

    The repository contains these files: **${files}**.

    Generate a summary in the following format:
    - ✅ **Completed Work**
    - 🚀 **Pending Work**
    - 🛠 **Suggested Next Steps**
    `;

    const chatResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: prompt }],
      max_tokens: 300,
    });

    res.json({ summary: chatResponse.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

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
