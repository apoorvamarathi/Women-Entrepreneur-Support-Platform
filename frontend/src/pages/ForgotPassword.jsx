import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import logo from "../assets/image.png";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.post('/auth/forgot-password', { email });
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to process request");
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
          <h1>Reset Password</h1>
          <p className="subtitle">We'll send you a reset link</p>

          {!submitted ? (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="input-field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>
              {error && <div className="error-message" style={{color: 'red', margin: '10px 0'}}>{error}</div>}
              <button type="submit" className="btn-primary auth-btn" disabled={loading}>
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          ) : (
            <div className="success-message">
              <p>If an account exists for <strong>{email}</strong>, you will receive a password reset link shortly.</p>
            </div>
          )}

          <div className="auth-footer">
            <Link to="/login">← Back to Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;