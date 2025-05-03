import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../app/firebase";

// Firebase
export const getAllUsers = async () => {
  try {
    const q = query(collection(db, "users"), orderBy("createdAt", "desc"));

    const querySnapshot = await getDocs(q);
    const users = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return users;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
};

// Cập nhật user
export const updateUser = async (userId, userData) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, userData);
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

// Xóa user
export const deleteUser = async (userId) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { isDeleted: true });
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

// Phân role
export const assignRole = async (userId, role) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { role: role });
  } catch (error) {
    console.error("Error assigning role:", error);
    throw error;
  }
};
