import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../context/AuthProvider";
import {
  deleteSavedMovie,
  getSavedMoviesByUser,
} from "../services/movieSavedService";
import MovieCard from "../components/MovieCard";
import Button from "../components/ui/Button";
import Icons from "../components/Icons";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../app/firebase";

const SavedMovies = () => {
  const { user } = useAuth();
  const [movies, setMovies] = useState([]);
  const [refresh, setRefresh] = useState(false); // state để trigger useEffect

  const fetchData = async () => {
    if (!user?.uid) return;
    const saved = await getSavedMoviesByUser(user.uid);
    setMovies(saved);
  };

  useEffect(() => {
    fetchData();
  }, [user, refresh]);

  const handleDelete = async (movieId) => {
    try {
      const q = query(
        collection(db, "saved_movies"),
        where("user_id", "==", user.uid),
        where("movie_id", "==", movieId),
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        toast.error("Không tìm thấy phim đã lưu.");
        return;
      }

      for (const docSnap of querySnapshot.docs) {
        await deleteSavedMovie(docSnap.id); // truyền ID, không phải doc(...)
      }

      toast.success("Đã xoá phim khỏi danh sách!");
      setRefresh(true); // Cập nhật state để trigger lại useEffect
      setMovies((prev) => prev.filter((m) => m.movie_id !== movieId));
    } catch (error) {
      console.error("Lỗi khi xoá phim đã lưu:", error);
      toast.error("Lỗi khi xoá phim!");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Phim đã lưu: <span className="text-secondary text-md">{movies.length}</span></h2>

      {movies.length === 0 ? (
        <p className="text-gray-400">Bạn chưa lưu phim nào.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4">
          {movies.map((movie) => (
            <div className="relative" key={movie._id}>
              <MovieCard movie={movie} />

              <Button
                className="absolute top-2 left-2 z-10 text-white p-2 rounded-full bg-[rgba(0,0,0,0.3)] hover:bg-primary"
                onClick={() => handleDelete(movie._id)}
              >
                <Icons.Close className="text-xl text-white" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedMovies;
