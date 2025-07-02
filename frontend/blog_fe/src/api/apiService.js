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

// ARTICLE APIS
// MAKE PHOTO UPDATE
export const post_photo_update = async (formData, id) => {
  try {
    const response = await multipartInstance.put(
      API_ENDPOINTS.ARTICLES.UPDATE_PHOTO(id),
      formData
    );
    if (!response.data) {
      throw new Error("No data received from server");
    }
    return response.data;
  } catch (error) {
    console.error("Error Updating Photo:", error);
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

// MAKE POST UPDATE
export const post_article_update = async (formData, id) => {
  try {
    const response = await apiClient.put(
      API_ENDPOINTS.ARTICLES.UPDATE(id),
      formData
    );
    if (!response.data) {
      throw new Error("No data received from server");
    }
    return response.data;
  } catch (error) {
    console.error("Error Updating Article:", error);
    throw error; // Re-throw the error to be handled by the hook
  }
};

// READ POST
export const read_article_list = async () => {
  try {
    const response = await apiClient.get(
      API_ENDPOINTS.ARTICLES.LIST,
    );
    if (!response.data) {
      throw new Error("No data received from server");
    }
    return response.data;
  } catch (error) {
    console.error("Error Reading Article list:", error);
    throw error; // Re-throw the error to be handled by the hook
  }
};

// DELETE POST
export const delete_article = async (id) => {
  try {
    const response = await apiClient.delete(
      API_ENDPOINTS.ARTICLES.DELETE(id),
    );
    if (!response.data) {
      throw new Error("No data received from server");
    }
    return response.data;
  } catch (error) {
    console.error("Error Deleting Article:", error);
    throw error; // Re-throw the error to be handled by the hook
  }
};


// MAKE PROJECT BABY
export const create_project = async (formData) => {
  try {
    const response = await multipartInstance.post(
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

// READ Projects
export const read_project_list = async () => {
  try {
    const response = await apiClient.get(
      API_ENDPOINTS.PROJECTS.LIST,
    );
    if (!response.data) {
      throw new Error("No data received from server");
    }
    return response.data;
  } catch (error) {
    console.error("Error Reading Project list:", error);
    throw error; // Re-throw the error to be handled by the hook
  }
};

// Delete the Project
export const delete_project = async (id) => {
  try {
    const response = await apiClient.delete(
      API_ENDPOINTS.PROJECTS.DELETE(id),
    );
    if (!response.data) {
      throw new Error("No data received from server");
    }
    return response.data;
  } catch (error) {
    console.error("Error Deleting Project:", error);
    throw error; // Re-throw the error to be handled by the hook
  }
};

// edit the Project
export const edit_project = async (id, formData) => {
  try {
    const response = await apiClient.put(
      API_ENDPOINTS.PROJECTS.UPDATE(id),
      formData
    );
    if (!response.data) {
      throw new Error("No data received from server");
    }
    return response.data;
  } catch (error) {
    console.error("Error Editing Project:", error);
    throw error; // Re-throw the error to be handled by the hook
  }
};

// READ Certifications
export const read_certification_list = async () => {
  try {
    const response = await apiClient.get(
      API_ENDPOINTS.CERTIFICATIONS.LIST,
    );
    if (!response.data) {
      throw new Error("No data received from server");
    }
    return response.data;
  } catch (error) {
    console.error("Error Reading Certification list:", error);
    throw error; // Re-throw the error to be handled by the hook
  }
};

// Delete the Project
export const delete_cert = async (id) => {
  try {
    const response = await apiClient.delete(
      API_ENDPOINTS.CERTIFICATIONS.DELETE(id),
    );
    if (!response.data) {
      throw new Error("No data received from server");
    }
    return response.data;
  } catch (error) {
    console.error("Error Deleting Certification:", error);
    throw error; // Re-throw the error to be handled by the hook
  }
};

// Delete the Project
export const edit_cert = async (id, formData) => {
  try {
    const response = await apiClient.put(
      API_ENDPOINTS.CERTIFICATIONS.UPDATE(id),
      formData
    );
    if (!response.data) {
      throw new Error("No data received from server");
    }
    return response.data;
  } catch (error) {
    console.error("Error Updating Certification:", error);
    throw error; // Re-throw the error to be handled by the hook
  }
};


