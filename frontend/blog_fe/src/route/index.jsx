import React from "react";
import { useRouteError, useRoutes } from "react-router-dom";
import ProfilePage from "../pages/ProfilePage";
import { PATHS } from "./route";
import CreateArticlePage from "../pages/articles/CreateArticlePage";
import ArticlePreview from "../components/article/ArticlePreview";
import CreateProjectPage from "../pages/projects/CreateProjectPage";
import { CreateCertification } from "../pages/certification/CreateCertification";
import EditCertification from "../pages/certification/EditCertification";
import EditArticlePage from "../pages/articles/EditArticlePage";
import { EditProjectPage } from "../pages/projects/EditProjectPage";
import SingleArticlePage from "../pages/articles/SingArticlePage";
import Login from "../pages/auth/Login";
//import Register from "../pages/auth/Register";
import ProtectedRoute from "../pages/auth/ProtectedRoute";
import Dashboard from "../pages/admin_dashboard/Dashboard";
import ProjectDashboardPage from "../pages/admin_dashboard/ProjectDashboardPage";
import ArticleDashboardPage from "../pages/admin_dashboard/ArticleDashboardPage";
import CertificDashboardPage from "../pages/admin_dashboard/CertificDashboardPage";
import ProfileDashboardPage from "../pages/admin_dashboard/ProfileDashboardPage";
import NotFoundPage from "../pages/error/NotFoundPage";
import DashboardPage from "../pages/admin_dashboard/DashboardPage";

export function Routes() {
  let element = useRoutes([
    // Public routes
    { path: PATHS.HOME, element: <ProfilePage /> },
    { path: PATHS.ADMIN.LOGIN, element: <Login /> },
    //{ path: PATHS.AUTH.REGISTER, element: <Register /> },
    { path: PATHS.ARTICLE.READ, element: <SingleArticlePage /> },

    // Protected routes

    {
      path: PATHS.ADMIN.DASHBOARD,
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <DashboardPage />,
        },

        {
          path: PATHS.ADMIN.PROJECT,
          element: <ProjectDashboardPage />,
        },
        {
          path: PATHS.ADMIN.ARTICLE,
          element: <ArticleDashboardPage />,
        },
        {
          path: PATHS.ADMIN.CERTIFICATION,
          element: <CertificDashboardPage />,
        },
        {
          path: PATHS.ADMIN.PROFILE,
          element: <ProfileDashboardPage />,
        },
      ],
    },

    {
      path: PATHS.ARTICLE.CREATE,
      element: (
        <ProtectedRoute>
          <CreateArticlePage />
        </ProtectedRoute>
      ),
    },
    {
      path: PATHS.ARTICLE.PREVIEW,
      element: (
        <ProtectedRoute>
          <ArticlePreview />
        </ProtectedRoute>
      ),
    },
    {
      path: PATHS.ARTICLE.EDIT,
      element: (
        <ProtectedRoute>
          <EditArticlePage />
        </ProtectedRoute>
      ),
    },
    {
      path: PATHS.PROJECT.CREATE,
      element: (
        <ProtectedRoute>
          <CreateProjectPage />
        </ProtectedRoute>
      ),
    },
    {
      path: PATHS.CERTIFICATION.CREATE,
      element: (
        <ProtectedRoute>
          <CreateCertification />
        </ProtectedRoute>
      ),
    },
    {
      path: PATHS.CERTIFICATION.EDIT,
      element: (
        <ProtectedRoute>
          <EditCertification />
        </ProtectedRoute>
      ),
    },

    {
      path: PATHS.PROJECT.EDIT,
      element: (
        <ProtectedRoute>
          <EditProjectPage />
        </ProtectedRoute>
      ),
    },
    // Catch all route - must be last
    { path: "*", element: <NotFoundPage /> },
  ]);

  return element;
}
