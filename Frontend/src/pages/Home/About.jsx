import React from 'react';
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import logo from '../../assets/logo.png'

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-purple-50">
            {/* Navigation bar */}
            <nav className="flex items-center justify-between px-6 py-4">
                <div className="flex justify-center mb-4">
                    <img src={logo} alt="Repobot Logo" className="w-32 h-16" />
                </div>
                <div className="flex gap-6 items-center">
                    <a href="/" className="text-gray-600 hover:text-[#441752]">Home</a>
                    <a href="/features" className="text-gray-600 hover:text-[#441752]">Features</a>
                    <a href="/about" className="text-[#441752]">About</a>
                    <a href="/contact" className="text-gray-600 hover:text-[#441752]">Contact</a>
                    <button className="bg-[#441752] text-white px-4 py-2 rounded-md hover:bg-[#441752]">
                        Sign Up
                    </button>
                </div>
            </nav>
            {/* <Navbar /> */}

            {/* Main content */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                {/* Hero section */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-[#441752] mb-6">
                        About RepoBot
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        We're revolutionizing Git repository management with advanced AI technology,
                        making code optimization and analysis more efficient than ever before.
                    </p>
                </div>

                {/* Mission section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-purple-900 mb-4">Our Mission</h2>
                        <p className="text-gray-600">
                            RepoBot aims to transform how developers interact with their Git repositories by leveraging
                            cutting-edge AI technology. We believe in making repository management more intuitive,
                            efficient, and intelligent.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-purple-900 mb-4">Our Vision</h2>
                        <p className="text-gray-600">
                            We envision a future where AI-powered tools seamlessly integrate with development workflows,
                            enabling teams to focus on innovation while our platform handles the complexity of repository
                            management.
                        </p>
                    </div>
                </div>

                {/* Team section */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-purple-900 mb-8">Our Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                role: 'Engineering',
                                description: 'Expert developers building the future of repository management'
                            },
                            {
                                role: 'AI Research',
                                description: 'Pioneering new approaches to code analysis and optimization'
                            },
                            {
                                role: 'Customer Success',
                                description: 'Dedicated to ensuring you get the most out of RepoBot'
                            }
                        ].map((team) => (
                            <div key={team.role} className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-bold text-[#441752] mb-3">{team.role}</h3>
                                <p className="text-gray-600">{team.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Call to action */}
                <div className="text-center bg-[#441752] text-white py-12 px-6 rounded-lg">
                    <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Git Workflow?</h2>
                    <p className="mb-8 text-lg">
                        Join thousands of developers who are already using RepoBot to optimize their repositories.
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
        /*Footer */

    );
};

export default AboutPage;