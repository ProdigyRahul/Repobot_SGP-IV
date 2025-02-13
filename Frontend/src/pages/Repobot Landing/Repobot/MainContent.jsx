import React from "react";
import Header from "./Header";
import { ArrowRight } from "lucide-react";
import ChatInput from "./ChatInput";

const MainContent = () => {
  return (
    <div className="flex-1 p-4 md:p-8">
      <div className="max-w-4xl mx-auto pt-14 md:pt-0">
        <Header />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            {
              "title": "Repository Insights",
              "desc": "Analyze and understand repository trends and usage."
            },
            {
              "title": "Collaboration Strategies",
              "desc": "Learn best practices for managing contributions and team workflows."
            },
            {
              "title": "Code Quality & Reviews",
              "desc": "Get tips on maintaining high code quality and effective code reviews."
            },
            {
              "title": "General Repository Support",
              "desc": "Need help with repository setup, management, or troubleshooting?"
            }
            
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

        <ChatInput />
      </div>
    </div>
  );
};

export default MainContent;
