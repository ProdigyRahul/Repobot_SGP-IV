import React from "react";
import {
  MessageCircle,
  Zap,
  Shield,
  Users,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img src={Logo} alt="Repobot Logo" className="mr-2 w-30 h-10" />
          </div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <a href="/" className="text-[#441752] font-medium">
                Home
              </a>
              <a
                href="/features"
                className="text-[#441752]/70 hover:text-[#441752]"
              >
                Features
              </a>
              <a
                href="/about"
                className="text-[#441752]/70 hover:text-[#441752]"
              >
                About
              </a>
              <a
                href="/contact"
                className="text-[#441752]/70 hover:text-[#441752]"
              >
                Contact
              </a>
              <Link
                to="/signup"
                className="bg-[#441752] text-white px-6 py-2 rounded-lg hover:bg-[#A888B5]/90"
              >
                Sign Up
              </Link>
            </div>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            {isOpen ? (
              <X className="w-6 h-6 text-[#441752]" />
            ) : (
              <Menu className="w-6 h-6 text-[#441752]" />
            )}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="/" className="block px-3 py-2 text-[#441752] font-medium">
              Home
            </a>
            <a href="/features" className="block px-3 py-2 text-[#441752]/70">
              Features
            </a>
            <a href="/about" className="block px-3 py-2 text-[#441752]/70">
              About
            </a>
            <a href="/contact" className="block px-3 py-2 text-[#441752]/70">
              Contact
            </a>
            <Link
              to="/repobot"
              className="w-full text-left px-3 py-2 text-white bg-[#441752] rounded-lg"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

const Feature = ({ icon: Icon, title, description }) => (
  <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
    <div className="w-12 h-12 bg-[#441752]/10 rounded-lg flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-[#441752]" />
    </div>
    <h3 className="text-xl font-semibold text-[#441752] mb-2">{title}</h3>
    <p className="text-[#441752]/70">{description}</p>
  </div>
);

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-[#A888B5]/10">
      <Navbar />
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-[#441752] mb-6">
              Transform Your Git Repo with{" "}
              <span className="text-[#A888B5]">AI</span>
            </h1>
            <p className="text-lg text-[#441752]/70 max-w-2xl mx-auto mb-8">
              Get expert guidance powered by RepoBot, specializing in GitHub
              project analysis, repository management, and code optimization.
              Start your journey today!
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
      </div>
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-t from-[#A888B5]/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Feature
              icon={MessageCircle}
              title="Smart Conversations"
              description="Engage in intelligent conversations with AI that understands your business context."
            />
            <Feature
              icon={Zap}
              title="Quick Results"
              description="Get instant insights and recommendations to drive your business forward."
            />
            <Feature
              icon={Shield}
              title="Secure Platform"
              description="Your data is protected with enterprise-grade security measures."
            />
          </div>
        </div>
      </div>
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
            <button className="bg-white text-[#441752] px-8 py-3 rounded-lg hover:bg-white/90">
              Start Free Trial
            </button>
          </div>
        </div>
      </div>{" "}
      <Footer />
    </div>
  );
};

export default LandingPage;
