import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../store/authSlice"; // replace with your actual action
import react, { useState, useEffect, useRef } from "react";
export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const menuRef = useRef(null);
  useEffect(() => {
    setShowMenu(false);
  }, [user]);

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

  const handleSignout = async () => {
    dispatch(logoutSuccess());
    navigate("/");
  };
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
          &nbsp; Manage
        </Link>
        <div className="flex gap-6 " ref={menuRef}>
          {user ? (
            <div className="relative inline-block  text-left">
              <div>
                <button
                  type="button"
                  className="inline-flex justify-center w-full bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2"
                  id="options-menu"
                  onClick={handleModel}
                >
                  <img
                    className="h-10 w-10 rounded-full"
                    src="https://pics.craiyon.com/2023-05-31/220e4c73f6674d46a84840ebde9f9bc8.webp"
                    alt=""
                  />
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
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                        onClick={handleSignout}
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          ) : (
            <Link
              to="/login"
              className="text-sm  bg-blue-200  rounded-sm px-4 py-2 sm:text-xl font-semibold"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
