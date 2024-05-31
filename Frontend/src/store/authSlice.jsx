import { createSlice } from "@reduxjs/toolkit";
import api from "../services/api";

const initialState = {
  user: null,
  status: null,
  error: null,
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
    return dispatch(setError(error.response.data.message));
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("token"); // Remove token from localStorage
  dispatch(logoutSuccess());
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
    },
    logoutSuccess(state) {
      state.user = null;
      state.status = "idle";
    },
    registerSuccess(state, action) {
      state.user = action.payload;
      state.status = "succeeded";
      state.error = null;
    },
    setError(state, action) {
      state.error = action.payload;
      state.status = "failed";
    },
  },
});

export const {
  loginSuccess,
  logoutSuccess,
  setError,
  registerSuccess,
  defaultState,
  setLoading,
} = authSlice.actions;

export default authSlice.reducer;
