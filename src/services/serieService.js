import { collection, getDocs, query, where, orderBy, startAfter } from "firebase/firestore";
import { db } from "../app/firebase";

/**
 * Lấy danh sách phim bộ (series) với phân trang
 * @param {number} page - Trang hiện tại
 * @param {object} lastVisible - Document cuối cùng của trang trước (nếu có)
 * @returns {Promise<{movies: Array, lastVisible: object}>}
 */
export const getSerieMovies = async (page, lastVisible = null) => {
  try {
    let q = query(
      collection(db, "movies"),
      where("type", "==", "series"), // Chỉ lấy phim bộ dựa trên type
      orderBy("year", "desc"),
    );

    // Nếu có `lastVisible`, thêm `startAfter` để phân trang
    if (lastVisible) {
      q = query(
        collection(db, "movies"),
        where("type", "==", "series"),
        orderBy("year", "desc"),
        startAfter(lastVisible),
      );
    }

    const snapshot = await getDocs(q);

    // Lấy document cuối cùng để hỗ trợ phân trang
    const newLastVisible = snapshot.docs[snapshot.docs.length - 1];

    // Trả về danh sách phim và document cuối cùng
    return {
      movies: snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
      lastVisible: newLastVisible,
    };
  } catch (error) {
    console.error("Error fetching series movies:", error);
    throw error;
  }
};