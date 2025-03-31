import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../../assets/logo.png";
import SignupForm from "./SignupForm";
import { validateForm } from "./SignupValidation";
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-light/5 to-accent-light/10 dark:from-primary-dark/10 dark:to-accent-dark/20 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-background-light dark:bg-background-dark rounded-2xl shadow-xl dark:shadow-lg w-full max-w-md p-6 md:p-8"
      >
        <div className="flex justify-center mb-4">
          <img src={logo} alt="Repobot Logo" className="w-32 h-16" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-primary-light dark:text-primary-dark mb-6 text-center">
          Create Account
        </h2>

        {error && <ErrorMessage message={error} />}
        {success && <SuccessMessage message={success} />}

        <SignupForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />

        <div className="mt-6 text-center text-sm text-muted-light dark:text-muted-dark">
          Already have an account?
          <button
            onClick={() => navigate("/login")}
            className="text-accent-light dark:text-accent-dark hover:underline ml-1"
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
