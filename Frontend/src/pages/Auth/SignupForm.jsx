import React from "react";
import SignupFields from './SignupFields';

const SignupForm = ({ formData, handleChange, handleSubmit, isLoading }) => {
  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <SignupFields formData={formData} handleChange={handleChange} />

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full bg-[#441752] text-white py-2 rounded-lg transition-colors ${isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#A888B5]/90"}`}
      >
        {isLoading ? "Loading..." : "Create Account"}
      </button>
    </form>
  );
};

export default SignupForm;
