import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import MovieCard from "../components/MovieCard";
import FilterPanel from "../components/FilterPanel";

const SingleMoviePage = () => {
  const [movies, setMovies] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    country: [], // Lưu nhiều quốc gia
    category: [],
    year: [],
    lang: [],
    type: ["phim lẻ"], // Mặc định loại phim là "phim lẻ"
    sort: "Mới nhất", // Mặc định sắp xếp là "Mới nhất"
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/json/movies_lastest.json"); // Đường dẫn đến file JSON
        const data = await res.json();

        // Lọc các bộ phim lẻ
        const singleMovies = data.filter(
          movie => movie.episode_current === "Full" && movie.episode_total === "1"
        );

        // Sắp xếp mặc định theo "Mới nhất"
        const sortedMovies = singleMovies.sort(
          (a, b) => new Date(b.created.time) - new Date(a.created.time)
        );

        setMovies(sortedMovies); // Lưu dữ liệu đã sắp xếp
        setFilteredResults(sortedMovies); // Hiển thị dữ liệu đã sắp xếp
      } catch (err) {
        console.error("Error fetching single movies:", err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const handleFilter = () => {
    let results = movies.filter(movie => {
      const matchCountry =
        filters.country.length === 0 ||
        filters.country.some(country =>
          movie.country?.some(c => c.name === country)
        );
      const matchCategory =
        filters.category.length === 0 ||
        filters.category.some(category =>
          movie.category?.some(cat => cat.name === category)
        );
      const matchYear =
        filters.year.length === 0 ||
        filters.year.some(year => {
          if (year === "Cũ hơn") {
            return movie.year < 2020; // Lọc phim có năm sản xuất cũ hơn 2020
          }
          return movie.year?.toString() === year;
        });
      const matchLang =
        filters.lang.length === 0 || filters.lang.includes(movie.lang);
      const matchType =
        filters.type.length === 0 ||
        (filters.type.includes("phim lẻ") &&
          movie.episode_current === "Full" &&
          movie.episode_total === "1") ||
        (filters.type.includes("phim bộ") &&
          !(movie.episode_current === "Full" && movie.episode_total === "1"));

      return matchCountry && matchCategory && matchYear && matchLang && matchType;
    });

    // Sắp xếp kết quả
    if (filters.sort === "IMDB") {
      results = results.sort((a, b) => b.tmdb.vote_average - a.tmdb.vote_average);
    } else if (filters.sort === "Lượt xem") {
      results = results.sort((a, b) => b.view - a.view);
    } else if (filters.sort === "Mới nhất") {
      results = results.sort((a, b) => new Date(b.created.time) - new Date(a.created.time));
    }

    setFilteredResults(results);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Danh sách phim lẻ</h1>
      {isLoading && <Loading isLoading />}
      {!isLoading && filteredResults.length === 0 && (
        <p className="text-gray-500">Không có phim lẻ nào.</p>
      )}

      {/* Nút hiển thị bộ lọc */}
      <div className="mb-6">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-md"
          onClick={() => setShowFilters(!showFilters)}
        >
          <span>🔍</span> Bộ lọc
        </button>
      </div>

      {/* Bộ lọc */}
      {showFilters && (
        <FilterPanel
          filters={filters}
          setFilters={setFilters}
          handleFilter={handleFilter}
          setShowFilters={setShowFilters}
        />
      )}

      {/* Danh sách phim */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {!isLoading &&
          filteredResults.map(movie => (
            <MovieCard key={movie.slug} movie={movie} />
          ))}
      </div>
    </div>
  );
};

export default SingleMoviePage;