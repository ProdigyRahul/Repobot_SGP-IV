import React, { useState } from "react";
import { Mail, Lock, User } from "lucide-react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#441752]/5 to-[#A888B5]/10 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-[#441752] mb-6 text-center">
          {isLogin ? "Welcome to RepoBot" : "Create Account"}
        </h2>

        <form className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-[#441752] mb-1">
                Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-[#441752]/40" />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border-2 border-[#441752]/10 rounded-lg focus:border-[#A888B5] focus:outline-none"
                  placeholder="John Doe"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-[#441752] mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-[#441752]/40" />
              <input
                type="email"
                className="w-full pl-10 pr-4 py-2 border-2 border-[#441752]/10 rounded-lg focus:border-[#A888B5] focus:outline-none"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#441752] mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-[#441752]/40" />
              <input
                type="password"
                className="w-full pl-10 pr-4 py-2 border-2 border-[#441752]/10 rounded-lg focus:border-[#A888B5] focus:outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          {!isLogin && (
            <>
              <div>
                <label className="block text-sm font-medium text-[#441752] mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-[#441752]/40" />
                  <input
                    type="password"
                    className="w-full pl-10 pr-4 py-2 border-2 border-[#441752]/10 rounded-lg focus:border-[#A888B5] focus:outline-none"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#441752] mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    className="w-full pl-10 pr-4 py-2 border-2 border-[#441752]/10 rounded-lg focus:border-[#A888B5] focus:outline-none"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            </>
          )}

          <button className="w-full bg-[#A888B5] text-white py-2 rounded-lg hover:bg-[#A888B5]/90 transition-colors">
            {isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-[#441752]/70">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={handleToggle}
            className="text-[#A888B5] hover:underline"
          >
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
