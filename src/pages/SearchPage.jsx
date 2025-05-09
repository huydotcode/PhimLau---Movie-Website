import { useSearchParams } from "react-router-dom";
import MovieListPage from "../components/MovieListPage";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
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
      searchTerm={query}
      title={`Kết quả tìm kiếm cho "${query}"`}
      defaultFilters={defaultFilters}
    />
  );
};

export default SearchPage;
