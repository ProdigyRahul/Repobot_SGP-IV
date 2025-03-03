import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from '../../assets/logo.png';
import SignupForm from './SignupForm';
import { validateForm } from './SignupValidation';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      if (!validateForm(formData, setError)) {
        setIsLoading(false);
        return;
      }

      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned non-JSON response");
      }

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setSuccess("Account created successfully!");
      setTimeout(() => navigate("/login"), 1000);
    } catch (error) {
      console.error("Signup error:", error);
      setError(error.message || "Network error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#441752]/5 to-[#A888B5]/10 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8"
      >
        <div className="flex justify-center mb-4">
          <img src={logo} alt="Repobot Logo" className="w-32 h-16" />
        </div>
        <h2 className="text-2xl font-bold text-[#441752] mb-6 text-center">Create Account</h2>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-red-50 text-red-500 p-3 rounded-lg mb-4"
          >
            {error}
          </motion.div>
        )}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-green-50 text-green-500 p-3 rounded-lg mb-4"
          >
            {success}
          </motion.div>
        )}

        <SignupForm 
          formData={formData} 
          handleChange={handleChange} 
          handleSubmit={handleSubmit} 
          isLoading={isLoading} 
        />

        <div className="mt-6 text-center text-sm text-[#441752]/70">
          Already have an account? 
          <button
            onClick={() => navigate("/login")}
            className="text-[#A888B5] hover:underline"
            disabled={isLoading}
          >
            Sign in
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;