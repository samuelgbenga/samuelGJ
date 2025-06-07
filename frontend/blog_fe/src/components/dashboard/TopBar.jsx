import React from "react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../route/route";
import { useLoginHook } from "../../hooks/useAuth";

const TopBar = ({ isAvatarOpen, setIsAvatarOpen }) => {
  const navigate = useNavigate();
  const { logout } = useLoginHook();

  const handleNavigation = () => {
    setIsAvatarOpen(false);
    navigate(PATHS.ADMIN.PROFILE);
  };

  const handleLogout = () => {
    setIsAvatarOpen(false);
   // console.log("logout");
    logout();
    navigate(PATHS.HOME, { replace: true });
  };


  return (
    <>
      {" "}
      {/* Header */}
      <header className="h-16 bg-white flex items-center justify-end px-6">
        {/* Avatar */}
        <div className="relative">
          <button
            onClick={() => setIsAvatarOpen(!isAvatarOpen)}
            className="flex items-center space-x-3 focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-600">AD</span>
            </div>
          </button>
          <AvatarDropdown
            isOpen={isAvatarOpen}
            onClose={() => handleNavigation()}
            logout={()=> handleLogout()}
          />
        </div>
      </header>
    </>
  );
};

export default TopBar;

// Avatar Dropdown Component
const AvatarDropdown = ({ isOpen, onClose, logout }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
      <button
        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        onClick={onClose}
      >
        View Profile
      </button>

      <button
        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};
