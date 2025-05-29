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

export function Routes() {
  let element = useRoutes([
    { path: PATHS.HOME, element: <ProfilePage /> },
    { path: PATHS.ARTICLE.CREATE, element: <CreateArticlePage /> },
    { path: PATHS.ARTICLE.PREVIEW, element: <ArticlePreview /> },
    { path: PATHS.PROJECT.CREATE, element: <CreateProjectPage /> },
    { path: PATHS.CERTIFICATION.CREATE, element: <CreateCertification /> },
    { path: PATHS.CERTIFICATION.EDIT, element: <EditCertification /> },
    { path: PATHS.ARTICLE.EDIT, element: <EditArticlePage /> },
    { path: PATHS.PROJECT.EDIT, element: <EditProjectPage /> },
    { path: PATHS.ARTICLE.READ, element: <SingleArticlePage /> },
  ]);

  return element;
}
