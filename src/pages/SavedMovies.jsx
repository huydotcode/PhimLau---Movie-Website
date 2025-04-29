import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../context/AuthProvider";
import {
  deleteSavedMovie,
  getSavedMoviesByUser,
} from "../services/movieSavedService";

const SavedMovies = () => {
  const { user } = useAuth();
  const [movies, setMovies] = useState([]);

  const fetchData = async () => {
    if (!user?.uid) return;
    const saved = await getSavedMoviesByUser(user.uid);
    setMovies(saved);
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const handleDelete = async (movieId) => {
    try {
      const savedMovie = movies.find((m) => m.id === movieId);
      if (!savedMovie) return;

      await deleteSavedMovie(movieId);
      toast.success("Đã xoá khỏi danh sách!");
      setMovies((prev) => prev.filter((m) => m.id !== movieId));
    } catch (error) {
      toast.error("Lỗi khi xoá phim!");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">🎬 Phim đã lưu</h2>

      {movies.length === 0 ? (
        <p className="text-gray-400">Bạn chưa lưu phim nào.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-foreground rounded p-2 relative group"
            >
              <img
                src={movie.thumb_url}
                alt={movie.origin_name}
                className="rounded mb-2 w-full h-48 object-cover"
              />
              <h3 className="text-lg font-semibold">{movie.origin_name}</h3>
              <p className="text-sm text-gray-400">
                {movie.category?.join(", ")}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Năm: {movie.year} - Chất lượng: {movie.quality}
              </p>
              <button
                onClick={() => handleDelete(movie.id)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition"
              >
                Xoá
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedMovies;
