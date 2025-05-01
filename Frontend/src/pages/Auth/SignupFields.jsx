import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, Phone, Eye, EyeOff } from "lucide-react";

const SignupFields = ({ formData, handleChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const fieldConfigs = [
    {
      id: "name",
      label: "Name",
      type: "text",
      placeholder: "John Doe",
      icon: <User className="absolute left-3 top-3 w-5 h-5 text-primary-dark/40" />,
      required: true,
    },
    {
      id: "email",
      label: "Email",
      type: "email",
      placeholder: "you@example.com",
      icon: <Mail className="absolute left-3 top-3 w-5 h-5 text-primary-dark/40" />,
      required: true,
    },
    {
      id: "password",
      label: "Password",
      type: showPassword ? "text" : "password",
      placeholder: "••••••••",
      icon: <Lock className="absolute left-3 top-3 w-5 h-5 text-primary-dark/40" />,
      rightIcon: showPassword ? (
        <EyeOff
          className="absolute right-3 top-3 w-5 h-5 text-primary-dark/40 cursor-pointer"
          onClick={togglePasswordVisibility}
        />
      ) : (
        <Eye
          className="absolute right-3 top-3 w-5 h-5 text-primary-dark/40 cursor-pointer"
          onClick={togglePasswordVisibility}
        />
      ),
      required: true,
    },
    {
      id: "confirmPassword",
      label: "Confirm Password",
      type: showConfirmPassword ? "text" : "password",
      placeholder: "••••••••",
      icon: <Lock className="absolute left-3 top-3 w-5 h-5 text-primary-dark/40" />,
      rightIcon: showConfirmPassword ? (
        <EyeOff
          className="absolute right-3 top-3 w-5 h-5 text-primary-dark/40 cursor-pointer"
          onClick={toggleConfirmPasswordVisibility}
        />
      ) : (
        <Eye
          className="absolute right-3 top-3 w-5 h-5 text-primary-dark/40 cursor-pointer"
          onClick={toggleConfirmPasswordVisibility}
        />
      ),
      required: true,
    },
    {
      id: "phone",
      label: "Phone",
      type: "tel",
      placeholder: "+1 (555) 123-4567",
      icon: <Phone className="absolute left-3 top-3 w-5 h-5 text-primary-dark/40" />,
      required: false,
    },
  ];

  return (
    <>
      {fieldConfigs.map((field, index) => (
        <motion.div
          key={field.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="mb-4"
        >
          <label className="block text-sm font-medium text-primary-dark mb-1">
            {field.label} {!field.required && <span className="text-muted-dark">(Optional)</span>}
          </label>
          <div className="relative">
            {field.icon}
            <input
              type={field.type}
              name={field.id}
              value={formData[field.id]}
              onChange={handleChange}
              className="w-full pl-10 pr-10 py-3 text-text-dark border-2 border-border-dark/10 rounded-lg focus:border-accent-dark focus:ring-2 focus:ring-accent-dark/50 bg-background-dark/50 focus:outline-none transition-all duration-300"
              placeholder={field.placeholder}
              required={field.required}
            />
            {field.rightIcon}
          </div>
          {field.id === "password" && (
            <p className="text-xs text-muted-dark mt-1">
              Must be at least 8 characters with uppercase, lowercase, number and special character
            </p>
          )}
        </motion.div>
      ))}
    </>
  );
};

export default SignupFields;
