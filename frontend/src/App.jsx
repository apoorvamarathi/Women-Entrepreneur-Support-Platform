// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import DashboardLayout from "./layouts/DashboardLayout";
// import Dashboard from "./pages/Dashboard";
// import Profile from "./pages/Profile";
// import Mentorship from "./pages/Mentorship";
// import Training from "./pages/Training";
// import Funding from "./pages/Funding";
// import Events from "./pages/Events";
// import Resources from "./pages/Resources";
// import Community from "./pages/Community";
// import ForgotPassword from "./pages/ForgotPassword";


// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route element={<DashboardLayout />}>
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/mentorship" element={<Mentorship />} />
//           <Route path="/training" element={<Training />} />
//           <Route path="/funding" element={<Funding />} />
//           <Route path="/events" element={<Events />} />
//           <Route path="/resources" element={<Resources />} />
          
//           <Route path="/community" element={<Community />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//         </Route>
//         <Route path="/" element={<Navigate to="/login" replace />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;



import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import MentorDashboard from "./pages/MentorDashboard";
import InvestorDashboard from "./pages/InvestorDashboard";
import EntrepreneurDashboard from "./pages/EntrepreneurDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import DashboardLayout from "./layouts/DashboardLayout";
import Profile from "./pages/Profile";
import Mentorship from "./pages/Mentorship";
import Training from "./pages/Training";
import Funding from "./pages/Funding";
import Events from "./pages/Events";
import Resources from "./pages/Resources";
import Community from "./pages/Community";

function App() {
  // This would normally come from your auth context
  // For now, let's assume we have the user role
  const userRole = localStorage.getItem("userRole")||'enterpreneur'; // Change this to test different roles
  
  // Function to get the correct dashboard based on role
  const getDashboardComponent = () => {
    switch(userRole) {
      case "admin":
        return <AdminDashboard />;
      case "mentor":
        return <MentorDashboard />;
      case "investor":
        return <InvestorDashboard />;
      default:
        return <EntrepreneurDashboard />;
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected routes with sidebar */}
        <Route element={<DashboardLayout />}>
          {/* Dynamic dashboard based on role */}
          <Route path="/dashboard" element={getDashboardComponent()} />
          
          {/* Feature pages (same for all users) */}
          <Route path="/profile" element={<Profile/>} />
          <Route path="/mentorship" element={<Mentorship />} />
          <Route path="/training" element={<Training />} />
          <Route path="/funding" element={<Funding />} />
          <Route path="/events" element={<Events />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/community" element={<Community />} />
        </Route>

        {/* Redirect root to dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;