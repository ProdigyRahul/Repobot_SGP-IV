import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./components/Navbar/Navbar";
import Repobot from "./pages/Repobot Landing/Repobot";
import Home from "./pages/Home/Home";
<<<<<<< Updated upstream
import { AuthModal } from "./components/Footer/Footer";
import Login from './components/Login'
=======
import Auth from "./pages/Auth/Auth";

>>>>>>> Stashed changes

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/repobot" element={<Repobot />} />
<<<<<<< Updated upstream
        <Route path="/signup" element={<AuthModal />} />
        <Route path="/login" element={<Login />} />
=======
      
        <Route path="/login" element={<Auth />} />
>>>>>>> Stashed changes
      </Routes>
    </Router>
  );
};

export default App;
