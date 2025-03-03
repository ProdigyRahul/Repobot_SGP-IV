import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../../assets/Logo.png";
import Navbar from "../../../components/Navbar/Navbar";

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is RepoBot?",
      answer:
        "RepoBot is an intelligent platform that helps developers manage and analyze their code repositories effectively. It provides automated insights, code quality checks, and collaboration tools.",
    },
    {
      question: "How do I get started with RepoBot?",
      answer:
        "Getting started is easy! Simply sign up for an account, connect your repositories, and RepoBot will automatically begin analyzing your code and providing insights. Our onboarding process will guide you through each step.",
    },
    {
      question: "What programming languages does RepoBot support?",
      answer:
        "RepoBot supports all major programming languages including JavaScript, Python, Java, C++, Ruby, Go, and many more. We're constantly adding support for new languages based on user feedback.",
    },
    {
      question: "Is RepoBot free to use?",
      answer:
        "RepoBot offers both free and premium plans. Our free tier includes basic repository analysis and insights, while premium plans offer advanced features like custom reporting, team collaboration tools, and priority support.",
    },
    {
      question: "How secure is my code with RepoBot?",
      answer:
        "Security is our top priority. We use industry-standard encryption, regular security audits, and strict access controls to ensure your code remains private and secure. We never store your source code permanently.",
    },
    {
      question: "Can I use RepoBot with my team?",
      answer:
        "Yes! RepoBot offers team collaboration features that allow you to share insights, manage permissions, and work together effectively. Team plans are available for organizations of all sizes.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl font-bold text-[#441752] mb-6"
            >
              Frequently Asked Questions
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-600"
            >
              Find answers to common questions about RepoBot. Can't find what
              you're looking for?{" "}
              <a href="/contact" className="text-[#441752] hover:underline">
                Contact us
              </a>
              .
            </motion.p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="text-lg font-semibold text-[#441752]">
                    {faq.question}
                  </h3>
                  <span className="text-2xl text-[#441752]">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 py-4 bg-gray-50"
                    >
                      <p className="text-gray-600">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-600 mb-6"
            >
              Still have questions? We're here to help!
            </motion.p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-[#441752] text-white px-6 py-3 rounded-md hover:bg-[#A888B5] transition-colors"
            >
              Contact Support
            </motion.a>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQPage;
