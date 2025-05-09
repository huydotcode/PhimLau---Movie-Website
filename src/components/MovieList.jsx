import Loading from "./Loading"; // Giả định component Loading
import MovieCard from "./MovieCard"; // Giả định component MovieCard

const MovieList = ({ movies, isLoading, isFetching }) => {
  return (
    <div>
      {(isLoading || isFetching) && <Loading isLoading />}
      {!isLoading && !isFetching && movies.length === 0 && (
        <p className="text-gray-500">Không có phim nào.</p>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {!isLoading &&
          !isFetching &&
          movies.map((movie) => <MovieCard key={movie._id} movie={movie} />)}
      </div>
    </div>
  );
};

export default MovieList;
