import React from "react";
import { BiSolidMoviePlay } from "react-icons/bi";
import { MdSpaceDashboard } from "react-icons/md";
import { TbCategoryFilled } from "react-icons/tb";
import { Link, useLocation, useNavigate } from "react-router";
import Icons from "../components/Icons";
import { useAuth } from "../context/AuthProvider";

const Header = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="left-[90px] md:left-[220px] fixed top-0 h-[60px] w-[calc(100vw-90px)] md:w-[calc(100vw-220px)] flex items-center justify-between p-4 bg-black border border-[#2c2c2c]">
      <div className="flex items-center gap-4">
        <Link className="flex items-center gap-2 hover:text-primary" to="/">
          <Icons.Return className="w-6 h-8 " />{" "}
          <span className="hidden xl:block">Trở về trang chủ</span>
        </Link>

        <h1 className="text-2xl font-bold text-primary cursor-pointer">
          Admin
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <h1 className="font-bold hidden xl:block">{auth.user?.displayName}</h1>
        {auth.user?.photoURL && (
          <img
            src={auth.user?.photoURL}
            alt={auth.user?.displayName}
            className="w-10 h-10 rounded-full"
          />
        )}
        <button
          onClick={handleLogout}
          className="bg-secondary text-white px-4 py-1 rounded-xl flex items-center gap-2 hover:bg-primary transition duration-200"
        >
          <Icons.Logout className="w-6 h-8" />{" "}
          <span className="hidden xl:block">Đăng xuất</span>
        </button>
      </div>
    </div>
  );
};

const Menu = ({ items }) => {
  const location = useLocation();

  return (
    <div className="flex flex-col gap-2 p-4">
      {items.map((item) => (
        <Link to={item.key} key={item.key}>
          <span
            className={`flex text-white justify-center md:justify-start items-center gap-2 p-2 rounded-lg hover:bg-primary hover:text-white ${
              location.pathname === item.key
                ? "bg-primary text-white"
                : "text-gray-400"
            }`}
          >
            <span className="text-white">{item.icon}</span>
            <span className="hidden md:block text-white">{item.label}</span>
          </span>
        </Link>
      ))}
    </div>
  );
};

const Sidebar = () => {
  const items = [
    { key: "/admin", icon: <MdSpaceDashboard />, label: "Dashboard" },
    { key: "/admin/movies", icon: <BiSolidMoviePlay />, label: "Phim" },
    { key: "/admin/categories", icon: <TbCategoryFilled />, label: "Thể loại" },
    { key: "/admin/users", icon: <Icons.User />, label: "Người Dùng" },
  ];

  return (
    <aside className="fixed top-0 left-0 h-screen bg-black md:w-[219px] w-[90px]">
      <div className="text-xl p-4 font-bold">
        <Link to="/">
          <img className="hidden md:block" src="/logo.png" alt="Logo" />
        </Link>
        <img
          className="md:hidden w-full h-[60px] object-contain"
          src="/logo_2.png"
          alt="Logo"
        />
      </div>
      <Menu items={items} />
    </aside>
  );
};

const AdminLayout = ({ children }) => {
  return (
    <div className="h-screen w-screen flex bg-foreground">
      <Header />
      <Sidebar />
      <div className="ml-[90px] md:ml-[220px] mt-[60px] flex-1 bg-black p-2">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
