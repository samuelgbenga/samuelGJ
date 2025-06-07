import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../route/route";
import { useArticles } from "../../hooks/useArticles";

// i will swtich to use uiwjs markdown editor later
export default function MarkdownEditor() {
  const [markdownInput, setMarkdownInput] = useState("");
  const [articleTitle, setArticleTitle] = useState("");
  const navigate = useNavigate();
  const { postPhoto, isLoading, error } = useArticles();

  // Load draft article when component mounts
  useEffect(() => {
    const draftArticle = localStorage.getItem("draftArticle");
    if (draftArticle) {
      const { content, images, title } = JSON.parse(draftArticle);
      setMarkdownInput(content);
      setArticleTitle(title || "");
    }
  }, []);

  const handleImageUpload = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("multipartFiles", file);

      try {
        const response = await postPhoto(formData);
        // console.log("Photo upload response:", response); // Debug log

        // Check if response exists and has the expected structure
        if (response) {
          const imageUrl = response.url;
          if (imageUrl) {
            insertImageMarkdown(imageUrl);
          } else {
            console.error("No image URL found in response:", response);
          }
        } else {
          console.error("Invalid response format:", response);
        }
      } catch (error) {
        console.error("Upload failed:", error);
        // You might want to show an error message to the user here
      }
    };

    input.click();
  };

  const insertImageMarkdown = (url) => {
    const textarea = document.getElementById("markdown-editor");
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const markdownImage = `![Alt Text](${url})`;

    const before = markdownInput.substring(0, startPos);
    const after = markdownInput.substring(endPos, markdownInput.length);
    const newMarkdown = before + markdownImage + after;

    setMarkdownInput(newMarkdown);
  };

  const handleSubmit = () => {
    if (!articleTitle.trim()) {
      alert("Please enter an article title");
      return;
    }

    const articleData = {
      title: articleTitle,
      content: markdownInput,
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem("draftArticle", JSON.stringify(articleData));
    navigate(PATHS.ARTICLE.PREVIEW);
  };

  // useEffect(() => {
  //   console.log(imageUrl);
  // }, [imageUrl]);

  return (
    <div className="flex w-full h-screen items-center overflow-hidden">
      {/* Editor */}
      <div className="w-[45%] h-[80%] m-6 outline-none flex flex-col p-5 bg-[#eceeee] border-2 border-gray-300 overflow-hidden overflow-y-auto">
        <div className="w-full h-10 border-b border-gray-300 flex items-center justify-between text-sm font-medium mb-4">
          <div>
            MARKDOWN{" "}
            <button
              onClick={handleImageUpload}
              disabled={isLoading}
              className={`${
                isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:text-blue-600"
              }`}
            >
              {isLoading ? "Uploading..." : "Upload Image"}
            </button>
          </div>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`px-4 py-1 bg-blue-500 text-white rounded transition-colors ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
            }`}
          >
            I am done
          </button>
        </div>

        {/* Title Input */}
        <div className="mb-6">
          <input
            type="text"
            value={articleTitle}
            onChange={(e) => setArticleTitle(e.target.value)}
            placeholder="Enter your article title..."
            disabled={isLoading}
            className={`w-full px-4 py-2 text-2xl font-bold bg-transparent border-b-2 border-gray-300 focus:border-blue-500 outline-none ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          />
        </div>

        <textarea
          id="markdown-editor"
          autoFocus
          disabled={isLoading}
          className={`p-4 border-none outline-none w-[96%] h-full text-base resize-none bg-[#151515] overflow-x-hidden ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          value={markdownInput}
          onChange={(e) => setMarkdownInput(e.target.value)}
        />
      </div>

      {/* Preview */}
      <div className="w-[45%] h-[80%] m-6 outline-none flex flex-col p-5 bg-[#eceeee] border-2 border-gray-300 overflow-hidden overflow-y-auto">
        <div className="w-full h-10 border-b border-gray-300 flex items-center text-sm font-medium mb-4">
          PREVIEW
        </div>
        <div className="p-4 w-[96%] h-full overflow-x-hidden bg-[#151515]">
          {articleTitle && (
            <h1 className="text-3xl font-bold mb-6 text-white">
              {articleTitle}
            </h1>
          )}
          <ReactMarkdown
            children={markdownInput}
            components={{
              img: ({ node, ...props }) => (
                <img
                  {...props}
                  alt={props.alt}
                  style={{
                    maxWidth: "800px",
                    maxHeight: "400px",
                    width: "auto",
                    height: "auto",
                    objectFit: "contain",
                    borderRadius: "8px",
                    margin: "1rem auto",
                    display: "block",
                  }}
                />
              ),
            }}
          />
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2 text-gray-700">Uploading image...</p>
          </div>
        </div>
      )}
    </div>
  );
}
