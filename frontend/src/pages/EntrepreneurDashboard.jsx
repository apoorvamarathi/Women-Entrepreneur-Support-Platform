import { Link } from "react-router-dom";
import { FiUser, FiUsers, FiBookOpen, FiDollarSign } from "react-icons/fi";
import "./Dashboard.css"; // reuse your existing dashboard CSS

const EntrepreneurDashboard = () => {
  return (
    <div className="dashboard-page">
      <h1 className="page-title">Entrepreneur Dashboard</h1>
      
      {/* Quick stats cards */}
      <div className="stats-grid">
        <div className="stat-card card">
          <div className="stat-icon" style={{ background: "#6C63FF20", color: "#6C63FF" }}>
            <FiUser />
          </div>
          <div className="stat-details">
            <p className="stat-label">Profile Completion</p>
            <p className="stat-value">80%</p>
          </div>
        </div>
        <div className="stat-card card">
          <div className="stat-icon" style={{ background: "#FF9F4320", color: "#FF9F43" }}>
            <FiUsers />
          </div>
          <div className="stat-details">
            <p className="stat-label">Active Mentors</p>
            <p className="stat-value">2</p>
          </div>
        </div>
        <div className="stat-card card">
          <div className="stat-icon" style={{ background: "#28C76F20", color: "#28C76F" }}>
            <FiBookOpen />
          </div>
          <div className="stat-details">
            <p className="stat-label">Enrolled Courses</p>
            <p className="stat-value">3</p>
          </div>
        </div>
        <div className="stat-card card">
          <div className="stat-icon" style={{ background: "#EA545520", color: "#EA5455" }}>
            <FiDollarSign />
          </div>
          <div className="stat-details">
            <p className="stat-label">Funding Status</p>
            <p className="stat-value">1 Pending</p>
          </div>
        </div>
      </div>

      {/* Quick links to feature pages */}
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <Link to="/profile" className="action-card card">
            <h3>Complete Profile</h3>
            <p>Add your business details</p>
          </Link>
          <Link to="/mentorship" className="action-card card">
            <h3>Find Mentor</h3>
            <p>Connect with industry experts</p>
          </Link>
          <Link to="/training" className="action-card card">
            <h3>Browse Training</h3>
            <p>Enroll in new programs</p>
          </Link>
          <Link to="/funding" className="action-card card">
            <h3>Apply for Funding</h3>
            <p>Submit your pitch deck</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EntrepreneurDashboard;