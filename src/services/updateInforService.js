import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { db, storage, auth } from "../app/firebase"; // Import cấu hình Firebase

/**
 * Cập nhật một field cụ thể của người dùng trong Firestore
 * @param {string} userId - UID của người dùng
 * @param {string} field - Tên field cần cập nhật (vd: 'photoURL', 'displayName')
 * @param {*} value - Giá trị mới
 */
export const updateUserField = async (userId, field, value) => {
    if (!userId) throw new Error("Không tìm thấy userId.");

    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
        [field]: value,
    });
};

/**
 * Thay đổi ảnh đại diện của người dùng:
 * - Upload ảnh lên Firebase Storage
 * - Lấy URL ảnh mới
 * - Cập nhật vào Firestore và Firebase Auth (nếu đang đăng nhập)
 * @param {string} userId - UID của người dùng
 * @param {File} file - File ảnh được chọn
 * @returns {Promise<string>} - URL ảnh mới
 */
export const updateUserPhoto = async (userId, file) => {
    if (!userId || !file) throw new Error("Thiếu userId hoặc file.");

    // Tạo đường dẫn lưu ảnh trong Storage
    const imageRef = ref(storage, `avatars/${userId}/${file.name}`);

    // Upload ảnh lên Storage
    await uploadBytes(imageRef, file);

    // Lấy URL ảnh sau khi upload
    const photoURL = await getDownloadURL(imageRef);

    // Cập nhật ảnh đại diện trong Firestore
    await updateUserField(userId, "photoURL", photoURL);

    // Nếu đang đăng nhập đúng user thì cập nhật vào Firebase Auth luôn
    if (auth.currentUser?.uid === userId) {
        await updateProfile(auth.currentUser, { photoURL });
    }

    return photoURL;
};
