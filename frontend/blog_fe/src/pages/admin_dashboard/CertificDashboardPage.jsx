import React from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../route/route";

const CertificDashboardPage = () => {
  return (
    <div>
      <Link to={PATHS.CERTIFICATION.CREATE}>CREATE CERTIFICATION</Link>
      <Link to={PATHS.CERTIFICATION.EDIT}>EDIT CERTIFICATION</Link>
    </div>
  );
};

export default CertificDashboardPage;
