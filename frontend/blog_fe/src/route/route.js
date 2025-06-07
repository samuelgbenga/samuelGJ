import SingBlogPage from "../pages/articles/SingArticlePage";

export const PATHS = {
  HOME: "/",
  ADMIN: {
    DASHBOARD: "/admin_dashboard",
    LOGIN: "/admin_login",
    //REGISTER: "/register"
    ARTICLE: "/admin_dashboard/article",
    PROJECT: "/admin_dashboard/project",
    CERTIFICATION: "/admin_dashboard/certification",
    PROFILE: "/admin_dashboard/profile",
  },
  PROJECT: "/project/:id",
  CERTIFICATION: "/certification/:id",
  ARTICLE: {
    CREATE: "/create/article",
    PREVIEW: "/article/preview",
    EDIT: "/edit/article/:id",
    READ: "/article/:id",
  },
  PROJECT: { CREATE: "/create/project", EDIT: "/edit/project/:id" },
  CERTIFICATION: {
    CREATE: "/create/certification",
    EDIT: "/edit/certification/:id",
  },

  EDIT: {
    ARTICLE: "/edit/article/:id",
    PROJECT: "/edit/project/:id",
    CERTIFICATION: "/edit/certification/:id",
  },
};
