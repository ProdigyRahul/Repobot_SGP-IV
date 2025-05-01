import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { AuthProvider } from "./contexts/AuthContext"; // Import AuthProvider
import Repobot from "./pages/Repobot Landing/Repobot";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile"; // Import Profile component
import Footer from "./components/Footer/Footer";
import { AuthModal } from "/src/components/Footer/Footer.jsx";
import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";
import About from "./pages/Home/About";
import Contact from "./pages/Home/Contact";
import FAQs from "./pages/Home/FAQs/FAQs";
import Feature from "./pages/Home/Feature";
import Dashboard from "./pages/Dashboard/Dashboard";
import SpeechtoText from "./pages/SpeechtoText/SpeechtoText";
import ChatBot from "./pages/Home/Chatbot";
import FileSummarization from "./pages/File Summarization/File-summarization";

const App = () => {
  return (
    <Router>
      <AuthProvider>
       
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard/repobot" element={<Repobot />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/features" element={<Feature />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/speech-text" element={<SpeechtoText />} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/filesummarization" element={<FileSummarization />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
};

export default App;
