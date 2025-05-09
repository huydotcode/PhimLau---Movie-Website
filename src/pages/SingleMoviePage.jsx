import MovieListPage from "../components/MovieListPage";

const SingleMoviePage = () => {
  const defaultFilters = {
    type: ["single"],
    country: [],
    category: [],
    year: [],
    lang: [],
    sort: "Mới nhất",
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
