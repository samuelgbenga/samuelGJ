import { API_ENDPOINTS } from "../config/api";
import apiClient from "./apiClient";

// auth Service

export const login = async (credentials) => {
  try {
    const response = await apiClient.post(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );
    if (!response.data) {
      throw new Error("No data received from server");
    }
    return response.data;
  } catch (error) {
    console.error("Error Login:", error);
    throw error; // Re-throw the error to be handled by the hook
  }
};
