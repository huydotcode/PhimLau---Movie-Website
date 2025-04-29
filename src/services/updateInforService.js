import { doc, updateDoc } from "firebase/firestore";
import { db } from "../app/firebase"; // Đường dẫn đến cấu hình Firebase của bạn

export const updateUserField = async (userId, field, value) => {
    if (!userId) throw new Error("Không tìm thấy userId.");
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
        [field]: value,
    });
};
