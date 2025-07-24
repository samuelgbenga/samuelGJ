import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PATHS } from "../../route/route";
import { useProjects } from "../../hooks/useProjects";
import { usePreserveScroll } from "../../utils/scrollconfig";
import { LuCirclePlus } from "react-icons/lu";

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
    <div className="p-6 text-black">
      {" "}
      <div>
        {/* Project List Section */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold mt-8 mb-4">Projects</h1>
          <Link to={PATHS.PROJECT.CREATE} className="text-blue-500 text-2xl">
            <LuCirclePlus />
          </Link>
        </div>

        {projectIsLoading ? (
          <p>Loading projects...</p>
        ) : projectError ? (
          <p>Error loading projects</p>
        ) : (
          <div className="space-y-2">
            {projectListData &&
              projectListData?.map((project) => (
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
      </div>
    </div>
  );
};

export default ProjectDashboardPage;
