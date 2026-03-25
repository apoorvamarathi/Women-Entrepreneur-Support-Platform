
import { useState, useEffect } from "react";
import { FiBell, FiMenu, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import useAuthStore from "../store/useAuthStore";
import "./Navbar.css";

const Navbar = ({ toggleSidebar }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const res = await api.get('/notifications');
        setNotifications(res.data);
      } catch (error) {
        console.error("Failed to load notifications", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchNotifications();
    }
  }, [user]);

  const handleMarkAsRead = async (id) => {
    try {
      await api.put(`/notifications/${id}/read`);
      setNotifications(notifications.map(n => 
        (n._id === id || n.id === id) ? { ...n, status: 'read' } : n
      ));
    } catch (error) {
      console.error("Failed to mark as read", error);
    }
  };

  const unreadCount = notifications.filter(n => n.status === 'unread').length;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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
          <div className="bell-wrapper" onClick={() => setShowNotifications(!showNotifications)}>
            <FiBell className="bell-icon" />
            {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )}
          </div>
          {showNotifications && (
            <div className="notification-dropdown">
              {loading ? (
                <p style={{ padding: '10px' }}>Loading...</p>
              ) : notifications.length === 0 ? (
                <p style={{ padding: '10px' }}>No notifications</p>
              ) : (
                notifications.map((n) => (
                  <div 
                    key={n._id || n.id} 
                    className={`notification-item ${n.status === 'unread' ? 'unread' : ''}`}
                    onClick={() => n.status === 'unread' && handleMarkAsRead(n._id || n.id)}
                  >
                    <p>{n.message}</p>
                    <span>{new Date(n.createdAt).toLocaleDateString()}</span>
                  </div>
                ))
              )}
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