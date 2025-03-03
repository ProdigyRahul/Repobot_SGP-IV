import React from "react";
import { motion } from "framer-motion";
import logo from "../../assets/logo.png";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";

const ContactPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl font-bold text-[#441752] mb-6"
            >
              Get in Touch
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Have questions about RepoBot? We're here to help! Reach out to our
              team and we'll get back to you as soon as possible.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <h2 className="text-2xl font-bold text-[#441752] mb-6">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="name" className="block text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A888B5]"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="email" className="block text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A888B5]"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A888B5]"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A888B5]"
                    required
                  ></textarea>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full bg-[#441752] text-white px-6 py-3 rounded-md hover:bg-[#A888B5] transition-colors"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-[#441752] mb-6">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-[#441752]">Email</h3>
                    <p className="text-gray-600">support@repobot.com</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#441752]">Phone</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#441752]">Address</h3>
                    <p className="text-gray-600">
                      123 Tech Street
                      <br />
                      Anand, Gujarat
                      <br />
                      India
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-[#441752] mb-6">
                  Business Hours
                </h2>
                <div className="space-y-2">
                  <p className="text-gray-600">
                    <span className="font-semibold">Monday - Friday:</span>
                    <br />
                    9:00 AM - 6:00 PM (IST)
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Saturday - Sunday:</span>
                    <br />
                    Closed
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="text-center bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-[#441752] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 mb-6">
              Check out our{" "}
              <a href="/faq" className="text-[#441752] hover:underline">
                FAQ page
              </a>{" "}
              for quick answers to common questions.
            </p>
            <a href="/faqs">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#441752] text-white px-6 py-3 rounded-md hover:bg-[#A888B5] transition-colors"
              >
                View FAQs
              </motion.button>
            </a>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ContactPage;
