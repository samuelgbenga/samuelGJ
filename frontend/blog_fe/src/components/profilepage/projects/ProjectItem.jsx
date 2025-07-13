import React from "react";

function ProjectItem({ project }) {
  return (
    <div className="bg-white/5 backdrop-blur-sm p-5 shadow-lg hover:bg-white/8 hover:scale-105 transition-all duration-300 cursor-pointer font-['Tektur'] flex items-stretch">
      {/* Left: Text Content */}
      <div className="flex-1 pr-4 flex flex-col justify-between">
        <div>
          <div className="text-sm text-gray-400 mb-1">
            <span className="font-bold">{project.frameworks.join(", ")} </span>{" "}
            ( {project.language} )
          </div>
          <div className="text-lg font-bold mb-1">{project.name}</div>
          <div className="text-base text-gray-400 mb-4">{project.url}</div>
        </div>
        <div className="text-sm text-gray-400">★ {project.stars}</div>
      </div>
      {/* Right: Image Grid (only show top image) */}
      <div className="flex flex-col gap-2 justify-center items-end min-w-[180px] max-w-[240px]">
        {Array.isArray(project.photo) && project.photo.length > 0 && (
          <img
            src={project.photo[project.photo.length - 1].url}
            alt="project-img-top"
            className="object-cover rounded w-56 h-34 shadow"
          />
        )}
      </div>
    </div>
  );
}


export default ProjectItem;
