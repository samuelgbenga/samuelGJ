import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  {
    id: "Dashboard",
    icon: HomeIcon,
    path: PATHS.ADMIN.DASHBOARD,
  },
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
    // Add your logout logic here
    console.log("Logout clicked");
    // Example: Clear local storage, redirect to login, etc.
    // localStorage.removeItem("user");
    // navigate(PATHS.ADMIN.LOGIN);
    logout();
    navigate(PATHS.HOME, { replace: true });
  };

  return (
    <>
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo/Brand */}
        <div className="h-16 flex items-center justify-center ">
          <div className="text-sm font-bold text-gray-800">Admin Panel</div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-1">
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

        {/* Logout Button */}
        <div className="p-3 border-t border-gray-200">
          <SidebarItem
            icon={ArrowRightOnRectangleIcon}
            text="Log Out"
            isActive={false}
            onClick={handleLogout}
            isLogout
          />
        </div>
      </aside>
    </>
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
    className={`flex items-center space-x-3 w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors
      ${
        isActive
          ? "bg-blue-50 text-blue-600"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      }
      ${isLogout ? "mt-auto" : ""}
    `}
  >
    <Icon className="w-5 h-5" />
    <span>{text}</span>
  </button>
);
