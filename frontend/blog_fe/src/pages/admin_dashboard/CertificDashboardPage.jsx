import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PATHS } from "../../route/route";
import { useCertifications } from "../../hooks/useCertifications";
import { usePreserveScroll } from "../../utils/scrollconfig";
import { LuCirclePlus } from "react-icons/lu";

const CertificDashboardPage = () => {
  const {
    isLoading,
    error,
    readCertificationList,
    setCertListData,
    certListData,
    deleteCert,
  } = useCertifications();

  const { saveScroll, restoreScroll } = usePreserveScroll();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticleList = async () => {
      try {
        await readCertificationList();
      } catch (err) {
        console.log("the err:", err);
        console.log("the error:", error);
      }
    };
    fetchArticleList();
  }, []);

  const handleEditCertificate = (cert) => {
    // Placeholder: store cert in sessionStorage and navigate to edit page
    sessionStorage.setItem("editCertificate", JSON.stringify(cert));
    navigate(PATHS.CERTIFICATION.CREATE);
    //]console.log("Edit certificate:", cert.id);
  };

  const handleDeleteCertificate = async (id) => {
    saveScroll();
    console.log("Delete Certification:", id);
    try {
      const response = await deleteCert(id);
      if (response) {
        setCertListData((prev) =>
          Array.isArray(prev) ? prev.filter((item) => item.id !== id) : []
        );
        restoreScroll();
      }
    } catch (err) {
      console.log(err);
      console.log(error);
    }
  };

  return (
    <div className="p-6 text-black">
      <div className="flex justify-between items-center mb-6 ">
        <h1 className="text-2xl font-bold mt-8 mb-4">Certificates</h1>
        <Link
          to={PATHS.CERTIFICATION.CREATE}
          className="text-blue-500 text-2xl"
        >
          <LuCirclePlus />
        </Link>
      </div>

      {isLoading ? (
        <p>Loading certificates...</p>
      ) : error ? (
        <p>Error loading certificates</p>
      ) : (
        <div className="space-y-2">
          {certListData?.map((cert) => (
            <div
              key={cert.id}
              className="p-4 bg-white rounded shadow flex justify-between items-center"
            >
              <span className="flex-1">{cert.name}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditCertificate(cert)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCertificate(cert.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CertificDashboardPage;
