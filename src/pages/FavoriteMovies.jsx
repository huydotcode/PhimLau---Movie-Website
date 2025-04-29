import React, { useState } from "react";

const mockFavorites = [
  {
    _id: "620ce854cbcacd98455b1e97",
    name: "Tôi Là Karl",
    origin_name: "Je Suis Karl",
    thumb_url: "https://img.ophim.live/uploads/movies/toi-la-karl-thumb.jpg",
    slug: "toi-la-karl",
    year: 2021,
    quality: "HD",
    lang: "Vietsub",
  },
  {
    _id: "620ce854cbcacd98455b1e98",
    name: "Phim Giả Lập",
    origin_name: "Simulated World",
    thumb_url: "https://img.ophim.live/uploads/movies/phim-gia-lap-thumb.jpg",
    slug: "phim-gia-lap",
    year: 2022,
    quality: "Full HD",
    lang: "Thuyết Minh",
  },
];

const FavoriteMovies = () => {
  const [favorites, setFavorites] = useState(mockFavorites);

  const handleWatch = (slug) => {
    window.open(`/phim/${slug}`, "_blank");
  };

  const handleUnfavorite = (id) => {
    const updated = favorites.filter((movie) => movie._id !== id);
    setFavorites(updated);
    console.log("Đã bỏ yêu thích:", id);
  };

  const handleRemove = (id) => {
    const updated = favorites.filter((movie) => movie._id !== id);
    setFavorites(updated);
    console.log("Đã xoá phim:", id);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">🎬 Phim Yêu Thích</h1>

      {favorites.length === 0 ? (
        <p className="text-gray-400">Bạn chưa có phim yêu thích nào.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {favorites.map((movie) => (
            <div
              key={movie._id}
              className="group relative rounded overflow-hidden shadow-md hover:shadow-lg transition-all"
            >
              <img
                src={movie.thumb_url}
                alt={movie.name}
                className="w-full h-auto object-cover rounded"
              />
              <div className="p-2">
                <h2 className="text-base font-semibold line-clamp-2">
                  {movie.name}
                </h2>
                <p className="text-sm text-gray-400">
                  {movie.quality} • {movie.lang} • {movie.year}
                </p>
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition flex flex-col justify-center items-center space-y-2">
                <button
                  onClick={() => handleWatch(movie.slug)}
                  className="px-4 py-1 bg-primary text-white rounded hover:bg-white hover:text-primary transition"
                >
                  Xem
                </button>
                <button
                  onClick={() => handleUnfavorite(movie._id)}
                  className="px-3 py-1 text-sm border border-white text-white rounded hover:bg-white hover:text-primary transition"
                >
                  Bỏ ❤️
                </button>
                <button
                  onClick={() => handleRemove(movie._id)}
                  className="text-sm text-red-300 hover:text-red-500 transition"
                >
                  Xoá ❌
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteMovies;
