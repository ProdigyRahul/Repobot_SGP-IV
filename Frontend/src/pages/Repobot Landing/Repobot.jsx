import {
  Search,
  User,
  MessageSquare,
  ArrowRight,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import React, { useState } from "react";

const Repobot = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const recentChats = [
    "How can I increase ton...",
    "What's the best appro...",
    "What's the best sport...",
  ];

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

      {/* Sidebar */}
      <div
        className={`fixed md:relative w-64 h-full bg-black transform transition-transform duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } z-40`}
      >
        <div className="h-full p-4 flex flex-col">
          <div className="mb-6">
            <button className="flex items-center w-full p-3 text-white rounded-lg hover:bg-[#441752]/20">
              <span className="text-lg">Begin a New Chat</span>
              <span className="ml-auto text-xl">+</span>
            </button>
          </div>

          <div className="relative mb-6">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 bg-[#441752]/20 rounded-lg text-white placeholder-gray-400"
            />
          </div>

          <div className="mb-6">
            <div className="px-2 mb-3 text-sm font-medium text-gray-400">
              Category
            </div>
            {["General", "Sales", "Negotiation", "Marketing"].map((item) => (
              <div
                key={item}
                className="flex items-center p-2 text-gray-300 rounded-lg cursor-pointer hover:bg-[#441752]/20"
              >
                <MessageSquare className="w-4 h-4 mr-3" />
                <span>{item}</span>
                <ChevronRight className="ml-auto w-4 h-4" />
              </div>
            ))}
          </div>

          <div className="mb-6">
            <div className="px-2 mb-3 text-sm font-medium text-gray-400">
              Recent Chats
            </div>
            {recentChats.map((chat) => (
              <div
                key={chat}
                className="flex items-center p-2 text-gray-300 rounded-lg cursor-pointer hover:bg-[#441752]/20"
              >
                <MessageSquare className="w-4 h-4 mr-3" />
                <span className="truncate">{chat}</span>
                <ChevronRight className="ml-auto w-4 h-4" />
              </div>
            ))}
          </div>

          <div className="mt-auto">
            <div className="flex items-center p-2 text-gray-300 rounded-lg cursor-pointer hover:bg-[#441752]/20">
              <User className="w-4 h-4 mr-3" />
              <span>User Profile</span>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8">
        <div className="max-w-4xl mx-auto pt-14 md:pt-0">
          <nav className="mb-8 md:mb-16 overflow-x-auto">
            <ul className="flex space-x-8 min-w-max">
              {["General", "Sales", "Negotiation", "Marketing"].map((item) => (
                <li key={item}>
                  <button
                    className={`text-[#441752] ${
                      item === "General" ? "font-bold" : "opacity-50"
                    }`}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="text-center mb-8 md:mb-16">
            <h1 className="text-5xl md:text-4xl font-semibold text-[#441752] mb-4">
              How can we <span className="text-[#441752]">assist</span> you
              today?
            </h1>
            <h1 className="text-3xl text-gray-600 text-sm max-w-xl mx-auto">
              Get expert guidance powered by AI agents specializing in Sales,
              Marketing, and Negotiation. Choose the agent that suits your needs
              and start your conversation with ease.
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              {
                title: "Sales Strategies",
                desc: "Get expert advice on ensuring goals",
              },
              {
                title: "Negotiation Tactics",
                desc: "Learn expert negotiable tips to close deals",
              },
              {
                title: "Marketing Insights",
                desc: "Discover the best marketing strategies",
              },
              {
                title: "General Support",
                desc: "Need help with general queries",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-4 rounded-lg bg-[#441752]/5 cursor-pointer hover:bg-[#441752]/10"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-[#441752] text-base font-medium">
                    {item.title}
                  </h3>
                  <ArrowRight className="w-4 h-4 text-[#441752]" />
                </div>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 bg-[#441752]/5 rounded-lg p-3">
            <MessageSquare className="w-5 h-5 text-[#441752]" />
            <input
              type="text"
              placeholder="type your prompt here"
              className="flex-1 bg-transparent border-none text-[#441752] placeholder-gray-400 text-base focus:outline-none"
            />
            <button className="p-2 bg-[#441752] rounded-lg">
              <ArrowRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Repobot;
