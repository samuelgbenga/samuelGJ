import React from "react";

function CertItems({ item }) {
  const renderIcon = () => {
      return (
      <div className="w-12 h-12 rounded-full bg-[#2a2a2a] flex items-center justify-center flex-shrink-0 overflow-hidden">
        <img
          src="/vite.svg"
          alt="Certification logo"
          className="w-8 h-8 object-contain"
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
        <div className="text-lg font-bold text-white mb-0.5">{item.title}</div>
        <div className="text-sm text-gray-400 mb-1">{item.source}</div>
        <div className="text-xs text-gray-500 uppercase">{item.date}</div>
      </div>
    </div>
  );
}

export default CertItems;
