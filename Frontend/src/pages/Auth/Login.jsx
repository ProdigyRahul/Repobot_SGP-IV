import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
  };
  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError("Please fill in all required fields.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
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
  
    try {
      if (!validateForm()) {
        setIsLoading(false);
        return;
      }
  
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST", // Ensure POST method
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Keep this if you want to include cookies (e.g., session ID)
        body: JSON.stringify(formData), // Send the body with login credentials
      });
  
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned non-JSON response");
      }
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }
  
      setSuccess("Login successful!");
      if (data.token) {
        localStorage.setItem("token", data.token);
        setTimeout(() => navigate("/repobot"), 1000);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message || "Network error occurred");
    } finally {
      setIsLoading(false);
    }
  };
  
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#441752]/5 to-[#A888B5]/10 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-[#441752] mb-6 text-center">Welcome Back</h2>
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4">{error}</div>
        )}
        {success && (
          <div className="bg-green-50 text-green-500 p-3 rounded-lg mb-4">{success}</div>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-[#441752] mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-[#441752]/40" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border-2 border-[#441752]/10 rounded-lg focus:border-[#A888B5] focus:outline-none"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#441752] mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-[#441752]/40" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border-2 border-[#441752]/10 rounded-lg focus:border-[#A888B5] focus:outline-none"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-[#A888B5] text-white py-2 rounded-lg transition-colors ${
              isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#A888B5]/90"
            }`}
          >
            {isLoading ? "Loading..." : "Sign In"}
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-[#441752]/70">
          Don't have an account? {" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-[#A888B5] hover:underline"
            disabled={isLoading}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};
export default Login;