import { useState, useEffect } from "react";
import api from "../services/api";
import "./Profile.css";

const Profile = () => {
  const [formData, setFormData] = useState({
    businessName: "",
    industry: "",
    stage: "",
    fundingRequired: "",
    website: "",
    description: "",
    documents: null,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile");
        if (res.data.profile) {
          setFormData((prev) => ({
            ...prev,
            ...res.data.profile,
          }));
        }
      } catch (error) {
        console.error("Failed to load profile", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, documents: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put("/profile", formData);
      alert("Profile saved successfully!");
    } catch (error) {
      console.error("Failed to save profile", error);
      alert(error.response?.data?.message || "Failed to save profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="profile-page">
      <h1 className="page-title">Business Profile</h1>

      <form onSubmit={handleSubmit} className="profile-form card">
        <div className="form-row">
          <div className="form-group">
            <label>Business Name</label>
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          <div className="form-group">
            <label>Industry</label>
            <select name="industry" value={formData.industry} onChange={handleChange} className="input-field" required>
              <option value="">Select Industry</option>
              <option value="tech">Technology</option>
              <option value="retail">Retail</option>
              <option value="health">Health & Wellness</option>
              <option value="education">Education</option>
              <option value="finance">Finance</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Business Stage</label>
            <select name="stage" value={formData.stage} onChange={handleChange} className="input-field" required>
              <option value="">Select Stage</option>
              <option value="idea">Idea / Concept</option>
              <option value="startup">Startup</option>
              <option value="growth">Growth</option>
              <option value="established">Established</option>
            </select>
          </div>
          <div className="form-group">
            <label>Funding Required ($)</label>
            <input
              type="number"
              name="fundingRequired"
              value={formData.fundingRequired}
              onChange={handleChange}
              className="input-field"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Website (optional)</label>
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label>Business Description</label>
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className="input-field"
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label>Upload Business Documents</label>
          <input type="file" onChange={handleFileChange} className="file-input" />
          {formData.documents && <p className="file-name">{formData.documents.name}</p>}
        </div>

        <button type="submit" className="btn-primary" disabled={loading || saving}>
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
};

export default Profile;