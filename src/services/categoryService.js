import { collection, getDocs, limit, orderBy, query, startAfter, where } from "firebase/firestore";
import { db } from "../app/firebase";

const MAX_CATEGORIES = 6;
// const PAGE_SIZE = 20; // Số lượng phim hiển thị trên mỗi trang

export const getTopCategories = async () => {
  try {
    const q = query(
      collection(db, "categories"),
      orderBy("totalViews", "desc"),
      limit(MAX_CATEGORIES),
    );

    const querySnapshot = await getDocs(q);
    const categories = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return categories;
  } catch (error) {
    console.error("Error fetching top categories:", error);
    throw error;
  }
};

export const getAllCategories = async () => {
  try {
    const q = query(
      collection(db, "categories"),
      orderBy("totalViews", "desc"),
    );

    const querySnapshot = await getDocs(q);
    const categories = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return categories;
  } catch (error) {
    console.error("Error fetching all categories:", error);
    throw error;
  }
};

export const getMoviesByCategory = async (categorySlug, page, lastVisible = null) => {
  try {
    let q = query(
      collection(db, "movies"),
      where("categorySlugs", "array-contains", categorySlug), // Lọc theo slug thể loại
      orderBy("year", "desc"),
      // limit(PAGE_SIZE)
    );

    // Nếu có `lastVisible`, thêm `startAfter` để phân trang
    if (lastVisible) {
      q = query(
        collection(db, "movies"),
        where("categorySlugs", "array-contains", categorySlug),
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
    console.error("Error fetching movies by category:", error);
    throw error;
  }
};
