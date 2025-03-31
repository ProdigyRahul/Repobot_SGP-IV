import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import BackButton from "../../UI/BackButton";
import axios from "axios";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [question, setQuestion] = useState(
    "Which file should I edit to change the home page?"
  );

  const handleAnalyze = async () => {
    if (!owner || !repo) {
      setError("Please enter both owner and repository name");
      return;
    }

    setIsLoading(true);
    setError("");
    setSummary(""); // Clear previous summary

    try {
      console.log("Sending request to backend..."); // Debug log
      const response = await axios.post(
        "http://127.0.0.1:5000/repo-summarize",
        { owner, repo },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response received:", response.data); // Debug log

      if (response.data.summary) {
        setSummary(response.data.summary);
      } else if (response.data.error) {
        setError(response.data.error);
      }
    } catch (err) {
      console.error("Full error object:", err); // More detailed error logging

      if (err.response) {
        // Server responded with error status
        setError(
          err.response?.data?.error ||
            `Server error: ${err.response.status} ${err.response.statusText}`
        );
      } else if (err.request) {
        // Request was made but no response
        setError("Backend server not responding - is it running?");
      } else {
        // Other errors
        setError(`Request setup error: ${err.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-primary-light dark:bg-primary-dark">
      {/* Mobile Header */}
      <div className="md:hidden p-4 bg-primary-light dark:bg-primary-dark text-text-dark dark:text-text-light flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 24 24"
          >
            <path fill="currentColor" d="M12 3L2 12h3v8h14v-8h3L12 3z" />
          </svg>
          <h1 className="text-xl font-semibold">Repobot</h1>
        </div>
      </div>

      {/* Left Sidebar */}
      <motion.div
        className="w-full md:w-64 bg-primary-light dark:bg-primary-dark text-text-dark dark:text-text-light flex flex-col"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-6">
          <div className="hidden md:flex items-center space-x-2 mb-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 24 24"
            >
              <path fill="currentColor" d="M12 3L2 12h3v8h14v-8h3L12 3z" />
            </svg>
            <h1 className="text-xl font-semibold">Repobot</h1>
          </div>

          <div className="space-y-1 mb-8">
            <h3 className="text-xs uppercase text-accent-light dark:text-accent-dark font-medium mb-2">
              Application
            </h3>

            <motion.div
              className="flex items-center space-x-3 p-3 bg-accent-light/20 dark:bg-accent-dark/20 rounded-md"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path d="M3 9H21" stroke="currentColor" strokeWidth="2" />
              </svg>
              <span>Dashboard</span>
            </motion.div>

            <Link to="/dashboard/repobot">
              <motion.div
                className="flex items-center space-x-3 p-3 hover:bg-accent-light/20 dark:hover:bg-accent-dark/20 rounded-md"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 10H16M8 14H12M17 15H18M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span>Q&A</span>
              </motion.div>
            </Link>

            <Link to="/filesummarization">
              <motion.div
                className="flex items-center space-x-3 p-3 hover:bg-accent-light/20 dark:hover:bg-accent-dark/20 rounded-md"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 8L12 13L7 8M5 17H19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Files Summarization</span>
              </motion.div>
            </Link>

            <Link to="/dashboard/speech-text">
              <motion.div
                className="flex items-center space-x-3 p-3 hover:bg-accent-light/20 dark:hover:bg-accent-dark/20 rounded-md"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 10H21M7 15H8M12 15H13M17 15H18M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span>Speech-Text</span>
              </motion.div>
            </Link>
          </div>

          <div className="space-y-1 mb-6">
            <h3 className="text-xs uppercase text-accent-light dark:text-accent-dark font-medium mb-2">
              Your Projects
            </h3>

            {[
              "CureNest",
              "Pose Estimation",
              "U-Net and V-Net",
              "Stress Level Detection",
              "RecipeSwap",
            ].map((project, index) => (
              <motion.div
                key={index}
                className={`flex items-center space-x-3 p-3 rounded-md ${
                  index === 3
                    ? "bg-accent-light/20 dark:bg-accent-dark/20"
                    : "hover:bg-accent-light/20 dark:hover:bg-accent-dark/20"
                }`}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="w-6 h-6 flex items-center justify-center bg-accent-light/30 dark:bg-accent-dark/30 rounded">
                  <span className="text-xs">{project.charAt(0)}</span>
                </div>
                <span>{project}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="flex items-center space-x-2 p-3 hover:bg-accent-light/20 dark:hover:bg-accent-dark/20 rounded-md"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4V20M4 12H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span>Create Project</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 bg-background-light dark:bg-background-dark overflow-auto">
        <BackButton />
        <motion.div
          className="max-w-7xl mx-auto p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Search Bar */}
          <motion.div
            className="mb-8"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search for projects, people, code..."
                className="pl-10 pr-4 py-2 w-full border border-border-light dark:border-border-dark rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg
                className="absolute left-3 top-3 h-5 w-5 text-muted-light dark:text-muted-dark"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* Ask a Question Section */}
            <motion.div
              className="bg-background-light dark:bg-background-dark rounded-xl border border-border-light dark:border-border-dark shadow-sm"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-1 text-text-light dark:text-text-dark">
                  Analyze a Repository
                </h2>
                <p className="text-muted-light dark:text-muted-dark mb-4">
                  Enter GitHub owner and repository name to analyze
                </p>

                <div className="space-y-4 mb-4">
                  <div>
                    <label
                      htmlFor="owner"
                      className="block text-sm font-medium text-text-light dark:text-text-dark mb-1"
                    >
                      Owner/Organization
                    </label>
                    <input
                      id="owner"
                      type="text"
                      className="w-full p-3 border border-border-light dark:border-border-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark"
                      placeholder="e.g. facebook"
                      value={owner}
                      onChange={(e) => setOwner(e.target.value)}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="repo"
                      className="block text-sm font-medium text-text-light dark:text-text-dark mb-1"
                    >
                      Repository Name
                    </label>
                    <input
                      id="repo"
                      type="text"
                      className="w-full p-3 border border-border-light dark:border-border-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark"
                      placeholder="e.g. react"
                      value={repo}
                      onChange={(e) => setRepo(e.target.value)}
                    />
                  </div>
                </div>
                {summary && (
                  <div className="mt-6 p-4 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-lg">
                    <h3 className="font-medium mb-2 text-text-light dark:text-text-dark">
                      Repository Summary
                    </h3>
                    <div className="text-muted-light dark:text-muted-dark whitespace-pre-wrap">
                      {summary}
                    </div>
                  </div>
                )}

                {error && (
                  <div className="mb-4 text-red-500 text-sm">{error}</div>
                )}

                <motion.button
                  className="bg-primary-light dark:bg-primary-dark text-text-dark dark:text-text-light hover:bg-accent-light dark:hover:bg-accent-dark px-6 py-3 rounded-lg flex items-center space-x-2 w-full justify-center disabled:opacity-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAnalyze}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Analyzing...
                    </>
                  ) : (
                    "Analyze Repository"
                  )}
                </motion.button>
              </div>
            </motion.div>

            {/* New Chat Section */}
            <motion.div
              className="bg-background-light dark:bg-background-dark rounded-xl border border-border-light dark:border-border-dark shadow-sm"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="p-6 flex flex-col items-center justify-center text-center">
                <motion.div
                  className="w-16 h-16 mb-4 text-primary-light dark:text-primary-dark"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: 360 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.6,
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="2"
                      y="4"
                      width="20"
                      height="15"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M8 2V4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M16 2V4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path d="M2 8H22" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </motion.div>

                <h2 className="text-xl font-semibold mb-1 text-text-light dark:text-text-dark">
                  Create a new Chat
                </h2>
                <p className="text-muted-light dark:text-muted-dark mb-6">
                  Analyze your meeting with Repobot.
                  <br />
                  Powered by AI.
                </p>

                <motion.button
                  className="bg-background-light dark:bg-background-dark border border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark hover:bg-accent-light/10 dark:hover:bg-accent-dark/10 px-6 py-2 rounded-lg flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 16L4 17C4 18.6569 5.34315 20 7 20L17 20C18.6569 20 20 18.6569 20 17L20 16M16 12L12 16M12 16L8 12M12 16L12 4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Upload File</span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
