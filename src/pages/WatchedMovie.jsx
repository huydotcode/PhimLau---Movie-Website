import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { getWatchedMoviesByUser } from "../services/watchedService";
import MovieCard from "../components/MovieCard"; // Component để hiển thị thông tin phim
import { convertTime } from "../utils/convertTime";

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

  useEffect(() => {
    console.log("Phim đã xem:", watchedMovies);
  }, [watchedMovies]);

  const groupMoviesByDate = (movies) => {
    return movies.reduce((groups, movie) => {
      const date = new Date(movie.watched_at);
      const key = date.toLocaleDateString("vi-VN"); // Định dạng ngày tháng theo định dạng Việt Nam

      if (!groups[key]) groups[key] = [];
      groups[key].push(movie);
      return groups;
    }, {});
  };

  const groupedMovies = groupMoviesByDate(watchedMovies);
  const sortedGroupKeys = Object.keys(groupedMovies).sort((a, b) => {
    // Sắp xếp giảm dần theo thời gian
    return new Date(b) - new Date(a);
  });

  const isToday = (dateStr) => {
    const today = new Date();
    const date = new Date(dateStr);

    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  if (loading) return <div>Đang tải...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Phim Đã Xem</h1>

      {watchedMovies.length === 0 ? (
        <p className="text-gray-400">Bạn chưa xem phim nào.</p>
      ) : (
        <div className="gap-4">
          {sortedGroupKeys.map((groupKey) => (
            <div key={groupKey} className="mb-8">
              <h2 className="text-xl font-semibold mb-3">
                {isToday(groupedMovies[groupKey][0].watched_at)
                  ? "Hôm nay"
                  : `Ngày ${groupKey}`}
              </h2>
              <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {groupedMovies[groupKey].map((movie) => (
                  <div key={movie.id} className="relative">
                    <MovieCard movie={movie} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchedMoviesPage;
