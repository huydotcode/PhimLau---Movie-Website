import { useSearchParams } from "react-router-dom";
import MovieListPage from "../components/MovieListPage";
import { moviesSort } from "../data/movies_sort";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const getQueryArray = (key) =>
    searchParams.get(key) ? searchParams.get(key).split(",") : [];
  const query = searchParams.get("q");
  const defaultFilters = {
    type: getQueryArray("type"),
    country: getQueryArray("country"),
    category: getQueryArray("category"),
    year: getQueryArray("year"),
    lang: getQueryArray("lang"),
    sort: searchParams.get("sort") || moviesSort[0].slug,
  };

  return (
    <MovieListPage
      searchTerm={query}
      title={`Kết quả tìm kiếm cho "${query}"`}
      defaultFilters={defaultFilters}
    />
  );
};

export default SearchPage;
