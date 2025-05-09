import React from "react";
import { useParams } from "react-router-dom";

import { useAllCategories } from "../hooks/useCategory";

import MovieListPage from "../components/MovieListPage";

const CategoryPage = () => {
  const { slug } = useParams(); // Lấy slug thể loại từ URL
  const { data: categories } = useAllCategories({ enable: true });

  const defaultFilters = {
    type: [],
    country: [],
    category: [slug],
    year: [],
    lang: [],
    sort: "Mới nhất",
  };

  return (
    <MovieListPage
      title={`Danh sách phim theo thể loại: ${
        categories &&
        categories?.find((category) => category.slug === slug).name
      }`}
      defaultFilters={defaultFilters}
      hasCategoryFilter={false}
    />
  );
};

export default CategoryPage;
