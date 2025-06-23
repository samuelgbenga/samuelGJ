import { useState } from "react";
import { delete_cert, edit_cert, post_cert, read_certification_list } from "../api/apiService";

export const useCertifications = () => {
  const [certData, setCertData] = useState(null);
  const [certListData, setCertListData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const postCert = async (formData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await post_cert(formData);
      //  console.log("Login successful:", response);
      // Set localStorage first
      //localStorage.setItem(USER, JSON.stringify(response));
      // Then update state
      setCertData(response);
      return response;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "An error occurred during Cert Creation";
      //  console.log("Login failed:", errorMessage);
      setError(errorMessage);
      throw errorMessage;
    } finally {
      setIsLoading(false);
      //  console.log("Login finished, loading set to false");
    }
  };

  const readCertificationList = async () => {
    //  console.log("Login started...");
    setIsLoading(true);
    setError(null);
    try {
      const response = await read_certification_list();
      //  console.log("Login successful:", response);

      setCertListData(response.content);
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

  const deleteCert = async (id) => {
    //  console.log("Login started...");
    setIsLoading(true);
    setError(null);
    try {
      const response = await delete_cert(id);
      //  console.log("Login successful:", response);
      return response;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "An error occurred Deleting article";
      //  console.log("Login failed:", errorMessage);
      setError(errorMessage);
      throw errorMessage;
    } finally {
      setIsLoading(false);
      //  console.log("Login finished, loading set to false");
    }
  };

  const editCert = async (id, formData) => {
    //  console.log("Login started...");
    setIsLoading(true);
    setError(null);
    try {
      const response = await edit_cert(id, formData);
      //  console.log("Login successful:", response);
      return response;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "An error occurred Edit article";
      //  console.log("Login failed:", errorMessage);
      setError(errorMessage);
      throw errorMessage;
    } finally {
      setIsLoading(false);
      //  console.log("Login finished, loading set to false");
    }
  };

  return {
    certData,
    error,
    isLoading,
    certListData,
    editCert,
    setCertListData,
    deleteCert,
    readCertificationList,
    postCert,
  };
};
