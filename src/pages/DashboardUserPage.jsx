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

function Sidebar({
  activeTab,
  onOpenHelp,
  onOpenFeedback,
  isSidebarOpen,
  toggleSidebar,
  onTabClick,
}) {
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
    <>
      {/* Overlay khi mở sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}

      <aside
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed top-0 left-0 w-[250px] bg-foreground text-white p-6 border-r border-secondary flex flex-col justify-between transition-transform duration-300 ease-in-out z-50
md:translate-x-0 md:relative md:z-auto md:h-auto`}
      >
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
                onClick={() => {
                  onTabClick(item.key);
                  toggleSidebar(); // Close sidebar after tab click on mobile
                }}
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
    </>
  );
}

const DashboardUserPage = () => {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("t") || "update";
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Track the sidebar state

  const closeHelpModal = () => setIsHelpModalOpen(false);
  const closeFeedbackModal = () => setIsFeedbackModalOpen(false);
  const openHelpModal = () => setIsHelpModalOpen(true);
  const openFeedbackModal = () => setIsFeedbackModalOpen(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const onTabClick = (tab) => {
    // Handle tab change logic if needed
  };

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
    <div className="flex h-screen bg-background text-white mt-[60px] rounded-xl overflow-hidden relative">
      {/* Hamburger Button for mobile */}
      <button
        className="absolute top-3 right-4 md:hidden p-4 text-white text-weight-bold bg-primary rounded-full shadow-lg transition-transform duration-300 ease-in-out hover:bg-secondary"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? "Đóng Menu" : "More"}
      </button>

      <Sidebar
        activeTab={activeTab}
        onOpenHelp={openHelpModal}
        onOpenFeedback={openFeedbackModal}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        onTabClick={onTabClick}
      />

      <main className="flex-1 overflow-auto px-4 py-6 bg-background md:ml-[250px] mt-[100px] md:mt-0">
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
