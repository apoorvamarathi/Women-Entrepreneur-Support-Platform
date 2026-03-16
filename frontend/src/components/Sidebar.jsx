
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { FiGrid, FiUser, FiUsers, FiBookOpen, FiDollarSign, FiCalendar, FiFolder, FiMessageCircle, FiLogOut } from "react-icons/fi";
// import "./Sidebar.css";

// const Sidebar = ({ isOpen, closeSidebar }) => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const menuItems = [
//     { path: "/dashboard", name: "Dashboard", icon: <FiGrid /> },
//     { path: "/profile", name: "Profile", icon: <FiUser /> },
//     { path: "/mentorship", name: "Mentorship", icon: <FiUsers /> },
//     { path: "/training", name: "Training", icon: <FiBookOpen /> },
//     { path: "/funding", name: "Funding", icon: <FiDollarSign /> },
//     { path: "/events", name: "Events", icon: <FiCalendar /> },
//     { path: "/resources", name: "Resources", icon: <FiFolder /> },
//     { path: "/community", name: "Community", icon: <FiMessageCircle /> },
//   ];

//   const handleLogout = () => {
//     navigate("/login");
//   };

//   const handleLinkClick = () => {
//     closeSidebar(); // close sidebar on link click (mobile)
//   };

//   return (
//     <div className={`sidebar ${isOpen ? 'open' : ''}`}>
//       <div className="sidebar-logo">
//         <span className="logo-icon">👩‍💼</span>
//         <span className="logo-text">WE Support</span>
//       </div>
//       <nav className="sidebar-nav">
//         {menuItems.map((item) => (
//           <Link
//             key={item.path}
//             to={item.path}
//             className={`sidebar-link ${location.pathname === item.path ? "active" : ""}`}
//             onClick={handleLinkClick}
//           >
//             <span className="icon">{item.icon}</span>
//             <span>{item.name}</span>
//           </Link>
//         ))}
//       </nav>
//       <div className="sidebar-footer">
//         <button onClick={handleLogout} className="sidebar-logout">
//           <FiLogOut /> <span>Logout</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;



import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FiGrid,
  FiUser,
  FiUsers,
  FiBookOpen,
  FiDollarSign,
  FiCalendar,
  FiFolder,
  FiMessageCircle,
  FiLogOut,
} from "react-icons/fi";
import "./Sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // get user role
  const userRole = localStorage.getItem("userRole") || "entrepreneur";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  // menu items based on role
  const getMenuItems = () => {
    const entrepreneurMenu = [
      { path: "/dashboard", name: "Dashboard", icon: <FiGrid /> },
      { path: "/profile", name: "Profile", icon: <FiUser /> },
      { path: "/mentorship", name: "Mentorship", icon: <FiUsers /> },
      { path: "/training", name: "Training", icon: <FiBookOpen /> },
      { path: "/funding", name: "Funding", icon: <FiDollarSign /> },
      { path: "/events", name: "Events", icon: <FiCalendar /> },
      { path: "/resources", name: "Resources", icon: <FiFolder /> },
      { path: "/community", name: "Community", icon: <FiMessageCircle /> },
    ];

    const mentorMenu = [
      { path: "/dashboard", name: "Dashboard", icon: <FiGrid /> },
      { path: "/mentorship", name: "Mentorship", icon: <FiUsers /> },
      { path: "/training", name: "Training", icon: <FiBookOpen /> },
      { path: "/events", name: "Events", icon: <FiCalendar /> },
    ];

    const investorMenu = [
      { path: "/dashboard", name: "Dashboard", icon: <FiGrid /> },
      { path: "/funding", name: "Funding Applications", icon: <FiDollarSign /> },
      { path: "/events", name: "Events", icon: <FiCalendar /> },
    ];

    const adminMenu = [
      { path: "/dashboard", name: "Dashboard", icon: <FiGrid /> },
      { path: "/users", name: "Users", icon: <FiUsers /> },
      { path: "/training", name: "Programs", icon: <FiBookOpen /> },
      { path: "/reports", name: "Reports", icon: <FiFolder /> },
    ];

    if (userRole === "mentor") return mentorMenu;
    if (userRole === "investor") return investorMenu;
    if (userRole === "admin") return adminMenu;

    return entrepreneurMenu;
  };

  const menuItems = getMenuItems();

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-icon">👩‍💼</span>
        <span className="logo-text">WE Support</span>
      </div>

      {/* Role Badge */}
      <div className="user-role-badge">
        Role: {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`sidebar-link ${
              location.pathname === item.path ? "active" : ""
            }`}
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