import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiGrid, FiUser, FiUsers, FiBookOpen, FiDollarSign, FiCalendar, FiFolder, FiMessageCircle, FiLogOut } from "react-icons/fi";
import "./Sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: "/dashboard", name: "Dashboard", icon: <FiGrid /> },
    { path: "/profile", name: "Profile", icon: <FiUser /> },
    { path: "/mentorship", name: "Mentorship", icon: <FiUsers /> },
    { path: "/training", name: "Training", icon: <FiBookOpen /> },
    { path: "/funding", name: "Funding", icon: <FiDollarSign /> },
    { path: "/events", name: "Events", icon: <FiCalendar /> },
    { path: "/resources", name: "Resources", icon: <FiFolder /> },
    { path: "/community", name: "Community", icon: <FiMessageCircle /> },
  ];

  const handleLogout = () => {
    // Clear auth tokens, etc.
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-icon">👩‍💼</span>
        <span className="logo-text">WE Support</span>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`sidebar-link ${location.pathname === item.path ? "active" : ""}`}
          >
            <span className="icon">{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
      <div className="sidebar-footer">
        <button onClick={handleLogout} className="sidebar-logout">
          <FiLogOut /> <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;