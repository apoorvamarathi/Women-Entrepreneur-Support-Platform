import { useState, useEffect } from "react";
import api from "../services/api";
import "./Funding.css";

const Funding = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    startupName: "",
    amount: "",
    businessPlan: null,
    pitchDeck: null,
    financialProjections: null,
  });

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await api.get("/funding");
        setApplications(res.data);
      } catch (error) {
        console.error("Failed to load funding apps", error);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // In a real app, you would upload the file to S3/Cloudinary and get a URL.
      // For now, we'll just mock the file URL behavior since the backend expects a pitchDeck string.
      const pitchDeckName = formData.pitchDeck ? formData.pitchDeck.name : "mock_pitchdeck.pdf";

      const res = await api.post("/funding", {
        amount: parseFloat(formData.amount),
        pitchDeck: pitchDeckName,
      });

      // The backend response doesn't give startupName directly since it's on the user or entrepreneur profile,
      // but we can append it locally for the UI since this is the current user's submission.
      const newApp = {
        ...res.data,
        startupName: formData.startupName, 
        date: res.data.createdAt,
      };

      setApplications([...applications, newApp]);
      alert("Application submitted successfully!");

      setFormData({
        startupName: "",
        amount: "",
        businessPlan: null,
        pitchDeck: null,
        financialProjections: null,
      });
      e.target.reset();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to submit application.");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
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