import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useParams, useNavigate } from "react-router-dom";
import { FaRegHandPaper, FaHandPaper } from "react-icons/fa";
import { formatDateToSDMY } from "../../utils/timeConverter";

function SingleArticlePage() {
  const [blog, setBlog] = useState();
  const [claps, setClaps] = useState(0);
  const [hasClapped, setHasClapped] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  // Console log the article ID
  console.log("Article ID:", id);

  // Check if currentArticle exists in sessionStorage
  useEffect(() => {
    const currentArticle = sessionStorage.getItem("currentArticle");

    if (!currentArticle) {
      console.log("No currentArticle found in sessionStorage");
      navigate(-1); // Go back to previous page
      return;
    }

    // Parse the JSON string back to a JavaScript object
    try {
      const parsedBlog = JSON.parse(currentArticle);
      setBlog(parsedBlog);
      setClaps(parsedBlog.claps || 0);
      console.log("Parsed blog:", parsedBlog);
    } catch (error) {
      console.error("Error parsing blog data:", error);
      navigate(-1); // Go back to previous page if parsing fails
    }
  }, [navigate]);

  const handleClap = () => {
    if (!hasClapped) {
      setClaps((prev) => prev + 1);
      setHasClapped(true);
    } else {
      setClaps((prev) => prev - 1);
      setHasClapped(false);
    }
  };

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-xl text-gray-600 dark:text-gray-400">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#151515]">
      {/* Article Header */}
      <div className="max-w-4xl mx-auto">
        {/* Featured Image */}
        <div className="w-full h-96 md:h-[500px] relative overflow-hidden">
          <img
            src={blog.photo.url}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Article Content */}
        <div className="px-6 md:px-8 py-8">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {blog.title}
          </h1>

          {/* Article Meta */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                  {blog.authorName
                    .split(" ")
                    .map((name) => name[0])
                    .join("")}
                </span>
              </div>
              <div>
                <p className="text-gray-900 dark:text-white font-medium">
                  {blog.authorName}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {formatDateToSDMY(blog.createdAt)}
                </p>
              </div>
            </div>

            {/* Category Badge */}
            <span className="px-3 py-1 text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
              {blog.categoryEnum.replace(/_/g, " ")}
            </span>
          </div>

          {/* Article Body */}
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            <ReactMarkdown>{blog.body}</ReactMarkdown>
          </div>

          {/* Clap Section */}
          <div className="flex items-center justify-center py-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col items-center space-y-2">
              <button
                onClick={handleClap}
                className={`p-4 rounded-full transition-all duration-200 ${
                  hasClapped
                    ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {hasClapped ? (
                  <FaHandPaper className="text-2xl" />
                ) : (
                  <FaRegHandPaper className="text-2xl" />
                )}
              </button>
              <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                {claps} {claps === 1 ? "clap" : "claps"}
              </span>
            </div>
          </div>

          {/* Article Footer */}
          <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
              <span>{blog.totalComments} comments</span>
              <span>•</span>
              <span>{blog.tagNames.length} tags</span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Status: {blog.postStatus}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleArticlePage;
