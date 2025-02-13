import React from "react";
import {
  FolderGit2,
  FileText,
  Mic,
  Bot,
  Zap,
  Search,
  GitPullRequest,
  Link,
  Lock,
  Users,
  LayoutDashboard,
  Bell,
  Moon,
} from "lucide-react";
import logo from "../../assets/Logo.png";

const FeaturesPage = () => {
  const features = [
    {
      title: "GitHub Repository Management",
      description:
        "Efficient repo management with features like creating, deleting, and organizing repositories.",
      Icon: FolderGit2,
    },
    {
      title: "GitHub Repository Summarization",
      description:
        "AI-powered repo analysis that provides concise summaries of repositories.",
      Icon: FileText,
    },
    {
      title: "Speech-to-Text Converter",
      description: "Enables voice commands for repository interactions.",
      Icon: Mic,
    },
    {
      title: "Chatbot for GitHub Analysis",
      description:
        "NLP-based chatbot to answer queries about repositories, commits, and contributors.",
      Icon: Bot,
    },
    {
      title: "AI-Powered Code Insights",
      description:
        "Provides suggestions for code improvement, bug detection, and optimization.",
      Icon: Zap,
    },
    {
      title: "GitHub Repo Search and Filter",
      description:
        "Advanced search functionality to find repositories based on keywords, topics, or contributors.",
      Icon: Search,
    },
    {
      title: "Automated Pull Request and Issue Tracking",
      description:
        "Helps manage PRs and issues efficiently with AI-generated summaries.",
      Icon: GitPullRequest,
    },
    {
      title: "GitHub API Integration",
      description: "Fetching and displaying repository data in real-time.",
      Icon: Link,
    },
    {
      title: "User Authentication System",
      description: "Secure login and signup functionality.",
      Icon: Lock,
    },
    {
      title: "Collaboration & Team Management",
      description:
        "Features to invite and manage team members within the platform.",
      Icon: Users,
    },
    {
      title: "Repo Activity Dashboard",
      description:
        "Visual representations of repository activities and contributions.",
      Icon: LayoutDashboard,
    },
    {
      title: "Notifications & Alerts",
      description:
        "Alerts for new commits, PRs, or issues assigned to the user.",
      Icon: Bell,
    },
    {
      title: "Dark Mode Support",
      description: "A toggle for dark/light themes.",
      Icon: Moon,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50">
      <nav className="flex items-center justify-between px-6 py-4">
        <div className="flex justify-center mb-4">
          <img src={logo} alt="Repobot Logo" className="w-32 h-16" />
        </div>
        <div className="flex gap-6 items-center">
          <a href="/" className="text-gray-600 hover:text-[#441752]">
            Home
          </a>
          <a href="/features" className="text-[#441752]">
            Features
          </a>
          <a href="/about" className="text-gray-600 hover:text-[#441752]">
            About
          </a>
          <a href="/contact" className="text-gray-600 hover:text-[#441752]">
            Contact
          </a>
          <button className="bg-[#441752] text-white px-4 py-2 rounded-md hover:bg-purple-800">
            Sign Up
          </button>
        </div>
      </nav>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-[#441752] mb-6">
              Powerful Features of RepoBot
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enhance your GitHub experience with AI-powered repository
              management and smart insights.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white p-8 rounded-lg shadow-md 
                                hover:shadow-2xl hover:scale-105 transform 
                                transition-all duration-300 cursor-pointer
                                hover:bg-[#441752]"
              >
                <div className="mb-6 flex justify-center">
                  <feature.Icon
                    size={32}
                    className="text-[#441752] group-hover:text-white 
                                        transform group-hover:scale-110 transition-all duration-300"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[#441752] group-hover:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 group-hover:text-gray-200">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-xl text-gray-600 mb-8">
              Ready to experience these powerful features?
            </p>
            <button
              className="bg-[#441752] text-white px-8 py-4 rounded-md 
                            hover:bg-purple-800 transform hover:scale-105 
                            transition-all duration-300 text-lg font-semibold"
            >
              Get Started Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;
