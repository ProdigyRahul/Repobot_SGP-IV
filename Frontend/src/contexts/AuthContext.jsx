import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // Fetch user data on mount
    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            
            try {
                // Get token from local storage
                const token = localStorage.getItem("token");
                
                if (!token) {
                    // No token found, clear user state
                    setUser(null);
                    setIsAuthenticated(false);
                    setLoading(false);
                    return;
                }
                
                // Check if user data is cached in localStorage
                const cachedUser = JSON.parse(localStorage.getItem("user"));
                if (cachedUser) {
                    setUser(cachedUser);
                    setIsAuthenticated(true);
                    setLoading(false);
                    return;
                }
                
                // Fetch user data from API if no cached data
                const response = await axios.get("http://localhost:5000/api/auth/user", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                
                if (response.data) {
                    // Process user data
                    const userData = {
                        id: response.data._id,
                        name: response.data.name,
                        email: response.data.email,
                        photoURL: response.data.photoURL || null, // Store photo URL if available
                        // Store any other relevant user data
                    };
                    
                    setUser(userData);
                    setIsAuthenticated(true);
                    localStorage.setItem("user", JSON.stringify(userData));
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                // Handle token expired or invalid
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    setUser(null);
                    setIsAuthenticated(false);
                }
            } finally {
                setLoading(false);
            }
        };
        
        fetchUserData();
    }, []);

    const login = (userData, token) => {
        // Process user data to ensure all required fields
        const processedUser = {
            id: userData.id || userData._id,
            name: userData.name,
            email: userData.email,
            photoURL: userData.photoURL || null,
            // Add any other user fields needed
        };
        
        setUser(processedUser);
        setIsAuthenticated(true);
        
        // Save to local storage
        localStorage.setItem("user", JSON.stringify(processedUser));
        if (token) {
            localStorage.setItem("token", token);
        }
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        // Optionally call logout API endpoint
    };

    const updateProfile = (updatedData) => {
        const updatedUser = { ...user, ...updatedData };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
    };

    return (
        <AuthContext.Provider 
            value={{ 
                user, 
                isAuthenticated, 
                loading,
                login, 
                logout, 
                updateProfile 
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
