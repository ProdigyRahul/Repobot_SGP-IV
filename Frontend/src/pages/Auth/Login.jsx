import React from "react";
import LoginForm from "./LoginForm";
import { motion } from "framer-motion";
import logo from "../../assets/logo.png";

const Login = () => {
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
          Welcome Back
        </h2>
        <LoginForm />
        <p className="text-center mt-6 text-text-dark/70">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-accent-dark hover:underline font-medium"
          >
            Sign up
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
