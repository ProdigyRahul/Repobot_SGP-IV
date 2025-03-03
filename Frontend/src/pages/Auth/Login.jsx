import React from "react";
import LoginForm from "./LoginForm";
import { motion } from "framer-motion";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#441752]/5 to-[#A888B5]/10 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8"
      >
        <h2 className="text-2xl font-bold text-[#441752] mb-6 text-center">Welcome Back</h2>
        <LoginForm />
      </motion.div>
    </div>
  );
};

export default Login;