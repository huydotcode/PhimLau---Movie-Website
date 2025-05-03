import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthProvider";

const AdminPage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user && !loading) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="h-full overflow-scroll">
      <Outlet />
    </div>
  );
};

export default AdminPage;
