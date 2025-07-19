import React, { useEffect } from "react";
import CertItems from "./CertItems";
import { useCertifications } from "../../../hooks/useCertifications";
import { Skeleton } from "@mui/material";

export const CertItemSkeleton = () => {
  return (
    <div className="flex items-center space-x-6 py-4 border-gray-700">
      <div className="w-22 h-22 flex items-center justify-center flex-shrink-0 overflow-hidden">
        <Skeleton
          variant="square"
          width={164}
          height={64}
          sx={{
            bgcolor: "grey.900",
          }}
        />
      </div>
      <div className="flex-1">
        <Skeleton
          variant="text"
          width="60%"
          height={28}
          sx={{
            bgcolor: "grey.900",
          }}
        />
        <Skeleton
          variant="text"
          width="80%"
          height={18}
          sx={{
            bgcolor: "grey.900",
          }}
        />
        <Skeleton
          variant="text"
          width="40%"
          height={16}
          sx={{
            bgcolor: "grey.900",
          }}
        />
      </div>
    </div>
  );
};

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
      {isLoading
        ? Array.from({ length: 3 }).map((_, idx) => (
            <CertItemSkeleton key={idx} />
          ))
        : certListData.map((item, index) => (
            <CertItems key={index} item={item} />
          ))}
    </div>
  );
};
