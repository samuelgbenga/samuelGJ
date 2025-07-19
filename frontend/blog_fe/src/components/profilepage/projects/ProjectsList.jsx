import React, { useEffect } from "react";
import ProjectItem from "./ProjectItem";
import { useProjects } from "../../../hooks/useProjects";
import { Skeleton } from "@mui/material";

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
    <>
      <div className="flex-[2] grid grid-cols-auto-fill minmax(300px, 1fr) gap-3">
        {/* <SkeletonItems /> */}
        {projectListData.length > 0 ? (
          projectListData.map((project, index) => (
            <ProjectItem key={index} project={project} />
          ))
        ) : (
          <SkeletonItems />
        )}
      </div>
      {/* <SkeletonItems /> */}
    </>
  );
}

export default ProjectsList;

const SkeletonItems = () => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, idx) => (
        <Skeleton
          key={idx}
          variant="rectangular"
          height={160}
          animation="wave"
          sx={{ bgcolor: "grey.900" }}
        />
      ))}
    </>
  );
};
