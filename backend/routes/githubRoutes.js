const express = require("express");
const router = express.Router();

let Octokit;
(async () => {
  const { Octokit: OctokitModule } = await import("@octokit/rest");
  Octokit = OctokitModule;
})();

// GitHub API Route
router.get("/repos", async (req, res) => {
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

module.exports = router;
