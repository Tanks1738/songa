import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./scenes/login";
import AdminDashboard from "./scenes/adminDashboard"; 
import DriverDashboard from "./scenes/driverDashboard/DriverDashboard";
import AppSidebar from "./scenes/global/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";

const AdminLayout = () => (
  <div style={{ display: "flex" }}>
    <AppSidebar />
    <AdminDashboard />
  </div>
);

const DriverLayout = () => (
  <div style={{ display: "flex" }}>
    <AppSidebar />
    <DriverDashboard />
  </div>
);

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<LoginPage />} />

      {/* Admin */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      />

      {/* Driver */}
      <Route
        path="/driver"
        element={
          <ProtectedRoute role="driver">
            <DriverLayout />
          </ProtectedRoute>
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;