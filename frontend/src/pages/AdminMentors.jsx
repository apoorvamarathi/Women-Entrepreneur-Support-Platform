import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { FiCheckCircle, FiClock, FiUser, FiBriefcase } from 'react-icons/fi';
import './Users.css'; // Reusing Users CSS for table styling

const AdminMentors = () => {
  const [requests, setRequests] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // For the manual assignment modal
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedMentorId, setSelectedMentorId] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const [reqRes, mentorsRes] = await Promise.all([
        api.get('/admin/mentorship-requests'),
        api.get('/mentorship/mentors') // Using existing public/private mentors route
      ]);
      setRequests(reqRes.data.requests || []);
      setMentors(mentorsRes.data || []);
      setError('');
    } catch (err) {
      console.error('Failed to fetch data', err);
      setError('Failed to load mentorship requests.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAssignClick = (req) => {
    setSelectedRequest(req);
    setSelectedMentorId(req.mentorId?._id || req.mentorId?.userId?._id || '');
    setShowModal(true);
  };

  const submitAssignment = async () => {
    if (!selectedMentorId) {
      alert("Please select a mentor first.");
      return;
    }
    try {
      await api.post('/admin/mentorship-assign', {
        requestId: selectedRequest._id,
        entrepreneurId: selectedRequest.entrepreneurId._id,
        mentorId: selectedMentorId
      });
      setShowModal(false);
      fetchData(); // Refresh list
      alert("Mentor successfully assigned!");
    } catch (err) {
      console.error(err);
      alert("Failed to assign mentor.");
    }
  };

  if (loading && requests.length === 0) {
    return <div className="loading-spinner">Loading requests...</div>;
  }

  return (
    <div className="users-page">
      <div className="page-header">
        <h1 className="page-title">Assign Mentors</h1>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="users-table-container card">
        <table className="users-table">
          <thead>
            <tr>
              <th>Entrepreneur</th>
              <th>Requested Mentor</th>
              <th>Status</th>
              <th>Date Requested</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td colSpan="5" className="no-data">No mentorship requests found</td>
              </tr>
            ) : (
              requests.map((req) => (
                <tr key={req._id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FiBriefcase className="text-primary" />
                      {req.entrepreneurId?.name || 'Unknown'}
                    </div>
                  </td>
                  <td>
                    {req.mentorId ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FiUser className="text-secondary" />
                        {req.mentorId.userId?.name || req.mentorId.name || 'Unknown'}
                      </div>
                    ) : (
                      <span className="text-muted">Unassigned</span>
                    )}
                  </td>
                  <td>
                    <span className={`status-badge status-${req.status}`}>
                      {req.status}
                    </span>
                  </td>
                  <td>{new Date(req.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="btn-primary"
                      style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                      onClick={() => handleAssignClick(req)}
                    >
                      {req.status === 'pending' ? 'Assign Mentor' : 'Reassign'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Assignment Modal */}
      {showModal && (
        <div className="modal-overlay" style={modalOverlayStyle}>
          <div className="modal-content card" style={modalContentStyle}>
            <h2>Assign Mentor</h2>
            <p style={{ marginBottom: '15px' }}>
              Assigning a mentor to <strong>{selectedRequest?.entrepreneurId?.name}</strong>.
            </p>
            
            <div className="form-group">
              <label>Select Mentor</label>
              <select 
                className="input-field" 
                value={selectedMentorId}
                onChange={(e) => setSelectedMentorId(e.target.value)}
              >
                <option value="">-- Choose a Mentor --</option>
                {mentors.map(m => (
                  <option key={m._id} value={m._id}>
                    {m.userId?.name || 'Unknown'} - {m.industryExpertise?.join(', ') || 'General'}
                  </option>
                ))}
              </select>
            </div>
            
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button className="btn-primary" onClick={submitAssignment}>Save Assignment</button>
              <button className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Simple inline styles for the modal overlay since it's missing in Users.css
const modalOverlayStyle = {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000
};

const modalContentStyle = {
  width: '100%',
  maxWidth: '500px',
  padding: '2rem',
  backgroundColor: 'var(--card-bg)'
};

export default AdminMentors;
