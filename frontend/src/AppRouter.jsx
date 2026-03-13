import { Routes, Route, Navigate } from 'react-router-dom'
import DashboardLayout from '../layouts/DashboardLayout'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ForgotPassword from '../pages/ForgotPassword'
import Dashboard from '../pages/Dashboard'
import Profile from '../pages/Profile'
import Mentorship from '../pages/Mentorship'
import Training from '../pages/Training'
import Funding from '../pages/Funding'
import Events from '../pages/Events'
import Resources from '../pages/Resources'
import Community from '../pages/Community'
import useAuthStore from '../store/useAuthStore'

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  return isAuthenticated ? children : <Navigate to="/login" />
}

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="mentorship" element={<Mentorship />} />
        <Route path="training" element={<Training />} />
        <Route path="funding" element={<Funding />} />
        <Route path="events" element={<Events />} />
        <Route path="resources" element={<Resources />} />
        <Route path="community" element={<Community />} />
      </Route>
    </Routes>
  )
}