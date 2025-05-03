import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import FeedbackModal from "../components/FeedbackModal"; // Import modal phản hồi
import HelpModal from "../components/HelpModal"; // Import modal trợ giúp
import Button from "../components/ui/Button";
import FavoriteMovies from "./FavoriteMovies";
import SavedMovies from "./SavedMovies";
import UpdateInfo from "./UpdateInfo";
import WatchedMoviesPage from "./WatchedMovie";

import Icons from "../components/Icons";
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
        } fixed top-0 left-0 w-[300px] bg-background text-white p-6 border-r-2 border-secondary flex flex-col justify-between transition-transform duration-300 ease-in-out z-50
md:translate-x-0 md:relative md:z-auto md:h-auto h-full`}
      >
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Tài khoản</h2>
            <button
              className="absolute top-4 right-4 md:hidden py-2 px-4 text-white text-weight-bold bg-secondary rounded-lg transition-transform duration-300 ease-in-out hover:bg-primary"
              onClick={toggleSidebar}
            >
              <Icons.Close className="w-6 h-6" />
            </button>
          </div>

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

          <ul className="rounded-sm overflow-hidden">
            {tabItems.map((item) => (
              <Button
                key={item.key}
                className={`justify-start block w-full text-base text-left px-4 py-2 font-medium transition ${
                  activeTab === item.key
                    ? "bg-primary text-white"
                    : " hover:bg-primary hover:text-white"
                }`}
                // href={`/dashboard?t=${item.key}`}
                onClick={() => {
                  onTabClick(item.key);

                  if (isSidebarOpen) {
                    toggleSidebar(); // Đóng sidebar khi click vào tab
                  }
                }}
              >
                {item.label}
              </Button>
            ))}
          </ul>
        </div>

        <div>
          <Button
            onClick={onOpenHelp}
            className="justify-start block w-full text-left text-xs px-4 py-2 font-medium transition  hover:underline hover:text-white"
          >
            Trợ giúp
          </Button>

          <Button
            onClick={onOpenFeedback}
            className="justify-start block w-full text-left text-xs px-4 py-2 font-medium transition  hover:underline hover:text-white"
          >
            Gửi Phản Hồi
          </Button>
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
  const navigate = useNavigate(); // Hook to programmatically navigate

  const closeHelpModal = () => setIsHelpModalOpen(false);
  const closeFeedbackModal = () => setIsFeedbackModalOpen(false);
  const openHelpModal = () => setIsHelpModalOpen(true);
  const openFeedbackModal = () => setIsFeedbackModalOpen(true);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev); // Toggle sidebar state

  const onTabClick = (tab) => {
    // Handle tab change logic if needed
    navigate(`/dashboard?t=${tab}`); // Navigate to the new tab
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

  useEffect(() => {
    console.log("isSidebarOpen", isSidebarOpen);
  }, [isSidebarOpen]);

  return (
    <div className="flex h-screen bg-background text-white rounded-xl overflow-hidden relative">
      {/* Hamburger Button for mobile */}
      <button
        className="absolute top-4 right-4 md:hidden py-2 px-4 text-white text-weight-bold bg-secondary rounded-lg transition-transform duration-300 ease-in-out hover:bg-primary"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? (
          <Icons.Close className="w-6 h-6" />
        ) : (
          <Icons.Menu className="w-6 h-6" />
        )}
      </button>

      <Sidebar
        activeTab={activeTab}
        onOpenHelp={openHelpModal}
        onOpenFeedback={openFeedbackModal}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        onTabClick={onTabClick}
      />

      <main className="flex-1 overflow-auto px-4 py-6 bg-background md:ml-0 md:mt-0">
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
