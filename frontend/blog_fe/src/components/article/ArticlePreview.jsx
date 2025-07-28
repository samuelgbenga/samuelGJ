import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { PATHS } from "../../route/route";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useArticles } from "../../hooks/useArticles";
import { POST_STATUS } from "../../utils/constants";
import ContentLoader from "react-content-loader";

export default function ArticlePreview() {
  const [articleData, setArticleData] = useState(null);
  const [tags, setTags] = useState(() => {
    const savedSidebar = sessionStorage.getItem("articlePreviewSidebar");
    if (savedSidebar) {
      try {
        const { tags } = JSON.parse(savedSidebar);
        return tags || [];
      } catch {
        return [];
      }
    }
    return [];
  });
  const [currentTag, setCurrentTag] = useState("");
  const [description, setDescription] = useState(() => {
    const savedSidebar = sessionStorage.getItem("articlePreviewSidebar");
    if (savedSidebar) {
      try {
        const { description } = JSON.parse(savedSidebar);
        return description || "";
      } catch {
        return "";
      }
    }
    return "";
  });
  const [category, setCategory] = useState(() => {
    const savedSidebar = sessionStorage.getItem("articlePreviewSidebar");
    if (savedSidebar) {
      try {
        const { category } = JSON.parse(savedSidebar);
        return category || "";
      } catch {
        return "";
      }
    }
    return "";
  });
  const [displayImage, setDisplayImage] = useState(() => {
    const savedSidebar = sessionStorage.getItem("articlePreviewSidebar");
    if (savedSidebar) {
      try {
        const { displayImage } = JSON.parse(savedSidebar);
        return displayImage || "";
      } catch {
        return "";
      }
    }
    return "";
  });
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
    const draftArticle = sessionStorage.getItem("draftArticle");
    if (!draftArticle) {
      navigate(PATHS.ARTICLE.CREATE);
      return;
    }
    setArticleData(JSON.parse(draftArticle));
  }, [navigate]);

  // Save sidebar state to sessionStorage whenever any field changes
  useEffect(() => {
    const sidebarState = { tags, description, category, displayImage };
    sessionStorage.setItem(
      "articlePreviewSidebar",
      JSON.stringify(sidebarState)
    );
  }, [tags, description, category, displayImage]);

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
        sessionStorage.removeItem("draftArticle");
        sessionStorage.removeItem("articlePreviewSidebar");
        navigate(PATHS.ADMIN.DASHBOARD);
      } else {
        console.error("Invalid response format:", response);
      }
    } catch (error) {
      console.error("Failed to publish article:", error);
    }
  };

  const handleGoBack = () => {
    sessionStorage.removeItem("draftArticle");
    sessionStorage.removeItem("articlePreviewSidebar");
    navigate(PATHS.ADMIN.DASHBOARD);
  };

  const handleBackToEditor = () => {
    // Save sidebar state before navigating
    const sidebarState = { tags, description, category, displayImage };
    sessionStorage.setItem(
      "articlePreviewSidebar",
      JSON.stringify(sidebarState)
    );
    navigate(PATHS.ARTICLE.CREATE);
  };

  if (!articleData) {
    return <ArticlePreviewSkeleton />;
  }

  return (
    <div className="min-h-screen bg-[#0b0b0c] text-white flex relative">
      {/* Main Article Section */}
      <div className="flex-1 max-w-4xl mx-auto px-6 py-10 ml-40">
        {/* Header Actions */}
        <div className="flex flex-wrap justify-between items-center mb-10 gap-4">
          <h1 className="text-3xl font-semibold tracking-tight">
            📝 Article Preview
          </h1>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleBackToEditor}
              className="px-4 py-2 border border-gray-700 text-gray-300 rounded-md hover:bg-gray-800 hover:text-white transition"
            >
              Back to Editor
            </button>
            <button
              onClick={() => handlePublish(POST_STATUS.DRAFT)}
              className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md transition"
            >
              Draft
            </button>
            <button
              onClick={() => handlePublish(POST_STATUS.PUBLISHED)}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition"
            >
              Publish
            </button>
            <button
              onClick={handleGoBack}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Article Content */}
        <article className="prose prose-invert max-w-none text-white">
          {articleData.title && (
            <h1 className="text-4xl font-bold mb-6">{articleData.title}</h1>
          )}
          <ReactMarkdown
            components={{
              img: ({ node, ...props }) => (
                <img
                  {...props}
                  alt={props.alt}
                  className="rounded-lg shadow-lg my-6 mx-auto max-w-full max-h-[400px] object-contain"
                />
              ),
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
                <p className="text-gray-300 leading-relaxed" {...props} />
              ),
              a: ({ node, ...props }) => (
                <a
                  className="text-blue-400 hover:text-blue-300 underline"
                  {...props}
                />
              ),
              code: ({ node, ...props }) => (
                <code
                  className="bg-gray-800 text-gray-200 px-1 rounded"
                  {...props}
                />
              ),
              pre: ({ node, ...props }) => (
                <pre
                  className="bg-[#1a1a1a] text-gray-100 p-4 rounded-lg overflow-x-auto"
                  {...props}
                />
              ),
              blockquote: ({ node, ...props }) => (
                <blockquote
                  className="border-l-4 border-gray-600 pl-4 italic text-gray-400"
                  {...props}
                />
              ),
              ul: ({ node, ...props }) => (
                <ul className="list-disc pl-6 text-gray-300" {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol className="list-decimal pl-6 text-gray-300" {...props} />
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
      <aside className="w-[22%] min-w-[260px] h-full fixed right-0 top-0 bg-[#111111] border-l border-gray-800 p-6 overflow-y-auto shadow-lg">
        <div className="space-y-6">
          <h3 className="font-semibold text-gray-200 text-lg">🧩 Meta Info</h3>

          {/* Tags Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-400">
              Tags (max 5)
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-md text-sm bg-blue-800 text-blue-100"
                >
                  {tag}
                  <button
                    onClick={() => handleTagRemove(tag)}
                    className="ml-1 text-blue-300 hover:text-blue-500"
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
                className="w-full px-3 py-2 border border-gray-700 rounded-md bg-[#1e1e1e] text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>

          {/* Display Image Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-400">
              Display Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-800 file:text-blue-400 hover:file:bg-gray-700"
            />
            {displayImage && (
              <img
                src={displayImage}
                alt="Preview"
                className="mt-2 w-full h-32 object-cover rounded-md"
              />
            )}
          </div>

          {/* Description Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-400">
              Short Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value.slice(0, 200))}
              maxLength={200}
              rows={4}
              className="w-full px-3 py-2 border border-gray-700 rounded-md bg-[#1e1e1e] text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter a short description..."
            />
            <p className="text-xs text-gray-500 text-right">
              {description.length}/200 characters
            </p>
          </div>

          {/* Category Dropdown */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-400">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-700 rounded-md bg-[#1e1e1e] text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
      </aside>

      {isLoading && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
          <div className="relative w-20 h-20">
            <span className="absolute inline-flex h-full w-full rounded-full bg-black/90 opacity-75 animate-ping"></span>
            <span className="absolute inline-flex rounded-full h-full w-full bg-black/80"></span>
          </div>
        </div>
      )}
    </div>
  );
}

const ArticlePreviewSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#0b0b0c] text-white flex relative">
      {/* Main Content Skeleton */}
      <div className="flex-1 max-w-4xl mx-auto px-6 py-10 ml-20">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center mb-10 gap-4">
          <div className="w-2/3 h-8 bg-gray-700 rounded animate-pulse" />
          <div className="flex gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="w-24 h-8 bg-gray-800 rounded animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* Article Title */}
        <div className="h-10 w-3/4 bg-gray-700 rounded mb-6 animate-pulse" />

        {/* Paragraph lines */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className={`h-4 mb-4 ${
              i === 2 ? "w-2/3" : "w-full"
            } bg-gray-800 rounded animate-pulse`}
          />
        ))}

        {/* Image Placeholder */}
        <div className="w-full h-64 bg-gray-700 rounded-lg animate-pulse mt-8 mb-6" />

        {/* More lines */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`h-4 mb-4 ${
              i === 1 ? "w-1/2" : "w-full"
            } bg-gray-800 rounded animate-pulse`}
          />
        ))}
      </div>

      {/* Right Sidebar Skeleton */}
      <aside className="w-[22%] min-w-[260px] h-full fixed right-0 top-0 bg-[#111111] border-l border-gray-800 p-6 overflow-y-auto shadow-lg space-y-6">
        {/* Meta Info Title */}
        <div className="h-5 w-3/4 bg-gray-700 rounded animate-pulse" />

        {/* Tags Skeleton */}
        <div className="space-y-2">
          <div className="h-4 w-1/2 bg-gray-700 rounded animate-pulse" />
          <div className="flex gap-2">
            <div className="h-6 w-16 bg-blue-900 rounded animate-pulse" />
            <div className="h-6 w-20 bg-blue-900 rounded animate-pulse" />
          </div>
          <div className="h-8 w-full bg-gray-800 rounded animate-pulse" />
        </div>

        {/* Display Image Upload */}
        <div className="space-y-2">
          <div className="h-4 w-1/2 bg-gray-700 rounded animate-pulse" />
          <div className="h-10 w-full bg-gray-800 rounded animate-pulse" />
          <div className="w-full h-32 bg-gray-700 rounded-md animate-pulse" />
        </div>

        {/* Short Description */}
        <div className="space-y-2">
          <div className="h-4 w-3/4 bg-gray-700 rounded animate-pulse" />
          <div className="h-24 w-full bg-gray-800 rounded animate-pulse" />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <div className="h-4 w-1/2 bg-gray-700 rounded animate-pulse" />
          <div className="h-10 w-full bg-gray-800 rounded animate-pulse" />
        </div>
      </aside>
    </div>
  );
};
