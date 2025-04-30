import {
  AppstoreOutlined,
  DashboardOutlined,
  HeartOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../context/AuthProvider";

const { Sider } = Layout;

const Sidebar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const location = useLocation();

  const items = [
    { key: "/admin", icon: <DashboardOutlined />, label: "Dashboard" },
    { key: "/admin/movies", icon: <VideoCameraOutlined />, label: "Phim" },
    { key: "/admin/categories", icon: <AppstoreOutlined />, label: "Danh Mục" },
    { key: "/admin/users", icon: <UserOutlined />, label: "Người Dùng" },
    { key: "/admin/favorites", icon: <HeartOutlined />, label: "Yêu Thích" },
  ];

  return (
    <Sider
      className="h-full rounded-xl"
      style={{
        background: "black",
      }}
    >
      <div className="text-xl p-4 font-bold">
        {user?.photoURL && <img src={user?.photoURL} alt={user?.displayName} />}
        {user?.displayName && (
          <h1 className="text-nowrap overflow-ellipsis">{user?.displayName}</h1>
        )}
      </div>

      <Menu
        style={{
          background: "transparent",
        }}
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={items}
        onClick={({ key }) => navigate(key)}
      />
    </Sider>
  );
};

const AdminLayout = ({ children }) => {
  return (
    <div className="pt-[80px] h-screen mx-auto px-4 py-8 flex bg-foreground">
      <Sidebar />

      <div className="ml-2 rounded-xl flex-1 bg-black p-2">{children}</div>
    </div>
  );
};

export default AdminLayout;
