import React from "react";
import { motion } from "framer-motion";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-background-light to-purple-50 dark:from-background-dark dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="text-center mb-12 md:mb-16">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-5xl font-bold text-primary-light dark:text-primary-dark mb-4 md:mb-6"
            >
              About RepoBot
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base md:text-xl text-muted-light dark:text-muted-dark max-w-3xl mx-auto"
            >
              We're revolutionizing Git repository management with advanced AI
              technology, making code optimization and analysis more efficient
              than ever before.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-background-light dark:bg-background-dark p-6 md:p-8 rounded-lg shadow-md dark:shadow-lg"
            >
              <h2 className="text-xl md:text-2xl font-bold text-primary-light dark:text-primary-dark mb-4">
                Our Mission
              </h2>
              <p className="text-muted-light dark:text-muted-dark">
                By utilizing state-of-the-art AI technology, RepoBot seeks to
                revolutionize the way developers engage with their Git
                repositories. We are committed to improving the intelligence,
                efficiency, and intuitiveness of repository administration.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-background-light dark:bg-background-dark p-6 md:p-8 rounded-lg shadow-md dark:shadow-lg"
            >
              <h2 className="text-xl md:text-2xl font-bold text-primary-light dark:text-primary-dark mb-4">
                Our Vision
              </h2>
              <p className="text-muted-light dark:text-muted-dark">
                Our technology manages the intricacy of repositories, allowing
                teams to concentrate on innovation in a future where AI-powered
                tools seamlessly interact with development workflows.
              </p>
            </motion.div>
          </div>

          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-light dark:text-primary-dark mb-6 md:mb-8">
              Our Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  role: "Priyansi Borda",
                  description:
                    "Backend Developer and ML Engineer working on OpenAI API integration.",
                },
                {
                  role: "Melita Castelino",
                  description:
                    "Working on GitHub API integration, Backend Development and ML Engineer.",
                },
                {
                  role: "Hasti Babaria",
                  description:
                    "Frontend Developer, UI/UX Designer and ML Engineer",
                },
              ].map((team, index) => (
                <motion.div
                  key={team.role}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="bg-background-light dark:bg-background-dark p-6 rounded-lg shadow-md dark:shadow-lg"
                >
                  <h3 className="text-lg md:text-xl font-bold text-primary-light dark:text-primary-dark mb-3">
                    {team.role}
                  </h3>
                  <p className="text-muted-light dark:text-muted-dark text-sm md:text-base">
                    {team.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="text-center bg-primary-light dark:bg-primary-dark text-white py-8 md:py-12 px-4 md:px-6 rounded-lg">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Transform Your Git Workflow?
            </h2>
            <p className="mb-6 md:mb-8 text-sm md:text-lg">
              Join thousands of developers who are already using RepoBot to
              optimize their repositories.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-background-light dark:bg-background-dark text-primary-light dark:text-primary-dark px-6 py-3 rounded-md hover:bg-opacity-90"
              >
                Get Started
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-background-light dark:border-background-dark px-6 py-3 rounded-md hover:bg-white/10"
              >
                Learn More
              </motion.button>
            </div>
          </div>
        </div>
      
      </div>
    </>
  );
};

export default AboutPage;
