import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Ensure you have react-router installed
import { Sun, Moon, X, Menu } from "lucide-react"; // Ensure you have lucide-react installed
import Logo from "../../assets/Logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

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
          <div className="flex items-center">
            <img src={Logo} alt="Repobot Logo" className="mr-2 w-30 h-10" />
          </div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
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
              <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                {darkMode ? <Sun className="w-5 h-5 text-[#441752] dark:text-white" /> : <Moon className="w-5 h-5 text-[#441752] dark:text-white" />}
              </button>
              <Link to="/signup" className="bg-[#441752] text-white px-6 py-2 rounded-lg hover:bg-[#A888B5]/90 dark:bg-[#A888B5] dark:hover:bg-[#441752]">
                Sign Up
              </Link>
            </div>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            {isOpen ? <X className="w-6 h-6 text-[#441752] dark:text-white" /> : <Menu className="w-6 h-6 text-[#441752] dark:text-white" />}
          </button>
        </div>
      </div>

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
            <Link to="/repobot" className="w-full text-left px-3 py-2 text-white bg-[#441752] dark:bg-[#A888B5] rounded-lg">
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
