import React, { useEffect } from "react";
import { useArticles } from "../../hooks/useArticles";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../route/route";
import { useProjects } from "../../hooks/useProjects";
import { useCertifications } from "../../hooks/useCertifications";
import { usePreserveScroll } from "../../utils/scrollconfig";

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
        setProjectListData((prev) =>
          Array.isArray(prev) && prev.filter((item) => item.id !== id)
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
    <div className="p-6 text-black">
      <h1 className="text-2xl font-bold mb-4">Articles</h1>
      {isLoading ? (
        <p>Loading articles...</p>
      ) : error ? (
        <p>Error loading articles</p>
      ) : (
        <div className="space-y-2">
          {articleListData?.map((article) => (
            <div
              key={article.id}
              className="p-4 bg-white rounded shadow flex justify-between items-center"
            >
              <span className="flex-1">{article.title}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(article)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(article.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Project List Section */}
      <h1 className="text-2xl font-bold mt-8 mb-4">Projects</h1>
      {projectIsLoading ? (
        <p>Loading projects...</p>
      ) : projectError ? (
        <p>Error loading projects</p>
      ) : (
        <div className="space-y-2">
          {projectListData && projectListData?.map((project) => (
            <div
              key={project.id}
              className="p-4 bg-white rounded shadow flex justify-between items-center"
            >
              <span className="flex-1">{project.name}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditProject(project)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProject(project.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Delete {projectIsLoading && "ing..."}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Certificate List Section */}
      <h1 className="text-2xl font-bold mt-8 mb-4">Certificates</h1>
      {certIsLoading ? (
        <p>Loading certificates...</p>
      ) : certError ? (
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

export default DashboardPage;
