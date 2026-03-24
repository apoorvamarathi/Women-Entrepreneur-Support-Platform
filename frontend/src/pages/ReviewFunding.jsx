import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { FiCheckCircle, FiXCircle, FiFileText } from 'react-icons/fi';
import './Users.css'; // Reusing Users CSS for table styling

const ReviewFunding = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await api.get('/funding');
      // res.data is expected to be an array of FundingApplications
      setApplications(res.data || []);
      setError('');
    } catch (err) {
      console.error('Failed to fetch funding applications', err);
      setError('Failed to load applications. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    if (!window.confirm(`Are you sure you want to ${newStatus} this application?`)) return;
    
    try {
      await api.put(`/funding/${id}`, { status: newStatus });
      // Update local state to reflect change without full refetch
      setApplications(prev => 
        prev.map(app => 
          app._id === id ? { ...app, status: newStatus } : app
        )
      );
      alert(`Application ${newStatus} successfully!`);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || `Failed to ${newStatus} application.`);
    }
  };

  const filteredApplications = filterStatus 
    ? applications.filter(app => app.status === filterStatus)
    : applications;

  if (loading && applications.length === 0) {
    return <div className="loading-spinner">Loading applications...</div>;
  }

  return (
    <div className="users-page">
      <div className="page-header">
        <h1 className="page-title">Review Funding Applications</h1>
      </div>

      <div className="filters-section">
        <select
          className="input-field filter-select"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="users-table-container card">
        <table className="users-table">
          <thead>
            <tr>
              <th>Entrepreneur</th>
              <th>Amount Needed</th>
              <th>Pitch Deck</th>
              <th>Date Applied</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-data">No funding applications found.</td>
              </tr>
            ) : (
              filteredApplications.map((app) => (
                <tr key={app._id}>
                  <td>
                    <div><strong>{app.entrepreneurId?.name || 'Unknown'}</strong></div>
                    <div style={{ fontSize: '0.85rem', color: '#666' }}>
                      {app.entrepreneurId?.email || ''}
                    </div>
                  </td>
                  <td>₹{app.amount ? app.amount.toLocaleString() : 0}</td>
                  <td>
                    {app.pitchDeck ? (
                      <a href={`#`} className="text-primary" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <FiFileText /> View Deck
                      </a>
                    ) : (
                      <span className="text-muted">No file</span>
                    )}
                  </td>
                  <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                  <td>
                    <span className={`status-badge status-${app.status}`}>
                      {app.status}
                    </span>
                  </td>
                  <td>
                    {app.status === 'pending' ? (
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          className="btn-icon approve"
                          onClick={() => handleStatusUpdate(app._id, 'approved')}
                          title="Approve"
                        >
                          <FiCheckCircle />
                        </button>
                        <button
                          className="btn-icon reject"
                          onClick={() => handleStatusUpdate(app._id, 'rejected')}
                          title="Reject"
                        >
                          <FiXCircle />
                        </button>
                      </div>
                    ) : (
                      <span className="text-muted">Reviewed</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReviewFunding;
