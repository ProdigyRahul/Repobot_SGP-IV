import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

const AuthSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  useEffect(() => {
    const handleAuth = async () => {
      // Get token from URL query params
      const params = new URLSearchParams(location.search);
      const token = params.get('token');

      if (token) {
        try {
          // Store token in localStorage
          localStorage.setItem('token', token);
          
          // Fetch user data with the token
          const response = await axios.get('http://localhost:5000/api/auth/user', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          
          // Login with user data
          if (response.data) {
            login(response.data, token);
          }
          
          // Redirect to dashboard after a brief delay
          setTimeout(() => {
            navigate('/dashboard');
          }, 1500);
        } catch (error) {
          console.error('Error fetching user data:', error);
          // If error, redirect to login
          localStorage.removeItem('token');
          setTimeout(() => navigate('/login'), 1500);
        }
      } else {
        // If no token found, redirect to login
        navigate('/login');
      }
    };

    handleAuth();
  }, [location, navigate, login]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-light to-accent-light dark:from-primary-dark dark:to-accent-dark p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-background-dark rounded-2xl shadow-2xl border border-border-dark/20 w-full max-w-md p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ 
            duration: 0.6,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent-dark flex items-center justify-center"
        >
          <svg 
            className="w-8 h-8 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 13l4 4L19 7" 
            />
          </svg>
        </motion.div>
        <h2 className="text-2xl font-bold text-primary-dark mb-2">Authentication Successful!</h2>
        <p className="text-text-dark/70 mb-6">You are being redirected to your dashboard...</p>
      </motion.div>
    </div>
  );
};

export default AuthSuccess; 