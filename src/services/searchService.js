// import { collection, getDocs, query, where, orderBy, startAfter } from "firebase/firestore";
// import { db } from "../app/firebase";



// /**
//  * Tìm kiếm phim từ Firestore với phân trang
//  * @param {string} searchQuery - Từ khóa tìm kiếm
//  * @param {number} page - Trang hiện tại
//  * @param {object} lastVisible - Document cuối cùng của trang trước (nếu có)
//  * @returns {Promise<{movies: Array, lastVisible: object}>}
//  */
// export const searchMovies = async (searchQuery, page, lastVisible = null) => {
//   try {
//     let q = query(
//       collection(db, "movies"),
//       where("name", ">=", searchQuery), // Tìm kiếm theo tên phim
//       where("name", "<=", searchQuery + "\uf8ff"), // Kết thúc tìm kiếm
//       orderBy("name"), // Sắp xếp theo tên phim

//     );

//     // Nếu có `lastVisible`, thêm `startAfter` để phân trang
//     if (lastVisible) {
//       q = query(
//         collection(db, "movies"),
//         where("name", ">=", searchQuery),
//         where("name", "<=", searchQuery + "\uf8ff"),
//         orderBy("name"),
//         startAfter(lastVisible),

//       );
//     }

//     const snapshot = await getDocs(q);

//     // Lấy document cuối cùng để hỗ trợ phân trang
//     const newLastVisible = snapshot.docs[snapshot.docs.length - 1];

//     // Trả về danh sách phim và document cuối cùng
//     return {
//       movies: snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
//       lastVisible: newLastVisible,
//     };
//   } catch (error) {
//     console.error("Error searching movies:", error);
//     throw error;
//   }
// };

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
      .slice(0, 100) // Giới hạn kết quả
      .sort((a, b) => new Date(b.created.time) - new Date(a.created.time)); // Sắp xếp theo thời gian tạo

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