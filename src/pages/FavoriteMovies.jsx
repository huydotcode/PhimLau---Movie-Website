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
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../app/firebase";

const FavoriteMovies = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [refresh, setRefresh] = useState(false); // để re-fetch

  const fetchFavorites = async () => {
    if (!user?.uid) return;
    const data = await getFavoritesByUser(user.uid);
    setFavorites(data);
  };

  useEffect(() => {
    fetchFavorites();
  }, [user, refresh]);

  // Xử lý bỏ yêu thích
  const handleUnfavorite = async (movieId) => {
    try {
      const q = query(
        collection(db, "favorites"),
        where("user_id", "==", user.uid),
        where("movie_id", "==", movieId),
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        toast.error("❌ Không tìm thấy phim yêu thích để xoá.");
        return;
      }

      for (const docSnap of querySnapshot.docs) {
        await removeFavorite(docSnap.id); // Truyền đúng ID tài liệu Firestore
      }

      toast.success("🗑️ Đã bỏ yêu thích!");
      setRefresh((r) => !r); // Trigger re-fetch
      setFavorites((prev) => prev.filter((m) => m.movie_id !== movieId));
    } catch (error) {
      console.error("Lỗi khi bỏ yêu thích:", error);
      toast.error("⚠️ Lỗi khi bỏ yêu thích!");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">🎬 Phim Yêu Thích</h1>

      {favorites.length === 0 ? (
        <p className="text-gray-400">Bạn chưa có phim yêu thích nào.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {favorites.map((movie) => (
            <div key={movie.id} className="relative">
              <MovieCard movie={movie} />

              <div className="flex justify-end items-center mt-2">
                <Button
                  className="bg-primary text-white mt-2 p-2 rounded-xl absolute top-1 left-1 flex items-center gap-2"
                  onClick={() => handleUnfavorite(movie.id)} // Xóa khỏi yêu thích
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
