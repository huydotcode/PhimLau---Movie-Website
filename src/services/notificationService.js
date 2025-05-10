import { collection, getDocs } from "firebase/firestore";
import { db } from "../app/firebase";

export const getAllNotifications = async () => {
  try {
    const notificationRef = collection(db, "notifications");

    const snapshot = await getDocs(notificationRef);
    const notifications = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return notifications;
  } catch (error) {
    console.error("Error fetching notifications: ", error);
    throw new Error("Failed to fetch notifications");
  }
};
