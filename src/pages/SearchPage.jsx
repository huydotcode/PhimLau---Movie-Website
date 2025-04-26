import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import FilterPanel from "../components/FilterPanel";
import MovieCard from "../components/MovieCard";
import { useScrollToTop } from "../hooks/useScrollToTop";
import { Pagination } from "antd";

const PAGE_SIZE = 20; // Số lượng kết quả tối đa để hiển thị

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const [searchResults, setSearchResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

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
  useScrollToTop();

  useEffect(() => {
    if (!query) return;

    (async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/json/movies_details.json"); // Lấy dữ liệu từ file JSON
        const data = await res.json();

        const filtered = data
          .filter(
            movie =>
              movie?.name.toLowerCase().includes(query.toLowerCase()) ||
              movie?.slug.includes(query.toLowerCase()),
          )
          .slice(0, 100)
          .sort((a, b) => new Date(b.created.time) - new Date(a.created.time));

        setSearchResults(filtered);
        setFilteredResults(filtered);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [query]);

  const handleFilter = () => {
    console.log("handleFilter");
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

      console.log({
        filterType: filters.type,
      });

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
    setCurrentPage(1);
  };

  const totalMovies = filteredResults.length;

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Kết quả tìm kiếm cho: "{query}"
      </h1>
      <Loading isLoading={isLoading} />
      {!isLoading && filteredResults.length === 0 && (
        <p className="text-gray-500">Không tìm thấy kết quả nào.</p>
      )}
      <div className="mb-6">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-md"
          onClick={() => setShowFilters(prev => !prev)}
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
        {!isLoading &&
          filteredResults
            .slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
            .map((movie, index) => (
              <MovieCard key={movie?._id + index} movie={movie} />
            ))}
      </div>

      {!isLoading && filteredResults.length > 0 && (
        <div className="mt-8 flex justify-center">
          <Pagination
            className="dark-pagination"
            current={currentPage}
            pageSize={20}
            total={totalMovies}
            onChange={handlePageChange}
            showSizeChanger={false}
            showTotal={total => `Tổng số ${total} phim`}
          />
        </div>
      )}
    </div>
  );
};

export default SearchPage;