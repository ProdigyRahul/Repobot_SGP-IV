import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./components/Navbar/Navbar";
import Repobot from "./pages/Repobot Landing/Repobot";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import { AuthModal } from "/src/components/Footer/Footer.jsx";

import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";
import About from "./pages/Home/About";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/repobot" element={<Repobot />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
