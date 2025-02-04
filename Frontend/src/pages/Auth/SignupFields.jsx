import React from "react";
import { Mail, Lock, User } from "lucide-react";

const SignupFields = ({ formData, handleChange }) => {
  return (
    <>
      <div>
        <label className="block text-sm font-medium text-[#441752] mb-1">Name</label>
        <div className="relative">
          <User className="absolute left-3 top-3 w-5 h-5 text-[#441752]/40" />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2 border-2 border-[#441752]/10 rounded-lg focus:border-[#A888B5] focus:outline-none"
            placeholder="John Doe"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#441752] mb-1">Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 w-5 h-5 text-[#441752]/40" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2 border-2 border-[#441752]/10 rounded-lg focus:border-[#A888B5] focus:outline-none"
            placeholder="you@example.com"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#441752] mb-1">Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 w-5 h-5 text-[#441752]/40" />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2 border-2 border-[#441752]/10 rounded-lg focus:border-[#A888B5] focus:outline-none"
            placeholder="••••••••"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#441752] mb-1">Confirm Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 w-5 h-5 text-[#441752]/40" />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2 border-2 border-[#441752]/10 rounded-lg focus:border-[#A888B5] focus:outline-none"
            placeholder="••••••••"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#441752] mb-1">Phone Number</label>
        <div className="relative">
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2 border-2 border-[#441752]/10 rounded-lg focus:border-[#A888B5] focus:outline-none"
            placeholder="+1 (555) 123-4567"
          />
        </div>
      </div>
    </>
  );
};

export default SignupFields;
