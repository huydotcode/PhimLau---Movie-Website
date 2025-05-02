import React, { useState } from "react";
import { useSearchParams } from "react-router";
import Button from "../components/ui/Button";
import FavoriteMovies from "./FavoriteMovies";
import SavedMovies from "./SavedMovies";
import UpdateInfo from "./UpdateInfo";
import WatchedMoviesPage from "./WatchedMovie";
import HelpModal from "../components/HelpModal"; // Import modal trợ giúp
import FeedbackModal from "../components/FeedbackModal"; // Import modal phản hồi

import { useAuth } from "../context/AuthProvider";

function Sidebar({ activeTab, onOpenHelp, onOpenFeedback }) {
  const tabItems = [
    { key: "update", label: "Cập nhật thông tin" },
    { key: "saved", label: "Phim đã lưu" },
    { key: "favorite", label: "Phim yêu thích" },
    { key: "history", label: "Phim đã xem" },
  ];

  const { user } = useAuth();

  const getInitial = (name) => name?.charAt(0).toUpperCase() || "?";

  if (!user) return null;

  return (
    <aside className="w-[300px] bg-foreground text-white p-6 border-r border-secondary hidden md:flex flex-col justify-between">
      <div>
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
          <Button
            onClick={onOpenHelp}
            className="justify-start block w-full text-left px-4 py-2 rounded-lg font-medium transition bg-secondary hover:bg-primary hover:text-white"
          >
            Trợ giúp
          </Button>

          <Button
            onClick={onOpenFeedback}
            className="justify-start block w-full text-left px-4 py-2 rounded-lg font-medium transition bg-secondary hover:bg-primary hover:text-white"
          >
            Gửi Phản Hồi
          </Button>
        </ul>
      </div>
    </aside>
  );
}

const DashboardUserPage = () => {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("t") || "update";
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  const closeHelpModal = () => setIsHelpModalOpen(false);
  const closeFeedbackModal = () => setIsFeedbackModalOpen(false);
  const openHelpModal = () => setIsHelpModalOpen(true);
  const openFeedbackModal = () => setIsFeedbackModalOpen(true);

  const renderContent = () => {
    switch (activeTab) {
      case "update":
        return <UpdateInfo />;
      case "saved":
        return <SavedMovies />;
      case "favorite":
        return <FavoriteMovies />;
      case "history":
        return <WatchedMoviesPage />;
      default:
        return <UpdateInfo />;
    }
  };

  return (
    <div className="flex h-screen bg-background text-white mt-[60px] rounded-xl overflow-hidden">
      <Sidebar
        activeTab={activeTab}
        onOpenHelp={openHelpModal}
        onOpenFeedback={openFeedbackModal}
      />
      <main className="flex-1 overflow-auto px-4 py-6 bg-background">
        {renderContent()}
      </main>

      <HelpModal isOpen={isHelpModalOpen} onClose={closeHelpModal} />
      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={closeFeedbackModal}
      />
    </div>
  );
};

export default DashboardUserPage;
