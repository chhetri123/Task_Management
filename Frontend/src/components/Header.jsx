import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoIosLogIn } from "react-icons/io";
import Logout from "../components/Auth/Logout"; // replace with your actual action
import React, { useState, useEffect, useRef } from "react";

//
export default function Header() {
  //
  const [showMenu, setShowMenu] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const menuRef = useRef(null);

  //
  useEffect(() => {
    setShowMenu(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  });

  const handleModel = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  };

  return (
    <nav className="flex items-center justify-between p-3 border-b-2 mt-3">
      <div className=" flex items-center justify-between w-[80%] m-auto">
        <Link
          to="/"
          className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
        >
          <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
            Task
          </span>
          &nbsp; Manager
        </Link>
        {user && user.role === "admin" ? (
          <div className="text-2xl font-bold text-blue-900"> Admin Pannel</div>
        ) : null}
        <div className="flex gap-6 " ref={menuRef}>
          {user ? (
            <div className="relative inline-block  text-left">
              <div>
                <button
                  type="button"
                  className="inline-flex justify-center  items-center  w-full bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2"
                  id="options-menu"
                  onClick={handleModel}
                >
                  <img
                    className="h-10 w-10 rounded-full"
                    src="https://pics.craiyon.com/2023-05-31/220e4c73f6674d46a84840ebde9f9bc8.webp"
                    alt=""
                  />
                  <span className="items-center ml-3 font-bold text-xl">
                    Profile
                  </span>
                </button>
              </div>
              {showMenu ? (
                <>
                  <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      <div
                        className="px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                      >
                        @{user.name}
                      </div>
                      <div
                        className="px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                      >
                        {user.email}
                      </div>
                      <Logout />
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          ) : (
            <Link
              to="/login"
              className="text-sm flex flex-row bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-500 rounded-lg px-4 py-2 sm:text-xl font-semibold"
            >
              Login &nbsp;
              <IoIosLogIn className="mt-[2px] font-bold" size={25} />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
