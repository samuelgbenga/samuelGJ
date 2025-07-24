import React, { useState, useEffect } from "react";
import {
  comment,
  delete_article,
  get_comments,
  post_article,
  post_article_update,
  post_clap,
  post_photo,
  post_photo_update,
  read_article_list,
} from "../api/apiService";

export const useArticles = () => {
  const [photoData, setPhotoData] = useState(null);
  const [photoUpdateData, setPhotoUpdateData] = useState(null);
  const [articleData, setArticleData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [articleListData, setArticleListData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [comments, setComments] = useState([]);

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

  const postPhotoUpdate = async (formData, id) => {
    //  console.log("Login started...");
    setIsLoading(true);
    setError(null);
    try {
      const response = await post_photo_update(formData, id);
      //  console.log("Login successful:", response);
      // Set localStorage first
      //localStorage.setItem(USER, JSON.stringify(response));
      // Then update state
      setPhotoUpdateData(response.photo);
      return response.photo;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "An error occurred during Photo Update";
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
        err.response?.data?.message ||
        "An error occurred during Article Posting";
      //  console.log("Login failed:", errorMessage);
      setError(errorMessage);
      throw errorMessage;
    } finally {
      setIsLoading(false);
      //  console.log("Login finished, loading set to false");
    }
  };

  const updateArticle = async (formData, id) => {
    //  console.log("Login started...");
    setIsLoading(true);
    setError(null);
    try {
      const response = await post_article_update(formData, id);
      //  console.log("Login successful:", response);

      setArticleData(response);
      return response;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "An error occurred during Article Update";
      //  console.log("Login failed:", errorMessage);
      setError(errorMessage);
      throw errorMessage;
    } finally {
      setIsLoading(false);
      //  console.log("Login finished, loading set to false");
    }
  };

  const readArticleList = async () => {
    //  console.log("Login started...");
    setIsLoading(true);
    setError(null);
    try {
      const response = await read_article_list();
      //  console.log("Login successful:", response);

      setArticleListData(response.content);
      return response;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "An error occurred during Article Posting";
      //  console.log("Login failed:", errorMessage);
      setError(errorMessage);
      throw errorMessage;
    } finally {
      setIsLoading(false);
      //  console.log("Login finished, loading set to false");
    }
  };

  // DELETE ARTICLE
  const deleteArticle = async (id) => {
    //  console.log("Login started...");
    setIsLoading(true);
    setError(null);
    try {
      const response = await delete_article(id);
      //  console.log("Login successful:", response);

      setDeleteData(response);
      return response;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "An error occurred deleting Article";
      //  console.log("Login failed:", errorMessage);
      setError(errorMessage);
      throw errorMessage;
    } finally {
      setIsLoading(false);
      //  console.log("Login finished, loading set to false");
    }
  };


  const putClap = async (postId) => {
    //  console.log("Login started...");
    setIsLoading(true);
    setError(null);
    try {
      const response = await post_clap
      (postId);
      //  console.log("Login successful:", response);

      return response;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "An error occurred during Clapping to Posting";
      //  console.log("Login failed:", errorMessage);
      setError(errorMessage);
      throw errorMessage;
    } finally {
      setIsLoading(false);
      //  console.log("Login finished, loading set to false");
    }
  };

  const getComments = async (postId) => {
    //  console.log("Login started...");
    setIsLoading(true);
    setError(null);
    try {
      const response = await get_comments(postId);
      //  console.log("Login successful:", response);
      setComments(response.content);
      return response;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "An error occurred getting comments to Posting";
      //  console.log("Login failed:", errorMessage);
      setError(errorMessage);
      throw errorMessage;
    } finally {
      setIsLoading(false);
      //  console.log("Login finished, loading set to false");
    }
  };


    const makeComment = async (postId, formData) => {
    //  console.log("Login started...");
    setIsLoading(true);
    setError(null);
    try {
      const response = await comment(postId, formData);
      //  console.log("Login successful:", response);
     // setComments(response.content);
      return response;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "An error occurred during Commenting to Posting";
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
    photoUpdateData,
    error,
    isLoading,
    articleData,
    articleListData,
    comments,
    setArticleListData,
    deleteData,
    makeComment,
    getComments,
    putClap,
    deleteArticle,
    updateArticle,
    postPhotoUpdate,
    postPhoto,
    postArticle,
    readArticleList,
  };
};
