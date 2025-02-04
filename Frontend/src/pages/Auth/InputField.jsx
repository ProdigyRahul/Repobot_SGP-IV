import React from "react";
import { Mail, Lock } from "lucide-react";

const InputField = ({ label, type, name, placeholder, value, onChange, icon }) => {
  const IconComponent = icon === "Mail" ? Mail : Lock;
  
  return (
    <div>
      <label className="block text-sm font-medium text-[#441752] mb-1">{label}</label>
      <div className="relative">
        <IconComponent className="absolute left-3 top-3 w-5 h-5 text-[#441752]/40" />
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full pl-10 pr-4 py-2 border-2 border-[#441752]/10 rounded-lg focus:border-[#A888B5] focus:outline-none"
          placeholder={placeholder}
          required
        />
      </div>
    </div>
  );
};

export default InputField;
