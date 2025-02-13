import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import logo from "../../assets/logo.png";

const AboutPage = () => {
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
          <a href="/features" className="text-gray-600 hover:text-[#441752]">
            Features
          </a>
          <a href="/about" className="text-[#441752]">
            About
          </a>
          <a href="/contact" className="text-gray-600 hover:text-[#441752]">
            Contact
          </a>
          <button className="bg-[#441752] text-white px-4 py-2 rounded-md hover:bg-[#441752]">
            Sign Up
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-[#441752] mb-6">
            About RepoBot
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're revolutionizing Git repository management with advanced AI
            technology, making code optimization and analysis more efficient
            than ever before.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600">
              By utilizing state-of-the-art AI technology, RepoBot seeks to
              revolutionize the way developers engage with their Git
              repositories. We are committed to improving the intelligence,
              efficiency, and intuitiveness of repository administration.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">
              Our Vision
            </h2>
            <p className="text-gray-600">
              Our technology manages the intricacy of repositories, allowing
              teams to concentrate on innovation in a future where AI-powered
              technologies smoothly interact with development workflows.
            </p>
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-purple-900 mb-8">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                role: "Priyansi Borda",
                description:
                  "Backend Developer and ML Engineer working on OpenAI API integration.",
              },
              {
                role: "Melita Castelino",
                description:
                  "Working on GitHub API integration, Backend Development and ML Engineer.",
              },
              {
                role: "Hasti Babaria",
                description:
                  "Frontend Developer, UI/UX Designer and ML Engineer",
              },
            ].map((team) => (
              <div
                key={team.role}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-bold text-[#441752] mb-3">
                  {team.role}
                </h3>
                <p className="text-gray-600">{team.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center bg-[#441752] text-white py-12 px-6 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Git Workflow?
          </h2>
          <p className="mb-8 text-lg">
            Join thousands of developers who are already using RepoBot to
            optimize their repositories.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-white text-[#441752] px-6 py-3 rounded-md hover:bg-gray-100">
              Get Started
            </button>
            <button className="border border-white px-6 py-3 rounded-md hover:bg-[#441752]">
              Learn More
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
