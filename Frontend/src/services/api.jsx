import axios from "axios";

const API = axios.create({
  baseURL: "https://xdqe34wtsh.execute-api.us-east-1.amazonaws.com/dev/api/v1",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
