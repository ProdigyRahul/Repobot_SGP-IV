// import React from "react";
// import {
//   Mail,
//   Lock,
//   User,
//   Github,
//   Twitter,
//   Linkedin,
//   MessageCircle,
// } from "lucide-react";

// const AuthModal = () => {
//   const isLogin = "false";
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#441752]/5 to-[#A888B5]/10 p-4">
//       <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
//         <h2 className="text-2xl font-bold text-[#441752] mb-6 text-center">
//           {isLogin ? "Welcome to RepoBot" : "Create Account"}
//         </h2>

//         <form className="space-y-4">
//           {!isLogin && (
//             <div>
//               <label className="block text-sm font-medium text-[#441752] mb-1">
//                 Name
//               </label>
//               <div className="relative">
//                 <User className="absolute left-3 top-3 w-5 h-5 text-[#441752]/40" />
//                 <input
//                   type="text"
//                   className="w-full pl-10 pr-4 py-2 border-2 border-[#441752]/10 rounded-lg focus:border-[#A888B5] focus:outline-none"
//                   placeholder="John Doe"
//                 />
//               </div>
//             </div>
//           )}

//           <div>
//             <label className="block text-sm font-medium text-[#441752] mb-1">
//               Email
//             </label>
//             <div className="relative">
//               <Mail className="absolute left-3 top-3 w-5 h-5 text-[#441752]/40" />
//               <input
//                 type="email"
//                 className="w-full pl-10 pr-4 py-2 border-2 border-[#441752]/10 rounded-lg focus:border-[#A888B5] focus:outline-none"
//                 placeholder="you@example.com"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-[#441752] mb-1">
//               Password
//             </label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-3 w-5 h-5 text-[#441752]/40" />
//               <input
//                 type="password"
//                 className="w-full pl-10 pr-4 py-2 border-2 border-[#441752]/10 rounded-lg focus:border-[#A888B5] focus:outline-none"
//                 placeholder="••••••••"
//               />
//             </div>
//           </div>

//           <button className="w-full bg-[#A888B5] text-white py-2 rounded-lg hover:bg-[#A888B5]/90 transition-colors">
//             {isLogin ? "Sign In" : "Create Account"}
//           </button>
//         </form>

//         <div className="mt-6 text-center text-sm text-[#441752]/70">
//           {isLogin ? "Don't have an account? " : "Already have an account? "}
//           <a href="#" className="text-[#A888B5] hover:underline">
//             {isLogin ? "Sign up" : "Sign in"}
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Footer = () => {
//   return (
//     <footer className="bg-[#441752]">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//           <div className="space-y-4">
//             <h3 className="text-white text-lg font-bold">Repobot</h3>
//             <p className="text-white/70 text-sm">
//               AI-powered business solutions for modern enterprises
//             </p>
//             <div className="flex space-x-4">
//               <a href="#" className="text-white/70 hover:text-white">
//                 <Twitter className="w-5 h-5" />
//               </a>
//               <a href="#" className="text-white/70 hover:text-white">
//                 <Github className="w-5 h-5" />
//               </a>
//               <a href="#" className="text-white/70 hover:text-white">
//                 <Linkedin className="w-5 h-5" />
//               </a>
//             </div>
//           </div>

//           <div>
//             <h4 className="text-white font-medium mb-4">Product</h4>
//             <ul className="space-y-2">
//               {["Features", "Solutions", "Enterprise", "Pricing"].map(
//                 (item) => (
//                   <li key={item}>
//                     <a
//                       href="#"
//                       className="text-white/70 hover:text-white text-sm"
//                     >
//                       {item}
//                     </a>
//                   </li>
//                 )
//               )}
//             </ul>
//           </div>

//           <div>
//             <h4 className="text-white font-medium mb-4">Company</h4>
//             <ul className="space-y-2">
//               {["About", "Careers", "Blog", "Contact"].map((item) => (
//                 <li key={item}>
//                   <a
//                     href="#"
//                     className="text-white/70 hover:text-white text-sm"
//                   >
//                     {item}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div>
//             <h4 className="text-white font-medium mb-4">Support</h4>
//             <ul className="space-y-2">
//               {["Help Center", "API Docs", "Privacy", "Terms"].map((item) => (
//                 <li key={item}>
//                   <a
//                     href="#"
//                     className="text-white/70 hover:text-white text-sm"
//                   >
//                     {item}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         <div className="mt-8 pt-8 border-t border-white/10">
//           <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//             <p className="text-white/70 text-sm">
//               © 2025 Repobot. All rights reserved.
//             </p>
//             <div className="flex items-center gap-2 text-white/70">
//               <MessageCircle className="w-4 h-4" />
//               <span className="text-sm">24/7 Support Available</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export { AuthModal, Footer };



import React, { useState } from "react";
import {
  Mail,
  Lock,
  User,
  Github,
  Twitter,
  Linkedin,
  MessageCircle,
} from "lucide-react";

const AuthModal = () => {
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
          <button onClick={handleToggle} className="text-[#A888B5] hover:underline">
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#441752]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-white text-lg font-bold">Repobot</h3>
            <p className="text-white/70 text-sm">
              AI-powered business solutions for modern enterprises
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/70 hover:text-white">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-white">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-white">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Product</h4>
            <ul className="space-y-2">
              {["Features", "Solutions", "Enterprise", "Pricing"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-white/70 hover:text-white text-sm"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Company</h4>
            <ul className="space-y-2">
              {["About", "Careers", "Blog", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-white/70 hover:text-white text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Support</h4>
            <ul className="space-y-2">
              {["Help Center", "API Docs", "Privacy", "Terms"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-white/70 hover:text-white text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/70 text-sm">
              © 2025 Repobot. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-white/70">
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm">24/7 Support Available</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { AuthModal, Footer };
