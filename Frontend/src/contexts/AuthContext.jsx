import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Fetch user data from localStorage or an API
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
            setIsAuthenticated(true);
        }
    }, []); // Add an empty dependency array

    const login = (userData) => {
        setUser({ ...userData }); // Ensure the user state is updated with a new object reference
        setIsAuthenticated(true); // Update authentication state
        localStorage.setItem("user", JSON.stringify(userData)); // Store user data in localStorage
    };

    const logout = () => {
        setUser(null); // Clear user state
        setIsAuthenticated(false); // Update authentication state
        localStorage.removeItem("user"); // Remove user data from localStorage
    };

    const updateProfile = (updatedData) => {
        const updatedUser = { ...user, ...updatedData };
        setUser(updatedUser); // Update user state
        localStorage.setItem("user", JSON.stringify(updatedUser)); // Update localStorage
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
