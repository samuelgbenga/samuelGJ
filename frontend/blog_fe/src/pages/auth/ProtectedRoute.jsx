import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { PATHS } from "../../route/route";
import { USER } from "../../utils/constants";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const userStr = localStorage.getItem(USER);

  // Safely parse the user data
  let user = null;
  try {
    user = userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    console.error("Error parsing user data:", error);
    // If there's an error parsing, clear the invalid data
    localStorage.removeItem(USER);
  }

  // Check if we have a valid user with a token
  if (!user || !user.accessToken) {
    console.log("No valid user or token found, redirecting to login");
    return <Navigate to={PATHS.HOME} state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
