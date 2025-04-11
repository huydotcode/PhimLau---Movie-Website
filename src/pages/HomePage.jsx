import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { toast } from "sonner";
import Loading from "../components/Loading";
import MovieCard from "../components/MovieCard";
import CategoryCard from "../components/CategoryCard";

const HomePage = () => {
  return (
    <div className="w-full mt-[100px] pb-[500px]">
      <TopMovieSection />
      <TopCategorySection />
      <NewSingleMovieSection />
      <NewSeriesMovieSection />
      <TrendingMovieSection />
      <KoreanMovieSection />
      <AmericanMovieSection />
    </div>
  );
};

// Phim thịnh hành
const TopMovieSection = () => {
  const [topMovies, setTopMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
    triggerOnce: true,
  });

  // Nếu in view thì gọi API
  useEffect(() => {
    if (inView) {
      (async () => {
        try {
          setIsLoading(true);

          const res = await fetch("/json/movies_top_rated.json");
          const data = await res.json();
          setTopMovies(data);
        } catch (err) {
          console.log(err);
          toast.error("Có lỗi xảy ra khi lấy danh sách phim!");
        } finally {
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        }
      })();
    }
  }, [inView]);

  return (
    <div ref={ref} className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Hiện đang thịnh hành</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
        {!isLoading &&
          topMovies.map(movie => <MovieCard key={movie._id} movie={movie} />)}
      </div>
      {isLoading && <Loading isLoading />}
    </div>
  );
};

// Thể loại phim thịnh hành
const TopCategorySection = () => {
  const [topCategories, setTopCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
    triggerOnce: true,
  });

  // Nếu in view thì gọi API
  useEffect(() => {
    if (inView) {
      (async () => {
        try {
          setIsLoading(true);

          const res = await fetch("/json/movie_top_categories.json");
          const data = await res.json();
          setTopCategories(data.slice(0, 6));
        } catch (err) {
          console.log(err);
          toast.error("Có lỗi xảy ra khi lấy danh sách thể loại!");
        } finally {
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        }
      })();
    }
  }, [inView]);

  return (
    <div ref={ref} className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Thể loại phim thịnh hành</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-10">
        {!isLoading &&
          topCategories.map(category => (
            <CategoryCard key={category.id} category={category} />
          ))}
      </div>
      {isLoading && <Loading isLoading />}
    </div>
  );
};

// Phim lẻ mới ra
const NewSingleMovieSection = () => {
  const [newMovies, setNewMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
    triggerOnce: true,
  });

  // Nếu in view thì gọi API
  useEffect(() => {
    if (inView) {
      (async () => {
        try {
          setIsLoading(true);

          const res = await fetch("/json/movies_single_new.json");
          const data = await res.json();
          setNewMovies(data);
        } catch (err) {
          console.log(err);
          toast.error("Có lỗi xảy ra khi lấy danh sách phim!");
        } finally {
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        }
      })();
    }
  }, [inView]);

  return (
    <div ref={ref} className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Phim lẻ mới ra</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
        {!isLoading &&
          newMovies.map(movie => <MovieCard key={movie._id} movie={movie} />)}
      </div>
      {isLoading && <Loading isLoading />}
    </div>
  );
};

// Phim bộ mới ra
const NewSeriesMovieSection = () => {
  const [newMovies, setNewMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
    triggerOnce: true,
  });

  // Nếu in view thì gọi API
  useEffect(() => {
    if (inView) {
      (async () => {
        try {
          setIsLoading(true);

          const res = await fetch("/json/movies_series_new.json");
          const data = await res.json();
          setNewMovies(data);
        } catch (err) {
          console.log(err);
          toast.error("Có lỗi xảy ra khi lấy danh sách phim!");
        } finally {
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        }
      })();
    }
  }, [inView]);

  return (
    <div ref={ref} className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Phim bộ mới ra</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
        {!isLoading &&
          newMovies.map(movie => <MovieCard key={movie._id} movie={movie} />)}
      </div>
      {isLoading && <Loading isLoading />}
    </div>
  );
};

// Phim được trending
const TrendingMovieSection = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
    triggerOnce: true,
  });

  // Nếu in view thì gọi API
  useEffect(() => {
    if (inView) {
      (async () => {
        try {
          setIsLoading(true);

          const res = await fetch("/json/movies_trending.json");
          const data = await res.json();
          setTrendingMovies(data);
        } catch (err) {
          console.log(err);
          toast.error("Có lỗi xảy ra khi lấy danh sách phim!");
        } finally {
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        }
      })();
    }
  }, [inView]);

  return (
    <div ref={ref} className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Phim được trending</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
        {!isLoading &&
          trendingMovies.map(movie => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
      </div>
      {isLoading && <Loading isLoading />}
    </div>
  );
};

// Phim hàn thịnh hành
const KoreanMovieSection = () => {
  const [koreanMovies, setKoreanMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
    triggerOnce: true,
  });

  // Nếu in view thì gọi API
  useEffect(() => {
    if (inView) {
      (async () => {
        try {
          setIsLoading(true);

          const res = await fetch("/json/movies_trending_korean.json");
          const data = await res.json();
          setKoreanMovies(data);
        } catch (err) {
          console.log(err);
          toast.error("Có lỗi xảy ra khi lấy danh sách phim!");
        } finally {
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        }
      })();
    }
  }, [inView]);

  return (
    <div ref={ref} className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Phim Hàn Quốc</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
        {!isLoading &&
          koreanMovies.map(movie => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
      </div>
      {isLoading && <Loading isLoading />}
    </div>
  );
};

// Phim mỹ thịnh hành
const AmericanMovieSection = () => {
  const [americanMovies, setAmericanMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
    triggerOnce: true,
  });

  // Nếu in view thì gọi API
  useEffect(() => {
    if (inView) {
      (async () => {
        try {
          setIsLoading(true);

          const res = await fetch("/json/movies_trending_us.json");
          const data = await res.json();
          setAmericanMovies(data);
        } catch (err) {
          console.log(err);
          toast.error("Có lỗi xảy ra khi lấy danh sách phim!");
        } finally {
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        }
      })();
    }
  }, [inView]);

  return (
    <div ref={ref} className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Phim Mỹ</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
        {!isLoading &&
          americanMovies.map(movie => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
      </div>
      {isLoading && <Loading isLoading />}
    </div>
  );
};

export default HomePage;
