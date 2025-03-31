import React from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User } from "lucide-react";

const SignupFields = ({ formData, handleChange }) => {
  return (
    <>
      {["name", "email", "password", "confirmPassword", "phone"].map(
        (field, index) => (
          <motion.div
            key={field}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="mb-4"
          >
            <label className="block text-sm font-medium text-primary-light dark:text-primary-dark mb-1">
              {field === "confirmPassword"
                ? "Confirm Password"
                : field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <div className="relative">
              {field === "name" && (
                <User className="absolute left-3 top-3 w-5 h-5 text-primary-light/40 dark:text-primary-dark/40" />
              )}
              {field === "email" && (
                <Mail className="absolute left-3 top-3 w-5 h-5 text-primary-light/40 dark:text-primary-dark/40" />
              )}
              {(field === "password" || field === "confirmPassword") && (
                <Lock className="absolute left-3 top-3 w-5 h-5 text-primary-light/40 dark:text-primary-dark/40" />
              )}
              <input
                type={
                  field.includes("password")
                    ? "password"
                    : field === "email"
                    ? "email"
                    : "text"
                }
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 text-text-light dark:text-text-dark border-2 border-border-light/10 dark:border-border-dark/10 rounded-lg focus:border-accent-light dark:focus:border-accent-dark focus:ring-2 focus:ring-accent-light/50 dark:focus:ring-accent-dark/50 bg-transparent focus:outline-none transition-all duration-300"
                placeholder={
                  field === "email"
                    ? "you@example.com"
                    : field.includes("password")
                    ? "••••••••"
                    : field === "phone"
                    ? "+1 (555) 123-4567"
                    : "John Doe"
                }
                required={field !== "phone"}
              />
            </div>
          </motion.div>
        )
      )}
    </>
  );
};

export default SignupFields;
