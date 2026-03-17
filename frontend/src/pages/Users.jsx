import React, { useState, useEffect } from 'react';
import { FiUserCheck, FiUserX, FiRefreshCw } from 'react-icons/fi';
import api from '../services/api';
import './Users.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      let url = '/admin/users';
      const params = new URLSearchParams();
      if (filterRole) params.append('role', filterRole);
      if (filterStatus) params.append('status', filterStatus);
      if (params.toString()) url += `?${params.toString()}`;

      const res = await api.get(url);
      setUsers(res.data.users);
      setError('');
    } catch (err) {
      console.error('Failed to fetch users', err);
      setError('Failed to load users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [filterRole, filterStatus]);

  const handleApprove = async (userId) => {
    if (!window.confirm('Approve this user?')) return;
    try {
      await api.put(`/admin/users/${userId}/approve`);
      // Refresh list
      fetchUsers();
    } catch (err) {
      alert('Failed to approve user');
    }
  };

  const handleReject = async (userId) => {
    if (!window.confirm('Reject this user?')) return;
    try {
      await api.put(`/admin/users/${userId}/reject`);
      fetchUsers();
    } catch (err) {
      alert('Failed to reject user');
    }
  };

  if (loading && users.length === 0) {
    return <div className="loading-spinner">Loading users...</div>;
  }

  return (
    <div className="users-page">
      <div className="page-header">
        <h1 className="page-title">User Management</h1>
        <button className="btn-refresh" onClick={fetchUsers} title="Refresh">
          <FiRefreshCw />
        </button>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <select
          className="input-field filter-select"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="entrepreneur">Entrepreneur</option>
          <option value="mentor">Mentor</option>
          <option value="investor">Investor</option>
          <option value="admin">Admin</option>
        </select>

        <select
          className="input-field filter-select"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="users-table-container card">
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="no-data">No users found</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`role-badge role-${user.role}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge status-${user.status}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>
                    {user.status === 'pending' && (
                      <>
                        <button
                          className="btn-icon approve"
                          onClick={() => handleApprove(user._id)}
                          title="Approve"
                        >
                          <FiUserCheck />
                        </button>
                        <button
                          className="btn-icon reject"
                          onClick={() => handleReject(user._id)}
                          title="Reject"
                        >
                          <FiUserX />
                        </button>
                      </>
                    )}
                    {user.status === 'active' && (
                      <span className="active-indicator">Active</span>
                    )}
                    {user.status === 'inactive' && (
                      <span className="inactive-indicator">Inactive</span>
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

export default Users;