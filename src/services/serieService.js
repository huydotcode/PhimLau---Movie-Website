import { collection, getDocs, query, where, orderBy, limit, startAfter } from "firebase/firestore";
import { db } from "../app/firebase";

const PAGE_SIZE = 20; // Số lượng phim hiển thị trên mỗi trang

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
      where("episode_total", ">", 1), // Phim bộ có nhiều hơn 1 tập
      orderBy("created.time", "desc"),
      limit(PAGE_SIZE)
    );

    // Nếu có `lastVisible`, thêm `startAfter` để phân trang
    if (lastVisible) {
      q = query(
        collection(db, "movies"),
        where("episode_total", ">", 1),
        orderBy("created.time", "desc"),
        startAfter(lastVisible),
        limit(PAGE_SIZE)
      );
    }

    const snapshot = await getDocs(q);

    // Lấy document cuối cùng để hỗ trợ phân trang
    const newLastVisible = snapshot.docs[snapshot.docs.length - 1];

    // Trả về danh sách phim và document cuối cùng
    return {
      movies: snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter(
          (movie) =>
            movie.episode_total > 1 || // Phim bộ có nhiều hơn 1 tập
            (movie.episode_current !== "Full" && movie.episode_current !== "Hoàn tất") // Không phải phim lẻ
        ),
      lastVisible: newLastVisible,
    };
  } catch (error) {
    console.error("Error fetching series movies:", error);
    throw error;
  }
};