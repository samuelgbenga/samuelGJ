import axios from "axios";
import { API_BASE_URL } from "../config/api";
import { USER } from "../utils/constants";
import { getOrCreateAnonymousId } from "../utils/idGenerator";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  //httpsAgent: false, // Disable HTTPS this is only for development
  headers: {
    "Content-Type": "application/json",
    "X-Anonymous-ID": getOrCreateAnonymousId().id,
    "X-Anonymous-Name": getOrCreateAnonymousId().username
  },
  //withCredentials: true, // include cookies for Spring Security if needed
});

// Create a separate instance for multipart/form-data
const multipartInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Add interceptors to both instances
[axiosInstance, multipartInstance].forEach((instance) => {
  // Request interceptor
  //console.log("from interceptor");
  instance.interceptors.request.use(
    (config) => {
      const admin = localStorage.getItem(USER)
        ? JSON.parse(localStorage.getItem(USER))
        : null;

      if (admin?.accessToken) {
        config.headers.Authorization = `Bearer ${admin.accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error("API call failed:", error);
      if (error.response?.status === 401) {
        console.log("Unauthorized: Token may be invalid or expired");
        // Optionally redirect to login or refresh token
      } else if (error.response?.status === 404) {
        console.log("Not Found: Resource not found");
      }
      return Promise.reject(error);
    }
  );
});

// Export both instances
export { multipartInstance };
export default axiosInstance;
