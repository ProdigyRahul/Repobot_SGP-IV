import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [question, setQuestion] = useState(
    "Which file should I edit to change the home page?"
  );

  return (
    <div className="flex h-screen bg-[#441752]">
      {/* Left Sidebar - Updated to use bg-[#441752] */}
      <motion.div
        className="w-64 bg-[#441752] text-white flex flex-col"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-8">
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
            <h3 className="text-xs uppercase text-[#A888B5] font-medium mb-2">
              Application
            </h3>
            <motion.div
              className="flex items-center space-x-3 p-3 bg-[#A888B5]/20 rounded-md"
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
                className="flex items-center space-x-3 p-3 hover:bg-[#A888B5]/20 rounded-md"
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
                    d="M8 10H16M8 14H12M12 20H6C4.89543 20 4 19.1046 4 18V6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span>Q&A</span>
              </motion.div>
            </Link>

            <motion.div
              className="flex items-center space-x-3 p-3 hover:bg-[#A888B5]/20 rounded-md"
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
              <span>Meetings</span>
            </motion.div>

            <motion.div
              className="flex items-center space-x-3 p-3 hover:bg-[#A888B5]/20 rounded-md"
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
              <span>speech-text</span>
            </motion.div>
          </div>

          <div className="space-y-1 mb-6">
            <h3 className="text-xs uppercase text-[#A888B5] font-medium mb-2">
              Your Projects
            </h3>

            {[
              "Normal Human",
              "normalhumanv2",
              "Docker Py",
              "Docker Gen AI",
              "ChatPDF",
            ].map((project, index) => (
              <motion.div
                key={index}
                className={`flex items-center space-x-3 p-3 rounded-md ${
                  index === 3 ? "bg-[#A888B5]/20" : "hover:bg-[#A888B5]/20"
                }`}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="w-6 h-6 flex items-center justify-center bg-[#A888B5]/30 rounded">
                  <span className="text-xs">{project.charAt(0)}</span>
                </div>
                <span>{project}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="flex items-center space-x-2 p-3 hover:bg-[#A888B5]/20 rounded-md"
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

      {/* Main Content - White background */}
      <div className="flex-1 bg-white overflow-auto">
        <motion.div
          className="max-w-7xl mx-auto p-8"
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
              <svg
                className="absolute left-3 top-3 h-5 w-5 text-gray-400"
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
              <input
                type="text"
                placeholder="Search for projects, people, code..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#441752] focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>

          {/* Repository Link */}
          <motion.div
            className="mb-8 flex items-center text-gray-600"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <svg
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
            <span>This project is linked to </span>
            <a
              href="https://github.com/Manikantkr-1004/RecipeSwap.git"
              className="text-[#441752] ml-1 flex items-center"
            >
              https://github.com/Manikantkr-1004/RecipeSwap.git
              <svg
                className="h-4 w-4 ml-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
              </svg>
            </a>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Ask a Question Section */}
            <motion.div
              className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-1 text-gray-800">
                  Ask a question
                </h2>
                <p className="text-gray-500 mb-4">
                  Repobot has knowledge of the codebase
                </p>

                <div className="mb-4">
                  <textarea
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#441752] focus:border-transparent"
                    rows="4"
                    placeholder="Type your question here..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                  ></textarea>
                </div>

                <motion.button
                  className="bg-[#441752] hover:bg-[#A888B5] text-white px-6 py-2 rounded-lg flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Ask Repobot!</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Right Column - Meeting Section */}
            <motion.div
              className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="p-6 flex flex-col items-center justify-center text-center">
                <motion.div
                  className="w-16 h-16 mb-4 text-[#441752]"
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

                <h2 className="text-xl font-semibold mb-1 text-gray-800">
                  Create a new meeting
                </h2>
                <p className="text-gray-500 mb-6">
                  Analyse your meeting with Dionysius.
                  <br />
                  Powered by AI.
                </p>

                <motion.button
                  className="bg-white border border-[#441752] text-[#441752] hover:bg-[#A888B5]/10 px-6 py-2 rounded-lg flex items-center space-x-2"
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
                  <span>Upload Meeting</span>
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