import { API_ENDPOINTS } from "../config/api";
import apiClient, { multipartInstance } from "./apiClient";

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


// ARTICLE APIS
// MAKE PHOTO
export const post_photo = async (formData) => {
  try {
    const response = await multipartInstance.post(
      API_ENDPOINTS.ARTICLES.CREATE_PHOTO,
      formData
    );
    if (!response.data) {
      throw new Error("No data received from server");
    }
    return response.data;
  } catch (error) {
    console.error("Error Adding Photo:", error);
    throw error; // Re-throw the error to be handled by the hook
  }
};

// MAKE POST
export const post_article = async (formData) => {
  try {
    const response = await multipartInstance.post(
      API_ENDPOINTS.ARTICLES.CREATE,
      formData
    );
    if (!response.data) {
      throw new Error("No data received from server");
    }
    return response.data;
  } catch (error) {
    console.error("Error creating Article:", error);
    throw error; // Re-throw the error to be handled by the hook
  }
};


// MAKE PROJECT BABY
export const create_project = async (formData) => {
  try {
    const response = await apiClient.post(
      API_ENDPOINTS.PROJECTS.CREATE,
      formData
    );
    if (!response.data) {
      throw new Error("No data received from server");
    }
    return response.data;
  } catch (error) {
    console.error("Error creating Project:", error);
    throw error; // Re-throw the error to be handled by the hook
  }
};


// Post Certifications
export const post_cert = async (formData) => {
  try {
    const response = await multipartInstance.post(
      API_ENDPOINTS.CERTIFICATIONS.CREATE,
      formData
    );
    if (!response.data) {
      throw new Error("No data received from server");
    }
    return response.data;
  } catch (error) {
    console.error("Error creating Cert:", error);
    throw error; // Re-throw the error to be handled by the hook
  }
};




