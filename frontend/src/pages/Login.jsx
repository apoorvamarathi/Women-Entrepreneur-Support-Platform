import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import logo from "../assets/image.png"; // adjust path to your logo
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      console.log("Logged in user details:", useAuthStore.getState().user);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Left side with logo */}
        <div className="auth-left">
          <img src={logo} alt="Women Entrepreneur" className="auth-logo" />
        </div>

        {/* Right side with form */}
        <div className="auth-right">
          <h1>Women Entrepreneur</h1>
          <p className="subtitle">Connect</p>

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
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            {error && <div className="error-message" style={{color: 'red', margin: '10px 0'}}>{error}</div>}
            <button type="submit" className="btn-primary auth-btn" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login Securely"}
            </button>
          </form>

          <div className="auth-links">
            <Link to="/forgot-password" className="forgot-link">
              Forgot Password?
            </Link>
          </div>

          <div className="auth-footer">
            Don't have an account? <Link to="/register">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;