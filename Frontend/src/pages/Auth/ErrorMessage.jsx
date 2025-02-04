import React from "react";

const ErrorMessage = ({ message }) => {
  return (
    <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4">
      {message}
    </div>
  );
};

export default ErrorMessage;
