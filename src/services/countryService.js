import { collection, getDocs, orderBy, query, startAfter, where } from "firebase/firestore";
import { db } from "../app/firebase";

const PAGE_SIZE = 20; // Số lượng phim hiển thị trên mỗi trang

export const getAllCountries = async () => {
  try {
    const q = query(collection(db, "countries"), orderBy("name", "asc"));

    const querySnapshot = await getDocs(q);
    const countries = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return countries;
  } catch (error) {
    console.error("Error fetching all countries:", error);
    throw error;
  }
};

/**
 * Lấy danh sách phim theo quốc gia với phân trang
 * @param {string} countrySlug - Slug của quốc gia
 * @param {number} page - Trang hiện tại
 * @param {object} lastVisible - Document cuối cùng của trang trước (nếu có)
 * @returns {Promise<{movies: Array, lastVisible: object}>}
 */
export const getMoviesByCountry = async (countrySlug, page, lastVisible = null) => {
  try {
    let q = query(
      collection(db, "movies"),
      where("countrySlugs", "array-contains", countrySlug),
      orderBy("year", "desc"),
      // limit(PAGE_SIZE)
    );

    // Nếu có `lastVisible`, thêm `startAfter` để phân trang
    if (lastVisible) {
      q = query(
        collection(db, "movies"),
        where("countrySlugs", "array-contains", countrySlug),
        orderBy("year", "desc"),
        startAfter(lastVisible),
        // limit(PAGE_SIZE)
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
    console.error("Error fetching movies by country:", error);
    throw error;
  }
};