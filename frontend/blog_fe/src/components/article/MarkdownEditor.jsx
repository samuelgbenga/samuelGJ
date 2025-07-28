import React, { useState, useEffect, useRef, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../route/route";
import { useArticles } from "../../hooks/useArticles";
import ContentLoader from "react-content-loader";
import { FiPlus } from "react-icons/fi"; // Add this import at the top
import { LuCirclePlus } from "react-icons/lu";

// Debounce utility function
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const ImageSkeletonLoader = () => (
  <ContentLoader
    speed={2}
    width={500}
    height={400}
    viewBox="0 0 800 400"
    backgroundColor="#2a2a2a"
    foregroundColor="#444"
    style={{ margin: "1rem auto", display: "block" }}
  >
    <rect x="0" y="0" rx="8" ry="8" width="400" height="400" />
  </ContentLoader>
);

export default function MarkdownEditor() {
  const [markdownInput, setMarkdownInput] = useState("");
  const [articleTitle, setArticleTitle] = useState("");
  const [uploadingImageId, setUploadingImageId] = useState(null);
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const { postPhoto, isLoading, error } = useArticles();
  const previewRef = useRef(null);
  const previousPathRef = useRef(null);

  // Inside your component state
  const dragRef = useRef(null);
  const [dragPosition, setDragPosition] = useState({ x: 200, y: 200 }); // initial position
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (previewRef.current) {
      previewRef.current.scrollTop = previewRef.current.scrollHeight;
    }
  }, [markdownInput]);

  useEffect(() => {
    if (previousPathRef.current === null) {
      const previousPath = sessionStorage.getItem("previousPath");
      previousPathRef.current = previousPath;
      sessionStorage.removeItem("previousPath");
    }

    const draftArticle = sessionStorage.getItem("draftArticle");
    const draftEditArticle = sessionStorage.getItem("draftEditArticle");
    if (draftArticle) {
      try {
        const { content, title } = JSON.parse(draftArticle);
        setMarkdownInput(content || "");
        setArticleTitle(title || "");
        sessionStorage.removeItem("draftEditArticle");
      } catch (error) {
        console.error("Error loading draft article:", error);
        sessionStorage.removeItem("draftArticle");
      }
    } else if (draftEditArticle) {
      try {
        const { body: content, title } = JSON.parse(draftEditArticle);
        setMarkdownInput(content || "");
        setArticleTitle(title || "");
        setIsEdit(true);
        sessionStorage.removeItem("draftArticle");
      } catch (error) {
        console.error("Error loading draft article:", error);
        sessionStorage.removeItem("draftEditArticle");
        setIsEdit(false);
        navigate(PATHS.ADMIN.DASHBOARD);
      }
    }
  }, []);

  const saveDraft = useCallback(
    debounce((title, content) => {
      const draftEditArticle = sessionStorage.getItem("draftEditArticle");
      if (draftEditArticle) {
        const articleData = {
          title,
          body: content,
          createdAt: new Date().toISOString(),
        };
        const existing = JSON.parse(draftEditArticle);
        const merged = { ...existing, ...articleData };
        sessionStorage.setItem("draftEditArticle", JSON.stringify(merged));
      } else {
        const articleData = {
          title,
          content,
          createdAt: new Date().toISOString(),
        };
        const draftArticle = sessionStorage.getItem("draftArticle");
        const existing = draftArticle ? JSON.parse(draftArticle) : {};
        const merged = { ...existing, ...articleData };
        sessionStorage.setItem("draftArticle", JSON.stringify(merged));
      }
    }, 1000),
    []
  );

  useEffect(() => {
    saveDraft(articleTitle, markdownInput);
  }, [articleTitle, markdownInput, saveDraft]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (dragRef.current?.dataset.dragging === "true") {
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        const scrollX = window.scrollX || document.documentElement.scrollLeft;

        setDragPosition({
          x: e.clientX - dragOffset.x + scrollX,
          y: e.clientY - dragOffset.y + scrollY,
        });
      }
    };

    const handleMouseUp = () => {
      if (dragRef.current) {
        dragRef.current.dataset.dragging = "false";
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragOffset]);

  const handleImageUpload = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("multipartFiles", file);
      const tempId = `temp_${Date.now()}`;
      const tempMarkdown = `\n![Uploading...](${tempId})\n`;

      const textarea = document.getElementById("markdown-editor");
      const startPos = textarea.selectionStart;
      const endPos = textarea.selectionEnd;

      const before = markdownInput.substring(0, startPos);
      const after = markdownInput.substring(endPos, markdownInput.length);
      const isInMiddleOfLine = before.split("\n").pop().length > 0;
      const newMarkdown = isInMiddleOfLine
        ? before + "\n" + tempMarkdown + after
        : before + tempMarkdown + after;

      setMarkdownInput(newMarkdown);
      setUploadingImageId(tempId);

      try {
        const response = await postPhoto(formData);
        if (response && response.url) {
          setMarkdownInput((prevMarkdown) =>
            prevMarkdown.replace(
              tempMarkdown,
              `\n![Uploaded Image](${response.url})\n`
            )
          );
        } else {
          setMarkdownInput((prevMarkdown) =>
            prevMarkdown.replace(tempMarkdown, "")
          );
        }
      } catch (error) {
        console.error("Upload failed:", error);
        setMarkdownInput((prevMarkdown) =>
          prevMarkdown.replace(tempMarkdown, "")
        );
      } finally {
        setUploadingImageId(null);
      }
    };

    input.click();
  };

  const ImageComponent = ({ node, ...props }) => {
    const isUploading = props.src === uploadingImageId;
    if (isUploading) return <ImageSkeletonLoader />;
    return (
      <img
        {...props}
        alt={props.alt}
        style={{
          maxWidth: "400px",
          maxHeight: "400px",
          objectFit: "contain",
          borderRadius: "8px",
          margin: "1rem auto",
          display: "block",
        }}
      />
    );
  };

  const handleSubmit = () => {
    if (!articleTitle.trim()) {
      alert("Please enter an article title");
      return;
    }
    if (isEdit) {
      navigate(PATHS.ARTICLE.EDIT);
    } else {
      navigate(PATHS.ARTICLE.PREVIEW);
    }
  };

  return (
    <div className="flex w-full min-h-screen text-white bg-transparent overscroll-none">
      {/* Markdown Editor */}
      <div className="relative w-1/2 p-6 pr-0 border-r border-[#1a1a1a] bg-transparent overscroll-none">
        <div className="flex items-center justify-center text-sm font-medium mb-4 fixed top-0 left-0 w-1/2 h-16 bg-[#0e0e0e] border-b border-r border-[#1a1a1a] z-10">
          <div className="text-gray-400 text-3xl font-bold">MARKDOWN</div>
        </div>

        <input
          type="text"
          value={articleTitle}
          onChange={(e) => setArticleTitle(e.target.value)}
          placeholder="Enter your article title..."
          className="w-full mt-10  mb-2 px-4 py-2 text-2xl font-bold bg-transparent border-gray-700 focus:border-blue-500 outline-none text-white placeholder-gray-500"
        />


        <div className="relative w-full h-full">
          <textarea
            id="markdown-editor"
            autoFocus
            className="w-full h-full p-4 pb-[100px] bg-transparent text-white placeholder-gray-500 resize-none focus:outline-none focus:ring-0 focus:border-none"
            value={markdownInput}
            onChange={(e) => setMarkdownInput(e.target.value)}
          />

          {/* Floating Draggable Upload Button */}
          <div
            className="relative group"
            style={{
              position: "absolute",
              top: `${dragPosition.y}px`,
              left: `${dragPosition.x}px`,
              zIndex: 50,
            }}
          >
            {/* Tooltip */}
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none text-nowrap">
              Upload Image
            </div>

            {/* Draggable Button */}
            <span
              ref={dragRef}
              onMouseDown={(e) => {
                const rect = dragRef.current.getBoundingClientRect();
                const scrollY =
                  window.scrollY || document.documentElement.scrollTop;
                const scrollX =
                  window.scrollX || document.documentElement.scrollLeft;

                setDragOffset({
                  x: e.clientX - rect.left,
                  y: e.clientY - rect.top + 130,
                });

                dragRef.current.dataset.dragging = "true";
                e.preventDefault();
              }}
              onClick={handleImageUpload}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1a1a1a] text-blue-400 hover:text-blue-500 transition duration-200 shadow-md cursor-move"
              title="Upload Image"
            >
              <LuCirclePlus className="text-xl text-blue-700" />
            </span>
          </div>
        </div>

        {/* Fixed Bottom Submit Button */}
        <div className="fixed bottom-0 left-0 w-1/2 px-6 py-4 ">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`w-full py-2 rounded text-white bg-[#1a1a1a] hover:bg-[#2a2a2a] transition-colors ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            I am done
          </button>
        </div>
      </div>

      {/* Markdown Preview */}
      <div className="w-1/2 p-6 bg-transparent overflow-y-auto relative">
        <div className="flex items-center justify-center text-sm font-medium mb-4 fixed top-0 right-0  w-1/2 h-16 bg-[#0e0e0e] border-b border-l border-[#1a1a1a] z-10">
          <div className="text-gray-400 text-3xl font-bold">PREVIEW</div>
        </div>

        <div className="w-full text-white space-y-4 mt-12">
          {articleTitle && (
            <h1 className="text-3xl font-bold mb-6">{articleTitle}</h1>
          )}
          <ReactMarkdown
            children={markdownInput}
            components={{
              img: ImageComponent,
              // No need to override `code` unless needed
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
          />
        </div>
      </div>
    </div>
  );
}
