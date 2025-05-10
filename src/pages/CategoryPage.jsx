import { useParams, useSearchParams } from "react-router-dom";

import { useAllCategories } from "../hooks/useCategory";

import MovieListPage from "../components/MovieListPage";
import { moviesSort } from "../data/movies_sort";
import { useEffect } from "react";

const CategoryPage = () => {
  const { slug } = useParams(); // Lấy slug thể loại từ URL
  const { data: categories } = useAllCategories({ enable: true });
  const searchParams = useSearchParams();
  const getQueryArray = (key) =>
    searchParams[0].get(key) ? searchParams[0].get(key).split(",") : [];

  const defaultFilters = {
    type: getQueryArray("type"),
    country: getQueryArray("country"),
    category: [slug],
    year: getQueryArray("year"),
    lang: getQueryArray("lang"),
    sort: searchParams[0].get("sort") || moviesSort[0].slug,
  };

  useEffect(() => {
    console.log("categories", categories);
  }, [categories]);

  return (
    <MovieListPage
      title={`Danh sách phim theo thể loại: ${
        (categories &&
          categories?.find((category) => category.slug === slug)?.name) ||
        "Không tìm thấy"
      }`}
      defaultFilters={defaultFilters}
      hasCategoryFilter={false}
    />
  );
};

export default CategoryPage;
