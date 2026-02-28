import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { ColorModeContext, useMode } from "./theme";

import LoginPage from "./scenes/login";
import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./scenes/global/Sidebar";
import Topbar from "./scenes/global/Topbar";
import AdminDashboard from "./scenes/AdminDashboard";
import DriverDashboard from "./scenes/driverDashboard";
import { Box, useTheme } from "@mui/material";
import AppSidebar from "./scenes/global/Sidebar";


// Layouts
/*const AdminLayout = () => (
  <div style={{ display: "flex", width: "100%" }}>
    <Sidebar />
    <div style={{ flex: 1 }}>
      <Topbar />
      <AdminDashboard />
    </div>
  </div>
);*/
const AdminLayout = () => {
  const theme = useTheme();
  return (
    <Box sx={{ 
      display: "flex", 
      width: "100%",
       minHeight: "100vh", 
       backgroundColor: theme.palette.background.default }}>
      <Sidebar />
      <Box sx={{ flex: 1,display: "flex", flexDirection: "column" }}>
        <Topbar />
        <AdminDashboard />
      </Box>
    </Box>
  );
};

const DriverLayout = () => (
  <div style={{ display: "flex", width: "100%" }}>
    <Sidebar />
    <div style={{ flex: 1 }}>
      <Topbar />
      <DriverDashboard />
    </div>
  </div>
);

// Root wrapper with theme + router
const Root = () => {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
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
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);