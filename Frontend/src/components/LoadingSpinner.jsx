// src/components/LoadingSpinner.js
import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-blue-500"></div>
    </div>
  );
};

export default LoadingSpinner;
