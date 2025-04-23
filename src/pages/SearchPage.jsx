import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import FilterPanel from "../components/FilterPanel";
import MovieCard from "../components/MovieCard";
import { useScrollToTop } from "../hooks/useScrollToTop";

const MAX_RESULTS = 20; // Số lượng kết quả tối đa để hiển thị

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [searchResults, setSearchResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [page, setPage] = useState(1); // Trang hiện tại
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    country: [], // Lưu nhiều quốc gia
    category: [],
    year: [],
    lang: [],
    type: [],
    sort: "Mới nhất", // Sắp xếp
  });
  const [showFilters, setShowFilters] = useState(false); // Hiển thị bộ lọc
  const navigate = useNavigate();
  useScrollToTop();

  useEffect(() => {
    if (!query) return;

    (async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/json/movies_details.json"); // Lấy dữ liệu từ file JSON
        const data = await res.json();
        const filtered = data
          .filter(movie =>
            movie.name.toLowerCase().includes(query.toLowerCase()),
          )
          .slice(0, MAX_RESULTS) // Giới hạn số lượng kết quả
          .sort((a, b) => new Date(b.created.time) - new Date(a.created.time));

        setSearchResults(filtered);
        setFilteredResults(filtered);
      } catch (err) {
        console.error("Error fetching search results:", err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [query]);

  const handleFilter = () => {
    let results = searchResults.filter(movie => {
      const matchCountry =
        filters.country.length === 0 ||
        filters.country.some(country =>
          movie.country?.some(c => c.name === country),
        );
      const matchCategory =
        filters.category.length === 0 ||
        filters.category.some(category =>
          movie.category?.some(cat => cat.name === category),
        );
      // const matchYear =
      //   filters.year.length === 0 || filters.year.includes(movie.year?.toString());
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
        (filters.type.includes("Phim lẻ") && movie.type === "single") ||
        (filters.type.includes("Phim bộ") && movie.type === "series");

      return (
        matchCountry && matchCategory && matchYear && matchLang && matchType
      );
    });

    // Sắp xếp kết quả
    if (filters.sort === "IMDB") {
      results = results.sort(
        (a, b) => b.tmdb.vote_average - a.tmdb.vote_average,
      );
    } else if (filters.sort === "Lượt xem") {
      results = results.sort((a, b) => b.view - a.view);
    } else if (filters.sort === "Mới nhất") {
      results = results.sort(
        (a, b) => new Date(b.created.time) - new Date(a.created.time),
      );
    }

    setFilteredResults(results);
  };

  // const handleFilterChange = (key, value) => {
  //   if (key === "sort") {
  //     // Chỉ cho phép chọn một tiêu chí sắp xếp
  //     setFilters(prev => ({
  //       ...prev,
  //       [key]: value,
  //     }));
  //   } else {
  //     // Cho phép chọn nhiều tiêu chí lọc
  //     setFilters(prev => ({
  //       ...prev,
  //       [key]: prev[key].includes(value)
  //         ? prev[key].filter(item => item !== value) // Bỏ nếu đã chọn
  //         : [...prev[key], value], // Thêm nếu chưa chọn
  //     }));
  //   }
  // };

  // const handleClearFilter = key => {
  //   setFilters(prev => ({
  //     ...prev,
  //     [key]: key === "sort" ? "Mới nhất" : [], // Đặt lại mặc định cho sắp xếp hoặc xóa tất cả tiêu chí
  //   }));
  // };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Kết quả tìm kiếm cho: "{query}"
      </h1>
      {isLoading && <Loading isLoading />}
      {!isLoading && filteredResults.length === 0 && (
        <p className="text-gray-500">Không tìm thấy kết quả nào.</p>
      )}

      <div className="mb-6">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-md"
          onClick={() => setShowFilters(!showFilters)}
        >
          <span>🔍</span> Bộ lọc
        </button>
      </div>

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
        {filteredResults.map(movie => (
          <MovieCard key={movie.slug} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
