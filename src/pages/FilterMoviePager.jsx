import React from "react";

import MovieListPage from "../components/MovieListPage";

const FilterMoviePager = () => {
  const defaultFilters = {
    type: [],
    country: [],
    category: [],
    year: [],
    lang: [],
    sort: "Mới nhất",
  };

  return (
    <MovieListPage
      title="Danh sách phim theo bộ lọc"
      defaultFilters={defaultFilters}
      hasTypeFilter={false}
    />
  );
};

export default FilterMoviePager;
