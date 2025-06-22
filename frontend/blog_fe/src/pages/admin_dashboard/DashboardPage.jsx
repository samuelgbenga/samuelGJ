import React, { useEffect } from "react";
import { useArticles } from "../../hooks/useArticles";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../route/route";

const DashboardPage = () => {
  const {
    isLoading,
    articleListData,
    error,
    readArticleList,
    deleteArticle,
    setArticleListData,
  } = useArticles();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticleList = async () => {
      try {
         await readArticleList();
      } catch (err) {
        console.log("the err:", err);
        console.log("the error:", error);
      }
    };
    fetchArticleList();
  }, []);

  const handleEdit = (article) => {
    console.log("Edit article:", article);
    // Add your edit logic here
    sessionStorage.setItem("draftEditArticle", JSON.stringify(article));

    navigate(PATHS.ARTICLE.EDIT.replace(":id", article.id));
  };

  const handleDelete = async (articleId) => {
    console.log("Delete article:", articleId);
    try {
      const response = await deleteArticle(articleId);
      if (response) {
        setArticleListData((prev) =>
          prev.filter((item) => item.id !== articleId)
        );
      }
    } catch (err) {
      console.log(err);
      console.log(error);
    }
    // Add your delete logic here
  };

  return (
    <div className="p-6 text-black">
      <h1 className="text-2xl font-bold mb-4">Articles</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error loading articles</p>
      ) : (
        <div className="space-y-2">
          {articleListData?.map((article) => (
            <div
              key={article.id}
              className="p-4 bg-white rounded shadow flex justify-between items-center"
            >
              <span className="flex-1">{article.title}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(article)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(article.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
