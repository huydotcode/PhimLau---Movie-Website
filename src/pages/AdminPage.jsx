import React from "react";
import { Outlet } from "react-router";

const AdminPage = () => {
  return (
    <div>
      Admin Page
      <Outlet />
    </div>
  );
};

export default AdminPage;
