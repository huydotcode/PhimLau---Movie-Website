import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../app/firebase";

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
