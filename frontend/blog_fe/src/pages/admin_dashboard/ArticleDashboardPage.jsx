import React from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../route/route";

const ArticleDashboardPage = () => {
  return (
    <div>
      <Link to={PATHS.ARTICLE.CREATE}>Create Article</Link>
      <Link to={PATHS.ARTICLE.EDIT}> EDIT ARTICLE</Link>
      <Link to={PATHS.ARTICLE.PREVIEW}>PREVIEW ARTICLE</Link>
    </div>
  );
};

export default ArticleDashboardPage;
