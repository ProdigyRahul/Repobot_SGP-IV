import React from "react";
import { motion } from "framer-motion";

const SuccessMessage = ({ message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-lg text-sm"
    >
      {message}
    </motion.div>
  );
};

export default SuccessMessage;
