import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../route/route";

export default function ProjectForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    language: "",
    githubLink: "",
    description: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.language.trim()) {
      newErrors.language = "Language is required";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // TODO: Add your API endpoint for project creation
      // const response = await fetch('http://localhost:8080/api/projects', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });

      // if (response.ok) {
      //   navigate(PATHS.HOME);
      // }
      console.log("Creating project:", formData);
      navigate(PATHS.HOME);
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6">Create New Project</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Language Input */}
          <div>
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
              onClick={() => navigate(PATHS.HOME)}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
