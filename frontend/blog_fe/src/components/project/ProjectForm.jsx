import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../route/route";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useProjects } from "../../hooks/useProjects";

export default function ProjectForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    language: "",
    frameworks: [],
    githubLink: "",
    description: "",
  });
  const [currentFramework, setCurrentFramework] = useState("");
  const [errors, setErrors] = useState({});
  const { isLoading, error, createProject, projectData } = useProjects();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Project name is required";
    }

    if (!formData.language.trim()) {
      newErrors.language = "Language is required";
    }
    if (formData.frameworks.length === 0) {
      newErrors.frameworks = "At least one framework/library is required";
    }
    if (!formData.githubLink.trim()) {
      newErrors.githubLink = "GitHub link is required";
    } else if (!isValidUrl(formData.githubLink)) {
      newErrors.githubLink = "Please enter a valid URL";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Project description is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleFrameworkKeyDown = (e) => {
    if (e.key === "Enter" && currentFramework.trim()) {
      e.preventDefault();
      if (!formData.frameworks.includes(currentFramework.trim())) {
        setFormData((prev) => ({
          ...prev,
          frameworks: [...prev.frameworks, currentFramework.trim()],
        }));
        setCurrentFramework("");
        if (errors.frameworks) {
          setErrors((prev) => ({
            ...prev,
            frameworks: "",
          }));
        }
      }
    }
  };

  const removeFramework = (frameworkToRemove) => {
    setFormData((prev) => ({
      ...prev,
      frameworks: prev.frameworks.filter((f) => f !== frameworkToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      //TODO: Add your API endpoint for project creation
      const response = await createProject(formData);

      if (response) {
       
        console.log("Project created");
        navigate(PATHS.ADMIN.PROJECT);
      }
    } catch (err) {
      console.error("Failed to create project:", err);
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 text-black">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6">Create New Project</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Language Input */}
          <div>
            <div>
              {" "}
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Project Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>

            <label
              htmlFor="language"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Programming Language
            </label>
            <input
              type="text"
              id="language"
              name="language"
              value={formData.language}
              onChange={handleChange}
              placeholder="e.g., JavaScript, Python, Java"
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.language ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.language && (
              <p className="mt-1 text-sm text-red-500">{errors.language}</p>
            )}
          </div>

          {/* Frameworks/Libraries Input */}
          <div>
            <label
              htmlFor="frameworks"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Frameworks/Libraries
            </label>
            <div className="space-y-2">
              {/* Framework Tags */}
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.frameworks.map((framework, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700"
                  >
                    {framework}
                    <button
                      type="button"
                      onClick={() => removeFramework(framework)}
                      className="ml-2 text-blue-500 hover:text-blue-700"
                    >
                      <XMarkIcon className="h-4 w-4" />
                    </button>
                  </span>
                ))}
              </div>
              {/* Framework Input */}
              <input
                type="text"
                id="frameworks"
                value={currentFramework}
                onChange={(e) => setCurrentFramework(e.target.value)}
                onKeyDown={handleFrameworkKeyDown}
                placeholder="Type framework/library and press Enter (e.g., React, Django, Spring)"
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.frameworks ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.frameworks && (
                <p className="mt-1 text-sm text-red-500">{errors.frameworks}</p>
              )}
              <p className="text-xs text-gray-500">
                Press Enter to add each framework/library
              </p>
            </div>
          </div>

          {/* GitHub Link Input */}
          <div>
            <label
              htmlFor="githubLink"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              GitHub Link or Project URL
            </label>
            <input
              type="url"
              id="githubLink"
              name="githubLink"
              value={formData.githubLink}
              onChange={handleChange}
              placeholder="https://github.com/username/repo or https://project-url.com"
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.githubLink ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.githubLink && (
              <p className="mt-1 text-sm text-red-500">{errors.githubLink}</p>
            )}
          </div>

          {/* Project Description Textarea */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Project Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="6"
              placeholder="Describe your project, its features, and what makes it special..."
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate(PATHS.ADMIN.PROJECT)}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {`${isLoading ? "Loading..." : "Create Project"}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
