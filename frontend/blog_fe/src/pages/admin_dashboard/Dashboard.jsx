import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { PATHS } from "../../route/route";
import { useLoginHook } from "../../hooks/useAuth";

const Dashboard = () => {
  const { logout } = useLoginHook();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(PATHS.HOME, { replace: true });
  };

  return (
    <div>
      <Link to={PATHS.ARTICLE.CREATE}>Create Article</Link>
      <Link to={PATHS.ARTICLE.EDIT}> EDIT ARTICLE</Link>
      <Link to={PATHS.ARTICLE.PREVIEW}>PREVIEW ARTICLE</Link>
      <Link to={PATHS.PROJECT.CREATE}> CREATE PROJECT</Link>
      <Link to={PATHS.PROJECT.EDIT}>EDIT PROJECT</Link>
      <Link to={PATHS.CERTIFICATION.CREATE}>CREATE CERTIFICATION</Link>
      <Link to={PATHS.CERTIFICATION.EDIT}>EDIT CERTIFICATION</Link>

      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default Dashboard;
