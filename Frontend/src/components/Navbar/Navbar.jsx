import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-customBlue text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="text-2xl font-bold font-sans">
          <a href="/" className="hover:text-gray-200">MyApp</a>
        </div>

        {/* Menu Button (Mobile) */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none text-white hover:text-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`md:flex items-center space-x-6 ${isOpen ? 'block' : 'hidden'}`}
        >
          <a
            href="#"
            className="block mt-2 md:mt-0 text-lg font-sans hover:text-gray-200"
          >
            Home
          </a>
          <a
            href="#about"
            className="block mt-2 md:mt-0 text-lg font-sans hover:text-gray-200"
          >
            About
          </a>
          <a
            href="#services"
            className="block mt-2 md:mt-0 text-lg font-sans hover:text-gray-200"
          >
            Services
          </a>
          <a
            href="#contact"
            className="block mt-2 md:mt-0 text-lg font-sans hover:text-gray-200"
          >
            Contact
          </a>
          <button className="bg-gray-100 text-customBlue px-4 py-2 rounded-md hover:bg-gray-200">
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
