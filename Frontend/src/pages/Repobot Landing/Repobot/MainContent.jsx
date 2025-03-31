// import React from "react";
// import { ArrowRight } from "lucide-react";
// import ChatInput from "./ChatInput";

// const MainContent = () => {
//   return (
//     <div className="flex-1 p-4 md:p-8">
//       <div className="max-w-4xl mx-auto pt-14 md:pt-0">
//         <header className="text-center mb-8 md:mb-16">
//           <h1 className="text-3xl md:text-4xl font-semibold text-text-light dark:text-text-dark mb-4">
//             How can we{" "}
//             <span className="text-primary-light dark:text-primary-dark">
//               assist
//             </span>{" "}
//             you today?
//           </h1>
//           <p className="text-sm md:text-base text-muted-light dark:text-muted-dark max-w-xl mx-auto">
//             Get expert guidance powered by AI agents specializing in GitHub
//             Repo. Choose the Repobot that suits your needs and start your
//             conversation with ease.
//           </p>
//         </header>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//           {[
//             {
//               title: "Repository Insights",
//               desc: "Analyze and understand repository trends and usage.",
//             },
//             {
//               title: "Collaboration Strategies",
//               desc: "Learn best practices for managing contributions and team workflows.",
//             },
//             {
//               title: "Code Quality & Reviews",
//               desc: "Get tips on maintaining high code quality and effective code reviews.",
//             },
//             {
//               title: "General Repository Support",
//               desc: "Need help with repository setup, management, or troubleshooting?",
//             },
//           ].map((item) => (
//             <div
//               key={item.title}
//               className="p-4 rounded-lg bg-primary-light/5 dark:bg-primary-dark/5 cursor-pointer hover:bg-primary-light/10 dark:hover:bg-primary-dark/10"
//             >
//               <div className="flex justify-between items-start mb-2">
//                 <h3 className="text-text-light dark:text-text-dark text-base font-medium">
//                   {item.title}
//                 </h3>
//                 <ArrowRight className="w-4 h-4 text-primary-light dark:text-primary-dark" />
//               </div>
//               <p className="text-sm text-muted-light dark:text-muted-dark">
//                 {item.desc}
//               </p>
//             </div>
//           ))}
//         </div>

//         <ChatInput onSendMessage={handleSendMessage} />
//       </div>
//     </div>
//   );
// };

// export default MainContent;

import React from "react";
import ChatInput from "./ChatInput";

const MainContent = ({ messages, isLoading, onSendMessage }) => {
  return (
    <div className="flex-1 flex flex-col h-full p-4 md:p-8 bg-background-light dark:bg-background-dark">
      <div className="max-w-4xl mx-auto w-full flex flex-col h-full">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-text-light dark:text-text-dark mb-4">
            How can we{" "}
            <span className="text-primary-light dark:text-primary-dark">
              assist
            </span>{" "}
            you today?
          </h1>
          <p className="text-sm md:text-base text-muted-light dark:text-muted-dark max-w-xl mx-auto">
            Get expert guidance powered by AI agents specializing in GitHub
            Repo.
          </p>
        </header>

        {/* Message Area */}
        <div className="flex-1 overflow-y-auto mb-4 space-y-4 px-2">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[90%] md:max-w-[80%] lg:max-w-[70%] p-3 rounded-lg ${
                  message.sender === "user"
                    ? "bg-primary-light text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-text-light dark:text-text-dark"
                }`}
              >
                <p className="break-words">{message.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[90%] md:max-w-[80%] lg:max-w-[70%] p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-100"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Chat Input */}
        <div className="mt-auto">
          <ChatInput onSendMessage={onSendMessage} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default MainContent;
