// import React from "react";

// const CategoryPage = () => {
//   return <div>CategoryPage</div>;
// };

// export default CategoryPage;


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import MovieCard from "../components/MovieCard";
import { useScrollToTop } from "../hooks/useScrollToTop";

const CategoryPage = () => {
  const { slug } = useParams(); // Lấy slug thể loại từ URL
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Map slug thành tên thể loại
  const categoryNameMap = {
    "chinh-kich": "Chính kịch",
    "hanh-dong": "Hành động",
    "hai-huoc": "Hài hước",
    "phieu-luu": "Phiêu lưu",
    "hinh-su": "Hình sự",
    "tinh-cam": "Tình cảm",
    "vien-tuong": "Viễn tưởng",
    "bi-an": "Bí ẩn",
    "khoa-hoc": "Khoa học",
    "kinh-di": "Kinh dị"
  };


  const categoryName = categoryNameMap[slug] || "Thể loại không xác định";

  useScrollToTop();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/json/movies_details.json"); // Đường dẫn đến file JSON
        const data = await res.json();

        // Lọc phim theo thể loại
        const categoryMovies = data.filter((movie) =>
          movie.category?.some((c) => c.slug === slug)
        );

        setMovies(categoryMovies); // Lưu danh sách phim theo thể loại
      } catch (err) {
        console.error("Error fetching movies by category:", err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [slug]); // Chạy lại khi slug thay đổi

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">
        Danh sách phim theo thể loại: {categoryName}
      </h1>
      {isLoading && <Loading isLoading />}
      {!isLoading && movies.length === 0 && (
        <p className="text-gray-500">
          Không có phim nào thuộc thể loại này: {categoryName}.
        </p>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {!isLoading &&
          movies.map((movie) => <MovieCard key={movie.slug} movie={movie} />)}
      </div>
    </div>
  );
};

export default CategoryPage;