import { Link } from "react-router-dom";
import { FiDollarSign, FiUsers, FiCheckCircle, FiXCircle } from "react-icons/fi";
import "./Dashboard.css";

const InvestorDashboard = () => {
  return (
    <div className="dashboard-page">
      <h1 className="page-title">Investor Dashboard</h1>
      
      <div className="stats-grid">
        <div className="stat-card card">
          <div className="stat-icon" style={{ background: "#6C63FF20", color: "#6C63FF" }}>
            <FiUsers />
          </div>
          <div className="stat-details">
            <p className="stat-label">Startup Profiles</p>
            <p className="stat-value">24</p>
          </div>
        </div>
        <div className="stat-card card">
          <div className="stat-icon" style={{ background: "#FF9F4320", color: "#FF9F43" }}>
            <FiDollarSign />
          </div>
          <div className="stat-details">
            <p className="stat-label">Pending Applications</p>
            <p className="stat-value">8</p>
          </div>
        </div>
        <div className="stat-card card">
          <div className="stat-icon" style={{ background: "#28C76F20", color: "#28C76F" }}>
            <FiCheckCircle />
          </div>
          <div className="stat-details">
            <p className="stat-label">Approved</p>
            <p className="stat-value">12</p>
          </div>
        </div>
        <div className="stat-card card">
          <div className="stat-icon" style={{ background: "#EA545520", color: "#EA5455" }}>
            <FiXCircle />
          </div>
          <div className="stat-details">
            <p className="stat-label">Rejected</p>
            <p className="stat-value">4</p>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <Link to="/funding" className="action-card card">
            <h3>Review Applications</h3>
            <p>Check pending funding requests</p>
          </Link>
          <Link to="/funding" className="action-card card">
            <h3>View Startup Profiles</h3>
            <p>Browse entrepreneur businesses</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InvestorDashboard;