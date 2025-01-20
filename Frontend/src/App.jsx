import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./components/Navbar/Navbar";
import Repobot from "./pages/Repobot Landing/Repobot";
import Home from "./pages/Home/Home";
import { AuthModal } from "./components/Footer/Footer";
import Login from './components/Login'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/repobot" element={<Repobot />} />
        <Route path="/signup" element={<AuthModal />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
