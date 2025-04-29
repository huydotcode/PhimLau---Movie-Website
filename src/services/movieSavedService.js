import { db } from "../app/firebase"; // điều chỉnh đường dẫn nếu cần
import {
    addDoc,
    collection,
    serverTimestamp,
    getDoc,
    query,
    where,
    getDocs,
    deleteDoc,
    doc,
} from "firebase/firestore";

export const getSavedMoviesByUser = async (userId) => {
    const savedRef = collection(db, "saved_movies");
    const q = query(savedRef, where("user_id", "==", userId));
    const querySnapshot = await getDocs(q);

    const savedMovies = [];

    for (const docSnap of querySnapshot.docs) {
        const data = docSnap.data();
        const movieId = data.movie_id;

        const movieDocRef = doc(db, "movies", movieId);
        const movieSnap = await getDoc(movieDocRef);

        if (movieSnap.exists()) {
            savedMovies.push({
                id: movieSnap.id,
                ...movieSnap.data(),
                saved_at: data.created_at,
            });
        }
    }

    return savedMovies;
};
// Thêm phim đã lưu
export const addSavedMovie = async ({ userId, movieId }) => {
    try {
        // Kiểm tra nếu đã lưu phim này rồi thì không lưu nữa
        const q = query(
            collection(db, "saved_movies"),
            where("user_id", "==", userId),
            where("movie_id", "==", movieId)
        );
        const existing = await getDocs(q);
        if (!existing.empty) {
            console.log("Phim đã được lưu.");
            return null;
        }

        const docRef = await addDoc(collection(db, "saved_movies"), {
            user_id: userId,
            movie_id: movieId,
            created_at: serverTimestamp(),
        });

        const savedSnap = await getDoc(docRef);
        return { id: docRef.id, ...savedSnap.data() };
    } catch (error) {
        console.error("Lỗi khi lưu phim:", error);
    }

};
export const deleteSavedMovie = async (savedMovieId) => {
    try {
        await deleteDoc(doc(db, "saved_movies", savedMovieId));
        console.log("Đã xóa phim khỏi danh sách lưu.");
    } catch (error) {
        console.error("Lỗi khi xóa phim đã lưu:", error);
    }
};
