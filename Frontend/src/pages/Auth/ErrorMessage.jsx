import React from "react";
import { motion } from "framer-motion";

const ErrorMessage = ({ message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg text-sm"
    >
      {message}
    </motion.div>
  );
};

export default ErrorMessage;