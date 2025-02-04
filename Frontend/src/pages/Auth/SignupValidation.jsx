export const validateForm = (formData, setError) => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all required fields.");
      return false;
    }
  
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return false;
    }
  
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
  
    return true;
  };
  