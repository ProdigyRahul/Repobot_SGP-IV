import React, { useState } from "react";
import Sidebar from "./Repobot/Sidebar"; // Make sure this file exists in the Sidebar folder
import MainContent from "./Repobot/MainContent";
import { X, Menu } from "lucide-react";

const Repobot = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#441752]/10 to-[#441752]/5">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-black rounded-lg"
      >
        {sidebarOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Menu className="w-6 h-6 text-white" />
        )}
      </button>

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <MainContent />
    </div>
  );
};

export default Repobot;
