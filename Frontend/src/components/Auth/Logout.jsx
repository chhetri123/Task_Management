import React from "react";
import { useDispatch } from "react-redux";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../store/authSlice";
import { taskInitalState } from "../../store/taskSlice";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignout = () => {
    dispatch(logoutUser());
    dispatch(taskInitalState());
    navigate("/");
  };
  return (
    <>
      <button
        className="flex flex-row w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
        role="menuitem"
        onClick={handleSignout}
      >
        Sign out &nbsp; <IoIosLogOut className="mt-1 font-bold" />
      </button>
    </>
  );
};
export default Logout;
