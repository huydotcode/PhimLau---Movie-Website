import React from "react";
import { Link, useSearchParams } from "react-router";
import Button from "../components/ui/Button";
import FavoriteMovies from "./FavoriteMovies";
import SavedMovies from "./SavedMovies";
import UpdateInfo from "./UpdateInfo";
import WatchedMovies from "./WatchedMovies";

import { useAuth } from "../context/AuthProvider";

/*
  createdAt: April 27, 2025 at 1:35:48 PM UTC+7
  displayName: "Test User1"
  email: "testuser@gmail.com"
  phoneNumber: "0937130758"
  photoURL: ""
  uid: "JrGzxcUIODa0bxL3372nxhTyUKJ3"
*/

function Sidebar({ activeTab }) {
  const tabItems = [
    { key: "update", label: "Cập nhật thông tin" },
    { key: "saved", label: "Phim đã lưu" },
    { key: "favorite", label: "Phim yêu thích" },
    { key: "history", label: "Phim đã xem" },
  ];

  const { user } = useAuth();

  // Hàm tạo avatar fallback (chữ cái đầu)
  const getInitial = (name) => name?.charAt(0).toUpperCase() || "?";

  if (!user) return null; // Hoặc có thể hiển thị một thông báo lỗi

  return (
    <aside className="w-[300px] bg-foreground text-white p-6 border-r border-secondary hidden md:flex flex-col justify-between">
      <div>
        {/* User info */}
        <div className="flex items-center space-x-4 mb-8">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt="avatar"
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-xl font-bold">
              {getInitial(user.displayName)}
            </div>
          )}
          <div>
            <p className="font-semibold text-lg">{user.displayName}</p>
            <p className="text-sm text-gray-400">Thành viên</p>
          </div>
        </div>

        {/* Tab navigation */}
        <ul className="space-y-3">
          {tabItems.map((item) => (
            <Button
              key={item.key}
              className={`justify-start block w-full text-left px-4 py-2 rounded-lg font-medium transition ${
                activeTab === item.key
                  ? "bg-primary text-white"
                  : "bg-secondary hover:bg-primary hover:text-white"
              }`}
              href={`/dashboard?t=${item.key}`}
            >
              {item.label}
            </Button>
          ))}
        </ul>
      </div>
    </aside>
  );
}

const DashboardUserPage = () => {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("t") || "update";

  const renderContent = () => {
    switch (activeTab) {
      case "update":
        return <UpdateInfo />;
      case "saved":
        return <SavedMovies />;
      case "favorite":
        return <FavoriteMovies />;
      case "history":
        return <WatchedMovies />;
      default:
        return <UpdateInfo />;
    }
  };

  return (
    <div className="flex h-screen bg-background text-white mt-[60px] rounded-xl overflow-hidden">
      <Sidebar activeTab={activeTab} />
      <main className="flex-1 overflow-auto px-4 py-6 bg-background">
        {renderContent()}
      </main>
    </div>
  );
};

export default DashboardUserPage;
