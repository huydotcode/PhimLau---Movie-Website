import { collection, getDocs, query, orderBy, startAfter } from "firebase/firestore";
import { db } from "../app/firebase";

/**
 * Tìm kiếm phim từ Firestore với phân trang
 * @param {string} searchQuery - Từ khóa tìm kiếm
 * @param {number} page - Trang hiện tại
 * @param {object} lastVisible - Document cuối cùng của trang trước (nếu có)
 * @returns {Promise<{movies: Array, lastVisible: object}>}
 */
export const searchMovies = async (searchQuery, page, lastVisible = null) => {
  try {
    // Chuyển từ khóa tìm kiếm về chữ thường để so sánh
    const lowerCaseQuery = searchQuery.toLowerCase();

    // Tạo query Firestore
    let q = query(
      collection(db, "movies"),
      orderBy("name"), // Sắp xếp theo tên phim
    //   limit(100) // Giới hạn số lượng kết quả
    );

    // Nếu có `lastVisible`, thêm `startAfter` để phân trang
    if (lastVisible) {
      q = query(
        collection(db, "movies"),
        orderBy("name"),
        startAfter(lastVisible),
        // limit(100)
      );
    }

    const snapshot = await getDocs(q);

    // Lọc kết quả dựa trên từ khóa tìm kiếm
    const filteredMovies = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter(
        (movie) =>
          movie?.name?.toLowerCase().includes(lowerCaseQuery) || // Tìm trong tên phim
          movie?.slug?.toLowerCase().includes(lowerCaseQuery) // Tìm trong slug
      )
      // .slice(0, 100) // Giới hạn kết quả
      .sort((a, b) => b.year - a.year); // Sắp xếp theo năm phát hành giảm dần

    // Lấy document cuối cùng để hỗ trợ phân trang
    const newLastVisible = snapshot.docs[snapshot.docs.length - 1];

    // Trả về danh sách phim và document cuối cùng
    return {
      movies: filteredMovies,
      lastVisible: newLastVisible,
    };
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
  }
};