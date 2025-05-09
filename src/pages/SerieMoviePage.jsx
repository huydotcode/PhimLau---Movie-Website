import MovieListPage from "../components/MovieListPage";

const SerieMoviePage = () => {
  const defaultFilters = {
    type: ["series"],
    country: [],
    category: [],
    year: [],
    lang: [],
    sort: "Mới nhất",
  };

  return (
    <MovieListPage
      title="Danh sách phim bộ"
      defaultFilters={defaultFilters}
      hasTypeFilter={false}
    />
  );
};

export default SerieMoviePage;
