import React from "react";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Zap,
  Shield,
  Users,
  ChevronRight,
  Moon,
  Sun,
} from "lucide-react";
import Feature from "../../pages/Home/Feature";
import About from "../../pages/Home/About";
import Contact from "../../pages/Home/Contact";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import ChatBot from "./Chatbot";

const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
  >
    <div className="w-12 h-12 bg-[#441752]/10 dark:bg-[#A888B5]/20 rounded-lg flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-[#441752] dark:text-[#A888B5]" />
    </div>
    <h3 className="text-xl font-semibold text-[#441752] dark:text-white mb-2">
      {title}
    </h3>
    <p className="text-[#441752]/70 dark:text-white/70">{description}</p>
  </motion.div>
);

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-white to-[#A888B5]/10 dark:from-gray-900 dark:to-gray-800">
        <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-6xl font-bold text-[#441752] dark:text-white mb-6"
              >
                Transform Your Git Repo with{" "}
                <span className="text-[#A888B5]">AI</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-[#441752]/70 dark:text-white/70 max-w-2xl mx-auto mb-8"
              >
                Get expert guidance powered by RepoBot, specializing in GitHub
                project analysis, repository management, and code optimization.
                Start your journey today!
              </motion.p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/repobot"
                  className="bg-[#441752] dark:bg-[#A888B5] text-white px-8 py-3 rounded-lg hover:bg-[#A888B5]/90 dark:hover:bg-[#441752] flex items-center justify-center"
                >
                  Get Started
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Link>
                <button className="border-2 border-[#441752] dark:border-[#A888B5] text-[#441752] dark:text-white px-8 py-3 rounded-lg hover:bg-[#441752]/5 dark:hover:bg-[#A888B5]/20">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-t from-[#A888B5]/10 dark:from-gray-800">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={MessageCircle}
                title="Smart Conversations"
                description="Engage in intelligent conversations with AI that understands your business context."
              />
              <FeatureCard
                icon={Zap}
                title="Quick Results"
                description="Get instant insights and recommendations to drive your business forward."
              />
              <FeatureCard
                icon={Shield}
                title="Secure Platform"
                description="Your data is protected with enterprise-grade security measures."
              />
            </div>
          </div>
        </div>
        <div className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-[#441752] dark:bg-[#A888B5] rounded-2xl p-8 md:p-12"
            >
              <Users className="w-12 h-12 text-white mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                Join thousands of developers already using RepoBot to streamline
                GitHub project analysis and elevate their coding success.
              </p>
              <button className="bg-white text-[#441752] dark:text-[#A888B5] px-8 py-3 rounded-lg hover:bg-white/90">
                Start Free Trial
              </button>
            </motion.div>
          </div>
        </div>
        <Feature />
        <About />
        <Contact />
        {/* <Footer /> */}
        <div className="fixed bottom-4 right-4">
          <ChatBot />
        </div>
      </div>
    </>
  );
};

export default LandingPage;
