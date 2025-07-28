import React, { useState } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { PATHS } from "../../route/route";
import { useLoginHook } from "../../hooks/useAuth";

import SideBar from "../../components/dashboard/SideBar";
import TopBar from "../../components/dashboard/TopBar";

const Dashboard = () => {
  // todo: make flexible the active item to catch the current page 
  // so upon refresh the current page tab is active instead of the Dashboar tab by default
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const { logout } = useLoginHook();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(PATHS.HOME, { replace: true });
  };

  return (
    <div className="flex h-screen bg-[#0e0e0e]">
      {/* Sidebar */}
      <SideBar activeItem={activeItem} setActiveItem={setActiveItem} />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <TopBar isAvatarOpen={isAvatarOpen} setIsAvatarOpen={setIsAvatarOpen} />
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
