// import { useState } from "react";
// import { Bar, Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { FiUsers, FiDollarSign, FiBookOpen, FiCalendar, FiUserCheck, FiUserPlus, FiEdit, FiEye, FiDownload } from "react-icons/fi";
// import "./Dashboard.css";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const Dashboard = () => {
//   // Stats cards for admin
//   const stats = [
//     { label: "Total Entrepreneurs", value: "1,234", icon: <FiUsers />, color: "#6C63FF" },
//     { label: "Total Mentors", value: "56", icon: <FiUserCheck />, color: "#FF9F43" },
//     { label: "Funding Requests", value: "28", icon: <FiDollarSign />, color: "#28C76F" },
//     { label: "Training Participation", value: "342", icon: <FiBookOpen />, color: "#EA5455" },
//   ];

//   // Platform analytics (charts)
//   const userGrowthData = {
//     labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//     datasets: [
//       {
//         label: "Entrepreneurs",
//         data: [65, 78, 90, 112, 135, 150],
//         backgroundColor: "#6C63FF",
//         borderRadius: 8,
//       },
//       {
//         label: "Mentors",
//         data: [20, 25, 30, 35, 42, 48],
//         backgroundColor: "#FF9F43",
//         borderRadius: 8,
//       },
//     ],
//   };

//   const fundingTrendsData = {
//     labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//     datasets: [
//       {
//         label: "Funding Applications",
//         data: [12, 19, 15, 22, 24, 28],
//         borderColor: "#28C76F",
//         backgroundColor: "rgba(40, 199, 111, 0.1)",
//         tension: 0.4,
//       },
//     ],
//   };

//   const barOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { position: "top" },
//     },
//   };

//   const lineOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { display: false },
//     },
//     scales: {
//       y: { beginAtZero: true },
//     },
//   };

//   // Admin action cards
//   const adminActions = [
//     { id: 1, title: "Approve Entrepreneur Registration", icon: <FiUserPlus />, color: "#6C63FF", action: "approve" },
//     { id: 2, title: "Assign Mentors", icon: <FiUserCheck />, color: "#FF9F43", action: "assign" },
//     { id: 3, title: "Manage Training Programs", icon: <FiBookOpen />, color: "#28C76F", action: "manage-training" },
//     { id: 4, title: "View Funding Applications", icon: <FiDollarSign />, color: "#EA5455", action: "view-funding" },
//     { id: 5, title: "Generate Reports", icon: <FiDownload />, color: "#6C63FF", action: "reports" },
//   ];

//   const handleAdminAction = (action) => {
//     alert(`Action: ${action} – This would open the appropriate admin panel.`);
//     // In a real app, navigate to specific admin pages or open modals.
//   };

//   return (
//     <div className="admin-dashboard">
//       <h1 className="page-title">Admin Dashboard</h1>

//       {/* Stats Cards */}
//       <div className="stats-grid">
//         {stats.map((stat, idx) => (
//           <div className="stat-card card" key={idx}>
//             <div className="stat-icon" style={{ background: `${stat.color}20`, color: stat.color }}>
//               {stat.icon}
//             </div>
//             <div className="stat-details">
//               <p className="stat-label">{stat.label}</p>
//               <p className="stat-value">{stat.value}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Platform Analytics Charts */}
//       <div className="charts-grid">
//         <div className="chart-card card">
//           <h3>User Growth</h3>
//           <div className="chart-container">
//             <Bar data={userGrowthData} options={barOptions} />
//           </div>
//         </div>
//         <div className="chart-card card">
//           <h3>Funding Trends</h3>
//           <div className="chart-container">
//             <Line data={fundingTrendsData} options={lineOptions} />
//           </div>
//         </div>
//       </div>

//       {/* Admin Controls */}
//       <div className="admin-controls">
//         <h2>Admin Controls</h2>
//         <div className="actions-grid">
//           {adminActions.map((action) => (
//             <div
//               className="action-card card"
//               key={action.id}
//               onClick={() => handleAdminAction(action.action)}
//             >
//               <div className="action-icon" style={{ background: `${action.color}20`, color: action.color }}>
//                 {action.icon}
//               </div>
//               <h3>{action.title}</h3>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import { useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { 
  FiUsers, FiDollarSign, FiBookOpen, FiCalendar, 
  FiUserCheck, FiUserPlus, FiEdit, FiEye, FiDownload,
  FiCheckCircle, FiUserX, FiAward, FiBarChart2 
} from "react-icons/fi";
import "./Dashboard.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // Stats cards for admin
  const stats = [
    { label: "Total Entrepreneurs", value: "1,234", icon: <FiUsers />, color: "#6C63FF" },
    { label: "Total Mentors", value: "56", icon: <FiUserCheck />, color: "#FF9F43" },
    { label: "Funding Requests", value: "28", icon: <FiDollarSign />, color: "#28C76F" },
    { label: "Training Participation", value: "342", icon: <FiBookOpen />, color: "#EA5455" },
  ];

  // Platform analytics (charts)
  const userGrowthData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Entrepreneurs",
        data: [65, 78, 90, 112, 135, 150],
        backgroundColor: "#6C63FF",
        borderRadius: 8,
      },
      {
        label: "Mentors",
        data: [20, 25, 30, 35, 42, 48],
        backgroundColor: "#FF9F43",
        borderRadius: 8,
      },
    ],
  };

  const fundingTrendsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Funding Applications",
        data: [12, 19, 15, 22, 24, 28],
        borderColor: "#28C76F",
        backgroundColor: "rgba(40, 199, 111, 0.1)",
        tension: 0.4,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
    },
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  // Enhanced admin actions with descriptions
  const adminActions = [
    {
      id: 1,
      title: "Approve Registrations",
      description: "Review and approve new entrepreneur accounts",
      icon: <FiUserPlus />,
      color: "#6C63FF",
      action: "approve",
      count: 12, // pending approvals
    },
    {
      id: 2,
      title: "Assign Mentors",
      description: "Match entrepreneurs with suitable mentors",
      icon: <FiUserCheck />,
      color: "#FF9F43",
      action: "assign",
      count: 8, // pending assignments
    },
    {
      id: 3,
      title: "Manage Training",
      description: "Create and update training programs",
      icon: <FiBookOpen />,
      color: "#28C76F",
      action: "manage-training",
      count: 4, // active programs
    },
    {
      id: 4,
      title: "Funding Applications",
      description: "Review and process funding requests",
      icon: <FiDollarSign />,
      color: "#EA5455",
      action: "view-funding",
      count: 28, // pending reviews
    },
    {
      id: 5,
      title: "Generate Reports",
      description: "Download platform analytics and reports",
      icon: <FiDownload />,
      color: "#6C63FF",
      action: "reports",
    },
    {
      id: 6,
      title: "Platform Analytics",
      description: "View detailed metrics and insights",
      icon: <FiBarChart2 />,
      color: "#FF9F43",
      action: "analytics",
    },
  ];

  const handleAdminAction = (action) => {
    alert(`Action: ${action} – This would open the appropriate admin panel.`);
    // In a real app, navigate to specific admin pages or open modals.
  };

  return (
    <div className="admin-dashboard">
      <h1 className="page-title">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="stats-grid">
        {stats.map((stat, idx) => (
          <div className="stat-card card" key={idx}>
            <div className="stat-icon" style={{ background: `${stat.color}20`, color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-details">
              <p className="stat-label">{stat.label}</p>
              <p className="stat-value">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Platform Analytics Charts */}
      <div className="charts-grid">
        <div className="chart-card card">
          <h3>User Growth</h3>
          <div className="chart-container">
            <Bar data={userGrowthData} options={barOptions} />
          </div>
        </div>
        <div className="chart-card card">
          <h3>Funding Trends</h3>
          <div className="chart-container">
            <Line data={fundingTrendsData} options={lineOptions} />
          </div>
        </div>
      </div>

      {/* Admin Controls - Redesigned */}
      <div className="admin-controls">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          {adminActions.map((action) => (
            <div
              className="action-card card"
              key={action.id}
              onClick={() => handleAdminAction(action.action)}
            >
              <div className="action-header">
                <div className="action-icon" style={{ background: `${action.color}20`, color: action.color }}>
                  {action.icon}
                </div>
                {action.count && (
                  <span className="action-badge">{action.count}</span>
                )}
              </div>
              <h3>{action.title}</h3>
              <p className="action-description">{action.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;