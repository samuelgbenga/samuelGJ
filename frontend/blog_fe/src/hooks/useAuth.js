import { useState, useEffect } from "react";
import { login as loginService } from "../api/apiService";
import { USER } from "../utils/constants";

export const useLoginHook = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Add effect to log state changes
  useEffect(() => {
    console.log("Auth State Updated:", { data, error, isLoading });
  }, [data, error, isLoading]);

  const login = async (credentials) => {
    console.log("Login started...");
    setIsLoading(true);
    setError(null);
    try {
      const response = await loginService(credentials);
      console.log("Login successful:", response);
      // Set localStorage first
      localStorage.setItem(USER, JSON.stringify(response));
      // Then update state
      setData(response);
      return response;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "An error occurred during login";
      console.log("Login failed:", errorMessage);
      setError(errorMessage);
      throw errorMessage;
    } finally {
      setIsLoading(false);
      console.log("Login finished, loading set to false");
    }
  };

  const logout = () => {
    console.log("Logout called");
    setData(null);
    setError(null);
    localStorage.removeItem(USER);
  };

  return {
    data,
    error,
    isLoading,
    login,
    logout,
    isAuthenticated: !!data,
  };
};
