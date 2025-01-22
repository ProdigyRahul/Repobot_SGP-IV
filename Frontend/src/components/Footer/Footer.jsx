
import React from "react";
import { Github, Twitter, Linkedin, MessageCircle } from "lucide-react";

export const AuthModal = () => {
  return (
    <div>
      <h1>Authentication Modal</h1>
      <p>Content for the authentication modal.</p>
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

export default Footer;  
