import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../../assets/logo.png";
import SignupForm from "./SignupForm";
import { validateForm } from "./SignupValidation";
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";
import { Github } from "lucide-react";

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

  const handleGoogleSignup = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  const handleGithubSignup = () => {
    window.location.href = "http://localhost:5000/api/auth/github";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-light to-accent-light dark:from-primary-dark dark:to-accent-dark p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-background-dark rounded-2xl shadow-2xl border border-border-dark/20 w-full max-w-md p-8"
      >
        <div className="flex justify-center mb-4">
          <img src={logo} alt="Repobot Logo" className="w-32 h-16 object-contain" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-primary-dark mb-6 text-center">
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

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border-dark/30"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-background-dark text-muted-dark">
              Or sign up with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <motion.button
            type="button"
            onClick={handleGoogleSignup}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center py-3 px-4 bg-white text-gray-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
          </motion.button>
          <motion.button
            type="button"
            onClick={handleGithubSignup}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center py-3 px-4 bg-[#24292F] text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            <Github className="w-5 h-5 mr-2" />
            GitHub
          </motion.button>
        </div>

        <div className="text-center text-sm text-muted-dark">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-accent-dark hover:underline font-medium"
          >
            Sign in
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
