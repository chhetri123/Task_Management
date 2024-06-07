import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, setError, defaultState } from "../../store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { showNotification } from "../../store/notificationSlice";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");
  const [name, setName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(defaultState());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 8) {
      dispatch(setError("Password must be at least 8 characters"));
      return;
    }
    if (password !== conformPassword) {
      dispatch(setError("Passwords do not match"));
      return;
    }
    const role = isAdmin ? "admin" : "user";
    setIsLoading(true);

    dispatch(registerUser({ name, email, password, conformPassword, role }));
  };

  useEffect(() => {
    if (status === "succeeded") {
      setIsLoading(false);
      dispatch(defaultState());
      dispatch(
        showNotification({
          type: "success",
          message: "You have successfully registered",
        })
      );
      navigate("/");
    }
    if (status === "failed") {
      setIsLoading(false);
    }
  }, [status, navigate, dispatch]);

  return (
    <section className="flex justify-center items-center h-[90vh] bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl mb-4 text-center font-bold text-gray-700">
          Register
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="mb-4">
          <label className="block mb-2 text-gray-600">Name</label>
          <input
            type="text"
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
            onChange={(e) => setConformPassword(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
            className="mr-2 leading-tight"
          />
          <label className="text-gray-600">Is Admin</label>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 text-white p-2 rounded w-full max-w-xs"
          >
            {isLoading ? "Registering ..." : "Register"}
          </button>
        </div>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Register;
