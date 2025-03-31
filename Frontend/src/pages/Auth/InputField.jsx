import React from "react";
import { Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";

const InputField = ({ label, type, name, placeholder, value, onChange, icon }) => {
  const IconComponent = icon === "Mail" ? Mail : Lock;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <label className="block text-sm font-medium text-primary-light dark:text-primary-dark mb-1">
        {label}
      </label>
      <div className="relative">
        <IconComponent className="absolute left-3 top-3 w-5 h-5 text-primary-light/40 dark:text-primary-dark/40" />
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full pl-10 pr-4 py-2 text-text-light dark:text-text-dark border-2 border-border-light dark:border-border-dark rounded-lg focus:border-accent-light dark:focus:border-accent-dark focus:ring-2 focus:ring-accent-light/50 dark:focus:ring-accent-dark/50 bg-transparent focus:outline-none transition-all duration-300"
          placeholder={placeholder}
          required
        />
      </div>
    </motion.div>
  );
};

export default InputField;