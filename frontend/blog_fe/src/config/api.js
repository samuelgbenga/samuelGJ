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
    UPDATE: (id) => `${API_VERSION}/articles/${id}`,
    DELETE: (id) => `${API_VERSION}/articles/${id}`,
    GET: (id) => `${API_VERSION}/articles/${id}`,
    CREATE_PHOTO: `${API_VERSION}/photos`,
  },
  PROJECTS: {
    LIST: `${API_VERSION}/projects`,
    CREATE: `${API_VERSION}/projects`,
    UPDATE: (id) => `${API_VERSION}/projects/${id}`,
    DELETE: (id) => `${API_VERSION}/projects/${id}`,
    GET: (id) => `${API_VERSION}/projects/${id}`,
  },
  CERTIFICATIONS: {
    LIST: `${API_VERSION}/certifications`,
    CREATE: `${API_VERSION}/certifications`,
    UPDATE: (id) => `${API_VERSION}/certifications/${id}`,
    DELETE: (id) => `${API_VERSION}/certifications/${id}`,
    GET: (id) => `${API_VERSION}/certifications/${id}`,
  },
};
