import React from "react";
import { Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CallToAction = () => {
  const navigate = useNavigate();

  const handleStartTrial = () => {
    const isAuthenticated = localStorage.getItem("userToken"); 

    if (isAuthenticated) {
      navigate("/repobot"); 
    } else {
      navigate("/signup"); 
    }
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-[#441752] rounded-2xl p-8 md:p-12">
          <Users className="w-12 h-12 text-white mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Join thousands of developers already using RepoBot to streamline
            GitHub project analysis and elevate their coding success.
          </p>
          <button
            onClick={handleStartTrial}
            className="bg-white text-[#441752] px-8 py-3 rounded-lg hover:bg-white/90"
          >
            Start Free Trial
          </button>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
