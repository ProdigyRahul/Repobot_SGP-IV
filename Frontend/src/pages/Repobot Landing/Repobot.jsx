// import React, { useState } from "react";
// import { X, Menu } from "lucide-react";
// import Sidebar from "../../pages/Repobot Landing/Repobot/Sidebar";
// import MainContent from "../../pages/Repobot Landing/Repobot/MainContent";
// import BackButton from "../../UI/BackButton";

// const Repobot = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");

//   const handleSendMessage = async () => {
//     if (!input.trim()) return;

//     try {
//       // Add user message
//       setMessages((prev) => [...prev, { sender: "user", text: input }]);

//       const response = await fetch("http://127.0.0.1:5000/repobot", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ prompt: input }),
//       });

//       const data = await response.json();
//       // Add bot response
//       setMessages((prev) => [...prev, { sender: "bot", text: data.response }]);
//       setInput("");
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gradient-to-br from-primary-light/10 to-primary-light/5 dark:from-primary-dark/10 dark:to-primary-dark/5">
//       {/* Mobile Menu Button */}
//       <button
//         onClick={() => setSidebarOpen(!sidebarOpen)}
//         className="md:hidden fixed top-4 left-4 z-50 p-2 bg-primary-light dark:bg-primary-dark rounded-lg shadow-lg"
//       >
//         {sidebarOpen ? (
//           <X className="w-6 h-6 text-white" />
//         ) : (
//           <Menu className="w-6 h-6 text-white" />
//         )}
//       </button>

//       {/* Sidebar */}
//       <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

//       {/* Overlay for mobile */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-30 md:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Main Content with BackButton */}
//       <div className="relative flex-1">
//         <BackButton />
//         <MainContent />
//       </div>
//     </div>
//   );
// };

// export default Repobot;


import React, { useState } from "react";
import { X, Menu } from "lucide-react";
import Sidebar from "../../pages/Repobot Landing/Repobot/Sidebar";
import MainContent from "../../pages/Repobot Landing/Repobot/MainContent";
import BackButton from "../../UI/BackButton";

const Repobot = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (userInput) => {
    if (!userInput.trim()) return;

    try {
      setIsLoading(true);
      // Add user message immediately
      setMessages((prev) => [...prev, { sender: "user", text: userInput }]);

      const response = await fetch("http://127.0.0.1:5000/repobot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: userInput }),
      });

      if (!response.ok) throw new Error("API request failed");

      const data = await response.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.response }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [...prev, { 
        sender: "bot", 
        text: "Sorry, I couldn't process your request. Please try again." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-primary-light/10 to-primary-light/5 dark:from-primary-dark/10 dark:to-primary-dark/5">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-primary-light dark:bg-primary-dark rounded-lg shadow-lg"
      >
        {sidebarOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Menu className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content with BackButton */}
      <div className="relative flex-1 overflow-hidden">
        <BackButton />
        <MainContent 
          messages={messages}
          isLoading={isLoading}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default Repobot;