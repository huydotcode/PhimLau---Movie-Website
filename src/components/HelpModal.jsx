import React from "react";

const HelpModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-white max-w-md rounded-lg p-6 text-black shadow-xl overflow-auto w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Trợ giúp</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <span className="font-bold text-2xl">&times;</span>{" "}
            {/* Biểu tượng đóng */}
          </button>
        </div>

        {/* Nội dung Modal */}
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <img
              src="https://via.placeholder.com/50"
              alt="icon-update"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold">Cập nhật thông tin</p>
              <p className="text-sm text-gray-500">
                Cập nhật tên, số điện thoại, ảnh đại diện của bạn.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <img
              src="https://via.placeholder.com/50"
              alt="icon-saved"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold">Phim đã lưu</p>
              <p className="text-sm text-gray-500">
                Danh sách các phim bạn đã lưu để xem sau.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <img
              src="https://via.placeholder.com/50"
              alt="icon-favorite"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold">Phim yêu thích</p>
              <p className="text-sm text-gray-500">
                Những phim bạn yêu thích nhất.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <img
              src="https://via.placeholder.com/50"
              alt="icon-history"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold">Phim đã xem</p>
              <p className="text-sm text-gray-500">
                Lịch sử các phim bạn đã từng xem gần đây.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;
