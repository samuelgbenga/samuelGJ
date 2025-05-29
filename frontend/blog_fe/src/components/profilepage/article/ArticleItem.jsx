import React from "react";
import { Link } from "react-router-dom";

const BlogItem = ({ blog }) => {
  return (
    <article className="bg-[#1c1c1c] rounded-lg overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg">
      <div className="relative h-48 w-full">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "/images/blog/placeholder.jpg"; // Fallback image
          }}
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 text-xs font-medium bg-blue-500 text-white rounded-full">
            {blog.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="text-sm text-gray-400 mb-2">{blog.date}</div>
        <h3 className="text-xl font-bold text-white mb-3 leading-tight hover:text-blue-400 transition-colors">
          <Link
            to={`/article/${blog.title.toLowerCase().replace(/\s+/g, "-")}`}
          >
            {blog.title}
          </Link>
        </h3>
        <p className="text-base text-gray-400 line-clamp-3">{blog.excerpt}</p>

        <div className="mt-4 flex items-center justify-between">
          <Link
            to={`/article/${blog.title.toLowerCase().replace(/\s+/g, "-")}`}
            className="text-blue-400 hover:text-blue-300 text-sm font-medium"
          >
            Read more →
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogItem;
