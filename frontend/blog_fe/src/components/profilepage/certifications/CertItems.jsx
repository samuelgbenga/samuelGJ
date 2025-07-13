import React from "react";

function CertItems({ item }) {
  const renderIcon = () => {
    return (
      <div className="w-22 h-22   flex items-center justify-center flex-shrink-0 overflow-hidden">
        <img
          src={item.credentialUrl}
          alt="Certification logo"
          className=" object-contain"
          onError={(e) => {
            e.target.src = "/golvialogo.png"; // Fallback image
          }}
        />
      </div>
    );
  };

  return (
    <div className="flex items-center space-x-6 py-4 border-gray-700">
      {renderIcon()}
      <div className="flex-1">
        <div className="text-lg font-bold text-white mb-0.5">
          {item.name}{" "} 
          <span className="text-sm text-gray-400"> - {item.issuer}</span>
        </div>

        <div className="text-xs  text-white mb-0.5 ">
          {item.description}
        </div>
        <div className="text-xs text-gray-500 uppercase">{item.issueDate}</div>
      </div>
    </div>
  );
}

export default CertItems;
