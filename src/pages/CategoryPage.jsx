import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import MovieCard from "../components/MovieCard";
import FilterPanel from "../components/FilterPanel"; // Import FilterPanel
import { useScrollToTop } from "../hooks/useScrollToTop";
import { Pagination } from "antd"; // Import Pagination từ Ant Design
import "../styles/pagination.css"; // Đảm bảo bạn có style cho Pagination
import { useCategoryMovies, useAllCategories } from "../hooks/useCategory";

const PAGE_SIZE = 20; // Số lượng phim hiển thị trên mỗi trang

const CategoryPage = () => {
  const { slug } = useParams(); // Lấy slug thể loại từ URL
  // const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    country: [], // Lưu nhiều quốc gia
    // category: [],
    year: [],
    lang: [],
    type: [],
    sort: "Mới nhất", // Sắp xếp
  });
  const [showFilters, setShowFilters] = useState(false); // State để hiển thị bộ lọc
  const [filteredResults, setFilteredResults] = useState([]);


  // Lấy danh sách loại từ Firestore
  const { data: categories, isLoading: isLoadingCategories } = useAllCategories({
    enable: true,
  });

  // Tìm tên loại dựa trên slug
  const categoryName =
    categories?.find((category) => category.slug === slug)?.name ||
    "Thể loại không xác định";

  // Lấy danh sách phim theo thể loại
  const { data, isLoading } = useCategoryMovies(slug, currentPage);

  useScrollToTop();

  // Gắn dữ liệu fetch về vào filteredResults
  React.useEffect(() => {
    if (data?.movies) {
      setFilteredResults(data.movies);
    }
  }, [data]);

  // useScrollToTop();


  const handleFilter = () => {
    if (!data?.movies) return [];

    let results = data.movies.filter((movie) => {
      // Lọc theo quốc gia
      const matchCountry =
        filters.country.length === 0 ||
        filters.country.some((country) =>
          movie.country?.some((c) => c.name === country)
        );

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

      return matchCountry && matchYear && matchLang && matchType;
    });

    // Sắp xếp kết quả
    if (filters.sort === "IMDB") {
      results = results.sort(
        (a, b) => b.tmdb.vote_average - a.tmdb.vote_average
      );
    } else if (filters.sort === "Lượt xem") {
      results = results.sort((a, b) => b.view - a.view);
    } else if (filters.sort === "Mới nhất") {
      results = results.sort(
        (a, b) => new Date(b.created.time) - new Date(a.created.time)
      );
    }

    setFilteredResults(results);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (isLoadingCategories) {
    return <Loading isLoading />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">
        Danh sách phim theo thể loại: {categoryName}
      </h1>
      {isLoading && <Loading isLoading />}
      {!isLoading && filteredResults.length === 0 && (
        <p className="text-gray-500">
          Không có phim nào thuộc thể loại này: {categoryName}.
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
          hasCategoryFilter={false} // Không hiển thị bộ lọc thể loại
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

export default CategoryPage;

