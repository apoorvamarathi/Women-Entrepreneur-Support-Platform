import { useState } from "react";
import "./Funding.css";

const Funding = () => {
  const [applications, setApplications] = useState([
    { id: 1, startupName: "Eco Fashion", amount: 50000, status: "Pending", date: "2025-03-01" },
    { id: 2, startupName: "TechEd", amount: 75000, status: "Approved", date: "2025-02-15" },
    { id: 3, startupName: "HealthVibe", amount: 120000, status: "Rejected", date: "2025-02-28" },
  ]);

  const [formData, setFormData] = useState({
    startupName: "",
    amount: "",
    businessPlan: null,
    pitchDeck: null,
    financialProjections: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create new application object
    const newApp = {
      id: Date.now(), // simple unique id
      startupName: formData.startupName,
      amount: parseFloat(formData.amount),
      status: "Pending",
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    };

    // Add to list
    setApplications([...applications, newApp]);

    // Reset form
    setFormData({
      startupName: "",
      amount: "",
      businessPlan: null,
      pitchDeck: null,
      financialProjections: null,
    });

    // Reset file inputs (optional, but good UX)
    e.target.reset(); // resets the form including file inputs
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  return (
    <div className="funding-page">
      <h1 className="page-title">Apply for Funding</h1>

      <div className="funding-content">
        <div className="apply-section card">
          <h2>Funding Application</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Startup Name</label>
              <input
                type="text"
                name="startupName"
                value={formData.startupName}
                onChange={handleChange}
                className="input-field"
                placeholder="e.g., Eco Fashion"
                required
              />
            </div>
            <div className="form-group">
              <label>Funding Amount Needed (₹)</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="input-field"
                placeholder="50000"
                required
              />
            </div>
            <div className="form-group">
              <label>Upload Business Plan (PDF)</label>
              <input
                type="file"
                name="businessPlan"
                accept=".pdf"
                onChange={handleFileChange}
                required
              />
              {formData.businessPlan && (
                <p className="file-name">{formData.businessPlan.name}</p>
              )}
            </div>
            <div className="form-group">
              <label>Upload Pitch Deck (PDF/PPT)</label>
              <input
                type="file"
                name="pitchDeck"
                accept=".pdf,.ppt,.pptx"
                onChange={handleFileChange}
                required
              />
              {formData.pitchDeck && (
                <p className="file-name">{formData.pitchDeck.name}</p>
              )}
            </div>
            <div className="form-group">
              <label>Financial Projections (Excel/PDF)</label>
              <input
                type="file"
                name="financialProjections"
                accept=".pdf,.xls,.xlsx"
                onChange={handleFileChange}
                required
              />
              {formData.financialProjections && (
                <p className="file-name">{formData.financialProjections.name}</p>
              )}
            </div>
            <button type="submit" className="btn-primary">Submit Application</button>
          </form>
        </div>

        <div className="applications-list card">
          <h2>Your Applications</h2>
          {applications.length === 0 ? (
            <p className="no-data">No applications yet.</p>
          ) : (
            <table className="applications-table">
              <thead>
                <tr>
                  <th>Startup Name</th>
                  <th>Funding Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id}>
                    <td>{app.startupName}</td>
                    <td>₹{app.amount.toLocaleString()}</td>
                    <td>
                      <span className={`status ${app.status.toLowerCase()}`}>
                        {app.status}
                      </span>
                    </td>
                    <td>{formatDate(app.date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Funding;