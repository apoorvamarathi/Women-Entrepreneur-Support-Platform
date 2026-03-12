<<<<<<< HEAD
import React, { useState } from "react";
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Fade,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const GradientBackground = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(145deg, #667eea 0%, #764ba2 100%)",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    width: "200%",
    height: "200%",
    top: "-50%",
    left: "-50%",
    background:
      "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 80%)",
    animation: "spin 20s linear infinite",
  },
  "@keyframes spin": {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
}));

const GlassPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  borderRadius: theme.spacing(3),
  backdropFilter: "blur(10px)",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(3),
  },
}));

const LogoBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: theme.spacing(4),
}));

const StyledAvatar = styled(Box)(({ theme }) => ({
  width: 70,
  height: 70,
  borderRadius: "50%",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: theme.spacing(2),
  boxShadow: "0 10px 20px rgba(102, 126, 234, 0.3)",
  "& svg": {
    fontSize: 40,
    color: "white",
  },
}));
=======
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/image.png"; // adjust path to your logo
import "./Login.css";
>>>>>>> 26287db13ed94247773cb52f848e945793dd35e2

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
<<<<<<< HEAD
  const login = useAuthStore((state) => state.login);
  const { isLoading, error, clearError } = useAuthStore();
=======
>>>>>>> 26287db13ed94247773cb52f848e945793dd35e2

  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
    clearError();
    try {
      await login(email, password);
      navigate("/"); // Redirect to dashboard on success
    } catch (err) {
      console.error("Login failed", err);
    }
=======
    navigate("/dashboard");
>>>>>>> 26287db13ed94247773cb52f848e945793dd35e2
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
<<<<<<< HEAD
              {error && (
                <Typography color="error" variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
                  {error}
                </Typography>
              )}
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={isLoading}
                sx={{
                  mt: 3,
                  py: 1.5,
                  borderRadius: 3,
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  fontSize: "1rem",
                  fontWeight: 600,
                  textTransform: "none",
                  boxShadow: "0 8px 20px rgba(102, 126, 234, 0.3)",
                  transition: "transform 0.2s",
                  "&:hover": {
                    background: "linear-gradient(135deg, #5a67d8 0%, #6b46a0 100%)",
                    transform: "scale(1.02)",
                  },
                }}
              >
                {isLoading ? 'Logging in...' : 'Log in'}
              </Button>
=======
            </div>
            <button type="submit" className="btn-primary auth-btn">
              Login Securely
            </button>
          </form>
>>>>>>> 26287db13ed94247773cb52f848e945793dd35e2

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