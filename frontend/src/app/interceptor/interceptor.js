import axios from "axios";

export const apiInstance = axios.create({
  baseURL: "http://localhost:7004",
});

// Add token to every request if exists
apiInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
