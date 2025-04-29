import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { useAuth } from "../context/AuthProvider";
import { getSavedMoviesByUser } from "../services/movieSavedService";

//

const SavedMovies = () => {
  const { user } = useAuth();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!user?.uid) return;

    const fetchData = async () => {
      const saved = await getSavedMoviesByUser(user.uid);
      setMovies(saved);
    };

    fetchData();
  }, [user]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {movies.map((movie) => (
        <div key={movie.id} className="bg-foreground rounded p-2">
          <img
            src={movie.thumb_url}
            alt={movie.origin_name}
            className="rounded mb-2"
          />
          <h3 className="text-lg font-semibold">{movie.origin_name}</h3>
          <p className="text-sm text-gray-400">{movie.category?.join(", ")}</p>
          <p className="text-xs text-gray-500 mt-1">
            Năm: {movie.year} - Chất lượng: {movie.quality}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SavedMovies;
