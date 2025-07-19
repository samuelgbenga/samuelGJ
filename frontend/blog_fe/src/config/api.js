export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const API_VERSION = "/api/v1";

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_VERSION}/auth/signIn`,
    REGISTER: `${API_VERSION}/auth/signup`,
  },
  ARTICLES: {
    LIST: `${API_VERSION}/posts`,
    CREATE: `${API_VERSION}/posts`,
    UPDATE: (id) => `${API_VERSION}/posts/${id}`,
    DELETE: (id) => `${API_VERSION}/posts/${id}`,
    GET: (id) => `${API_VERSION}/posts/${id}`,
    CREATE_PHOTO: `${API_VERSION}/photos`,
    UPDATE_PHOTO: (id) => `${API_VERSION}/posts/update_photo/${id}`,
    CLAP:(postId) => `${API_VERSION}/posts/${postId}/clap`,
    GET_COMMENTS : (postId) => `${API_VERSION}/posts/${postId}/comments`,
    
  },
  PROJECTS: {
    LIST: `${API_VERSION}/projects`,
    CREATE: `${API_VERSION}/projects`,
    UPDATE: (id) => `${API_VERSION}/projects/${id}`,
    DELETE: (id) => `${API_VERSION}/projects/${id}`,
    GET: (id) => `${API_VERSION}/projects/${id}`,
    ADD_PHOTO: (id) => `${API_VERSION}/projects/${id}/add_photos`,
    DELETE_PHOTO: (id, photoId) => `${API_VERSION}/projects/${id}/delete_photos?photoId=${photoId}`,
  },
  CERTIFICATIONS: {
    LIST: `${API_VERSION}/certifications`,
    CREATE: `${API_VERSION}/certifications`,
    UPDATE: (id) => `${API_VERSION}/certifications/${id}`,
    DELETE: (id) => `${API_VERSION}/certifications/${id}`,
    GET: (id) => `${API_VERSION}/certifications/${id}`,
  },
};
