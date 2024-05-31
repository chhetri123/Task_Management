import React, { useState, useEffect } from "react";

const Alert = ({ message, type }) => {
  const [show, setShow] = useState(true);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      const transitionTimer = setTimeout(() => {
        setVisible(false);
      }, 1000); // 500ms = 0.5s

      return () => clearTimeout(transitionTimer);
    }, 2000); // 2000ms = 2s

    return () => clearTimeout(timer);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed top-[9%] left-[80%] mt-6 ml-6 z-50 border  shadow-2xl">
      <div
        className={`w-64 py-2 px-4 rounded-md text-center font-semibold text-white transition-opacity duration-500 ease-in-out ${
          type === "success" ? "bg-green-600" : "bg-red-600"
        } ${show ? "opacity-100" : "opacity-0"}`}
      >
        {message}
      </div>
    </div>
  );
};

export default Alert;
