import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "../app/firebase";

// Thêm phim đã xem
export const addWatchedMovie = async ({ userId, movie }) => {
  const watchedRef = collection(db, "watched_movies");

  const q = query(
    watchedRef,
    where("user_id", "==", userId),
    where("movie_id", "==", movie._id),
  );
  const exists = await getDocs(q);
  if (!exists.empty) {
    console.log("Phim đã xem trước đó.");
    return;
  }

  await addDoc(watchedRef, {
    user_id: userId,
    movie_id: movie._id,
    watched_at: Timestamp.now(),
    movie_data: movie,
  });
};

// Lấy danh sách phim đã xem
export const getWatchedMoviesByUser = async (userId) => {
  const watchedRef = collection(db, "watched_movies");
  const q = query(watchedRef, where("user_id", "==", userId));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data().movie_data,
    watched_at: doc.data().watched_at?.toDate(), // Chuyển đổi Timestamp thành Date
  }));
};

// Xoá khỏi danh sách đã xem
export const removeWatchedMovie = async (docId) => {
  await deleteDoc(doc(db, "watched_movies", docId));
};
