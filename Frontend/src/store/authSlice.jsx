import { createSlice } from "@reduxjs/toolkit";
import api from "../services/api";

const initialState = {
  user: null,
  status: null,
  error: null,
  isLoggedIn: false,
};

export const loginUser = (credentials) => async (dispatch) => {
  try {
    const response = await api.post("/auth/login", credentials);
    if (response.data.status === "fail") {
      return dispatch(setError(response.data.message));
    }
    localStorage.setItem("token", response.data.token); // Store token in localStorage
    dispatch(loginSuccess(response.data.user));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const registerUser = (credentials) => async (dispatch) => {
  try {
    const response = await api.post("/auth/register", credentials);
    if (response.data.status === "fail") {
      return dispatch(setError(response.data.message));
    }
    if (response.data.status === "success") {
      localStorage.setItem("token", response.data.token);
      return dispatch(registerSuccess(response.data.user));
    }
  } catch (error) {
    const errMsg = JSON.parse(error.response.data.message);
    return dispatch(setError(errMsg.password || errMsg.email || errMsg.name));
  }
};
export const isUserLoggedIn = () => async (dispatch) => {
  try {
    const response = await api.get("/auth/islogin");
    if (response.data.status === "fail") {
      return dispatch(setErrorLoggedIn(response.data.message));
    }
    if (response.data.status === "success") {
      return dispatch(loginSuccess(response.data.user));
    }
  } catch (error) {
    dispatch(setError(error.message));
  }
};
export const logoutUser = () => async (dispatch) => {
  try {
    await api.get("/auth/logout");
    localStorage.removeItem("token"); // Remove token from localStorage
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(setError(error.message));
  }
};

// Slice for authentication
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    defaultState(state) {
      state.status = null;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.user = action.payload;
      state.status = "succeeded";
      state.error = null;
      state.isLoggedIn = true;
    },
    logoutSuccess(state) {
      state.user = null;
      state.status = "idle";
      state.error = null;
      state.isLoggedIn = false;
    },
    registerSuccess(state, action) {
      state.user = action.payload;
      state.status = "succeeded";
      state.error = null;
      state.isLoggedIn = true;
    },
    setError(state, action) {
      state.error = action.payload;
      state.status = "failed";
    },
    setErrorLoggedIn(state, action) {
      state.error = action.payload;
      state.status = "failed";
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const {
  loginSuccess,
  logoutSuccess,
  setError,
  registerSuccess,
  defaultState,
  setErrorLoggedIn,
} = authSlice.actions;

export default authSlice.reducer;
