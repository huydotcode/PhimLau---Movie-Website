import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";

import { toast } from "sonner";
import {
  getFavoritesByUser,
  removeFavorite,
} from "../services/favoriteService";
import MovieCard from "../components/MovieCard";
import Button from "../components/ui/Button";
import Icons from "../components/Icons";

const FavoriteMovies = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    if (!user?.uid) return;
    const data = await getFavoritesByUser(user.uid);
    setFavorites(data);
  };

  useEffect(() => {
    fetchFavorites();
  }, [user]);

  const handleWatch = (slug) => {
    window.open(`/phim/${slug}`, "_blank");
  };

  const handleUnfavorite = async (id) => {
    const movie = favorites.find((m) => m._id === id);
    if (!movie) return;

    const docToRemove = favorites.find((m) => m._id === id)?.id;
    await removeFavorite(docToRemove);
    toast.success("Đã bỏ yêu thích!");
    setFavorites((prev) => prev.filter((m) => m._id !== id));
  };

  const handleRemove = handleUnfavorite; // giống bỏ yêu thích

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">🎬 Phim Yêu Thích</h1>

      {favorites.length === 0 ? (
        <p className="text-gray-400">Bạn chưa có phim yêu thích nào.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {favorites.map((movie) => (
            <div key={movie._id} className="relative">
              <MovieCard movie={movie} />

              <div className="flex justify-end items-center mt-2">
                <Button
                  className="bg-primary text-white mt-2 p-2 rounded-xl absolute top-1 left-1 flex items-center gap-2"
                  onClick={() => handleRemove(movie._id)}
                >
                  <Icons.Close className="text-xl text-white" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteMovies;
