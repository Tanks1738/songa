import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/" replace />;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    console.log("ProtectedRoute payload:", payload, "expected role:", role);
    console.log("ProtectedRoute check:", { payload, expectedRole: role });

    if (payload.exp && Date.now() >= payload.exp * 1000) {
      localStorage.removeItem("token");
      return <Navigate to="/" replace state={{ sessionExpired: true }} />;
    }

    // ✅ Normalize role check to lowercase
    if (role && payload.role.toLowerCase() !== role.toLowerCase()) {
      return <Navigate to="/" replace />;
    }

    return children;
  } catch (err) {
    localStorage.removeItem("token");
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;