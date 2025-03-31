// src/components/ChatOption.jsx
import React from "react";
import { MessageSquare, ChevronRight } from "lucide-react";

const ChatOption = ({ title }) => {
  return (
    <div className="flex items-center p-2 text-text-light dark:text-text-dark rounded-lg cursor-pointer hover:bg-primary-light/10 dark:hover:bg-primary-dark/10">
      <MessageSquare className="w-4 h-4 mr-3 text-primary-light dark:text-primary-dark" />
      <span>{title}</span>
      <ChevronRight className="ml-auto w-4 h-4 text-muted-light dark:text-muted-dark" />
    </div>
  );
};

export default ChatOption;
