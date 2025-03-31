import React from "react";
import { motion } from "framer-motion";

const SuccessMessage = ({ message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-success-light dark:bg-success-dark border border-success-border-light dark:border-success-border-dark text-success-text-light dark:text-success-text-dark px-4 py-2 rounded-lg text-sm md:text-base w-full max-w-md mx-auto"
    >
      {message}
    </motion.div>
  );
};

export default SuccessMessage;
