export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `/auth/signIn`,
    REGISTER: `/auth/signup`,
  },
  ARTICLES: {
    LIST: `/articles`,
    CREATE: `/articles`,
    UPDATE: (id) => `/articles/${id}`,
    DELETE: (id) => `/articles/${id}`,
    GET: (id) => `/articles/${id}`,
  },
  PROJECTS: {
    LIST: `/projects`,
    CREATE: `/projects`,
    UPDATE: (id) => `/projects/${id}`,
    DELETE: (id) => `/projects/${id}`,
    GET: (id) => `/projects/${id}`,
  },
  CERTIFICATIONS: {
    LIST: `/certifications`,
    CREATE: `/certifications`,
    UPDATE: (id) => `/certifications/${id}`,
    DELETE: (id) => `/certifications/${id}`,
    GET: (id) => `/certifications/${id}`,
  },
};
