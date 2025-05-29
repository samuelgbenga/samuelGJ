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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {blogsData.map((blog, index) => (
        <BlogItem key={index} blog={blog} />
      ))}
    </div>
  );
};
