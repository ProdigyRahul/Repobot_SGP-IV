// src/components/Repobot/Sidebar.jsx
import React from "react";
import { Search, MessageSquare, ChevronRight, User, LogOut, ChevronLeft, Home } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { motion } from "framer-motion";
import axios from "axios";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const recentChats = [
    "How can I increase ton...",
    "What's the best appro...",
    "What's the best sport...",
  ];
  
  const handleLogout = async () => {
    try {
      // Call backend logout endpoint if available
      const token = localStorage.getItem("token");
      if (token) {
        await axios.get("http://localhost:5000/api/auth/logout", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Local logout always happens even if API call fails
      logout();
      navigate("/login");
    }
  };

  return (
    <div
      className={`fixed md:relative w-64 h-full bg-primary-light dark:bg-primary-dark transform transition-transform duration-200 ease-in-out ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      } z-40`}
    >
      <div className="h-full p-4 flex flex-col">
        {/* User Profile Section - Removed back arrow */}
        <div className="mb-6">
          <Link to="/profile">
            <motion.div 
              className="flex items-center p-2 rounded-lg hover:bg-accent-light/20 dark:hover:bg-accent-dark/20"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {user?.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt="Profile" 
                  className="w-9 h-9 rounded-full object-cover mr-3 border-2 border-accent-dark"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=random`;
                  }}
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-purple-700 flex items-center justify-center mr-3">
                  <span className="text-white font-medium">{user?.name?.charAt(0) || "R"}</span>
                </div>
              )}
              <div>
                <p className="font-medium text-white">{user?.name || "Rahul Mistry"}</p>
                <p className="text-xs text-gray-300">{user?.email || "rahulmistry.sde@gmail.com"}</p>
              </div>
            </motion.div>
          </Link>
        </div>
        
        <div className="flex items-center space-x-2 mb-4">
          <Home className="h-6 w-6 text-white" />
          <h1 className="text-xl font-semibold text-white">Repobot</h1>
        </div>
        
        <div className="mb-6">
          <button className="flex items-center w-full p-3 text-white rounded-lg hover:bg-accent-light/20 dark:hover:bg-accent-dark/20">
            <span className="text-lg">Begin a New Chat</span>
            <span className="ml-auto text-xl">+</span>
          </button>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-light dark:text-muted-dark" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 bg-accent-light/20 dark:bg-accent-dark/20 rounded-lg text-white placeholder-muted-light dark:placeholder-muted-dark focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark"
          />
        </div>

        <Categories />
        <RecentChats chats={recentChats} />
        
        {/* Logout button at the bottom of sidebar */}
        <div className="mt-auto">
          <motion.button
            onClick={handleLogout}
            className="flex w-full items-center space-x-2 p-3 text-red-400 hover:bg-red-500/10 rounded-md"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <LogOut className="w-5 h-5 mr-2" />
            <span>Logout</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

const Categories = () => (
  <div className="mb-6">
    <div className="px-2 mb-3 text-sm font-medium text-muted-light dark:text-muted-dark">
      Category
    </div>
    {[
      "Issue & Pull Request",
      "Code & Security Analysis",
      "AI-Powered Suggestions & Automation",
      "Collaboration & Community Engagement",
    ].map((item) => (
      <div
        key={item}
        className="flex items-center p-2 text-gray-300 rounded-lg cursor-pointer hover:bg-accent-light/20 dark:hover:bg-accent-dark/20"
      >
        <MessageSquare className="w-4 h-4 mr-3" />
        <span>{item}</span>
        <ChevronRight className="ml-auto w-4 h-4" />
      </div>
    ))}
  </div>
);

const RecentChats = ({ chats }) => (
  <div className="mb-6">
    <div className="px-2 mb-3 text-sm font-medium text-muted-light dark:text-muted-dark">
      Recent Chats
    </div>
    {chats.map((chat) => (
      <div
        key={chat}
        className="flex items-center p-2 text-gray-300 rounded-lg cursor-pointer hover:bg-accent-light/20 dark:hover:bg-accent-dark/20"
      >
        <MessageSquare className="w-4 h-4 mr-3" />
        <span className="truncate">{chat}</span>
        <ChevronRight className="ml-auto w-4 h-4" />
      </div>
    ))}
  </div>
);

export default Sidebar;
