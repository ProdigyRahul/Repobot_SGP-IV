import React from "react";

const MessageList = ({ messages, isLoading }) => {
  return (
    <div className="flex-1 overflow-y-auto mb-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`mb-4 ${message.sender === "user" ? "text-right" : "text-left"}`}
        >
          <div
            className={`inline-block p-3 rounded-lg max-w-xs md:max-w-md lg:max-w-lg ${
              message.sender === "user"
                ? "bg-primary-light text-white"
                : "bg-gray-100 dark:bg-gray-700 text-text-light dark:text-text-dark"
            }`}
          >
            {message.text}
          </div>
        </div>
      ))}
      {isLoading && (
        <div className="text-left mb-4">
          <div className="inline-block p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
            <div className="flex space-x-2">
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-100"></div>
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-200"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageList;