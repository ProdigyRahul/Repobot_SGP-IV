import React from "react";
import { motion } from "framer-motion";

const ErrorMessage = ({ message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-error-light dark:bg-error-dark border border-error-border-light dark:border-error-border-dark text-error-text-light dark:text-error-text-dark px-4 py-2 rounded-lg text-sm md:text-base w-full max-w-md mx-auto"
    >
      {message}
    </motion.div>
  );
};

export default ErrorMessage;