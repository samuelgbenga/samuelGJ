import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { PATHS } from "../../route/route";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { multipartInstance } from "../../api/apiClient";
import { useArticles } from "../../hooks/useArticles";
import { POST_STATUS } from "../../utils/constants";

export default function ArticlePreview() {
  const [articleData, setArticleData] = useState(null);
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [displayImage, setDisplayImage] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const { postArticle, isLoading } = useArticles();

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
    const draftArticle = localStorage.getItem("draftArticle");
    if (!draftArticle) {
      navigate(PATHS.ARTICLE.CREATE);
      return;
    }
    setArticleData(JSON.parse(draftArticle));
  }, [navigate]);

  const handleTagAdd = (e) => {
    if (
      e.key === "Enter" &&
      currentTag.trim() &&
      tags.length < 5 &&
      !tags.includes(currentTag.trim())
    ) {
      e.preventDefault();
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setDisplayImage(URL.createObjectURL(file));
    setImage(file);
  };

  const handlePublish = async (postStatus) => {
    const formData = new FormData();

    formData.append("title", articleData.title);
    formData.append("body", articleData.content);
    formData.append("categoryEnum", category);
    formData.append("description", description);
    formData.append("tags", tags);
    formData.append("multipartFile", image);
    formData.append("postStatus", postStatus);

    try {
      const response = await postArticle(formData);

      if (response) {
        console.log(response);
        localStorage.removeItem("draftArticle");
        navigate(PATHS.ADMIN.DASHBOARD);
      } else {
        console.error("Invalid response format:", response);
      }
    } catch (error) {
      console.error("Failed to publish article:", error);
    }
  };

  if (!articleData || isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            Loading preview...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#151515] py-8 flex">
      {/* Main Content */}
      <div className="flex-1 max-w-4xl mx-auto bg-[#151515] p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-white">Article Preview</h1>
          <div className="space-x-4">
            <button
              onClick={() => navigate(PATHS.ARTICLE.CREATE)}
              className="px-4 py-2 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-800 hover:text-white transition-colors"
            >
              Back to Editor
            </button>
            <button
              onClick={() => handlePublish(POST_STATUS.DRAFT)}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
             Draft Article
            </button>
            <button
              onClick={() => handlePublish(POST_STATUS.PUBLISHED)}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Publish Article
            </button>
          </div>
        </div>

        <article className="prose prose-invert max-w-none">
          {articleData.title && (
            <h1 className="text-4xl font-bold mb-8 text-white">
              {articleData.title}
            </h1>
          )}
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
            {articleData.content}
          </ReactMarkdown>
        </article>
      </div>

      {/* Right Sidebar */}
      <div className="w-[20%] h-screen fixed right-0 top-0 bg-white border-l border-gray-200 p-4 overflow-y-auto">
        <div className="space-y-6">
          <h3 className="font-semibold text-gray-800 text-lg">
            Meta Information
          </h3>

          {/* Tags Input */}
          <div className="space-y-2">
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
            {tags.length <= 5 && (
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

          {/* Display Image Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Display Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {displayImage && (
              <img
                src={displayImage}
                alt="Display preview"
                className="mt-2 w-full h-32 object-cover rounded-md"
              />
            )}
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
        </div>
      </div>
    </div>
  );
}
