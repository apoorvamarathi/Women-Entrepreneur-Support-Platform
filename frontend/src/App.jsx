import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Mentorship from "./pages/Mentorship";
import Training from "./pages/Training";
import Funding from "./pages/Funding";
import Events from "./pages/Events";
import Resources from "./pages/Resources";
import Community from "./pages/Community";
import ForgotPassword from "./pages/ForgotPassword";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/mentorship" element={<Mentorship />} />
          <Route path="/training" element={<Training />} />
          <Route path="/funding" element={<Funding />} />
          <Route path="/events" element={<Events />} />
          <Route path="/resources" element={<Resources />} />
          
          <Route path="/community" element={<Community />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
