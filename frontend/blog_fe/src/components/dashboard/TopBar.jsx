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
      {/* TopBar Header */}
      <header className="h-16 bg-gray-900 border-b border-[#1f1f1f] flex items-center justify-end px-6">
        <div className="relative">
          <span
            onClick={() => setIsAvatarOpen(!isAvatarOpen)}
            className="all-[unset] flex items-center space-x-3 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center shadow-md">
              <span className="text-sm font-semibold text-gray-300">AD</span>
            </div>
          </span>

          <AvatarDropdown
            isOpen={isAvatarOpen}
            onClose={handleNavigation}
            logout={handleLogout}
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
    <div className="absolute right-0 mt-2 w-48 bg-[#1c1c1c] border border-[#2a2a2a] rounded-md shadow-xl z-20">
      <button
        className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-[#2a2a2a] hover:text-white transition"
        onClick={onClose}
      >
        View Profile
      </button>
      <button
        className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-[#2a2a2a] hover:text-red-400 transition"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};
