// import React, { useEffect } from "react";
// import { useSearchParams } from "react-router";

// const SearchPage = () => {
//   const [searchParams, _] = useSearchParams();
//   const query = searchParams.get("q");

//   return <div>SearchPage</div>;
// };

// export default SearchPage;

import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import FilterPanel from "../components/FilterPanel";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [searchResults, setSearchResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
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

  useEffect(() => {
    if (!query) return;

    (async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/json/movies_lastest.json"); // Lấy dữ liệu từ file JSON
        const data = await res.json();
        const filtered = data.filter(movie =>
          movie.name.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filtered); // Lọc kết quả theo từ khóa
        setFilteredResults(filtered); // Hiển thị ban đầu


        // Sắp xếp mặc định theo "Mới nhất"
        const sortedData = data.sort((a, b) => new Date(b.created.time) - new Date(a.created.time));

        setSearchResults(sortedData); // Lưu dữ liệu đã sắp xếp
        setFilteredResults(sortedData); // Hiển thị dữ liệu đã sắp xếp


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
          movie.country?.some(c => c.name === country)
        );
      const matchCategory =
        filters.category.length === 0 ||
        filters.category.some(category =>
          movie.category?.some(cat => cat.name === category)
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Kết quả tìm kiếm cho: "{query}"</h1>
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
          <div
            key={movie.slug} // Sử dụng slug làm key
            className="bg-black rounded-md shadow-md overflow-hidden cursor-pointer hover:scale-105 transition-transform"
            onClick={() => navigate(`/phim/${movie.slug}`)}
          >
            <img
              src={movie.thumb_url}
              alt={movie.name}
              className="w-full h-[250px] object-cover"
            />
            <div className="p-3">
              <h3 className="text-white font-semibold text-sm truncate">{movie.name}</h3>
              <div className="flex gap-2 mt-2">
                <span className="bg-gray-700 text-white text-xs px-2 py-1 rounded-md">
                  {movie.lang || "Không rõ"}
                </span>
              </div>
              <p className="text-gray-400 text-xs mt-2">Năm: {movie.year || "Không rõ"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;