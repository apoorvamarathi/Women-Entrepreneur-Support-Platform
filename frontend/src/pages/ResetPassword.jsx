import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import logo from "../assets/image.png";
import "./ForgotPassword.css"; // Reuse the standard auth styling

const ResetPassword = () => {
  const { resetToken } = useParams();
  const navigate = useNavigate();
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }
    if (password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    setLoading(true);
    setError("");

    try {
      await api.put(`/auth/reset-password/${resetToken}`, { password });
      alert("Password successfully reset! Please login with your new credentials.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired token");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-left">
          <img src={logo} alt="Women Entrepreneur" className="auth-logo" />
        </div>
        <div className="auth-right">
          <h1>Secure Reset</h1>
          <p className="subtitle">Enter your new permanent password</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Must be at least 6 characters"
                required
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                className="input-field"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
              />
            </div>

            {error && <div className="error-message" style={{color: 'red', margin: '10px 0'}}>{error}</div>}
            
            <button type="submit" className="btn-primary auth-btn" disabled={loading}>
              {loading ? "Updating..." : "Confirm New Password"}
            </button>
          </form>

          <div className="auth-footer" style={{ marginTop: '20px' }}>
            <Link to="/login">← Back to Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
