import React from "react";
import BlogItem from "./ArticleItem";

const blogsData = [
  {
    title: "Building Modern Web Applications with React",
    date: "October 26, 2023",
    excerpt:
      "A deep dive into modern React patterns and best practices for building scalable web applications.",
    image: "/golvialogo.png",
    category: "Web Development",
  },
  {
    title: "The Future of AI in Software Development",
    date: "November 1, 2023",
    excerpt:
      "Exploring how artificial intelligence is transforming the way we write and maintain code.",
    image: "/vite.svg",
    category: "Artificial Intelligence",
  },
  {
    title: "Mastering TypeScript for Better Code",
    date: "November 10, 2023",
    excerpt:
      "Learn how TypeScript can help you write more maintainable and bug-free applications.",
    image: "/golvialogo.png",
    category: "Programming",
  },
  {
    title: "Cloud Architecture Best Practices",
    date: "November 15, 2023",
    excerpt:
      "Essential patterns and practices for designing scalable cloud applications.",
    image: "/vite.svg",
    category: "Cloud Computing",
  },
];

export const BlogList = () => {
  const leftColumn = blogsData.filter((_, i) => i % 2 === 0);
  const rightColumn = blogsData.filter((_, i) => i % 2 === 1);

  return (
    <div className="flex gap-4">
      {/* Left Column */}
      <div className="flex-1 flex flex-col gap-4">
        {leftColumn.map((blog, idx) => (
          <BlogItem key={idx * 2} blog={blog} />
        ))}
      </div>
      {/* Right Column */}
      <div className="flex-1 flex flex-col gap-4">
        {rightColumn.map((blog, idx) => (
          <div key={idx * 2 + 1} className={idx === 0 ? "mt-4 md:mt-8" : ""}>
            <BlogItem blog={blog} />
          </div>
        ))}
      </div>
    </div>
  );
};
