import React, { useEffect } from "react";
import ProjectItem from "./ProjectItem";
import { useProjects } from "../../../hooks/useProjects";

function ProjectsList() {
  const {
    isLoading,
    projectListData,
    error,
    readProjectList,
    setProjectListData,
    deleteProject,
  } = useProjects();

  useEffect(() => {
    const fetchProjectList = async () => {
      await readProjectList();
    };
    fetchProjectList();
    console.log(projectListData);
  }, []);

  return (
    <div className="flex-[2] grid grid-cols-auto-fill minmax(300px, 1fr) gap-3">
      {projectListData &&
        projectListData.map((project, index) => (
          <ProjectItem key={index} project={project} />
        ))}
    </div>
  );
}

export default ProjectsList;
