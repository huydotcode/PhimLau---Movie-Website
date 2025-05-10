import { useSearchParams } from "react-router";
import MovieListPage from "../components/MovieListPage";
import { moviesSort } from "../data/movies_sort";

const SingleMoviePage = () => {
  const searchParams = useSearchParams();
  const getQueryArray = (key) =>
    searchParams[0].get(key) ? searchParams[0].get(key).split(",") : [];

  const defaultFilters = {
    type: ["single"],
    country: getQueryArray("country"),
    category: getQueryArray("category"),
    year: getQueryArray("year"),
    lang: getQueryArray("lang"),
    sort: searchParams[0].get("sort") || moviesSort[0].slug,
  };

  return (
    <MovieListPage
      title="Danh sách phim lẻ"
      defaultFilters={defaultFilters}
      hasTypeFilter={false}
    />
  );
};

export default SingleMoviePage;
