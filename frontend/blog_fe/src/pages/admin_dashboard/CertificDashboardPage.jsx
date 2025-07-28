import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PATHS } from "../../route/route";
import { useCertifications } from "../../hooks/useCertifications";
import { usePreserveScroll } from "../../utils/scrollconfig";
import { LuCirclePlus } from "react-icons/lu";
import SkLoader from "../../components/dashboard/SkLoader";

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
  <div className="min-h-screen bg-[#0f0f0f] text-white">
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold mt-8 mb-4 text-white">
          Certificates
        </h1>
        <Link
          to={PATHS.CERTIFICATION.CREATE}
          className="text-blue-400 text-2xl hover:text-blue-300"
        >
          <LuCirclePlus />
        </Link>
      </div>

      {/* Loading / Error / List */}
      {isLoading ? (
        <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="p-4 bg-[#1a1a1a] border border-gray-700 rounded-lg shadow"
              >
                <SkLoader />
              </div>
            ))}
          </div>
      ) : error ? (
        <p className="text-red-400">Error loading certificates</p>
      ) : (
        <div className="space-y-3">
          {certListData?.map((cert) => (
            <div
              key={cert.id}
              className="p-4 bg-[#1a1a1a] border border-gray-700 rounded-lg shadow flex justify-between items-center"
            >
              <span className="flex-1 text-gray-100 font-medium">
                {cert.name}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditCertificate(cert)}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCertificate(cert.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

};

export default CertificDashboardPage;
