import React from 'react';
import logo from '../../assets/logo.png'

const ContactPage = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
       
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-purple-50">
            <nav className="flex items-center justify-between px-6 py-4">
                <div className="flex justify-center mb-4">
                    <img src={logo} alt="Repobot Logo" className="w-32 h-16" />
                </div>
                <div className="flex gap-6 items-center">
                    <a href="/" className="text-gray-600 hover:text-[#441752]">Home</a>
                    <a href="/features" className="text-gray-600 hover:text-[#441752]">Features</a>
                    <a href="/about" className="text-gray-600 ">About</a>
                    <a href="/contact" className="text-[#441752] hover:text-[#441752]">Contact</a>
                    <button className="bg-[#441752] text-white px-4 py-2 rounded-md hover:bg-[#441752]">
                        Sign Up
                    </button>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 py-16">
               
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-[#441752] mb-6">
                        Get in Touch
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Have questions about RepoBot? We're here to help! Reach out to our team
                        and we'll get back to you as soon as possible.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-[#441752] mb-6">Send us a Message</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label htmlFor="name" className="block text-gray-700 mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="email" className="block text-gray-700 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="subject" className="block text-gray-700 mb-2">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="message" className="block text-gray-700 mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    rows="4"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-[#441752] text-white px-6 py-3 rounded-md hover:bg-purple-800 transition-colors"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                
                    <div className="space-y-8">
                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold text-[#441752] mb-6">Contact Information</h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold text-[#441752]">Email</h3>
                                    <p className="text-gray-600">support@repobot.com</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-[#441752]">Phone</h3>
                                    <p className="text-gray-600">+1 (555) 123-4567</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-[#441752]">Address</h3>
                                    <p className="text-gray-600">
                                        123 Tech Street<br />
                                        Anand, Gujarat<br />
                                        India
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold text-[#441752] mb-6">Business Hours</h2>
                            <div className="space-y-2">
                                <p className="text-gray-600">
                                    <span className="font-semibold">Monday - Friday:</span><br />
                                    9:00 AM - 6:00 PM (IST)
                                </p>
                                <p className="text-gray-600">
                                    <span className="font-semibold">Saturday - Sunday:</span><br />
                                    Closed
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                
                <div className="text-center bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-3xl font-bold text-[#441752] mb-4">Frequently Asked Questions</h2>
                    <p className="text-gray-600 mb-6">
                        Check out our <a href="/faq" className="text-[#441752] hover:underline">FAQ page</a> for quick answers to common questions.
                    </p>
                    <a href="/faqs">
                    <button className="bg-[#441752] text-white px-6 py-3 rounded-md hover:bg-purple-800">
                        View FAQs
                    </button>
                    </a>
                </div>
            </div>

     
        </div>
    );
};

export default ContactPage;