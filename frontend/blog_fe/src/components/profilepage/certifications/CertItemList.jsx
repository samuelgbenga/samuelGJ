import React, { useEffect } from "react";
import CertItems from "./CertItems";
import { useCertifications } from "../../../hooks/useCertifications";



export const CertItemList = () => {
  const { isLoading, error, certListData, readCertificationList } =
    useCertifications();

  useEffect(() => {
    const fetchCertList = async () => {
      await readCertificationList();
    };
    fetchCertList();
   // certListData && console.log(certListData);
  }, []);

  useEffect(() => {
    console.log(certListData);
  }, [certListData]);

  return (
    <div className="mt-2">
      {certListData.map((item, index) => (
        <CertItems key={index} item={item} />
      ))}
    </div>
  );
};
