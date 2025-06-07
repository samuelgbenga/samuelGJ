import React from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../route/route";

const ProjectDashboardPage = () => {
  return (
    <div>
      {" "}
      <Link to={PATHS.PROJECT.CREATE}> CREATE PROJECT</Link>
      <Link to={PATHS.PROJECT.EDIT}>EDIT PROJECT</Link>
    </div>
  );
};

export default ProjectDashboardPage;
