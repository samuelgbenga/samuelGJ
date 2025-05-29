import React from "react";
import ProjectItem from "./ProjectItem";

const projectsData = [
  {
    type: "TYPESCRIPT",
    name: "dinerojs/dinero.js",
    description:
      "Create, calculate, and format money in JavaScript and TypeScript.",
    stars: "6,451",
  },
  {
    type: "TYPESCRIPT",
    name: "algolia/autocomplete",
    description: "Fast and full-featured autocomplete library",
    stars: "5,143",
  },
  {
    type: "TYPESCRIPT",
    name: "algolia/instantsearch",
    description:
      "Libraries for building performant and instant search and recommend experiences with Algolia. Compatible with JavaScript, TypeScript, React and Vue.",
    stars: "3,877",
  },
  {
    type: "JAVASCRIPT",
    name: "project-x",
    description: "A cool JavaScript project.",
    stars: "1,234",
  },
  {
    type: "PYTHON",
    name: "data-analyzer",
    description: "Tool for analyzing data.",
    stars: "987",
  },
  {
    type: "REACT",
    name: "my-portfolio",
    description: "Personal portfolio website.",
    stars: "567",
  },
  {
    type: "NODE.JS",
    name: "api-service",
    description: "A backend API service.",
    stars: "432",
  },
];

function ProjectsList() {
  return (
    <div className="flex-[2] grid grid-cols-auto-fill minmax(300px, 1fr) gap-3">
      {projectsData.map((project, index) => (
        <ProjectItem key={index} project={project} />
      ))}
    </div>
  );
}

export default ProjectsList;
