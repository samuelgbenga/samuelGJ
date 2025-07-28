import React from "react";
import { useNavigate } from "react-router-dom";
import {
  HomeIcon,
  DocumentTextIcon,
  FolderIcon,
  AcademicCapIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { PATHS } from "../../route/route";
import { useLoginHook } from "../../hooks/useAuth";

const sidebarItems = [
  { id: "Dashboard", icon: HomeIcon, path: PATHS.ADMIN.DASHBOARD },
  { id: "Article", icon: DocumentTextIcon, path: PATHS.ADMIN.ARTICLE },
  { id: "Projects", icon: FolderIcon, path: PATHS.ADMIN.PROJECT },
  { id: "Certificate", icon: AcademicCapIcon, path: PATHS.ADMIN.CERTIFICATION },
  { id: "Profile", icon: UserCircleIcon, path: PATHS.ADMIN.PROFILE },
];

const SideBar = ({ activeItem, setActiveItem }) => {
  const navigate = useNavigate();
  const { logout } = useLoginHook();

  const handleNavigation = (item) => {
    setActiveItem(item.id);
    navigate(item.path);
  };

  const handleLogout = () => {
    logout();
    navigate(PATHS.HOME, { replace: true });
  };

  return (
    <aside className="w-64 h-screen bg-[#111111] border-r border-[#1f1f1f] flex flex-col shadow-lg">
      {/* Logo/Brand */}
      <div className="h-16 flex items-center justify-center border-b border-[#1f1f1f]">
        <div className="text-lg font-bold text-gray-100 tracking-wide">Admin Panel</div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {sidebarItems.map((item) => (
          <SidebarItem
            key={item.id}
            icon={item.icon}
            text={item.id}
            isActive={activeItem === item.id}
            onClick={() => handleNavigation(item)}
          />
        ))}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-[#1f1f1f]">
        <SidebarItem
          icon={ArrowRightOnRectangleIcon}
          text="Log Out"
          isActive={false}
          onClick={handleLogout}
          isLogout
        />
      </div>
    </aside>
  );
};

export default SideBar;

// Sidebar Item Component
const SidebarItem = ({
  icon: Icon,
  text,
  onClick,
  isActive,
  isLogout = false,
}) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-3 w-full px-4 py-3 text-sm font-semibold rounded-md transition-colors
      ${
        isActive
          ? "bg-blue-600 text-white"
          : "text-gray-400 hover:bg-[#1e1e1e] hover:text-white"
      }
      ${isLogout ? "mt-auto text-red-500 hover:text-red-400" : ""}
    `}
  >
    <Icon className="w-5 h-5" />
    <span>{text}</span>
  </button>
);
