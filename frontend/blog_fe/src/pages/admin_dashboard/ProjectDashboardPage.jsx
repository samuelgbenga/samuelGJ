import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PATHS } from "../../route/route";
import { useProjects } from "../../hooks/useProjects";
import { usePreserveScroll } from "../../utils/scrollconfig";
import { LuCirclePlus } from "react-icons/lu";
import SkLoader from "../../components/dashboard/SkLoader";

const ProjectDashboardPage = () => {
  const {
    isLoading: projectIsLoading,
    projectListData,
    error: projectError,
    readProjectList,
    setProjectListData,
    deleteProject,
  } = useProjects();

  const { saveScroll, restoreScroll } = usePreserveScroll();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticleList = async () => {
      try {
        await readProjectList();
      } catch (err) {
        console.log("the err:", err);
        console.log("the error:", error);
      }
    };
    fetchArticleList();
  }, []);

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

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold mt-8 mb-4 text-white">Projects</h1>
          <Link
            to={PATHS.PROJECT.CREATE}
            className="text-blue-400 text-2xl hover:text-blue-300"
          >
            <LuCirclePlus />
          </Link>
        </div>

        {/* Loading / Error / List */}
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
          <div className="space-y-3">
            {projectListData?.map((project) => (
              <div
                key={project.id}
                className="p-4 bg-[#1a1a1a] border border-gray-700 rounded-lg shadow flex justify-between items-center"
              >
                <span className="flex-1 text-gray-100 font-medium">
                  {project.name}
                </span>
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
                    Delete {projectIsLoading && "ing..."}
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

export default ProjectDashboardPage;
