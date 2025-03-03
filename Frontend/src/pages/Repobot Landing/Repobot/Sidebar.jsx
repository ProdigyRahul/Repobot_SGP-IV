import React from "react";
import { Search, MessageSquare, ChevronRight, User } from "lucide-react";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const recentChats = [
    "How can I increase ton...",
    "What's the best appro...",
    "What's the best sport...",
  ];

  return (
    <div
      className={`fixed md:relative w-64 h-full bg-[#441752] transform transition-transform duration-200 ease-in-out ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      } z-40`}
    >
      <div className="h-full p-4 flex flex-col">
        <div className="mb-6">
          <button className="flex items-center w-full p-3 text-white rounded-lg hover:bg-[#A888B5]/20">
            <span className="text-lg">Begin a New Chat</span>
            <span className="ml-auto text-xl">+</span>
          </button>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 bg-[#A888B5]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A888B5]"
          />
        </div>

        <Categories />
        <RecentChats chats={recentChats} />
        <UserProfile />
      </div>
    </div>
  );
};

const Categories = () => (
  <div className="mb-6">
    <div className="px-2 mb-3 text-sm font-medium text-gray-400">Category</div>
    {[
      "Issue & Pull Request",
      "Code & Security Analysis",
      "AI-Powered Suggestions & Automation",
      "Collaboration & Community Engagement",
    ].map((item) => (
      <div
        key={item}
        className="flex items-center p-2 text-gray-300 rounded-lg cursor-pointer hover:bg-[#A888B5]/20"
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
    <div className="px-2 mb-3 text-sm font-medium text-gray-400">
      Recent Chats
    </div>
    {chats.map((chat) => (
      <div
        key={chat}
        className="flex items-center p-2 text-gray-300 rounded-lg cursor-pointer hover:bg-[#A888B5]/20"
      >
        <MessageSquare className="w-4 h-4 mr-3" />
        <span className="truncate">{chat}</span>
        <ChevronRight className="ml-auto w-4 h-4" />
      </div>
    ))}
  </div>
);

const UserProfile = () => (
  <div className="mt-auto">
    <div className="flex items-center p-2 text-gray-300 rounded-lg cursor-pointer hover:bg-[#A888B5]/20">
      <User className="w-4 h-4 mr-3" />
      <span>User Profile</span>
    </div>
  </div>
);

export default Sidebar;