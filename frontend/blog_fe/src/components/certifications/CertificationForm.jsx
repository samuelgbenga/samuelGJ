import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../route/route";

export default function CertificationForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    organization: "",
    issueDate: "",
    logoUrl: null,
  });
  const [errors, setErrors] = useState({});
  const [previewUrl, setPreviewUrl] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = "Certification title is required";
    }
    if (!formData.organization.trim()) {
      newErrors.organization = "Organization name is required";
    }
    if (!formData.issueDate) {
      newErrors.issueDate = "Issue date is required";
    }
    if (!formData.logoUrl) {
      newErrors.logoUrl = "Organization logo is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          logoUrl: "Please upload an image file",
        }));
        return;
      }

      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          logoUrl: "Image size should be less than 2MB",
        }));
        return;
      }

      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setFormData((prev) => ({
        ...prev,
        logoUrl: file,
      }));
      setErrors((prev) => ({
        ...prev,
        logoUrl: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("organization", formData.organization);
      formDataToSend.append("issueDate", formData.issueDate);
      formDataToSend.append("logo", formData.logoUrl);

      // TODO: Add your API endpoint for certification creation
      // const response = await fetch('http://localhost:8080/api/certifications', {
      //   method: 'POST',
      //   body: formDataToSend,
      // });

      // if (response.ok) {
      //   navigate(PATHS.HOME);
      // }
      console.log("Creating certification:", formData);
      navigate(PATHS.HOME);
    } catch (error) {
      console.error("Failed to create certification:", error);
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

  // Cleanup preview URL when component unmounts
  React.useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6">Add New Certification</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Certification Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Certification Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., AWS Certified Solutions Architect"
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">{errors.title}</p>
            )}
          </div>

          {/* Organization Name */}
          <div>
            <label
              htmlFor="organization"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Organization
            </label>
            <input
              type="text"
              id="organization"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              placeholder="e.g., Amazon Web Services"
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.organization ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.organization && (
              <p className="mt-1 text-sm text-red-500">{errors.organization}</p>
            )}
          </div>

          {/* Issue Date */}
          <div>
            <label
              htmlFor="issueDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Issue Date
            </label>
            <input
              type="date"
              id="issueDate"
              name="issueDate"
              value={formData.issueDate}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.issueDate ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.issueDate && (
              <p className="mt-1 text-sm text-red-500">{errors.issueDate}</p>
            )}
          </div>

          {/* Organization Logo Upload */}
          <div>
            <label
              htmlFor="logoUrl"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Organization Logo
            </label>
            <div className="mt-1 flex items-center space-x-4">
              <input
                type="file"
                id="logoUrl"
                name="logoUrl"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label
                htmlFor="logoUrl"
                className="px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
              >
                Choose Image
              </label>
              {previewUrl && (
                <div className="relative w-16 h-16">
                  <img
                    src={previewUrl}
                    alt="Organization logo preview"
                    className="w-full h-full object-contain rounded-md"
                  />
                </div>
              )}
            </div>
            {errors.logoUrl && (
              <p className="mt-1 text-sm text-red-500">{errors.logoUrl}</p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              Upload organization logo (max 2MB, PNG/JPG)
            </p>
          </div>

          {/* Submit Buttons */}
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
              Add Certification
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
