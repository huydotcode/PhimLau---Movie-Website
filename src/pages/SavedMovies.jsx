import React from "react";
import MovieCard from "../components/MovieCard";

const mockMovies = [
  {
    _id: "620ce854cbcacd98455b1e97",
    name: "Tôi Là Karl",
    origin_name: "Je Suis Karl",
    thumb_url: "https://img.ophim.live/uploads/movies/toi-la-karl-thumb.jpg",
    poster_url: "https://img.ophim.live/uploads/movies/toi-la-karl-poster.jpg",
    time: "126 phút",
    year: 2021,
    quality: "HD",
    lang: "Vietsub",
    actor: ["Luna Wedler", "Jannis Niewöhner", "Milan Peschel"],
    category: [
      { name: "Tình Cảm", slug: "tinh-cam" },
      { name: "Phiêu Lưu", slug: "phieu-luu" },
    ],
    slug: "toi-la-karl",
  },
  // ... thêm phim khác
];

const SavedMovies = () => {
  const handleRemove = (id) => {
    console.log("Xoá phim có id:", id);
    // Thêm logic xoá tại đây
  };

  const handleAddFavorite = (id) => {
    console.log("Thêm phim vào yêu thích:", id);
    // Thêm logic thêm yêu thích tại đây
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">🎞️ Phim đã lưu</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {mockMovies.map((movie) => (
          <div key={movie._id} className="group relative">
            <MovieCard movie={movie} />

            {/* Nút Action */}
            <div className="flex justify-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                className="text-sm bg-primary text-white px-3 py-1 rounded hover:bg-white hover:text-primary transition"
                onClick={() => window.open(`/phim/${movie.slug}`, "_blank")}
              >
                Xem
              </button>
              <button
                className="text-sm text-white border border-white px-3 py-1 rounded hover:bg-white hover:text-primary transition"
                onClick={() => handleAddFavorite(movie._id)}
              >
                ❤️
              </button>
              <button
                className="text-sm text-gray-300 hover:text-red-400 transition"
                onClick={() => handleRemove(movie._id)}
              >
                ❌
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedMovies;
