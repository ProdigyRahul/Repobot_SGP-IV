import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";
import { motion } from "framer-motion";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError("Please fill in all required fields.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Something went wrong");

      setSuccess("Login successful!");
      if (data.token) {
        localStorage.setItem("token", data.token);
        setTimeout(() => navigate("/repobot"), 1000);
      }
    } catch (error) {
      setError(error.message || "Network error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-4"
      onSubmit={handleSubmit}
    >
      {error && <ErrorMessage message={error} />}
      {success && <SuccessMessage message={success} />}
      <InputField
        label="Email"
        type="email"
        name="email"
        placeholder="you@example.com"
        value={formData.email}
        onChange={handleChange}
        icon="Mail"
      />
      <InputField
        label="Password"
        type="password"
        name="password"
        placeholder="••••••••"
        value={formData.password}
        onChange={handleChange}
        icon="Lock"
      />
      <motion.button
        type="submit"
        disabled={isLoading}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-full bg-[#A888B5] text-white py-2 rounded-lg transition-all duration-300 ${
          isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#A888B5]/90"
        }`}
      >
        {isLoading ? "Loading..." : "Sign In"}
      </motion.button>
      <div className="mt-6 text-center text-sm text-[#441752]/70">
        Don't have an account?{" "}
        <button
          onClick={() => navigate("/signup")}
          className="text-[#A888B5] hover:underline"
          disabled={isLoading}
        >
          Sign up
        </button>
      </div>
    </motion.form>
  );
};

export default LoginForm;