import React from "react";
import { MessageSquare, ArrowRight } from "lucide-react";

const ChatInput = () => {
  return (
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
  );
};

export default ChatInput;
