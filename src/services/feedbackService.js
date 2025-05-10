import { collection, getDocs } from "firebase/firestore";
import { db } from "../app/firebase";

export const getAllFeedback = async () => {
  try {
    const feedbackRef = collection(db, "feedbacks");
    const feedbackSnapshot = await getDocs(feedbackRef);
    const feedbackList = feedbackSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return feedbackList;
  } catch (error) {
    console.error("Error fetching feedbacks: ", error);
    throw new Error("Failed to fetch feedbacks");
  }
};
