import axios from "axios";

const API = axios.create({
  // baseURL: import.meta.env.VITE_APP_BASE_URL,
  baseURL: "http://localhost:8000/api/v1",
  // baseURL: "https://task-manager-api.herokuapp.com/api/v1",
  // baseURL: "https://task-manager-api.herokuapp.com/api/v1",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
