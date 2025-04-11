import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    if (error.response) {
      return Promise.reject(error.response.data);
    } else if (error.request) {
      return Promise.reject({ message: "Server not responding. Please try again later." });
    }
    return Promise.reject({ message: "An error occurred. Please try again." });
  }
);

export default api;