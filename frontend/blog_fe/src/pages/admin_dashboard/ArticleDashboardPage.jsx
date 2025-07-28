import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PATHS } from "../../route/route";
import { useArticles } from "../../hooks/useArticles";
import { usePreserveScroll } from "../../utils/scrollconfig";
import { LuCirclePlus } from "react-icons/lu";
import SkLoader from "../../components/dashboard/SkLoader";

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
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Articles</h1>
          <Link
            to={PATHS.ARTICLE.CREATE}
            className="text-blue-400 text-2xl hover:text-blue-300"
          >
            <LuCirclePlus />
          </Link>
        </div>

        {/* Loading / Error / List */}
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="p-4 bg-[#1a1a1a] border border-gray-700 rounded-lg shadow"
              >
                <SkLoader />
              </div>
            ))}
          </div>
        ) : error ? (
          <p className="text-red-400">Error loading articles</p>
        ) : (
          <div className="space-y-3">
            {articleListData?.map((article) => (
              <div
                key={article.id}
                className="p-4 bg-[#1a1a1a] border border-gray-700 rounded-lg shadow flex justify-between items-center"
              >
                {/* Title */}
                <span className="flex-1 text-gray-100 font-medium">
                  {article.title}
                </span>

                {/* Actions */}
                <div className="flex gap-2">
                  {/* Status Badge */}
                  <div
                    className={`px-3 py-1 rounded-full transition-colors flex items-center text-sm font-semibold tracking-wide ${
                      article.postStatus === "DRAFT"
                        ? "bg-red-500/10 text-red-400"
                        : "bg-green-500/10 text-green-400"
                    }`}
                  >
                    {article.postStatus.charAt(0) +
                      article.postStatus.slice(1).toLowerCase()}
                  </div>

                  {/* Edit Button */}
                  <button
                    onClick={() => handleEdit(article)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Edit
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(article.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
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
