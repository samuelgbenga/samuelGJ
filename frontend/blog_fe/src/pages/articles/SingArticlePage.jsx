import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useParams, useNavigate } from "react-router-dom";
import { formatDateToSDMY } from "../../utils/timeConverter";
import { FaHandsClapping } from "react-icons/fa6";
import { Avatar, Skeleton } from "@mui/material";
import { FaArrowLeft } from "react-icons/fa";
import { useArticles } from "../../hooks/useArticles";
import { getOrCreateAnonymousId } from "../../utils/idGenerator";

function SingleArticlePage() {
  const [blog, setBlog] = useState();
  const [claps, setClaps] = useState(0);
  const [hasClapped, setHasClapped] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { putClap, error, comments, getComments, makeComment } = useArticles();
  const [comment, setComment] = useState("");

  // Console log the article ID
  // console.log("Article ID:", id);

  // Check if currentArticle exists in sessionStorage
  useEffect(() => {
    const currentArticle = sessionStorage.getItem("currentArticle");

    if (!currentArticle) {
      // console.log("No currentArticle found in sessionStorage");
      navigate(-1); // Go back to previous page
      return;
    }

    // Parse the JSON string back to a JavaScript object
    try {
      const parsedBlog = JSON.parse(currentArticle);
      setBlog(parsedBlog);
      setClaps(parsedBlog.claps || 0);
      setHasClapped((parsedBlog.claps || 0) > 1);
      //console.log("Parsed blog:", parsedBlog);
      handleFetchComment(parsedBlog.id);
    } catch (error) {
      console.error("Error parsing blog data:", error);
      navigate(-1); // Go back to previous page if parsing fails
    }
  }, [navigate]);

  const handleFetchComment = async (postId) => {
    try {
      const response = await getComments(postId);

      // response && console.log(response);
    } catch (err) {
      console.log(err);
      console.log(error);
    }
  };

  const handleClap = async () => {
    try {
      const response = await putClap(blog.id);

      if (response) {
        if (response.success) {
          setClaps((prev) => {
            const newClaps = prev + 1;
            // Update the claps in sessionStorage draft
            const currentArticle = sessionStorage.getItem("currentArticle");
            if (currentArticle) {
              try {
                const parsed = JSON.parse(currentArticle);
                parsed.claps = newClaps;
                sessionStorage.setItem(
                  "currentArticle",
                  JSON.stringify(parsed)
                );
              } catch (e) {
                // ignore JSON parse error
              }
            }
            return newClaps;
          });
          setHasClapped(true);
        }
      }
    } catch (err) {
      //console.log(err);
      console.log(error);
    }
  };

  // Add back button handler
  const handleBack = () => {
    navigate(-1);
  };

  // Handle comment form submit
  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    const newComment = {
      body: comment,
      parentId: null,
    };

    try {
      const response = await makeComment(blog.id, newComment);

      if (response) {
        //console.log(response);
        handleFetchComment(blog.id);
        setComment(""); // Clear the comment input after submission
        setBlog((prev) => ({
          ...prev,
          totalComments: (prev.totalComments || 0) + 1, // Increment total comments
        }));
      }
    } catch (err) {
      console.log(err);
      console.log(error);
    }
    //console.log(comment);
  };

  // Replace the loading state with the skeleton loader
  if (!blog) {
    return <ArticleSkeletonLoader />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#151515] flex items-center justify-center relative">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 px-3 py-2 rounded-full bg-white/80 dark:bg-[#222] shadow hover:bg-gray-100 dark:hover:bg-[#333] transition-colors"
      >
        <FaArrowLeft className="text-xl text-gray-700 dark:text-gray-200" />
        <span className="text-gray-700 dark:text-gray-200 font-medium text-sm">
          Back
        </span>
      </button>
      {/* Article Header */}
      <div className="max-w-2xl mx-auto w-full">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white my-6 leading-tight">
          {blog.title}
        </h1>
        {/* Featured Image */}
        <div className="w-full max-w-xl mx-auto h-60 md:h-72 relative overflow-hidden rounded-lg mb-6">
          <img
            src={blog.photo.url}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Article Content */}
        <div className="px-6 md:px-8 py-8 text-center">
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
              <div className="h-12">
                <p className="text-gray-900 text-left dark:text-white font-medium">
                  {blog.authorName} <br />
                  <span className="text-gray-600 dark:text-gray-400 text-sm">
                    {formatDateToSDMY(blog.createdAt)}
                  </span>
                </p>
              </div>
            </div>

            {/* Category Badge */}
            <span className="px-3 py-1 text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full ml-4">
              {blog.categoryEnum.replace(/_/g, " ")}
            </span>
          </div>

          {/* Article Body */}
          <div className="prose prose-lg dark:prose-invert max-w-none mb-6 text-left">
            <ReactMarkdown
              components={{
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
              {blog.body}
            </ReactMarkdown>
          </div>

          {/* Tags Section */}
          {blog.tagNames && blog.tagNames.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {blog.tagNames.map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-block px-3 py-1 text-xs font-semibold bg-gray-500 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Clap Section */}

          <div className="flex  items-center  mt-10 gap-3">
            <div className="flex items-center  gap-1 my-5">
              <div
                onClick={handleClap}
                className={`transition-all duration-200 ${
                  hasClapped
                    ? "  text-white "
                    : " text-gray-600 dark:text-gray-400 hover:text-gray-700"
                }`}
              >
                <FaHandsClapping className="text-lg cursor-pointer" />
              </div>
              <span className="text-sm text-gray-600 font-medium">{claps}</span>
            </div>
            <div>•</div>
            <div className="text-sm">
              <span className="">
                comments{" "}
                <span className="text-gray-600"> {blog.totalComments} </span>{" "}
              </span>
            </div>
          </div>

          {/* Article Footer */}
          <div className="flex items-center justify-center pt-8 border-t border-gray-200 dark:border-gray-700">
            {/* (Footer content if any) */}
          </div>

          {/* Comment List Placeholder */}
          <div className="space-y-4">
            {Array.isArray(comments) && comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="py-4 rounded flex flex-col">
                  <div className="flex items-center mb-2 gap-1">
                    <Avatar />
                    <div className="font-semibold text-gray-800 dark:text-gray-200">
                      {comment.username || "Anonymous"}
                    </div>
                  </div>
                  <div className="text-gray-700 dark:text-gray-300 text-left text-sm">
                    {comment.body}
                  </div>
                </div>
              ))
            ) : (
              <div className="py-4 rounded flex flex-col">
                <div className="flex items-center mb-2 gap-1">
                  <Avatar />
                  <div className="font-semibold text-gray-800 dark:text-gray-200">
                    No comments yet
                  </div>
                </div>
                <div className="text-gray-700 dark:text-gray-300 text-left text-sm">
                  Be the first to comment!
                </div>
              </div>
            )}
          </div>
          {/* Comment Section */}
          <div className="max-w-2xl mx-auto w-full px-6 md:px-8 py-5 mt-4">
            {/* Comment Form */}
            <form className="mb-6" onSubmit={handleCommentSubmit}>
              <textarea
                className="w-full p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#222] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows={3}
                value={comment}
                placeholder="Add a comment..."
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                type="submit"
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Post Comment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleArticlePage;

const ArticleSkeletonLoader = () => (
  <div className="min-h-screen bg-white dark:bg-[#151515] flex items-center justify-center">
    <div className="max-w-2xl mx-auto w-full">
      <Skeleton
        variant="text"
        width="70%"
        height={48}
        className="my-6"
        sx={{ bgcolor: "grey.900" }}
      />
      <Skeleton
        variant="rectangular"
        width="100%"
        height={180}
        className="mb-6 rounded-lg"
        sx={{ bgcolor: "grey.900", borderRadius: 2 }}
      />
      <div className="px-6 md:px-8 py-8 text-center">
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <Skeleton
              variant="circular"
              width={48}
              height={48}
              sx={{ bgcolor: "grey.900" }}
            />
            <div className="h-12 flex flex-col justify-center">
              <Skeleton
                variant="text"
                width={120}
                height={24}
                sx={{ bgcolor: "grey.900" }}
              />
              <Skeleton
                variant="text"
                width={80}
                height={16}
                sx={{ bgcolor: "grey.900" }}
              />
            </div>
          </div>
          <Skeleton
            variant="rounded"
            width={100}
            height={28}
            sx={{ bgcolor: "grey.900" }}
          />
        </div>
        <div className="prose prose-lg dark:prose-invert max-w-none mb-6 text-left">
          <Skeleton
            variant="text"
            width="100%"
            height={32}
            sx={{ bgcolor: "grey.900", mb: 1 }}
          />
          <Skeleton
            variant="text"
            width="90%"
            height={32}
            sx={{ bgcolor: "grey.900", mb: 1 }}
          />
          <Skeleton
            variant="text"
            width="95%"
            height={32}
            sx={{ bgcolor: "grey.900", mb: 1 }}
          />
          <Skeleton
            variant="text"
            width="80%"
            height={32}
            sx={{ bgcolor: "grey.900", mb: 1 }}
          />
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {Array.from({ length: 3 }).map((_, idx) => (
            <Skeleton
              key={idx}
              variant="rounded"
              width={60}
              height={24}
              sx={{ bgcolor: "grey.900" }}
            />
          ))}
        </div>
        <div className="flex items-center mb-1 gap-3">
          <div className="flex items-center gap-1 my-5">
            <Skeleton
              variant="circular"
              width={32}
              height={32}
              sx={{ bgcolor: "grey.900" }}
            />
            <Skeleton
              variant="text"
              width={32}
              height={20}
              sx={{ bgcolor: "grey.900" }}
            />
          </div>
          <div>•</div>
          <div className="text-sm">
            <Skeleton
              variant="text"
              width={60}
              height={20}
              sx={{ bgcolor: "grey.900" }}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);
