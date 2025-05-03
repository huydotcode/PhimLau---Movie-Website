import React from "react";
import { HiUserCircle, HiSave, HiHeart, HiEye } from "react-icons/hi";

const HelpModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const iconMap = {
    "icon-update": <HiUserCircle />,
    "icon-saved": <HiSave />,
    "icon-favorite": <HiHeart />,
    "icon-history": <HiEye />,
  };

  const helpItems = [
    {
      title: "Cập nhật thông tin",
      desc: "Cập nhật tên, số điện thoại, ảnh đại diện của bạn.",
      alt: "icon-update",
    },
    {
      title: "Phim đã lưu",
      desc: "Danh sách các phim bạn đã lưu để xem sau.",
      alt: "icon-saved",
    },
    {
      title: "Phim yêu thích",
      desc: "Những phim bạn yêu thích nhất.",
      alt: "icon-favorite",
    },
    {
      title: "Phim đã xem",
      desc: "Lịch sử các phim bạn đã từng xem gần đây.",
      alt: "icon-history",
    },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
      <div
        className="max-w-md w-full rounded-lg p-6 shadow-xl overflow-auto"
        style={{
          backgroundColor: "var(--color-background)",
          color: "#fff",
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2
            className="text-xl font-semibold"
            style={{ color: "var(--color-primary)" }}
          >
            Trợ giúp
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl font-bold"
          >
            &times;
          </button>
        </div>

        {/* Nội dung Modal */}
        <div className="space-y-4">
          {helpItems.map((item, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[--color-secondary] text-white text-2xl">
                {iconMap[item.alt]}
              </div>
              <div>
                <p
                  className="font-semibold"
                  style={{ color: "var(--color-primary)" }}
                >
                  {item.title}
                </p>
                <p
                  className="text-sm"
                  style={{ color: "var(--color-secondary)" }}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelpModal;
