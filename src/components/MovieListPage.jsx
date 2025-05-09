import { Pagination } from "antd";
import { useEffect, useState } from "react";
import { useScrollToTop } from "../hooks/useScrollToTop";
import { useSearchMovies } from "../hooks/useSearchMovie";
import FilterPanel_2 from "./FilterPanel_2";
import MovieList from "./MovieList";

const MovieListPage = ({
  title,
  defaultFilters,
  hasTypeFilter = true,
  hasCategoryFilter = true,
  hasCountryFilter = true,
  pageSize = 20,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState(defaultFilters);
  const [showFilters, setShowFilters] = useState(false);
  const [currentLastVisible, setCurrentLastVisible] = useState(null);
  useScrollToTop();

  const {
    data: { movies, lastVisible, totalPages },
    isLoading,
    isFetching,
  } = useSearchMovies({
    enable: true,
    filters,
    page: currentPage,
    lastVisible: currentLastVisible,
    pageSize,
  });

  useEffect(() => {
    setCurrentPage(1); // Reset trang khi bộ lọc thay đổi
    setCurrentLastVisible(null); // Reset lastVisible khi bộ lọc thay đổi
  }, [filters]);

  useEffect(() => {
    setCurrentLastVisible(lastVisible); // Cập nhật lastVisible khi dữ liệu thay đổi
  }, [lastVisible]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    setShowFilters(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>

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
        <FilterPanel_2
          filters={filters}
          handleApplyFilters={handleApplyFilters}
          setShowFilters={setShowFilters}
          hasTypeFilter={hasTypeFilter}
          hasCategoryFilter={hasCategoryFilter}
          hasCountryFilter={hasCountryFilter}
        />
      )}

      {/* Danh sách phim */}
      <MovieList
        movies={movies}
        isLoading={isLoading}
        isFetching={isFetching}
      />

      {/* Phân trang */}
      {!isLoading && movies.length > 0 && (
        <div className="mt-8 flex justify-center">
          <Pagination
            className="dark-pagination"
            current={currentPage}
            pageSize={pageSize}
            total={totalPages * pageSize}
            onChange={handlePageChange}
            showSizeChanger={false}
            showTotal={(total) => `Tổng ${total} phim`}
          />
        </div>
      )}
    </div>
  );
};

export default MovieListPage;
