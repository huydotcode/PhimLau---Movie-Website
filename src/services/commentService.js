import {
  collection,
  addDoc,
  serverTimestamp,
  getDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../app/firebase";

export const addComment = async ({
  name,
  avatar,
  content,
  userId,
  movieId,
  rating,
}) => {
  try {
    const docRef = await addDoc(collection(db, "comments"), {
      name,
      avatar,
      content,
      user_id: userId,
      movieId,
      rating,
      like_count: 0, // mặc định 0
      created_at: serverTimestamp(), // để Firebase tự tạo thời gian hiện tại
    });

    const newCommentSnap = await getDoc(docRef);
    const newComment = newCommentSnap.data();

    return {
      id: docRef.id,
      ...newComment,
    };
  } catch (error) {
    console.error("Lỗi khi thêm comment:", error);
  }
};

export const getCommentsByMovieId = async (movieId) => {
  try {
    const commentsRef = collection(db, "comments");

    const q = query(commentsRef, where("movieId", "==", movieId));

    const querySnapshot = await getDocs(q);

    const comments = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
      avatar: doc.data().avatar,
      content: doc.data().content,
      user_id: doc.data().user_id,
      movieId: doc.data().movieId,
      rating: doc.data().rating,
      like_count: doc.data().like_count,
      created_at: doc.data().created_at,
    }));

    return comments;
  } catch (error) {
    console.error("Lỗi khi lấy comments:", error);
    return [];
  }
};
