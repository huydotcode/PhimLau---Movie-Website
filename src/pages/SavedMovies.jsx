import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../context/AuthProvider";
import {
  deleteSavedMovie,
  getSavedMoviesByUser,
} from "../services/movieSavedService";
import MovieCard from "../components/MovieCard";
import DropdownButton from "antd/es/dropdown/dropdown-button";
import Button from "../components/ui/Button";
import Icons from "../components/Icons";

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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {movies.map((movie) => (
            <div className="relative" key={movie._id}>
              <MovieCard movie={movie} />

              <div className="flex justify-end items-center mt-2">
                <Button
                  className="bg-primary text-white mt-2 p-2 rounded-xl absolute top-1 left-1 flex items-center gap-2"
                  onClick={() => handleDelete(movie._id)}
                >
                  <Icons.Close className="text-xl text-white" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedMovies;
