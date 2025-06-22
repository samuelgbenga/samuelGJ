import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../route/route";
import ReactMarkdown from "react-markdown";
import { XMarkIcon, PencilIcon } from "@heroicons/react/24/outline";
import { POST_STATUS } from "../../utils/constants";
import { useArticles } from "../../hooks/useArticles";

const EditArticlePreview = () => {
  const [editArticleData, setEditArticleData] = useState();
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [postId, setPostId] = useState(null);

  // Image editing states
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const { isLoading, error, postPhotoUpdate, updateArticle } = useArticles();

  const navigate = useNavigate();

  const categories = [
    { name: "Backend Development", value: "BACKEND_DEVELOPMENT" },
    { name: "Frontend Development", value: "FRONTEND_DEVELOPMENT" },
    { name: "AI", value: "AI" },
    { name: "RDBMS", value: "RDBMS" },
    { name: "NRDBMS", value: "NRDBMS" },
    { name: "Talks", value: "TALKS" },
    { name: "CI/CD", value: "CI_CD" },
    { name: "Microservice", value: "MICROSERVICE" },
    { name: "Algorithm DSA", value: "ALGORIGHTM_DSA" },
  ];

  useEffect(() => {
    const draftEditArticle = sessionStorage.getItem("draftEditArticle");
    if (!draftEditArticle) {
      navigate(PATHS.ADMIN.DASHBOARD);
      return;
    }
    const parsedData = JSON.parse(draftEditArticle);
    setEditArticleData(parsedData);

    // Initialize sidebar fields from draftEditArticle
    setTags(parsedData.tagNames || []);
    setCategory(parsedData.categoryEnum || "");
    setStatus(parsedData.postStatus || POST_STATUS.DRAFT);
    setDescription(parsedData.description || "");
    setPostId(parsedData.id);
    console.log(draftEditArticle);
  }, [navigate]);

  // Update draftEditArticle whenever sidebar fields change
  useEffect(() => {
    if (editArticleData) {
      const updatedDraft = {
        ...editArticleData,
        tagNames: tags,
        categoryEnum: category,
        postStatus: status,
        description: description,
      };
      sessionStorage.setItem("draftEditArticle", JSON.stringify(updatedDraft));
    }
  }, [tags, category, status, description, editArticleData]);

  const handleTagAdd = (e) => {
    if (e.key === "Enter" && currentTag.trim() && tags.length < 5) {
      e.preventDefault();
      if (!tags.includes(currentTag.trim())) {
        setTags([...tags, currentTag.trim()]);
      }
      setCurrentTag("");
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // Image editing handlers
  const handleImageEditClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setSelectedImage(file);
        setImagePreview(URL.createObjectURL(file));
        setShowImageModal(true);
      }
    };
    input.click();
  };

  const handleImageUpload = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append("multipartFiles", selectedImage);

    try {
      // Simulate API call to Cloudinary (placeholder)
      // await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate upload delay
      const response = await postPhotoUpdate(formData, postId);

      // Mock response - replace with actual Cloudinary API call
      console.log("from response:", response);
      const mockResponse = {
        url: "https://res.cloudinary.com/dbrqyy9fu/image/upload/v1/my_blog_folder/mock_uploaded_image",
        id: "my_blog_folder/mock_uploaded_image",
      };

      // Update the article data with new image
      const updatedArticleData = {
        ...editArticleData,
        photo: {
          ...editArticleData.photo,
          url: response.url,
          id: response.id,
        },
      };

      setEditArticleData(updatedArticleData);

      // Update sessionStorage
      const updatedDraft = {
        ...updatedArticleData,
        tagNames: tags,
        categoryEnum: category,
        postStatus: status,
        description: description,
      };
      sessionStorage.setItem("draftEditArticle", JSON.stringify(updatedDraft));

      // Close modal and reset states
      setShowImageModal(false);
      setSelectedImage(null);
      setImagePreview(null);
    } catch (err) {
      console.error("Error uploading image:", error);
      console.error("Error uploading image:", err);
      alert("Failed to upload image. Please try again.");
    }
  };

  const handleCloseModal = () => {
    setShowImageModal(false);
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleBackToDashboard = () => {
    sessionStorage.removeItem("draftEditArticle");
    navigate(PATHS.ADMIN.DASHBOARD);
  };

  const handleToEdibBody = () => {
    sessionStorage.setItem("previousPath", window.location.pathname);
    navigate(PATHS.ARTICLE.CREATE);
  };

  const handleSaveChange = async () => {
    try {
      const request = {
        title: editArticleData.title,
        body: editArticleData.body,
        description: description,
        categoryEnum: category,
        postStatus: status,
        tags: tags,
      };

      const response = await updateArticle(request, postId);

      // console.log(response);
      sessionStorage.removeItem("draftEditArticle");
      navigate(PATHS.ADMIN.DASHBOARD);
    } catch (err) {
      console.log(err);
      console.log(error);
    }

    console.log("Save changes");
  };

  if (!editArticleData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#151515] py-8 flex">
      {/* Main Content */}
      <div className="flex-1 max-w-4xl mx-auto bg-[#151515] p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-white">
            Edit Article Preview
          </h1>
          <div className="space-x-4">
            <button
              onClick={() => handleBackToDashboard()}
              className="px-4 py-2 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-800 hover:text-white transition-colors"
            >
              Back to Dashboard
            </button>
            <button
              onClick={() => handleToEdibBody()}
              className="px-4 py-2 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-800 hover:text-white transition-colors"
            >
              Edit Body
            </button>
            <button
              onClick={() => handleSaveChange()}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </div>

        <article className="prose prose-invert max-w-none">
          {/* Article Title */}
          {editArticleData.title && (
            <h1 className="text-4xl font-bold mb-8 text-white">
              {editArticleData.title}
            </h1>
          )}

          {/* Article Image - Displayed at top like Medium with edit functionality */}
          {editArticleData.photo && editArticleData.photo.url && (
            <div className="mb-8 relative group">
              <img
                src={editArticleData.photo.url}
                alt={editArticleData.title || "Article cover"}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
                style={{
                  maxWidth: "100%",
                  height: "400px",
                  objectFit: "cover",
                }}
              />
              {/* Edit icon overlay */}
              <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg flex items-center justify-center">
                <button
                  onClick={handleImageEditClick}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white bg-opacity-90 p-3 rounded-full shadow-lg hover:bg-opacity-100"
                >
                  <PencilIcon className="h-6 w-6 text-gray-700" />
                </button>
              </div>
            </div>
          )}

          {/* Article Content */}
          <ReactMarkdown
            components={{
              img: ({ node, ...props }) => (
                <img
                  {...props}
                  alt={props.alt}
                  className="rounded-lg shadow-md my-4"
                  style={{
                    maxWidth: "800px",
                    maxHeight: "400px",
                    width: "auto",
                    height: "auto",
                    objectFit: "contain",
                    margin: "1rem auto",
                    display: "block",
                  }}
                />
              ),
              // Add custom styling for other markdown elements
              h1: ({ node, ...props }) => (
                <h1 className="text-white" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 className="text-white" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h3 className="text-white" {...props} />
              ),
              p: ({ node, ...props }) => (
                <p className="text-gray-300" {...props} />
              ),
              a: ({ node, ...props }) => (
                <a className="text-blue-400 hover:text-blue-300" {...props} />
              ),
              code: ({ node, ...props }) => (
                <code
                  className="bg-gray-800 text-gray-200 px-1 rounded"
                  {...props}
                />
              ),
              pre: ({ node, ...props }) => (
                <pre
                  className="bg-gray-800 text-gray-200 p-4 rounded-lg"
                  {...props}
                />
              ),
              blockquote: ({ node, ...props }) => (
                <blockquote
                  className="border-l-4 border-gray-600 pl-4 text-gray-400"
                  {...props}
                />
              ),
              ul: ({ node, ...props }) => (
                <ul className="text-gray-300 list-disc pl-6" {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol className="text-gray-300 list-decimal pl-6" {...props} />
              ),
              li: ({ node, ...props }) => (
                <li className="text-gray-300" {...props} />
              ),
            }}
          >
            {editArticleData.body}
          </ReactMarkdown>
        </article>
      </div>

      {/* Right Sidebar */}
      <div className="w-[20%] h-screen fixed right-0 top-0 bg-white border-l border-gray-200 p-4 overflow-y-auto">
        <div className="space-y-6">
          <h3 className="font-semibold text-gray-800 text-lg">
            Edit Article Information
          </h3>

          {/* Tags Input */}
          <div className="space-y-2 text-black">
            <label className="block text-sm font-medium text-gray-700">
              Tags (max 5)
            </label>

            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-md text-sm bg-blue-100 text-blue-700"
                >
                  {tag}
                  <button
                    onClick={() => handleTagRemove(tag)}
                    className="ml-1 text-blue-500 hover:text-blue-700"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </span>
              ))}
            </div>
            {tags.length < 5 && (
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={handleTagAdd}
                placeholder="Add a tag..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-black text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>

          {/* Category Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={POST_STATUS.DRAFT}>Draft</option>
              <option value={POST_STATUS.PUBLISHED}>Published</option>
            </select>
          </div>

          {/* Description Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Short Description (max 200 characters)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value.slice(0, 200))}
              maxLength={200}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter a short description..."
            />
            <p className="text-xs text-gray-500 text-right">
              {description.length}/200 characters
            </p>
          </div>

          {/* Author Information (Read-only) */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Author
            </label>
            <div className="px-3 py-2 bg-gray-100 rounded-md text-sm text-gray-800">
              {editArticleData.authorName}
            </div>
          </div>

          {/* Created Date (Read-only) */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Created
            </label>
            <div className="px-3 py-2 bg-gray-100 rounded-md text-sm text-gray-800">
              {new Date(editArticleData.createdAt).toLocaleDateString()}
            </div>
          </div>

          {/* Updated Date (Read-only) */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Last Updated
            </label>
            <div className="px-3 py-2 bg-gray-100 rounded-md text-sm text-gray-800">
              {new Date(editArticleData.updatedAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      {/* Image Preview Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Preview New Image
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="mb-4">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleImageUpload}
                disabled={isLoading}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Uploading..." : "Upload Image"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditArticlePreview;
