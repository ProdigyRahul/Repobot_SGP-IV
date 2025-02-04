import React from "react";
import { MessageSquare, ChevronRight } from "lucide-react";

const ChatOption = ({ title }) => {
  return (
    <div className="flex items-center p-2 text-gray-300 rounded-lg cursor-pointer hover:bg-[#441752]/20">
      <MessageSquare className="w-4 h-4 mr-3" />
      <span>{title}</span>
      <ChevronRight className="ml-auto w-4 h-4" />
    </div>
  );
};

export default ChatOption;
