import React from "react";
import { MessageSquare, ChevronRight } from "lucide-react";

const Categories = () => (
  <div className="mb-6">
    <div className="px-2 mb-3 text-sm font-medium text-gray-400">Category</div>
    {[
      "Issue & Pull Request",
      "Code & Security Analysis",
      "AI-Powered Suggestions & Automation",
      "Collaboration & Community Engagement",
    ].map((item) => (
    {["Melita", "priyansi", "hasti", "Marketing"].map((item) => (
      <div
        key={item}
        className="flex items-center p-2 text-gray-300 rounded-lg cursor-pointer hover:bg-[#441752]/20"
      >
        <MessageSquare className="w-4 h-4 mr-3" />
        <span>{item}</span>
        <ChevronRight className="ml-auto w-4 h-4" />
      </div>
    ))}
  </div>
);  

export default Categories;
