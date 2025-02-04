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

        <ChatInput />
      </div>
    </div>
  );
};

export default MainContent;
