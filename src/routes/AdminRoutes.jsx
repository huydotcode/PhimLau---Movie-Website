import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const AdminRoutes = () => {
  const { user, loading } = useAuth();

  if (!user && !loading) {
    return <Navigate to="/" replace />;
  }

  if (user && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoutes;
