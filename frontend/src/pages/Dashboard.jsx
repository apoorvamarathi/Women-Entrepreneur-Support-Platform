
import { useState, useEffect } from "react";
import api from "../services/api";
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
  const [data, setData] = useState({ stats: null, charts: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await api.get("/analytics/dashboard");
        setData(res.data);
      } catch (error) {
        console.error("Failed to load analytics", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  // Stats cards for admin
  const stats = [
    { label: "Total Entrepreneurs", value: data.stats?.totalEntrepreneurs || 0, icon: <FiUsers />, color: "#6C63FF" },
    { label: "Total Mentors", value: data.stats?.totalMentors || 0, icon: <FiUserCheck />, color: "#FF9F43" },
    { label: "Funding Requests", value: data.stats?.totalFundingRequests || 0, icon: <FiDollarSign />, color: "#28C76F" },
    { label: "Training Participation", value: data.stats?.totalTrainingPrograms || 0, icon: <FiBookOpen />, color: "#EA5455" },
  ];

  // Platform analytics (charts)
  const userGrowthData = data.charts?.userGrowthData || {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Entrepreneurs",
        data: [0, 0, 0, 0, 0, 0],
        backgroundColor: "#6C63FF",
        borderRadius: 8,
      },
      {
        label: "Mentors",
        data: [0, 0, 0, 0, 0, 0],
        backgroundColor: "#FF9F43",
        borderRadius: 8,
      },
    ],
  };

  const fundingTrendsData = data.charts?.fundingTrendsData || {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Funding Applications",
        data: [0, 0, 0, 0, 0, 0],
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
      count: data.stats?.pendingApprovals || 0, // pending approvals
    },
    {
      id: 2,
      title: "Assign Mentors",
      description: "Match entrepreneurs with suitable mentors",
      icon: <FiUserCheck />,
      color: "#FF9F43",
      action: "assign",
      count: data.stats?.pendingMentorshipRequests || 0, // pending assignments
    },
    {
      id: 3,
      title: "Manage Training",
      description: "Create and update training programs",
      icon: <FiBookOpen />,
      color: "#28C76F",
      action: "manage-training",
      count: data.stats?.totalTrainingPrograms || 0, // active programs
    },
    {
      id: 4,
      title: "Funding Applications",
      description: "Review and process funding requests",
      icon: <FiDollarSign />,
      color: "#EA5455",
      action: "view-funding",
      count: data.stats?.pendingFundingReviews || 0, // pending reviews
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