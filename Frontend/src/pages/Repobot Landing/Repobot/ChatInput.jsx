import React, { useState } from "react";
import { MessageSquare, ArrowRight } from "lucide-react";

const ChatInput = ({ onSendMessage, isLoading }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSendMessage(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 bg-primary-light/5 dark:bg-primary-dark/5 rounded-lg p-3">
      <MessageSquare className="w-5 h-5 text-primary-light dark:text-primary-dark" />
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your prompt here"
        className="flex-1 bg-transparent border-none text-text-light dark:text-text-dark placeholder-muted-light dark:placeholder-muted-dark text-base focus:outline-none"
        disabled={isLoading}
      />
      <button 
        type="submit"
        className={`p-2 rounded-lg ${isLoading ? "bg-gray-400" : "bg-primary-light dark:bg-primary-dark hover:bg-primary-light/90 dark:hover:bg-primary-dark/90"}`}
        disabled={isLoading}
      >
        <ArrowRight className="w-5 h-5 text-white dark:text-text-dark" />
      </button>
    </form>
  );
};

export default ChatInput;