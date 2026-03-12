
import { useState } from "react";
import { FiBell, FiMenu } from "react-icons/fi";
import "./Navbar.css";

const Navbar = ({ toggleSidebar }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, message: "Mentor assigned: Sarah Johnson", time: "5 min ago" },
    { id: 2, message: "Funding application approved", time: "1 hour ago" },
    { id: 3, message: "Training reminder: Digital Marketing", time: "2 hours ago" },
    { id: 4, message: "Event reminder: Startup Pitch", time: "1 day ago" },
  ];

  return (
    <div className="navbar">
      <div className="navbar-left">
        <button className="mobile-menu-btn" onClick={toggleSidebar}>
          <FiMenu />
        </button>
        <h2>Welcome back, Sarah!</h2>
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
        <div className="user-avatar">👩</div>
      </div>
    </div>
  );
};

export default Navbar;