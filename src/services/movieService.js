import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "../app/firebase";

// Danh sách phim mới tháng nay và có view nhiều nhất
export const getTopNewMovies = async () => {
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1); // lùi lại 1 tháng

  const oneMonthAgoTimestamp = Timestamp.fromDate(oneMonthAgo);

  try {
    const q = query(
      collection(db, "movies"),
      where("createdTime", ">=", oneMonthAgoTimestamp),
      orderBy("view", "desc"),
      limit(10),
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching new movies:", error);
    throw error;
  }
};

// Top view nhiều nhất
export const getTopViewMovies = async () => {
  try {
    const q = query(
      collection(db, "movies"),
      orderBy("view", "desc"),
      limit(10),
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching top movies:", error);
    throw error;
  }
};

// Phim lẻ mới ra
export const getNewSingleMovies = async () => {
  try {
    const q = query(
      collection(db, "movies"),
      where("type", "==", "single"),
      orderBy("created.time", "desc"),
      limit(10),
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching new single movies:", error);
    throw error;
  }
};

// Phim bộ mới
export const getNewSeriesMovies = async () => {
  try {
    const q = query(
      collection(db, "movies"),
      where("type", "==", "series"),
      orderBy("created.time", "desc"),
      limit(10),
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching new series movies:", error);
    throw error;
  }
};

// Phim trending
export const getTrendingMovies = async () => {
  try {
    const q = query(
      collection(db, "movies"),
      orderBy("view", "desc"),
      orderBy("created.time", "desc"),
      limit(10),
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error;
  }
};

// Phim Hàn Quốc
export const getKoreanMovies = async () => {
  try {
    const q = query(
      collection(db, "movies"),
      where("countrySlugs", "array-contains", "han-quoc"),
      orderBy("created.time", "desc"),
      limit(10),
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching Korean movies:", error);
    throw error;
  }
};

// Phim Mỹ
export const getAmericanMovies = async () => {
  try {
    const q = query(
      collection(db, "movies"),
      where("countrySlugs", "array-contains", "au-my"),
      orderBy("created.time", "desc"),
      limit(10),
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching American movies:", error);
    throw error;
  }
};

// Lấy danh sách Saved Movies
export const getSavedMovies = async uid => {
  try {
    const snapshot = await getDocs(
      query(collection(db, "users", uid, "savedMovies")),
    );
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching saved movies:", error);
    throw error;
  }
};

// Lấy danh sách Favorite Movies
export const getFavoriteMovies = async uid => {
  try {
    const snapshot = await getDocs(
      query(collection(db, "users", uid, "favoriteMovies")),
    );
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching favorite movies:", error);
    throw error;
  }
};

// Lấy danh sách Watched Movies
export const getWatchedMovies = async uid => {
  try {
    const snapshot = await getDocs(
      query(collection(db, "users", uid, "watchedMovies")),
    );
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching watched movies:", error);
    throw error;
  }
};

// Thêm phim vào Saved
export const saveMovie = async (uid, movie) => {
  try {
    const movieRef = doc(db, "users", uid, "savedMovies", movie._id);
    await setDoc(movieRef, movie);
  } catch (error) {
    console.error("Error saving movie:", error);
    throw error;
  }
};

// Thêm phim vào Favorite
export const favoriteMovie = async (uid, movie) => {
  try {
    const movieRef = doc(db, "users", uid, "favoriteMovies", movie._id);
    await setDoc(movieRef, movie);
  } catch (error) {
    console.error("Error favoriting movie:", error);
    throw error;
  }
};

// Thêm phim vào Watched History
export const watchMovie = async (uid, movie) => {
  try {
    const movieRef = doc(db, "users", uid, "watchedMovies", movie._id);
    await setDoc(movieRef, movie);
  } catch (error) {
    console.error("Error watching movie:", error);
    throw error;
  }
};
