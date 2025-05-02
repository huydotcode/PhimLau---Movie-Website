import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { getWatchedMoviesByUser } from "../services/watchedService";
import MovieCard from "../components/MovieCard"; // Component để hiển thị thông tin phim

const WatchedMoviesPage = () => {
  const { user } = useAuth(); // Lấy thông tin người dùng từ AuthContext
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lấy danh sách các phim đã xem từ Firestore
  useEffect(() => {
    const fetchWatchedMovies = async () => {
      if (user?.uid) {
        try {
          const data = await getWatchedMoviesByUser(user.uid);
          setWatchedMovies(data);
        } catch (error) {
          console.error("Lỗi khi lấy danh sách phim đã xem:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchWatchedMovies();
  }, [user]);

  if (loading) return <div>Đang tải...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">🎬 Phim Đã Xem</h1>

      {watchedMovies.length === 0 ? (
        <p className="text-gray-400">Bạn chưa xem phim nào.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {watchedMovies.map((movie) => (
            <div key={movie.id} className="relative">
              <MovieCard movie={movie} />

              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-400">
                  Xem lúc: {new Date(movie.watched_at).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchedMoviesPage;
