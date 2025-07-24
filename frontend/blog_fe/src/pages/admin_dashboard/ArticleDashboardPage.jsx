import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PATHS } from "../../route/route";
import { useArticles } from "../../hooks/useArticles";
import { usePreserveScroll } from "../../utils/scrollconfig";
import { LuCirclePlus } from "react-icons/lu";

const ArticleDashboardPage = () => {
  const {
    isLoading,
    articleListData,
    error,
    readArticleList,
    deleteArticle,
    setArticleListData,
  } = useArticles();

  const { saveScroll, restoreScroll } = usePreserveScroll();

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

  const handleDelete = async (articleId) => {
    saveScroll();
    console.log("Delete article:", articleId);
    try {
      const response = await deleteArticle(articleId);
      if (response) {
        setArticleListData((prev) =>
          prev.filter((item) => item.id !== articleId)
        );
        restoreScroll();
      }
    } catch (err) {
      console.log(err);
      console.log(error);
    }
    // Add your delete logic here
  };

  const handleEdit = (article) => {
    console.log("Edit article:", article);
    // Add your edit logic here
    sessionStorage.setItem("draftEditArticle", JSON.stringify(article));

    navigate(PATHS.ARTICLE.EDIT.replace(":id", article.id));
  };

  return (
    <div>
      <div className="p-6 text-black">
        <div className="flex justify-between items-center mb-6 ">
          <h1 className="text-2xl font-bold ">Articles</h1>
          <div>
            <Link to={PATHS.ARTICLE.CREATE} className="text-blue-500 text-2xl"><LuCirclePlus /></Link>
          </div>
        </div>

        {isLoading ? (
          <p>Loading articles...</p>
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
    </div>
  );
};

export default ArticleDashboardPage;
