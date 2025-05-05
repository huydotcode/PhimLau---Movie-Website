import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../components/MovieCard"; // Component để hiển thị thông tin phim
import { useAuth } from "../context/AuthProvider";
import { fetchWatchedMovies } from "../features/movies/watchedMovieThunk";

const WatchedMoviesPage = () => {
  const { user } = useAuth(); // Lấy thông tin người dùng từ AuthContext
  const { watchedMovies, loading } = useSelector((state) => state.movies);

  const dispatch = useDispatch(); // Lấy hàm dispatch từ Redux store

  useEffect(() => {
    if (user?.uid) {
      dispatch(fetchWatchedMovies(user?.uid));
    }
  }, [dispatch, user?.uid]);

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
    <div className="p-4 h-full overflow-y-auto">
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
                  : `Ngày ${groupKey}`}{" "}
                -{" "}
                <span className="text-gray-400 font-normal text-sm">
                  {groupedMovies[groupKey].length} phim
                </span>
              </h2>
              <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {groupedMovies[groupKey]
                  .sort(
                    (a, b) => new Date(b.watched_at) - new Date(a.watched_at),
                  )
                  .map((movie) => (
                    <div key={movie.id} className="relative">
                      <MovieCard
                        movie={movie?.movie_data}
                        espicode={movie?.episode + 1}
                      />
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
