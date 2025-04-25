import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import MovieCard from "../components/MovieCard";
import { useScrollToTop } from "../hooks/useScrollToTop";

const CountryPage = () => {
  const { slug } = useParams(); // Lấy slug quốc gia từ URL
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Map slug thành tên quốc gia
  const countryNameMap = {
    "viet-nam": "Việt Nam",
    "han-quoc": "Hàn Quốc",
    "nhat-ban": "Nhật Bản",
    "au-my": "Âu Mỹ",
    "trung-quoc": "Trung Quốc",
    "anh": "Anh",
    "phap": "Pháp",
    "thai-lan": "Thái Lan",
    "an-do": "Ấn Độ",
  };

  const countryName = countryNameMap[slug] || "Quốc gia không xác định";

  useScrollToTop();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/json/movies_details.json"); // Đường dẫn đến file JSON
        const data = await res.json();

        // Lọc phim theo quốc gia
        const countryMovies = data.filter((movie) =>
          movie.country?.some((c) => c.slug === slug)
        );

        setMovies(countryMovies); // Lưu danh sách phim theo quốc gia
      } catch (err) {
        console.error("Error fetching movies by country:", err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [slug]); // Chạy lại khi slug thay đổi

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">
        Danh sách phim theo quốc gia: {countryName}
      </h1>
      {isLoading && <Loading isLoading />}
      {!isLoading && movies.length === 0 && (
        <p className="text-gray-500">
          Không có phim nào thuộc quốc gia này: {countryName}.
        </p>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {!isLoading &&
          movies.map((movie) => <MovieCard key={movie.slug} movie={movie} />)}
      </div>
    </div>
  );
};

export default CountryPage;