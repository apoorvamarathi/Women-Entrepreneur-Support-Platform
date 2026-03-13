import { Link } from "react-router-dom";
import { FiUsers, FiCalendar, FiCheckCircle } from "react-icons/fi";
import "./Dashboard.css";

const MentorDashboard = () => {
  return (
    <div className="dashboard-page">
      <h1 className="page-title">Mentor Dashboard</h1>
      
      <div className="stats-grid">
        <div className="stat-card card">
          <div className="stat-icon" style={{ background: "#6C63FF20", color: "#6C63FF" }}>
            <FiUsers />
          </div>
          <div className="stat-details">
            <p className="stat-label">Pending Requests</p>
            <p className="stat-value">3</p>
          </div>
        </div>
        <div className="stat-card card">
          <div className="stat-icon" style={{ background: "#FF9F4320", color: "#FF9F43" }}>
            <FiUsers />
          </div>
          <div className="stat-details">
            <p className="stat-label">Active Mentees</p>
            <p className="stat-value">5</p>
          </div>
        </div>
        <div className="stat-card card">
          <div className="stat-icon" style={{ background: "#28C76F20", color: "#28C76F" }}>
            <FiCalendar />
          </div>
          <div className="stat-details">
            <p className="stat-label">Upcoming Sessions</p>
            <p className="stat-value">2</p>
          </div>
        </div>
        <div className="stat-card card">
          <div className="stat-icon" style={{ background: "#EA545520", color: "#EA5455" }}>
            <FiCheckCircle />
          </div>
          <div className="stat-details">
            <p className="stat-label">Completed Sessions</p>
            <p className="stat-value">18</p>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <Link to="/mentorship" className="action-card card">
            <h3>Review Requests</h3>
            <p>Accept or decline mentorship requests</p>
          </Link>
          <Link to="/mentorship" className="action-card card">
            <h3>Schedule Session</h3>
            <p>Set up next meeting with mentee</p>
          </Link>
          <Link to="/mentorship" className="action-card card">
            <h3>Add Progress Notes</h3>
            <p>Track mentee progress</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;