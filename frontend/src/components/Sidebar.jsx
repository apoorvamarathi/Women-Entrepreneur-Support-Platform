
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
  FiGrid, FiUser, FiUsers, FiBookOpen, FiDollarSign, 
  FiCalendar, FiFolder, FiMessageCircle, FiLogOut,
  FiActivity, FiCheckCircle, FiBarChart2, FiSettings
} from "react-icons/fi";
import "./Sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get user role from localStorage (or from context/state)
  // In a real app, this would come from your auth context
  const userRole = localStorage.getItem('userRole') || 'entrepreneur';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate("/login");
  };

  // Define menu items for each role
const getMenuItems = () => {
  const commonItems = [
    { path: "/dashboard", name: "Dashboard", icon: <FiGrid /> },
  ];

  const roleItems = {
    entrepreneur: [
      { path: "/profile", name: "Profile", icon: <FiUser /> },
      { path: "/mentorship", name: "Mentorship", icon: <FiUsers /> },
      { path: "/training", name: "Training", icon: <FiBookOpen /> },
      { path: "/funding", name: "Funding", icon: <FiDollarSign /> },
      { path: "/events", name: "Events", icon: <FiCalendar /> },
      { path: "/resources", name: "Resources", icon: <FiFolder /> },
      { path: "/community", name: "Community", icon: <FiMessageCircle /> },
    ],
    
    mentor: [
      { path: "/mentorship/requests", name: "Requests", icon: <FiUsers /> },
      { path: "/mentorship/mentees", name: "My Mentees", icon: <FiUsers /> },
      { path: "/mentorship/sessions", name: "Sessions", icon: <FiCalendar /> },
      { path: "/mentorship/progress", name: "Progress", icon: <FiActivity /> },
    ],
    
    investor: [
      { path: "/funding/applications", name: "Applications", icon: <FiDollarSign /> },
      { path: "/funding/startups", name: "Startup Profiles", icon: <FiUsers /> },
      { path: "/events", name: "Events", icon: <FiCalendar /> },
    ],
    
    admin: [
      { path: "/admin/overview", name: "Overview", icon: <FiBarChart2 /> },
      { path: "/admin/users", name: "Users", icon: <FiUsers /> },
      { path: "/admin/programs", name: "Programs", icon: <FiBookOpen /> },
      { path: "/admin/funding", name: "Funding", icon: <FiDollarSign /> },
      { path: "/admin/reports", name: "Reports", icon: <FiBarChart2 /> },
      { path: "/admin/settings", name: "Settings", icon: <FiSettings /> },
    ],
  };

  switch(userRole) {
    case "mentor": return [...commonItems, ...roleItems.mentor];
    case "investor": return [...commonItems, ...roleItems.investor];
    case "admin": return [...commonItems, ...roleItems.admin];
    default: return [...commonItems, ...roleItems.entrepreneur];
  }
};

  const menuItems = getMenuItems();

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-icon">👩‍💼</span>
        <span className="logo-text">WE Support</span>
      </div>
      
      {/* Show user role badge */}
      <div className="user-role-badge">
        Role: {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <Link
            key={item.path + item.name}
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