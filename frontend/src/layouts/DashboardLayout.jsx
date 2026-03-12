
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";


const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar isOpen={sidebarOpen} closeSidebar={closeSidebar} />
      <main className="dashboard-main">
        <Navbar toggleSidebar={toggleSidebar} />
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;