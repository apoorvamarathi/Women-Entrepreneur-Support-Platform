
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiGrid, FiUser, FiUsers, FiBookOpen, FiDollarSign, FiCalendar, FiFolder, FiMessageCircle, FiLogOut } from "react-icons/fi";
import useAuthStore from "../store/useAuthStore";
import "./Sidebar.css";

const Sidebar = ({ isOpen, closeSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuthStore();

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
    logout();
    navigate("/login");
  };

  const handleLinkClick = () => {
    closeSidebar(); // close sidebar on link click (mobile)
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
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
            onClick={handleLinkClick}
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