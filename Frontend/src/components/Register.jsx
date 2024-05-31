// components/Register.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, setError, defaultState } from "../store/authSlice";
// import { setAlert } from "../store/alertSlice";
import { Link, useNavigate } from "react-router-dom";
import Alert from "./Alert";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setconformPassword] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const { status: state, error } = useSelector((state) => state.auth);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== conformPassword) {
      dispatch(setError("Passwords do not match"));
      return;
    }
    dispatch(registerUser({ name, email, password, conformPassword }));
  };

  useEffect(() => {
    if (state === "succeeded") {
      // setAlert({
      //   message: "Registration successful",
      //   type: "success",
      //   show: true,
      // });
      dispatch(defaultState());
      navigate("/");
    }
  });

  return (
    <section className="flex justify-center items-center h-[90vh] bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-1/3"
      >
        <h2 className="text-2xl mb-4 text-center font-bold text-gray-700">
          Register
        </h2>
        {error ? <p className="text-red-500 text-center">{error}</p> : null}
        <div className="mb-4">
          <label className="block mb-2 text-gray-600">Name</label>
          <input
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Confirm Password</label>
          <input
            type="password"
            value={conformPassword}
            onChange={(e) => setconformPassword(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Register
        </button>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </form>
      {alert.show && <Alert message={alert.message} type={alert.type} />}
    </section>
  );
};

export default Register;
