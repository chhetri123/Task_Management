// components/Home.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/authSlice";

import Alert from "../components/Alert";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  return (
    <div className="flex justify-center h-screen">
      <div className="mt-4 justify-center">
        <h1 className="text-2xl">You task List </h1>
        {user ? (
          <div className="">you list item</div>
        ) : (
          <div className="">
            <Link
              to="/login"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              you have to login in to access this page
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
