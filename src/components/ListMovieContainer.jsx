import React from "react";
import Loading from "./Loading";
import MovieCard from "./MovieCard";

const ListMovieContainer = ({
  wrapperRef,
  title,
  movies = [],
  isLoading = true,
}) => {
  return (
    <div ref={wrapperRef} className="relative mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
        {!isLoading &&
          movies.map(movie => <MovieCard key={movie._id} movie={movie} />)}
      </div>
      {isLoading && (
        <div className="h-[200px]">
          <Loading isLoading imageWidth={100} />
        </div>
      )}
    </div>
  );
};

export default ListMovieContainer;
