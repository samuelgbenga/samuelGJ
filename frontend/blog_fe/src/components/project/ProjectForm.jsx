import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../route/route";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useProjects } from "../../hooks/useProjects";
import EditPhotoForm from "./EditPhotoForm";

export default function ProjectForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    language: "",
    frameworks: [],
    url: "",
    description: "",
    stars: "",
  });
  const [currentFramework, setCurrentFramework] = useState("");
  const [errors, setErrors] = useState({});
  const { isLoading, error, createProject, editProject } = useProjects();
  const [isEdit, setIsEdit] = useState(false);
  const [projectId, setProjectId] = useState(null);

  // Multiple files state
  const [files, setFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const [editFiles, setEditFiles] = useState([]);

  // Load editProject from sessionStorage if it exists
  useEffect(() => {
    const editProject = sessionStorage.getItem("editProject");
    if (editProject) {
      const project = JSON.parse(editProject);
      setFormData({
        name: project.name || "",
        language: project.language || "",
        frameworks: project.frameworks || [],
        url: project.url || "",
        description: project.description || "",
        stars: project.stars ? parseInt(project.stars, 10) : "",
      });
      setEditFiles(project.photo);
      setProjectId(project.id);
      setIsEdit(true);
    }
  }, []);

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
    if (!formData.url.trim()) {
      newErrors.url = "Project URL is required";
    } else if (!isValidUrl(formData.url)) {
      newErrors.url = "Please enter a valid URL";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Project description is required";
    }
    if (formData.stars === "" || formData.stars === null) {
      newErrors.stars = "Number of stars is required";
    } else if (isNaN(formData.stars) || formData.stars < 0) {
      newErrors.stars = "Please enter a valid number of stars";
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

  // Multiple files handlers
  const handleFilesChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
    // Generate previews for new files and append to existing previews
    const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    setFilePreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeFile = (idx) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
    setFilePreviews((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (files.length > 0) {
        const formDataToSend = new FormData();
        // Append all form fields
        Object.entries(formData).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((v) => formDataToSend.append(key, v));
          } else {
            formDataToSend.append(key, value);
          }
        });
        // Append files
        files.forEach((file) => formDataToSend.append("multipartFiles", file));

        if (isEdit) {
          await editProject(projectId, formDataToSend);
          sessionStorage.removeItem("editProject");
        } else {
          await createProject(formDataToSend);
        }
        navigate(PATHS.ADMIN.DASHBOARD);
        return;
      }
      // If no files, use normal formData
      if (isEdit) {
        await editProject(projectId, formData);
        sessionStorage.removeItem("editProject");
      } else {
        await createProject(formData);
      }
      navigate(PATHS.ADMIN.DASHBOARD);
    } catch (err) {
      console.error("Failed to create project:", err);
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "stars" ? (value === "" ? "" : parseInt(value, 10)) : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleCancle = () => {
    sessionStorage.removeItem("editProject");
    navigate(PATHS.ADMIN.PROJECT);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 text-black">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6">
          {isEdit ? "Edit Project" : "Create New Project"}
        </h1>

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

          {/* Project URL Input */}
          <div>
            <label
              htmlFor="url"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Project URL
            </label>
            <input
              type="url"
              id="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="https://github.com/username/repo or https://project-url.com"
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.url ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.url && (
              <p className="mt-1 text-sm text-red-500">{errors.url}</p>
            )}
          </div>

          {/* Stars Input */}
          <div>
            <label
              htmlFor="stars"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Number of Stars
            </label>
            <input
              type="number"
              id="stars"
              name="stars"
              value={formData.stars}
              onChange={handleChange}
              placeholder="Enter number of stars (e.g., 150)"
              min="0"
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.stars ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.stars && (
              <p className="mt-1 text-sm text-red-500">{errors.stars}</p>
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

          {/* Project Images Input */}
          {isEdit ? (
            <EditPhotoForm editFiles={editFiles} projectId={projectId} />
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Images (you can select multiple)
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFilesChange}
                className="w-full px-4 py-2 border rounded-md"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {filePreviews.map((src, idx) => (
                  <div key={idx} className="relative">
                    <img
                      src={src}
                      alt={`preview-${idx}`}
                      className="h-20 w-20 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => removeFile(idx)}
                      className="absolute top-0 right-0 bg-white bg-opacity-80 rounded-full p-1"
                    >
                      <XMarkIcon className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => handleCancle()}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {`
                ${
                  isLoading
                    ? "Loading..."
                    : isEdit
                    ? "Save Changes"
                    : "Create Project"
                }
              `}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
