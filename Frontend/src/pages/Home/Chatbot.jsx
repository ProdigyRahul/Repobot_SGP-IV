import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content: "Hi there! 👋 I'm RepoBot, your GitHub assistant. How can I help you today?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const modalRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        if (!event.target.closest(".chat-button")) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSend = async () => {
    if (inputValue.trim() === "") return;

    const newMessages = [...messages, { type: "user", content: inputValue }];
    setMessages(newMessages);
    setInputValue("");
    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:5000/chat", {
        query: inputValue,
      });

      if (response && response.data) {
        setMessages([
          ...newMessages,
          {
            type: "bot",
            content: response.data.message,
          },
        ]);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages([
        ...newMessages,
        {
          type: "bot",
          content:
            "Sorry, I encountered an error processing your request. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const minimizeChat = (e) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  const resetChat = (e) => {
    e.stopPropagation();
    setMessages([
      {
        type: "bot",
        content: "Hi there! 👋 I'm RepoBot, your GitHub assistant. How can I help you today?",
      },
    ]);
    setInputValue("");
  };

  return (
    <>
      <button
        onClick={toggleChat}
        className="chat-button fixed bottom-6 right-6 z-40 bg-[#441752] hover:bg-[#A888B5] text-white rounded-full p-4 shadow-lg transition-all duration-300 flex items-center justify-center hover:scale-110 hover:shadow-xl"
        style={{ width: "60px", height: "60px" }}
        title="Welcome to RepoBot"
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end bg-black bg-opacity-50 backdrop-blur-sm">
          <div
            ref={modalRef}
            className="flex flex-col bg-white rounded-t-lg md:rounded-lg shadow-2xl w-full max-w-md h-[80%] max-h-[600px] mx-4 mb-4 transform transition-transform duration-300 ease-in-out"
          >
            <div className="bg-[#441752] p-3 text-white shadow-sm rounded-t-lg flex justify-between items-center">
              <h1 className="text-lg font-semibold">RepoBot</h1>
              <div className="flex space-x-2">
                <button
                  onClick={resetChat}
                  className="text-white hover:bg-[#A888B5] rounded-full p-1 transition-colors"
                  title="Reset chat"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </button>
                <button
                  onClick={minimizeChat}
                  className="text-white hover:bg-[#A888B5] rounded-full p-1 transition-colors"
                  title="Minimize"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 12H6"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex-1 p-3 overflow-y-auto bg-gray-50">
              <div className="space-y-3">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs md:max-w-sm rounded-lg p-3 ${
                        message.type === "user"
                          ? "bg-[#441752] text-white rounded-br-none"
                          : "bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm"
                      }`}
                    >
                      {message.type === "bot" ? (
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                      ) : (
                        <p>{message.content}</p>
                      )}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 text-gray-800 rounded-lg rounded-bl-none p-3 shadow-sm">
                      <div className="flex space-x-2">
                        <div
                          className="w-2 h-2 bg-[#441752] rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-[#441752] rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-[#441752] rounded-full animate-bounce"
                          style={{ animationDelay: "600ms" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            <div className="bg-white border-t border-gray-200 p-3 rounded-b-lg">
              <div className="flex rounded-lg border border-gray-300 overflow-hidden shadow-sm">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about GitHub..."
                  className="flex-1 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#441752] focus:border-[#441752]"
                />

                <button
                  onClick={handleSend}
                  className="bg-[#441752] text-white px-3 py-2 focus:outline-none hover:bg-[#A888B5] transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div className="text-center mt-2">
                <span className="text-xs text-gray-500">
                  Powered by RepoBot AI
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;