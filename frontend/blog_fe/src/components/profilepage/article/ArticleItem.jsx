import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatDateToDMY } from "../../../utils/timeConverter";
import { FaHandsClapping } from "react-icons/fa6";

const BlogItem = ({ blog }) => {
  return (
    <article className="relative bg-white/5 cursor-pointer backdrop-blur-sm shadow-lg overflow-hidden transition-transform hover:scale-[1.05] hover:shadow-xl font-['Tektur'] min-w-[200px] before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-t before:from-white/10 before:to-transparent before:opacity-30 before:pointer-events-none">
      <ContentItem blog={blog} />
    </article>
  );
};

export default BlogItem;

const ContentItem = ({ blog }) => {
  const navigate = useNavigate();

  const handleArticleClick = (e) => {
    e.preventDefault();
    // Set the blog data in sessionStorage
    sessionStorage.setItem("currentArticle", JSON.stringify(blog));
    // Navigate to the article page
    navigate(`/article/${blog.id}`);
  };

  return (
    <>
      <div
        className="relative h-48 w-full overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.1)), url(${blog.photo.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 text-xs font-medium bg-green-500 text-white rounded-full">
            {blog.categoryEnum.replace(/_/g, " ")}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="text-sm text-gray-400 mb-2">
          {formatDateToDMY(blog.createdAt)}
        </div>
        <h3 className="text-xl font-bold text-white mb-3 leading-tight hover:text-blue-400 transition-colors">
          <Link onClick={handleArticleClick}>{blog.title}</Link>
        </h3>
        <p className="text-base text-gray-400 line-clamp-3">
          {blog.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <Link
            onClick={handleArticleClick}
            className="text-green-400 hover:text-green-300 text-sm font-medium"
          >
            Read more →
          </Link>
          <div className="text-gray-600 flex gap-1 items-center text-sm">
            
            <FaHandsClapping/>
            <div className="text-sm">{blog.claps}</div>
          </div>
        </div>
      </div>
    </>
  );
};
