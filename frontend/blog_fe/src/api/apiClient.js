import axios from "axios";
import { API_BASE_URL } from "../config/api";
import { USER } from "../utils/constants";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  //httpsAgent: false, // Disable HTTPS this is only for development
  headers: {
    "Content-Type": "application/json",
  },
  //withCredentials: true, // include cookies for Spring Security if needed
});

export default axiosInstance;

// axios interceptors
// Modify src/api/axios.js
// todo: will store an object instead of directly storing the token
// inject a automatically if the user have a token
axiosInstance.interceptors.request.use(
  (config) => {
    const admin = localStorage.getItem(USER) ? JSON.parse(localStorage.getItem(USER)) :  null;
    if (admin && admin?.token) {
      config.headers.Authorization = `Bearer ${admin.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// intercept to Return custom error for 401 and 404
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API call failed:", error);
    // Handle specific error cases
    if (error.response.status === 401) {
      console.log("Unauthorized: ");
    } else if (error.response.status === 404) {
      // Not found
      console.log("Not Found: ");
    }
    return Promise.reject(error);
  }
);
