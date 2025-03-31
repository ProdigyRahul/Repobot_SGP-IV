import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-bold text-[#441752] mb-6"
        >
          Transform Your Git Repo with{" "}
          <span className="text-[#A888B5]">AI</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-[#441752]/70 max-w-2xl mx-auto mb-8"
        >
          Get expert guidance powered by RepoBot, specializing in GitHub project
          analysis, repository management, and code optimization. Start your
          journey today!
        </motion.p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/signup"
              className="bg-[#441752] text-white px-8 py-3 rounded-lg hover:bg-[#A888B5]/90 flex items-center justify-center transition-colors"
            >
              Get Started
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border-2 border-[#441752] text-[#441752] px-8 py-3 rounded-lg hover:bg-[#441752]/5 transition-colors"
          >
            Learn More
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
