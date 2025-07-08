import React from "react";
import { Link } from "react-router-dom";

const BlogItem = ({ blog }) => {
  return (
    <article className="relative bg-white/5 cursor-pointer backdrop-blur-sm shadow-lg overflow-hidden transition-transform hover:scale-[1.08] hover:shadow-xl font-['Tektur'] min-w-[200px] before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-t before:from-white/10 before:to-transparent before:opacity-30 before:pointer-events-none">
      <ContentItem blog={blog} />
    </article>
  );
};

export default BlogItem;

const ContentItem = ({ blog }) => {
  return (
    <>
      <div
        className="relative h-48 w-full overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.1)), url(${blog.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute top-4 left-4 z-10">
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
    </>
  );
};
