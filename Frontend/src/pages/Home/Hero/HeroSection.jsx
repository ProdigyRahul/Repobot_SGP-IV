import React from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-[#441752] mb-6">
          Transform Your Git Repo with{" "}
          <span className="text-[#A888B5]">AI</span>
        </h1>
        <p className="text-lg text-[#441752]/70 max-w-2xl mx-auto mb-8">
          Get expert guidance powered by RepoBot, specializing in GitHub project
          analysis, repository management, and code optimization. Start your
          journey today!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/repobot"
            className="bg-[#441752] text-white px-8 py-3 rounded-lg hover:bg-[#A888B5]/90 flex items-center justify-center"
          >
            Get Started
            <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
          <button className="border-2 border-[#441752] text-[#441752] px-8 py-3 rounded-lg hover:bg-[#441752]/5">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
