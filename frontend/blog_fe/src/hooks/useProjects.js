import React, { useState, useEffect } from "react";
import { create_project } from "../api/apiService";

export const useProjects = () => {
  const [projectData, setProjectData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const createProject = async (formData) => {
    //  console.log("Login started...");
    setIsLoading(true);
    setError(null);
    try {
      const response = await create_project(formData);
      //  console.log("Login successful:", response);
      // Set localStorage first
      //localStorage.setItem(USER, JSON.stringify(response));
      // Then update state
      setProjectData(response);
      return response;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "An error occurred during Project Creation";
      //  console.log("Login failed:", errorMessage);
      setError(errorMessage);
      throw errorMessage;
    } finally {
      setIsLoading(false);
      //  console.log("Login finished, loading set to false");
    }
  };

  return {
    projectData,
    error,
    isLoading,
    createProject,
  };
};
