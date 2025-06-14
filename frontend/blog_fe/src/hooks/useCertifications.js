import { useState } from "react";
import { post_cert } from "../api/apiService";

export const useCertifications = () => {
  const [certData, setCertData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const postCert = async (formData) =>{

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
          err.response?.data?.message ||
          "An error occurred during Cert Creation";
        //  console.log("Login failed:", errorMessage);
        setError(errorMessage);
        throw errorMessage;
      } finally {
        setIsLoading(false);
        //  console.log("Login finished, loading set to false");
      }

  }


  return {
    certData,
    error,
    isLoading,
    postCert
  };
};
