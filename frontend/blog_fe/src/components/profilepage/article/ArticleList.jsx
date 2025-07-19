import React, { useEffect } from "react";
import BlogItem from "./ArticleItem";
import { useArticles } from "../../../hooks/useArticles";
import { Skeleton } from "@mui/material";

export const BlogList = () => {
  const { isLoading, error, articleListData, readArticleList } = useArticles();

  useEffect(() => {
    const fetchArticleList = async () => {
      await readArticleList();
    };
    fetchArticleList();
    articleListData && console.log(articleListData);
  }, []);

  useEffect(() => {
    console.log(articleListData)
  }, [articleListData])

  const leftColumn = articleListData
    ? articleListData.filter((_, i) => i % 2 === 0)
    : null;
  const rightColumn = articleListData
    ? articleListData.filter((_, i) => i % 2 === 1)
    : null;

  return (
    <div className="flex gap-4">
      {/* Left Column */}
      <div className="flex-1 flex flex-col gap-4">
        {leftColumn ? (
          leftColumn.map((blog, idx) => <BlogItem key={idx * 2} blog={blog} />)
        ) : (
          <SkeletonItems />
        )}
      </div>
      {/* Right Column */}
      <div className="flex-1 flex flex-col gap-4">
        {rightColumn ? (
          rightColumn.map((blog, idx) => (
            <div key={idx * 2 + 1} className={idx === 0 ? "mt-4 md:mt-8" : ""}>
              <BlogItem blog={blog} />
            </div>
          ))
        ) : (
          <SkeletonItemsR />
        )}
      </div>
    </div>
  );
};

const SkeletonItems = () => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, idx) => (
        <Skeleton
          key={idx}
          variant="rectangular"
          height={360}
          animation="wave"
          sx={{ bgcolor: "grey.900" }}
        />
      ))}
    </>
  );
};

const SkeletonItemsR = () => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, idx) => (
        <Skeleton
          key={idx}
          variant="rectangular"
          height={360}
          animation="wave"
          sx={{
            bgcolor: "grey.900",
            ...(idx === 0 ? { marginTop: "1.8em" } : {}),
          }}
        />
      ))}
    </>
  );
};
