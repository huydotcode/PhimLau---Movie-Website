import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../app/firebase";

const MAX_CATEGORIES = 6;

export const getTopCategories = async () => {
  try {
    const q = query(
      collection(db, "categories"),
      orderBy("totalViews", "desc"),
      limit(MAX_CATEGORIES),
    );

    const querySnapshot = await getDocs(q);
    const categories = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return categories;
  } catch (error) {
    console.error("Error fetching top categories:", error);
    throw error;
  }
};
