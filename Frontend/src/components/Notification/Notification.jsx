// src/components/Notification.js
import React, { useEffect } from "react";

const Notification = ({ type, message, onClose, duration = 3000 }) => {
  const baseClasses =
    "p-4 rounded-md shadow-md flex items-center justify-between mb-4 z-50";
  const typeClasses =
    type === "success"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className={`${baseClasses} ${typeClasses}`}>
      <span>{message}</span>
      <button className="ml-4 text-lg font-bold" onClick={onClose}>
        ×
      </button>
    </div>
  );
};

export default Notification;
