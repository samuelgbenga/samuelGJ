import React, { useEffect } from "react";
import { useArticles } from "../../hooks/useArticles";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../route/route";
import { useProjects } from "../../hooks/useProjects";
import { useCertifications } from "../../hooks/useCertifications";
import { usePreserveScroll } from "../../utils/scrollconfig";
import SkLoader from "../../components/dashboard/SkLoader";

const DashboardPage = () => {
  const {
    isLoading,
    articleListData,
    error,
    readArticleList,
    deleteArticle,
    setArticleListData,
  } = useArticles();

  const {
    isLoading: projectIsLoading,
    projectListData,
    error: projectError,
    readProjectList,
    setProjectListData,
    deleteProject,
  } = useProjects();

  const {
    isLoading: certIsLoading,
    error: certError,
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
        await readArticleList();
        const response = await readProjectList();
        await readCertificationList();
        console.log(response);
      } catch (err) {
        console.log("the err:", err);
        console.log("the error:", error);
      }
    };
    fetchArticleList();
  }, []);

  const handleEdit = (article) => {
    console.log("Edit article:", article);
    // Add your edit logic here
    sessionStorage.setItem("draftEditArticle", JSON.stringify(article));

    navigate(PATHS.ARTICLE.EDIT.replace(":id", article.id));
  };

  const handleDelete = async (articleId) => {
    saveScroll();
    console.log("Delete article:", articleId);
    try {
      const response = await deleteArticle(articleId);
      if (response) {
        setArticleListData((prev) =>
          prev.filter((item) => item.id !== articleId)
        );
        restoreScroll();
      }
    } catch (err) {
      console.log(err);
      console.log(error);
    }
    // Add your delete logic here
  };

  const handleDeleteProject = async (id) => {
    saveScroll();
    console.log("Delete project:", id);
    try {
      const response = await deleteProject(id);
      if (response) {
        setProjectListData(
          (prev) => Array.isArray(prev) && prev.filter((item) => item.id !== id)
        );
        restoreScroll();
      }
    } catch (err) {
      console.log(err);
      console.log(projectError);
    }
  };

  const handleEditProject = (project) => {
    sessionStorage.setItem("editProject", JSON.stringify(project));
    navigate(PATHS.PROJECT.CREATE);
  };

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
      console.log(certError);
    }
  };

  return (
    <div className="p-6 bg-[#0e0e0e] text-gray-100 min-h-screen">
      {/* Articles Section */}
      <h1 className="text-2xl font-bold mb-4 text-white">Articles</h1>
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
        <p className="text-red-400">Error loading articles</p>
      ) : (
        <div className="space-y-2">
          {articleListData?.map((article) => (
            <div
              key={article.id}
              className="p-4 bg-[#1a1a1a] border border-gray-800 rounded-lg shadow flex justify-between items-center"
            >
              <span className="flex-1 text-gray-100">{article.title}</span>
              <div className="flex gap-2">
                <div
                  className={`px-3 py-1 rounded-full transition-colors flex items-center text-sm font-semibold tracking-wide ${
                    article.postStatus === "DRAFT"
                      ? "text-red-400 bg-red-900/30"
                      : "text-green-400 bg-green-900/30"
                  }`}
                >
                  {article.postStatus.charAt(0) +
                    article.postStatus.slice(1).toLowerCase()}
                </div>
                <button
                  onClick={() => handleEdit(article)}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(article.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Projects Section */}
      <h1 className="text-2xl font-bold mt-8 mb-4 text-white">Projects</h1>
      {projectIsLoading ? (
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
      ) : projectError ? (
        <p className="text-red-400">Error loading projects</p>
      ) : (
        <div className="space-y-2">
          {projectListData?.map((project) => (
            <div
              key={project.id}
              className="p-4 bg-[#1a1a1a] border border-gray-800 rounded-lg shadow flex justify-between items-center"
            >
              <span className="flex-1 text-gray-100">{project.name}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditProject(project)}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProject(project.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Certificates Section */}
      <h1 className="text-2xl font-bold mt-8 mb-4 text-white">Certificates</h1>
      {certIsLoading ? (
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
      ) : certError ? (
        <p className="text-red-400">Error loading certificates</p>
      ) : (
        <div className="space-y-2">
          {certListData?.map((cert) => (
            <div
              key={cert.id}
              className="p-4 bg-[#1a1a1a] border border-gray-800 rounded-lg shadow flex justify-between items-center"
            >
              <span className="flex-1 text-gray-100">{cert.name}</span>
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
  );
};

export default DashboardPage;
