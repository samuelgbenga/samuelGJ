// components/ArticleSkeleton.js
import React from "react";
import ContentLoader from "react-content-loader";

const SkLoader = (props) => (
  <ContentLoader
    speed={2}
    width="100%"
    height={70}
    backgroundColor="#1f1f1f"
    foregroundColor="#333"
    className="w-full"
    {...props}
  >
    {/* Title Line */}
    <rect x="10" y="15" rx="4" ry="4" width="60%" height="16" />
    {/* Status & Buttons */}
    <rect x="75%" y="15" rx="4" ry="4" width="50" height="16" />
    <rect x="83%" y="15" rx="4" ry="4" width="40" height="16" />
    <rect x="89%" y="15" rx="4" ry="4" width="50" height="16" />
  </ContentLoader>
);

export default SkLoader;
