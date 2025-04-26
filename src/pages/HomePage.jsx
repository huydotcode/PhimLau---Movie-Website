import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { toast } from "sonner";
import CategoryCard from "../components/CategoryCard";
import ListMovieContainer from "../components/ListMovieContainer";
import Loading from "../components/Loading";
import Banner from "../components/Banner";
import Container from "../components/Container";

const HomePage = () => {
  return (
    <>
      <Banner />

      <Container>
        <div className="w-full mt-[100px] pb-[100px]">
          <TopMovieSection />
          <TopCategorySection />
          <NewSingleMovieSection />
          <NewSeriesMovieSection />
          <TrendingMovieSection />
          <KoreanMovieSection />
          <AmericanMovieSection />
        </div>
      </Container>
    </>
  );
};

// Phim thịnh hành
export const TopMovieSection = () => {
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
          toast("Có lỗi xảy ra khi lấy danh sách phim!");
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [inView]);

  return (
    <ListMovieContainer
      title={"Hiện đang thịnh hành"}
      wrapperRef={ref}
      movies={topMovies}
      isLoading={isLoading}
    />
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
          toast("Có lỗi xảy ra khi lấy danh sách thể loại!");
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [inView]);

  return (
    <div ref={ref} className="relative mx-auto py-4 min-h-[400px]">
      <h2 className="text-2xl font-bold mb-4">Thể loại phim thịnh hành</h2>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-10">
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
          toast("Có lỗi xảy ra khi lấy danh sách phim!");
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [inView]);

  return (
    <ListMovieContainer
      title={"Phim lẻ mới ra"}
      wrapperRef={ref}
      movies={newMovies}
      isLoading={isLoading}
    />
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
          toast("Có lỗi xảy ra khi lấy danh sách phim!");
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [inView]);

  return (
    <ListMovieContainer
      title={"Phim bộ mới ra"}
      wrapperRef={ref}
      movies={newMovies}
      isLoading={isLoading}
    />
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
          toast("Có lỗi xảy ra khi lấy danh sách phim!");
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [inView]);

  return (
    <ListMovieContainer
      title={"Phim đang trending"}
      wrapperRef={ref}
      movies={trendingMovies}
      isLoading={isLoading}
    />
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
          setKoreanMovies(data.slice(0, 10));
        } catch (err) {
          console.log(err);
          toast("Có lỗi xảy ra khi lấy danh sách phim!");
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [inView]);

  return (
    <ListMovieContainer
      title={"Phim Hàn Quốc"}
      wrapperRef={ref}
      movies={koreanMovies}
      isLoading={isLoading}
    />
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
          toast("Có lỗi xảy ra khi lấy danh sách phim!");
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [inView]);

  return (
    <ListMovieContainer
      title={"Phim Mỹ"}
      wrapperRef={ref}
      movies={americanMovies}
      isLoading={isLoading}
    />
  );
};

export default HomePage;
