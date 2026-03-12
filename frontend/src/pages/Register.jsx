<<<<<<< HEAD
import React, { useState } from "react";
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Link,
  Fade,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

// Reuse same styled components (can be imported from a shared file)
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
import logo from "../assets/image.png";
import "./Register.css";
>>>>>>> 26287db13ed94247773cb52f848e945793dd35e2

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "entrepreneur",
  });
<<<<<<< HEAD
  const [validationError, setValidationError] = useState("");
  const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);
  const { isLoading, error, clearError } = useAuthStore();
=======
  const navigate = useNavigate();
>>>>>>> 26287db13ed94247773cb52f848e945793dd35e2

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
    clearError();
    setValidationError("");

    if (formData.password !== formData.confirmPassword) {
      setValidationError("Passwords do not match");
      return;
    }

    try {
      // Exclude confirmPassword from the payload
      const { confirmPassword, ...payload } = formData;
      await register(payload);
      navigate("/"); // Redirect to dashboard on success
    } catch (err) {
      console.error("Registration failed", err);
    }
=======
    navigate("/dashboard");
>>>>>>> 26287db13ed94247773cb52f848e945793dd35e2
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-left">
          <img src={logo} alt="Women Entrepreneur" className="auth-logo" />
        </div>
        <div className="auth-right">
          <h1>Women Entrepreneur</h1>
          <p className="subtitle">Join the Community</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                className="input-field"
                value={formData.name}
                onChange={handleChange}
                placeholder="Jane Doe"
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="input-field"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="input-field"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
              </div>
              <div className="form-group">
                <label>Confirm</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="input-field"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>I am a</label>
              <select name="role" className="input-field" value={formData.role} onChange={handleChange}>
                <option value="entrepreneur">Women Entrepreneur</option>
                <option value="mentor">Mentor / Industry Expert</option>
                <option value="investor">Investor / Funding Partner</option>
              </select>
            </div>
            <button type="submit" className="btn-primary auth-btn">
              Register
            </button>
          </form>

<<<<<<< HEAD
              {(error || validationError) && (
                <Typography color="error" variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
                  {validationError || error}
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
                {isLoading ? 'Registering...' : 'Register'}
              </Button>

              <Box sx={{ mt: 2, textAlign: "center" }}>
                <Typography variant="body2" color="textSecondary">
                  Already have an account?{" "}
                  <Link
                    component={RouterLink}
                    to="/login"
                    sx={{
                      color: "primary.main",
                      textDecoration: "none",
                      fontWeight: 500,
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    Log in
                  </Link>
                </Typography>
              </Box>
            </form>
          </GlassPaper>
        </Fade>
      </Container>
    </GradientBackground>
=======
          <div className="auth-footer">
            Already have an account? <Link to="/login">Log in</Link>
          </div>
        </div>
      </div>
    </div>
>>>>>>> 26287db13ed94247773cb52f848e945793dd35e2
  );
};

export default Register;