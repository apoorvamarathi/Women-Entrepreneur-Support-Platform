import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiUser, FiUsers, FiBookOpen, FiDollarSign } from "react-icons/fi";
import api from "../services/api";
import "./Dashboard.css"; // reuse your existing dashboard CSS

const EntrepreneurDashboard = () => {
  const [completionScore, setCompletionScore] = useState(0);
  const [recommendations, setRecommendations] = useState({ recommendedTrainings: [], recommendedResources: [] });
  const [mentorsCount, setMentorsCount] = useState(0);
  const [coursesCount, setCoursesCount] = useState(0);
  const [fundingStatus, setFundingStatus] = useState("0 Applications");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [profileRes, recRes, mentorshipRes, trainingRes, fundingRes] = await Promise.all([
          api.get("/profile"),
          api.get("/profile/recommendations"),
          api.get("/mentorship/sessions"),
          api.get("/training"),
          api.get("/funding")
        ]);
        
        if (profileRes.data && profileRes.data.completionScore !== undefined) {
          setCompletionScore(profileRes.data.completionScore);
        }
        
        if (recRes.data) {
          setRecommendations(recRes.data);
        }

        if (mentorshipRes.data) {
          setMentorsCount(mentorshipRes.data.length);
        }

        if (trainingRes.data) {
          const enrolledCourses = trainingRes.data.filter(t => t.enrolled);
          setCoursesCount(enrolledCourses.length);
        }

        if (fundingRes.data && fundingRes.data.length > 0) {
          const pendingCount = fundingRes.data.filter(f => f.status === 'pending').length;
          if (pendingCount > 0) {
            setFundingStatus(`${pendingCount} Pending`);
          } else {
            setFundingStatus(`${fundingRes.data.length} Submitted`);
          }
        }
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);
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
            <p className="stat-value">{completionScore}%</p>
          </div>
        </div>
        <div className="stat-card card">
          <div className="stat-icon" style={{ background: "#FF9F4320", color: "#FF9F43" }}>
            <FiUsers />
          </div>
          <div className="stat-details">
            <p className="stat-label">Active Mentors</p>
            <p className="stat-value">{mentorsCount}</p>
          </div>
        </div>
        <div className="stat-card card">
          <div className="stat-icon" style={{ background: "#28C76F20", color: "#28C76F" }}>
            <FiBookOpen />
          </div>
          <div className="stat-details">
            <p className="stat-label">Enrolled Courses</p>
            <p className="stat-value">{coursesCount}</p>
          </div>
        </div>
        <div className="stat-card card">
          <div className="stat-icon" style={{ background: "#EA545520", color: "#EA5455" }}>
            <FiDollarSign />
          </div>
          <div className="stat-details">
            <p className="stat-label">Funding Status</p>
            <p className="stat-value">{fundingStatus}</p>
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
      {/* Recommended For You */}
      {(recommendations.recommendedTrainings.length > 0 || recommendations.recommendedResources.length > 0) && (
        <div className="quick-actions" style={{ marginTop: '2rem' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#FF9F43' }}>✨</span> Recommended For You
          </h2>
          <div className="actions-grid">
            {recommendations.recommendedTrainings.map(training => (
              <Link to="/training" key={training._id} className="action-card card" style={{ borderLeft: '4px solid #6C63FF' }}>
                <p style={{ fontSize: '0.8rem', color: '#6C63FF', fontWeight: 'bold' }}>TRAINING</p>
                <h3>{training.title}</h3>
                <p>{training.description.substring(0, 60)}...</p>
              </Link>
            ))}
            
            {recommendations.recommendedResources.map(resource => (
              <Link to="/resources" key={resource._id} className="action-card card" style={{ borderLeft: '4px solid #28C76F' }}>
                <p style={{ fontSize: '0.8rem', color: '#28C76F', fontWeight: 'bold' }}>RESOURCE ({resource.category})</p>
                <h3>{resource.title}</h3>
                <p>{resource.description.substring(0, 60)}...</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EntrepreneurDashboard;