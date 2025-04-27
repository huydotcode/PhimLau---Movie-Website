import { collection, getDocs } from "firebase/firestore";
import { db } from "../../app/firebase"; // Đảm bảo đường dẫn đúng đến firebase.js

export const fetchMovies = async () => {
  const moviesCol = collection(db, "movies"); // Giả sử bạn lưu các phim trong collection "movies"
  const movieSnapshot = await getDocs(moviesCol);
  const movieList = movieSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
  return movieList;
};
