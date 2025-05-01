import {
    collection,
    addDoc,
    deleteDoc,
    doc,
    getDocs,
    query,
    where,
} from "firebase/firestore";
import { db } from "../app/firebase";

// Thêm phim yêu thích
export const addFavorite = async ({ userId, movie }) => {
    const favRef = collection(db, "favorites");

    const q = query(
        favRef,
        where("user_id", "==", userId),
        where("movie_id", "==", movie._id)
    );
    const exists = await getDocs(q);

    if (!exists.empty) {
        console.log("Phim đã có trong yêu thích.");
        return null;
    }

    const docRef = await addDoc(favRef, {
        user_id: userId,
        movie_id: movie._id,
        movie_data: movie, // lưu toàn bộ data để tiện hiển thị
        created_at: new Date(),
    });

    return { id: docRef.id, ...movie };
};

// Lấy danh sách phim yêu thích theo user
export const getFavoritesByUser = async (userId) => {
    const favRef = collection(db, "favorites");
    const q = query(favRef, where("user_id", "==", userId));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data().movie_data,
    }));
};

// Xoá khỏi danh sách yêu thích
export const removeFavorite = async (favoriteDocId) => {
    await deleteDoc(doc(db, "favorites", favoriteDocId));
};
