import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { PATHS } from "../../route/route";

export default function ArticlePreview() {
  const [articleData, setArticleData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const draftArticle = localStorage.getItem("draftArticle");
    if (!draftArticle) {
      navigate(PATHS.ARTICLE.CREATE);
      return;
    }
    setArticleData(JSON.parse(draftArticle));
  }, [navigate]);

  const handlePublish = async () => {
    try {
      // TODO: Add your API endpoint for publishing
      // const response = await fetch('http://localhost:8080/api/articles', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(articleData),
      // });

      // if (response.ok) {
      //   localStorage.removeItem('draftArticle'); // Clean up draft
      //   navigate('/articles'); // Navigate to articles list
      // }
      console.log("Publishing article:", articleData);
      localStorage.removeItem("draftArticle"); // Clean up draft
      navigate(PATHS.HOME); // Navigate to articles list
    } catch (error) {
      console.error("Failed to publish article:", error);
    }
  };

  if (!articleData) {
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
    <div className="min-h-screen bg-[#151515] py-8">
      <div className="max-w-4xl mx-auto bg-[#151515] p-8">
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
              onClick={handlePublish}
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
    </div>
  );
}
