import React, { useState, useEffect } from "react";
import { post_article, post_photo } from "../api/apiService";

export const useArticles = () => {
  const [photoData, setPhotoData] = useState(null);
  const [articleData, setArticleData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const postPhoto = async (formData) => {
    //  console.log("Login started...");
    setIsLoading(true);
    setError(null);
    try {
      const response = await post_photo(formData);
      //  console.log("Login successful:", response);
      // Set localStorage first
      //localStorage.setItem(USER, JSON.stringify(response));
      // Then update state
      setPhotoData(response);
      return response;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "An error occurred during Photo Upload";
      //  console.log("Login failed:", errorMessage);
      setError(errorMessage);
      throw errorMessage;
    } finally {
      setIsLoading(false);
      //  console.log("Login finished, loading set to false");
    }
  };


  const postArticle = async (formData) => {
    //  console.log("Login started...");
    setIsLoading(true);
    setError(null);
    try {
      const response = await post_article(formData);
      //  console.log("Login successful:", response);
     
      setArticleData(response);
      return response;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "An error occurred during Article Posting";
      //  console.log("Login failed:", errorMessage);
      setError(errorMessage);
      throw errorMessage;
    } finally {
      setIsLoading(false);
      //  console.log("Login finished, loading set to false");
    }
  };

  return {
    photoData,
    error,
    isLoading,
    articleData,
    postPhoto,
    postArticle,
  };
};
