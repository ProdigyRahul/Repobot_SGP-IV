import React from "react";

const SuccessMessage = ({ message }) => {
  return (
    <div className="bg-green-50 text-green-500 p-3 rounded-lg mb-4">
      {message}
    </div>
  );
};

export default SuccessMessage;
