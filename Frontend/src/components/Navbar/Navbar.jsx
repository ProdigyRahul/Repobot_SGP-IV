// import { useState, useContext } from "react";
// import { Link } from "react-router-dom";
// import { Sun, Moon, X, Menu } from "lucide-react";
// import Logo from "../../assets/Logo.png";
// import DarkModeContext from "../../contexts/DarkModeContext";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

//   return (
//     <nav className="fixed w-full bg-background-light dark:bg-background-dark backdrop-blur-sm z-50 shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo Section */}
//           <div className="flex items-center">
//             <img src={Logo} alt="Repobot Logo" className="mr-2 w-30 h-10" />
//           </div>

//           <div className="hidden md:block">
//             <div className="flex items-center space-x-8">
//               <Link
//                 to="/"
//                 className="text-text-light dark:text-text-dark font-medium"
//               >
//                 Home
//               </Link>
//               <Link
//                 to="/features"
//                 className="text-accent-light dark:text-primary-dark hover:text-primary-light dark:hover:text-primary-dark"
//               >
//                 Features
//               </Link> 
//               <Link
//                 to="/about"
//                 className="text-accent-light dark:text-primary-dark hover:text-primary-light dark:hover:text-primary-dark"
//               >
//                 About
//               </Link>
//               <Link
//                 to="/contact"
//                 className="text-accent-light dark:text-primary-dark hover:text-primary-light dark:hover:text-primary-dark"
//               >
//                 Contact
//               </Link>
//               <button
//                 onClick={toggleDarkMode}
//                 className="p-2 rounded-lg hover:bg-border-light dark:hover:bg-border-dark"
//               >
//                 {isDarkMode ? (
//                   <Sun className="w-5 h-5 text-primary-light dark:text-primary-dark" />
//                 ) : (
//                   <Moon className="w-5 h-5 text-primary-light dark:text-primary-dark" />
//                 )}
//               </button>
//               <Link
//                 to="/signup"
//                 className="bg-primary-light text-white px-6 py-2 rounded-lg hover:bg-accent-light dark:bg-primary-dark dark:hover:bg-accent-dark"
//               >
//                 Sign Up
//               </Link>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
//             {isOpen ? (
//               <X className="w-6 h-6 text-primary-light dark:text-primary-dark" />
//             ) : (
//               <Menu className="w-6 h-6 text-primary-light dark:text-primary-dark" />
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="md:hidden bg-background-light dark:bg-background-dark border-t dark:border-border-dark">
//           <div className="px-2 pt-2 pb-3 space-y-1">
//             <Link
//               to="/"
//               className="block px-3 py-2 text-text-light dark:text-text-dark font-medium"
//             >
//               Home
//             </Link>
//             <Link
//               to="/features"
//               className="block px-3 py-2 text-accent-light dark:text-accent-dark"
//             >
//               Features
//             </Link>
//             <Link
//               to="/about"
//               className="block px-3 py-2 text-accent-light dark:text-accent-dark"
//             >
//               About
//             </Link>
//             <Link
//               to="/contact"
//               className="block px-3 py-2 text-accent-light dark:text-accent-dark"
//             >
//               Contact
//             </Link>
//             <button
//               onClick={toggleDarkMode}
//               className="w-full text-left px-3 py-2 text-primary-light dark:text-primary-dark"
//             >
//               {isDarkMode ? "Light Mode" : "Dark Mode"}
//             </button>
//             <Link
//               to="/repobot"
//               className="w-full text-left px-3 py-2 text-white bg-primary-light dark:bg-primary-dark rounded-lg"
//             >
//               Get Started
//             </Link>

//             {/* Conditionally render Sign Up or Logout for mobile */}
//             {isAuthenticated ? (
//               <button
//                 onClick={logout}
//                 className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-500/10 rounded-lg"
//               >
//                 Logout
//               </button>
//             ) : (
//               <Link to="/signup" className="w-full text-left px-3 py-2 text-white bg-[#441752] dark:bg-[#A888B5] rounded-lg">
//                 Get Started
//               </Link>
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon, X, Menu } from "lucide-react";
import Logo from "../../assets/Logo.png";
import DarkModeContext from "../../contexts/DarkModeContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <nav className="fixed w-full bg-background-light dark:bg-background-dark backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
        
          <div className="flex items-center">
            <img src={Logo} alt="Repobot Logo" className="mr-2 w-30 h-10" />
          </div>

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
              >
                Sign Up
              </Link>
            </div>
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
            <Link
              to="/repobot"
              className="w-full text-left px-3 py-2 text-white bg-primary-light dark:bg-primary-dark rounded-lg"
            >
              Get Started
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
              <Link
                to="/signup"
                className="w-full text-left px-3 py-2 text-white bg-[#441752] dark:bg-[#A888B5] rounded-lg"
              >
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