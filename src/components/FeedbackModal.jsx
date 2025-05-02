import React, { useState, useEffect } from "react";
import { db, storage } from "../app/firebase"; // Thêm Firebase storage
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuth } from "../context/AuthProvider"; // Giả sử bạn có context AuthProvider

const FeedbackModal = ({ isOpen, onClose }) => {
  const { user } = useAuth(); // Lấy thông tin người dùng từ AuthContext
  const [feedback, setFeedback] = useState("");
  const [errorDescription, setErrorDescription] = useState(""); // Mô tả lỗi
  const [images, setImages] = useState([]); // Dữ liệu ảnh
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  // Tên người dùng sẽ tự động lấy từ thông tin Firebase Authentication
  const name = user?.displayName || "Khách";

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 3) {
      setMessage("Bạn chỉ có thể tải lên tối đa 3 ảnh.");
      return;
    }
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!feedback || !errorDescription) {
      setMessage("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      // Giả lập lưu ảnh vào Firebase Storage và lấy URL
      const imageUrls = [];
      if (images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          // Chỉ tạo URL giả lập cho ảnh
          const imageUrl = URL.createObjectURL(images[i]);
          imageUrls.push(imageUrl);
        }
      }

      // Giả lập lưu feedback vào Firestore
      console.log("Tên: ", name);
      console.log("Phản hồi: ", feedback);
      console.log("Mô tả lỗi: ", errorDescription);
      console.log("Chọn tối đa 3 ảnh: ", imageUrls);

      setMessage("Cảm ơn bạn đã gửi phản hồi!");
      setFeedback("");
      setErrorDescription("");
      setImages([]);
    } catch (error) {
      setMessage("Đã có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-white max-w-md rounded-lg p-6 text-black shadow-xl overflow-auto w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Gửi Phản Hồi</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <span className="font-bold text-2xl">&times;</span>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Tên của bạn
            </label>
            <input
              type="text"
              id="name"
              value={name} // Tên tự động điền từ Firebase Auth
              readOnly
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              placeholder="Tên của bạn"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="feedback"
              className="block text-sm font-medium text-gray-700"
            >
              Phản hồi của bạn
            </label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              placeholder="Nhập phản hồi"
              rows="4"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="errorDescription"
              className="block text-sm font-medium text-gray-700"
            >
              Mô tả lỗi (nếu có)
            </label>
            <textarea
              id="errorDescription"
              value={errorDescription}
              onChange={(e) => setErrorDescription(e.target.value)}
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              placeholder="Nhập mô tả lỗi"
              rows="4"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="images"
              className="block text-sm font-medium text-gray-700"
            >
              Tải lên ảnh (Tối đa 3 ảnh)
            </label>
            <input
              type="file"
              id="images"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>

          {images.length > 0 && (
            <div className="mb-4">
              <h4 className="font-medium text-sm text-gray-700">
                Ảnh đã chọn:
              </h4>
              <div className="flex space-x-2 mt-2">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(image)}
                    alt={`selected-image-${index}`}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                ))}
              </div>
            </div>
          )}

          <div className="text-center">
            {message && <p className="text-sm text-green-500">{message}</p>}
            <button
              type="submit"
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Đang gửi..." : "Gửi Phản Hồi"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackModal;
