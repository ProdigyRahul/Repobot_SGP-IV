<<<<<<< HEAD
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon, X, Menu } from "lucide-react";
import Logo from "../../assets/Logo.png";
import DarkModeContext from "../../contexts/DarkModeContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
=======
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
>>>>>>> f0fe547c7d1dcc8c9ee4291c1a984d017717409e

  return (
    <nav className="fixed w-full bg-background-light dark:bg-background-dark backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <img src={Logo} alt="Repobot Logo" className="mr-2 w-30 h-10" />
          </div>

<<<<<<< HEAD
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <Link
                to="/"
                className="text-text-light dark:text-text-dark font-medium"
              >
                Home
              </Link>
              <Link
                to="/features"
                className="text-accent-light dark:text-primary-dark hover:text-primary-light dark:hover:text-primary-dark"
              >
                Features
              </Link> 
              <Link
                to="/about"
                className="text-accent-light dark:text-primary-dark hover:text-primary-light dark:hover:text-primary-dark"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-accent-light dark:text-primary-dark hover:text-primary-light dark:hover:text-primary-dark"
              >
                Contact
              </Link>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg hover:bg-border-light dark:hover:bg-border-dark"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-primary-light dark:text-primary-dark" />
                ) : (
                  <Moon className="w-5 h-5 text-primary-light dark:text-primary-dark" />
                )}
              </button>
              <Link
                to="/signup"
                className="bg-primary-light text-white px-6 py-2 rounded-lg hover:bg-accent-light dark:bg-primary-dark dark:hover:bg-accent-dark"
=======
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
>>>>>>> f0fe547c7d1dcc8c9ee4291c1a984d017717409e
              >
                Sign Up
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            {isOpen ? (
              <X className="w-6 h-6 text-primary-light dark:text-primary-dark" />
            ) : (
              <Menu className="w-6 h-6 text-primary-light dark:text-primary-dark" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background-light dark:bg-background-dark border-t dark:border-border-dark">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 text-text-light dark:text-text-dark font-medium"
            >
              Home
            </Link>
            <Link
              to="/features"
              className="block px-3 py-2 text-accent-light dark:text-accent-dark"
            >
              Features
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 text-accent-light dark:text-accent-dark"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 text-accent-light dark:text-accent-dark"
            >
              Contact
            </Link>
            <button
              onClick={toggleDarkMode}
              className="w-full text-left px-3 py-2 text-primary-light dark:text-primary-dark"
            >
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>
<<<<<<< HEAD
            <Link
              to="/repobot"
              className="w-full text-left px-3 py-2 text-white bg-primary-light dark:bg-primary-dark rounded-lg"
            >
              Get Started
=======

            {/* Profile Icon for Mobile */}
            <Link
              to={isAuthenticated ? "/profile" : "/login"}
              className="block px-3 py-2 text-[#441752] dark:text-white"
            >
              Profile
>>>>>>> f0fe547c7d1dcc8c9ee4291c1a984d017717409e
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