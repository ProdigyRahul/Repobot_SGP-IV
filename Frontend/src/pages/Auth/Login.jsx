import React from "react";
import LoginForm from "./LoginForm";
import { motion } from "framer-motion";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-light/5 to-accent-light/10 dark:from-primary-dark/10 dark:to-accent-dark/20 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-background-light dark:bg-background-dark rounded-2xl shadow-xl dark:shadow-lg w-full max-w-md p-6 md:p-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-primary-light dark:text-primary-dark mb-6 text-center">
          Welcome Back
        </h2>
        <LoginForm />
        <p className="text-center mt-6 text-text-light/70 dark:text-text-dark/70">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-accent-light dark:text-accent-dark hover:underline"
          >
            Sign up
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
