import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../route/route";
import { useCertifications } from "../../hooks/useCertifications";

export default function CertificationForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    issuer: "",
    description: "",
    issueDate: "",
    expiryDate: "",
    credentialUrl: "",
  });
  const [errors, setErrors] = useState({});
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const { postCert, isLoading, error, editCert } = useCertifications();
  const [certId, setCertId] = useState(null);

  useEffect(() => {
    const editCertificate = sessionStorage.getItem("editCertificate");
    if (editCertificate) {
      const cert = JSON.parse(editCertificate);
      setFormData({
        name: cert.name || "",
        issuer: cert.issuer || "",
        description: cert.description || "",
        issueDate: cert.issueDate || "",
        expiryDate: cert.expiryDate || "",
        credentialUrl: cert.credentialUrl || "",
      });
      setCertId(cert.id);
      console.log(cert.id);
      console.log(cert);
      setIsEdit(true);
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Certification title is required";
    }
    if (!formData.issuer.trim()) {
      newErrors.issuer = "Organization name is required";
    }
    if (!formData.description.trim()) {
      newErrors.description =
        "Certification Description is required is required";
    }
    if (!formData.issueDate) {
      newErrors.issueDate = "Issue date is required";
    }
    if (!formData.credentialUrl) {
      newErrors.credentialUrl = "Credential URL is required";
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
          credentialUrl: "Please upload an image file",
        }));
        return;
      }

      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          credentialUrl: "Image size should be less than 2MB",
        }));
        return;
      }

      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setFormData((prev) => ({
        ...prev,
        credentialUrl: file,
      }));
      setErrors((prev) => ({
        ...prev,
        credentialUrl: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("issuer", formData.issuer);
      formDataToSend.append("issueDate", formData.issueDate);
      formDataToSend.append("expireDate", formData.expiryDate);
      formDataToSend.append("multipartFile", formData.credentialUrl);
      formDataToSend.append("description", formData.description);

      // TODO: Add your API endpoint for certification creation
      if (isEdit) {
        const request = {
          name: formData.name,
          issuer: formData.issuer,
          issueDate: formData.issueDate,
          expiryDate: formData.expiryDate,
          description: formData.description,
        };

        console.log(certId, request);

        const response = await editCert(certId, request);
        sessionStorage.removeItem("editCertificate");
        navigate(PATHS.ADMIN.DASHBOARD);
      } else {
        const response = await postCert(formDataToSend);

        if (response) {
          console.log(response);
          navigate(PATHS.ADMIN.DASHBOARD);
        }
      }
    } catch (err) {
      console.error("Failed to create certification:", err);
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

  const handleCancle = () => {
    sessionStorage.removeItem("editCertificate");
    navigate(PATHS.ADMIN.DASHBOARD);
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
    <div className="min-h-screen bg-gray-100 py-8 text-black">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6">
          {isEdit ? "Edit Certification" : "Add New Certification"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Certification Title */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Certification Title
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., AWS Certified Solutions Architect"
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Organization Name */}
          <div>
            <label
              htmlFor="issuer"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Organization
            </label>
            <input
              type="text"
              id="issuer"
              name="issuer"
              value={formData.issuer}
              onChange={handleChange}
              placeholder="e.g., Amazon Web Services"
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.issuer ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.issuer && (
              <p className="mt-1 text-sm text-red-500">{errors.issuer}</p>
            )}
          </div>
          {/* Certification Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">{errors.description}</p>
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

          {/* Expire Date */}
          <div>
            <label
              htmlFor="expiryDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Expire Date
            </label>
            <input
              type="date"
              id="expiryDate"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.expiryDate ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.expiryDate && (
              <p className="mt-1 text-sm text-red-500">{errors.expiryDate}</p>
            )}
          </div>

          {/* Organization Logo Upload */}
          {!isEdit && (
            <div>
              <label
                htmlFor="credentialUrl"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Organization Logo
              </label>

              <div className="mt-1 flex items-center space-x-4">
                <input
                  type="file"
                  id="credentialUrl"
                  name="credentialUrl"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label
                  htmlFor="credentialUrl"
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

              {errors.credentialUrl && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.credentialUrl}
                </p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                Upload organization logo (max 2MB, PNG/JPG)
              </p>
            </div>
          )}
          {/* Submit Buttons */}
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
              {`${
                isLoading
                  ? "Loading....."
                  : isEdit
                  ? "Save Change"
                  : "Add Certification"
              }`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
