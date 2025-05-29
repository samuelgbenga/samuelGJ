import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../route/route";

// i will swtich to use uiwjs markdown editor later
export default function MarkdownEditor() {
  const [markdownInput, setMarkdownInput] = useState("");
  const [imageUrl, setImageUrl] = useState([]);
  const [articleTitle, setArticleTitle] = useState("");
  const navigate = useNavigate();

  // Load draft article when component mounts
  useEffect(() => {
    const draftArticle = localStorage.getItem("draftArticle");
    if (draftArticle) {
      const { content, images, title } = JSON.parse(draftArticle);
      setMarkdownInput(content);
      setImageUrl(images);
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
      formData.append("image", file);

      // try {
      //   const response = await fetch("http://localhost:8080/api/upload", {
      //     method: "POST",
      //     body: formData,
      //   });

      //   const data = await response.json(); // { url: "...", public_id: "..." }

      //   insertImageMarkdown(data.url);
      //
      // Add the new image object to the array
      //setImageUrl((prevImages) => [
      //  ...prevImages,
      //  {
      //    url: data.url,
      //    public_id: data.public_id,
      //  },
      //]);
      //
      // } catch (err) {
      //   console.error("Upload failed", err);
      // }

      insertImageMarkdown(
        "https://res.cloudinary.com/dbrqyy9fu/image/upload/v1747530474/my_blog_folder/yqid7522rjagqlpxy5de.jpg"
      );

      // Add the new image object to the array
      setImageUrl((prevImages) => [
        ...prevImages,
        {
          url: "https://res.cloudinary.com/dbrqyy9fu/image/upload/v1747530474/my_blog_folder/yqid7522rjagqlpxy5de.jpg",
          public_id: "data.public_id",
        },
      ]);
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
      images: imageUrl,
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem("draftArticle", JSON.stringify(articleData));
    navigate(PATHS.ARTICLE.PREVIEW);
  };

  useEffect(() => {
    console.log(imageUrl);
  }, [imageUrl]);

  return (
    <div className="flex w-full h-screen items-center overflow-hidden">
      {/* Editor */}
      <div className="w-[45%] h-[80%] m-6 outline-none flex flex-col p-5 bg-[#eceeee] border-2 border-gray-300 overflow-hidden overflow-y-auto">
        <div className="w-full h-10 border-b border-gray-300 flex items-center justify-between text-sm font-medium mb-4">
          <div>
            MARKDOWN <button onClick={handleImageUpload}>Upload Image</button>
          </div>
          <button
            onClick={handleSubmit}
            className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
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
            className="w-full px-4 py-2 text-2xl font-bold bg-transparent border-b-2 border-gray-300 focus:border-blue-500 outline-none"
          />
        </div>

        <textarea
          id="markdown-editor"
          autoFocus
          className="p-4 border-none outline-none w-[96%] h-full text-base resize-none bg-[#151515] overflow-x-hidden"
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
    </div>
  );
}
