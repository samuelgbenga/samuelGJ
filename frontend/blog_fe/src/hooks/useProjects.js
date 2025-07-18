import React, { useState, useEffect } from "react";
import {
  add_photo_update,
  create_project,
  delete_project,
  delete_project_photo,
  edit_project,
  read_project_list,
} from "../api/apiService";

export const useProjects = () => {
  const [projectData, setProjectData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [projectListData, setProjectListData] = useState([]);

  // create project
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

  // read project list
  const readProjectList = async () => {
    //  console.log("Login started...");
    setIsLoading(true);
    setError(null);
    try {
      const response = await read_project_list();
      //  console.log("Login successful:", response);

      setProjectListData(response.content);
      return response;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "An error occurred during Reading Project List";
      //  console.log("Login failed:", errorMessage);
      setError(errorMessage);
      throw errorMessage;
    } finally {
      setIsLoading(false);
      //  console.log("Login finished, loading set to false");
    }
  };

  // delete project
  const deleteProject = async (id) => {
    //  console.log("Login started...");
    setIsLoading(true);
    setError(null);
    try {
      const response = await delete_project(id);
      //  console.log("Login successful:", response);

      // setProjectListData(response);
      return response;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "An error occurred during Deleting Project";
      //  console.log("Login failed:", errorMessage);
      setError(errorMessage);
      throw errorMessage;
    } finally {
      setIsLoading(false);
      //  console.log("Login finished, loading set to false");
    }
  };

  // edit project
  const editProject = async (id, formData) => {
    //  console.log("Login started...");
    setIsLoading(true);
    setError(null);
    try {
      const response = await edit_project(id, formData);
      //  console.log("Login successful:", response);

      setProjectData(response);
      return response;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "An error occurred during Editing Project";
      //  console.log("Login failed:", errorMessage);
      setError(errorMessage);
      throw errorMessage;
    } finally {
      setIsLoading(false);
      //  console.log("Login finished, loading set to false");
    }
  };

  // delete photo from project
  const deletePhotoFromProject = async (id, photoId) => {
    //  console.log("Login started...");
    setIsLoading(true);
    setError(null);
    try {
      const response = await delete_project_photo(id, photoId);
      //  console.log("Login successful:", response);
      // setProjectListData(response);
      return response;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "An error occurred during Deleting Photo from Project";
      //  console.log("Login failed:", errorMessage);
      setError(errorMessage);
      throw errorMessage;
    } finally {
      setIsLoading(false);
      //  console.log("Login finished, loading set to false");
    }
  };

  // add photo to project
  const addPhotoToProject = async (id, formData) => {
    //  console.log("Login started...");
    setIsLoading(true);
    setError(null);
    try {
      const response = await add_photo_update(id, formData);
      //  console.log("Login successful:", response);

      setProjectData(response);
      return response;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "An error occurred during Update Photo to Project";
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
    projectListData,
    editProject,
    deleteProject,
    setProjectListData,
    createProject,
    readProjectList,
    deletePhotoFromProject,
    addPhotoToProject,
  };
};
