
import { useState } from "react";
import { FiBell, FiMenu, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import "./Navbar.css";

const Navbar = ({ toggleSidebar }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const notifications = [
    { id: 1, message: "Welcome to the platform!", time: "Just now" },
  ];

  return (
    <div className="navbar">
      <div className="navbar-left">
        <button className="mobile-menu-btn" onClick={toggleSidebar}>
          <FiMenu />
        </button>
        <h2>Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""}!</h2>
      </div>
      <div className="navbar-right">
        <div className="notification-container">
          <FiBell className="bell-icon" onClick={() => setShowNotifications(!showNotifications)} />
          {showNotifications && (
            <div className="notification-dropdown">
              {notifications.map((n) => (
                <div key={n.id} className="notification-item">
                  <p>{n.message}</p>
                  <span>{n.time}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="user-profile-section">
          <div className="user-avatar" title={user?.name || "User"}>
            {user?.name ? user.name.charAt(0).toUpperCase() : "👩"}
          </div>
          <button className="logout-btn" onClick={handleLogout} title="Logout">
            <FiLogOut />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;