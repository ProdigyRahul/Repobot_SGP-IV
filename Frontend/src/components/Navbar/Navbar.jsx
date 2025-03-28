import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon, X, Menu } from "lucide-react";
import Logo from "../../assets/Logo.png";
import { useAuth } from "../../contexts/AuthContext"; // Import the useAuth hook

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { isAuthenticated, user, logout } = useAuth(); // Use the authentication context

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <nav className="fixed w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <img src={Logo} alt="Repobot Logo" className="mr-2 w-30 h-10" />
          </div>

          {/* Navigation Links and Actions */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-[#441752] dark:text-white font-medium">
              Home
            </Link>
            <Link to="/features" className="text-[#441752]/70 dark:text-white/70 hover:text-[#441752] dark:hover:text-white">
              Features
            </Link>
            <Link to="/about" className="text-[#441752]/70 dark:text-white/70 hover:text-[#441752] dark:hover:text-white">
              About
            </Link>
            <Link to="/contact" className="text-[#441752]/70 dark:text-white/70 hover:text-[#441752] dark:hover:text-white">
              Contact
            </Link>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {darkMode ? <Sun className="w-5 h-5 text-[#441752] dark:text-white" /> : <Moon className="w-5 h-5 text-[#441752] dark:text-white" />}
            </button>




            {/* Conditionally render Sign Up or Logout */}
            {isAuthenticated ? (
              <button
                onClick={logout}
                className="bg-red-500/10 text-red-600 px-4 py-2 rounded-lg hover:bg-red-500/20"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/signup"
                className="bg-[#441752] text-white px-6 py-2 rounded-lg hover:bg-[#A888B5]/90 dark:bg-[#A888B5] dark:hover:bg-[#441752]"
              >
                Sign Up
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            {isOpen ? <X className="w-6 h-6 text-[#441752] dark:text-white" /> : <Menu className="w-6 h-6 text-[#441752] dark:text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/" className="block px-3 py-2 text-[#441752] dark:text-white font-medium">
              Home
            </Link>
            <Link to="/features" className="block px-3 py-2 text-[#441752]/70 dark:text-white/70">
              Features
            </Link>
            <Link to="/about" className="block px-3 py-2 text-[#441752]/70 dark:text-white/70">
              About
            </Link>
            <Link to="/contact" className="block px-3 py-2 text-[#441752]/70 dark:text-white/70">
              Contact
            </Link>
            <button onClick={() => setDarkMode(!darkMode)} className="w-full text-left px-3 py-2 text-[#441752] dark:text-white">
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>

            {/* Profile Icon for Mobile */}
            <Link
              to={isAuthenticated ? "/profile" : "/login"}
              className="block px-3 py-2 text-[#441752] dark:text-white"
            >
              Profile
            </Link>

            {/* Conditionally render Sign Up or Logout for mobile */}
            {isAuthenticated ? (
              <button
                onClick={logout}
                className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-500/10 rounded-lg"
              >
                Logout
              </button>
            ) : (
              <Link to="/signup" className="w-full text-left px-3 py-2 text-white bg-[#441752] dark:bg-[#A888B5] rounded-lg">
                Get Started
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;