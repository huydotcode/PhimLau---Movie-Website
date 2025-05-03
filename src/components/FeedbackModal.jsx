import React, { useState } from "react";
import { db, storage } from "../app/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuth } from "../context/AuthProvider";

const FeedbackModal = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [feedback, setFeedback] = useState("");
  const [errorDescription, setErrorDescription] = useState("");
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

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
      const imageUrls = [];
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const imageRef = ref(
          storage,
          `feedback/${user.uid}/${Date.now()}_${image.name}`,
        );
        await uploadBytes(imageRef, image);
        const downloadURL = await getDownloadURL(imageRef);
        imageUrls.push(downloadURL);
      }

      await addDoc(collection(db, "feedbacks"), {
        uid: user.uid,
        name,
        feedback,
        errorDescription,
        images: imageUrls,
        createdAt: serverTimestamp(),
      });

      setMessage("🎉 Cảm ơn bạn đã gửi phản hồi!");
      setFeedback("");
      setErrorDescription("");
      setImages([]);
    } catch (error) {
      setMessage("Đã có lỗi xảy ra, vui lòng thử lại.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <div
        className="max-w-xl w-full rounded-lg p-6 shadow-2xl text-white"
        style={{ backgroundColor: "var(--color-background)" }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2
            className="text-2xl font-bold "
            style={{ color: "var(--color-primary)" }}
          >
            Gửi Phản Hồi
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Tên của bạn
            </label>
            <input
              type="text"
              id="name"
              value={name}
              readOnly
              className="mt-1 w-full p-2 rounded-md bg-[--color-secondary] text-white border border-gray-600"
            />
          </div>

          <div>
            <label htmlFor="feedback" className="block text-sm font-medium">
              Phản hồi của bạn
            </label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="mt-1 w-full p-2 rounded-md bg-[--color-secondary] text-white border border-gray-600"
              rows="4"
            />
          </div>

          <div>
            <label
              htmlFor="errorDescription"
              className="block text-sm font-medium"
            >
              Mô tả lỗi (nếu có)
            </label>
            <textarea
              id="errorDescription"
              value={errorDescription}
              onChange={(e) => setErrorDescription(e.target.value)}
              className="mt-1 w-full p-2 rounded-md bg-[--color-secondary] text-white border border-gray-600"
              rows="4"
            />
          </div>

          <div>
            <label htmlFor="images" className="block text-sm font-medium">
              Tải lên ảnh (tối đa 3 ảnh)
            </label>
            <input
              type="file"
              id="images"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="mt-1 w-full p-2 rounded-md bg-[--color-secondary] text-white border border-gray-600"
            />
          </div>

          {images.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">Ảnh đã chọn:</h4>
              <div className="flex space-x-2 overflow-x-auto">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(image)}
                    alt={`selected-${index}`}
                    className="w-16 h-16 object-cover rounded-md border border-gray-500"
                  />
                ))}
              </div>
            </div>
          )}

          <div className="text-center">
            {message && <p className="text-sm text-green-400">{message}</p>}
            <button
              type="submit"
              className="mt-4 px-6 py-2 rounded-lg bg-[--color-primary] hover:bg-opacity-90 transition-all"
              disabled={isSubmitting}
              style={{ backgroundColor: "var(--color-primary)" }}
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
