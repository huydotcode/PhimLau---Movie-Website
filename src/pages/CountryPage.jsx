import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import MovieCard from "../components/MovieCard";
import FilterPanel from "../components/FilterPanel"; // Import FilterPanel
import { useScrollToTop } from "../hooks/useScrollToTop";
import { Pagination } from "antd"; // Import Pagination từ Ant Design
import "../styles/pagination.css"; // Đảm bảo bạn có style cho Pagination
import { useCountryMovies, useAllCountries } from "../hooks/useCountry"; // Import custom hook

const PAGE_SIZE = 20; // Số lượng phim hiển thị trên mỗi trang

const CountryPage = () => {
  const { slug } = useParams(); // Lấy slug quốc gia từ URL
  const [filteredResults, setFilteredResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [filters, setFilters] = useState({
    year: [], // Lọc theo năm
    category: [],
    lang: [], // Lọc theo ngôn ngữ
    type: [], // Lọc theo loại phim
    sort: "Mới nhất", // Sắp xếp mặc định
  });

  const [showFilters, setShowFilters] = useState(false); // State để hiển thị bộ lọc

  // Lấy danh sách quốc gia
  const { data: countries, isLoading: isLoadingCountries } = useAllCountries({
    enable: true,
  });

  // Tìm tên quốc gia dựa trên slug
  const countryName =
    countries?.find((country) => country.slug === slug)?.name ||
    "Quốc gia không xác định";

  useScrollToTop();

  const { data, isLoading } = useCountryMovies(slug, currentPage);

  useEffect(() => {
    if (data?.movies) {
      setFilteredResults(data.movies); // Gắn dữ liệu fetch về vào filteredResults
    }
  }, [data]);

  // logic lọc
  const handleFilter = () => {
    if (!data?.movies) return [];

    let results = data.movies.filter((movie) => {
      // Lọc theo năm
      const matchYear =
        filters.year.length === 0 ||
        filters.year.some((year) => {
          if (year === "Cũ hơn") {
            return movie.year < 2020; // Lọc phim có năm sản xuất cũ hơn 2020
          }
          return movie.year?.toString() === year;
        });

      // Lọc theo ngôn ngữ
      const matchLang =
        filters.lang.length === 0 || filters.lang.includes(movie.lang);

      // Lọc theo loại phim (Phim lẻ hoặc Phim bộ)
      const matchType =
        filters.type.length === 0 ||
        (filters.type.includes("Phim lẻ") && movie.type === "single") ||
        (filters.type.includes("Phim bộ") && movie.type === "series");

      // Lọc theo thể loại
      const matchCategory =
        filters.category.length === 0 ||
        filters.category.some((category) =>
          movie.category?.some((cat) => cat.name === category),
        );

      return matchYear && matchLang && matchType && matchCategory;
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
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (isLoadingCountries) {
    return <Loading isLoading />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">
        Danh sách phim theo quốc gia: {countryName}
      </h1>
      {isLoading && <Loading isLoading />}
      {!isLoading && filteredResults.length === 0 && (
        <p className="text-gray-500">
          Không có phim nào thuộc quốc gia này: {countryName}.
        </p>
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
          hasCountryFilter={false} // Không hiển thị bộ lọc quốc gia
        />
      )}

      {/* Danh sách phim */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {!isLoading &&
          filteredResults
            .slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
            .map((movie) => <MovieCard key={movie.slug} movie={movie} />)}
      </div>

      {/* Pagination */}
      {!isLoading && filteredResults.length > 0 && (
        <div className="mt-8 flex justify-center">
          <Pagination
            className="dark-pagination"
            current={currentPage}
            pageSize={PAGE_SIZE}
            total={filteredResults.length}
            onChange={handlePageChange}
            showSizeChanger={false}
            showTotal={(total) => `Tổng số ${total} phim`}
          />
        </div>
      )}
    </div>
  );
};

export default CountryPage;
