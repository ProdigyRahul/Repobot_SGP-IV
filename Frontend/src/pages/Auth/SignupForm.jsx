import React from "react";
import { motion } from "framer-motion";
import SignupFields from "./SignupFields";

const SignupForm = ({ formData, handleChange, handleSubmit, isLoading }) => {
  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-4"
      onSubmit={handleSubmit}
    >
      <SignupFields formData={formData} handleChange={handleChange} />

      <motion.button
        type="submit"
        disabled={isLoading}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-full bg-primary-light dark:bg-primary-dark text-white py-2 rounded-lg transition-all duration-300 ${
          isLoading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"
        }`}
      >
        {isLoading ? "Loading..." : "Create Account"}
      </motion.button>
    </motion.form>
  );
};

export default SignupForm;
