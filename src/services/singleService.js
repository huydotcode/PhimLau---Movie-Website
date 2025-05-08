import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  startAfter,
  limit,
} from "firebase/firestore";
import { db } from "../app/firebase";

/**
 * Lấy danh sách phim lẻ (single) với phân trang
 * @param {number} page - Trang hiện tại
 * @param {object} lastVisible - Document cuối cùng của trang trước (nếu có)
 * @returns {Promise<{movies: Array, lastVisible: object}>}
 */
export const getSingleMovies = async (page, lastVisible = null) => {
  try {
    let q = query(
      collection(db, "movies"),
      where("type", "==", "single"), // Chỉ lấy phim lẻ dựa trên type
      orderBy("year", "desc"),
      limit(10), // Giới hạn số lượng phim trên mỗi trang
    );

    // Nếu có `lastVisible`, thêm `startAfter` để phân trang
    if (lastVisible) {
      q = query(
        collection(db, "movies"),
        where("type", "==", "single"),
        orderBy("year", "desc"),
        startAfter(lastVisible),
        limit(10),
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
    console.error("Error fetching single movies:", error);
    throw error;
  }
};
