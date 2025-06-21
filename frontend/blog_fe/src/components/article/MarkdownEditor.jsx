import React, { useState, useEffect, useRef, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../route/route";
import { useArticles } from "../../hooks/useArticles";
import ContentLoader from "react-content-loader";

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

// Custom Image Skeleton Loader Component
const ImageSkeletonLoader = () => (
  <ContentLoader
    speed={2}
    width={800}
    height={400}
    viewBox="0 0 800 400"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    style={{ margin: "1rem auto", display: "block" }}
  >
    <rect x="0" y="0" rx="8" ry="8" width="800" height="400" />
  </ContentLoader>
);

// i will swtich to use uiwjs markdown editor later
export default function MarkdownEditor() {
  const [markdownInput, setMarkdownInput] = useState("");
  const [articleTitle, setArticleTitle] = useState("");
  const [uploadingImageId, setUploadingImageId] = useState(null);
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const { postPhoto, isLoading, error } = useArticles();
  const previewRef = useRef(null);
  const previousPathRef = useRef(null);

  // Auto-scroll preview when content changes
  useEffect(() => {
    if (previewRef.current) {
      previewRef.current.scrollTop = previewRef.current.scrollHeight;
    }
  }, [markdownInput]);

  // Load draft article when component mounts
  useEffect(() => {
    if (previousPathRef.current === null) {
      const previousPath = sessionStorage.getItem("previousPath");
      previousPathRef.current = previousPath;
      sessionStorage.removeItem("previousPath");
      if (previousPath && previousPath.includes("/edit")) {
        console.log("ENTERING FROM: The Edit Preview Page");
      } else {
        console.log("ENTERING FROM: A different page (e.g., Dashboard)");
      }
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
        // Clear invalid draft data
        sessionStorage.removeItem("draftArticle");
      }
    } else if (draftEditArticle) {
      try {
        const { body: content, title } = JSON.parse(draftEditArticle);
        setMarkdownInput(content || "");
        setArticleTitle(title || "");
        setIsEdit(true);
        console.log("i entered here");
        sessionStorage.removeItem("draftArticle");
      } catch (error) {
        console.error("Error loading draft article:", error);
        // Clear invalid draft data
        sessionStorage.removeItem("draftEditArticle");
        setIsEdit(false);
        navigate(PATHS.ADMIN.DASHBOARD);
      }
    }
  }, []);

  // Auto-save draft article whenever content or title changes
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
    }, 1000), // Save after 1 second of no changes
    []
  );

  // Effect to trigger auto-save
  useEffect(() => {
    saveDraft(articleTitle, markdownInput);
  }, [articleTitle, markdownInput, saveDraft]);

  const handleImageUpload = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("multipartFiles", file);

      // Create a temporary placeholder for the image
      const tempId = `temp_${Date.now()}`;
      const tempMarkdown = `\n![Uploading...](${tempId})\n`; // Added newlines

      // Insert placeholder at the end of the current line or start a new line
      const textarea = document.getElementById("markdown-editor");
      const startPos = textarea.selectionStart;
      const endPos = textarea.selectionEnd;

      // Get the current line's content
      const before = markdownInput.substring(0, startPos);
      const after = markdownInput.substring(endPos, markdownInput.length);

      // Check if we're in the middle of a line
      const isInMiddleOfLine = before.split("\n").pop().length > 0;

      // If we're in the middle of a line, add a newline before the image
      const newMarkdown = isInMiddleOfLine
        ? before + "\n" + tempMarkdown + after
        : before + tempMarkdown + after;

      setMarkdownInput(newMarkdown);
      setUploadingImageId(tempId);

      try {
        const response = await postPhoto(formData);
        console.log("Photo upload response:", response);

        if (response && response.url) {
          // Replace the placeholder with the actual image URL
          setMarkdownInput((prevMarkdown) =>
            prevMarkdown.replace(
              tempMarkdown,
              `\n![Uploaded Image](${response.url})\n`
            )
          );
        } else {
          console.error("No image URL found in response:", response);
          // Remove the placeholder if upload failed
          // const failedMarkdown = newMarkdown.replace(tempMarkdown, "");
          // setMarkdownInput(failedMarkdown);
          setMarkdownInput((prevMarkdown) =>
            prevMarkdown.replace(tempMarkdown, "")
          );
        }
      } catch (error) {
        console.error("Upload failed:", error);
        // Remove the placeholder if upload failed
        // const failedMarkdown = newMarkdown.replace(tempMarkdown, "");
        // setMarkdownInput(failedMarkdown);
        setMarkdownInput((prevMarkdown) =>
          prevMarkdown.replace(tempMarkdown, "")
        );
      } finally {
        setUploadingImageId(null);
      }
    };

    input.click();
  };

  // Custom image component for ReactMarkdown
  const ImageComponent = ({ node, ...props }) => {
    // Check if this is the currently uploading image
    const isUploading = props.src === uploadingImageId;

    if (isUploading) {
      return <ImageSkeletonLoader />;
    }

    return (
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
    );
  };

  const handleSubmit = () => {
    if (!articleTitle.trim()) {
      alert("Please enter an article title");
      return;
    }
    // const articleData = {
    //   title: articleTitle,
    //   content: markdownInput,
    //   createdAt: new Date().toISOString(),
    // };
    //localStorage.setItem("draftArticle", JSON.stringify(articleData));
    if (isEdit) {
      navigate(PATHS.ARTICLE.EDIT);
    } else if (!isEdit) {
      navigate(PATHS.ARTICLE.PREVIEW);
    }
    // console.log(isEdit);
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
            //disabled={isLoading}
            className={`w-full px-4 py-2 text-2xl font-bold bg-transparent border-b-2 border-gray-300 focus:border-blue-500 outline-none `}
            // className={`w-full px-4 py-2 text-2xl font-bold bg-transparent border-b-2 border-gray-300 focus:border-blue-500 outline-none ${
            //   isLoading ? "opacity-50 cursor-not-allowed" : ""
            // }`}
          />
        </div>

        <textarea
          id="markdown-editor"
          autoFocus
          //disabled={isLoading}
          className={`p-4 border-none outline-none w-[96%] h-full text-base resize-none bg-[#151515] overflow-x-hidden `}
          // className={`p-4 border-none outline-none w-[96%] h-full text-base resize-none bg-[#151515] overflow-x-hidden ${
          //   isLoading ? "opacity-50 cursor-not-allowed" : ""
          // }`}
          value={markdownInput}
          onChange={(e) => setMarkdownInput(e.target.value)}
        />
      </div>

      {/* Preview */}
      <div className="w-[45%] h-[80%] m-6 outline-none flex flex-col p-5 bg-[#eceeee] border-2 border-gray-300 overflow-hidden overflow-y-auto">
        <div className="w-full h-10 border-b border-gray-300 flex items-center text-sm font-medium mb-4">
          PREVIEW
        </div>
        <div
          className="p-4 w-[96%] h-full overflow-x-hidden bg-[#151515]"
          ref={previewRef}
        >
          {articleTitle && (
            <h1 className="text-3xl font-bold mb-6 text-white">
              {articleTitle}
            </h1>
          )}
          <ReactMarkdown
            children={markdownInput}
            components={{
              img: ImageComponent,
            }}
          />
        </div>
      </div>

      {/* Loading Overlay */}
      {/* {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2 text-gray-700">Uploading image...</p>
          </div>
        </div>
      )} */}
    </div>
  );
}
