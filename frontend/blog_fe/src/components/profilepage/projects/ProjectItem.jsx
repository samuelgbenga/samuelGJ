import React from "react";

function ProjectItem({ project }) {
  return (
    <div className="bg-white/5 backdrop-blur-sm p-5 shadow-lg hover:bg-white/8 hover:scale-105 transition-all duration-300 cursor-pointer font-['Tektur']">
      <div className="text-sm text-gray-400 mb-1">{project.type}</div>
      <div className="text-lg font-bold mb-1">{project.name}</div>
      <div className="text-base text-gray-400 mb-4">{project.description}</div>
      <div className="text-sm text-gray-400">★ {project.stars}</div>
    </div>
  );
}

export default ProjectItem;
