import React from "react";

const Feature = ({ icon: Icon, title, description }) => (
  <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
    <div className="w-12 h-12 bg-[#441752]/10 rounded-lg flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-[#441752]" />
    </div>
    <h3 className="text-xl font-semibold text-[#441752] mb-2">{title}</h3>
    <p className="text-[#441752]/70">{description}</p>
  </div>
);

export default Feature;
