import React, { useState, useEffect } from 'react';
import { FiDownload, FiRefreshCw } from 'react-icons/fi';
import api from '../services/api';
import './Reports.css';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [showGenerateForm, setShowGenerateForm] = useState(false);
  const [newReport, setNewReport] = useState({ name: '', type: 'PDF' });

  const fetchReports = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/reports');
      setReports(res.data.reports);
    } catch (err) {
      console.error('Failed to fetch reports', err);
      alert('Failed to load reports');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleDownload = (report) => {
    // In a real app, you'd trigger file download via URL
    alert(`Downloading ${report.name}`);
    // Example: window.open(report.url, '_blank');
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!newReport.name.trim()) return;
    try {
      setGenerating(true);
      await api.post('/admin/reports/generate', newReport);
      setShowGenerateForm(false);
      setNewReport({ name: '', type: 'PDF' });
      fetchReports(); // refresh list
    } catch (err) {
      alert('Failed to generate report');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="reports-page">
      <div className="page-header">
        <h1 className="page-title">Reports & Analytics</h1>
        <div className="header-actions">
          <button className="btn-refresh" onClick={fetchReports} title="Refresh">
            <FiRefreshCw />
          </button>
          <button className="btn-primary" onClick={() => setShowGenerateForm(!showGenerateForm)}>
            Generate New Report
          </button>
        </div>
      </div>

      {showGenerateForm && (
        <div className="generate-form card">
          <h3>Generate New Report</h3>
          <form onSubmit={handleGenerate}>
            <div className="form-group">
              <label>Report Name</label>
              <input
                type="text"
                className="input-field"
                value={newReport.name}
                onChange={(e) => setNewReport({ ...newReport, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Format</label>
              <select
                className="input-field"
                value={newReport.type}
                onChange={(e) => setNewReport({ ...newReport, type: e.target.value })}
              >
                <option value="PDF">PDF</option>
                <option value="Excel">Excel</option>
              </select>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-primary" disabled={generating}>
                {generating ? 'Generating...' : 'Generate'}
              </button>
              <button type="button" className="btn-outline" onClick={() => setShowGenerateForm(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="reports-list card">
        <h2>Recent Reports</h2>
        {loading ? (
          <p className="loading-text">Loading reports...</p>
        ) : (
          <table className="reports-table">
            <thead>
              <tr>
                <th>Report Name</th>
                <th>Date</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.length === 0 ? (
                <tr>
                  <td colSpan="4" className="no-data">No reports found</td>
                </tr>
              ) : (
                reports.map((report) => (
                  <tr key={report._id}>
                    <td>{report.name}</td>
                    <td>{new Date(report.createdAt).toLocaleDateString()}</td>
                    <td>{report.type}</td>
                    <td>
                      <button className="btn-outline" onClick={() => handleDownload(report)}>
                        <FiDownload /> Download
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Reports;