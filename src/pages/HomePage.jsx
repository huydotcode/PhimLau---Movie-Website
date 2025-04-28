import React from "react";
import { useInView } from "react-intersection-observer";
import Banner from "../components/Banner";
import CategoryCard from "../components/CategoryCard";
import Container from "../components/Container";
import ListMovieContainer from "../components/ListMovieContainer";
import Loading from "../components/Loading";
import { useTopCategories } from "../hooks/useCategory";
import {
  useAmericanMovies,
  useKoreanMovies,
  useNewSeriesMovies,
  useNewSingleMovies,
  useTopMovies,
  useTrendingMovies,
} from "../hooks/useMovies";

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
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });
  const { data: topMovies, isLoading } = useTopMovies({
    enabled: inView,
  });

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
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  const { data: topCategories, isLoading } = useTopCategories({
    enable: inView,
  });

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
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
    triggerOnce: true,
  });

  const { data: newMovies, isLoading } = useNewSingleMovies({
    enabled: inView,
  });

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
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
    triggerOnce: true,
  });

  const { data: newMovies, isLoading } = useNewSeriesMovies({
    enabled: inView,
  });

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
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
    triggerOnce: true,
  });

  const { data: trendingMovies, isLoading } = useTrendingMovies({
    enabled: inView,
  });

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
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
    triggerOnce: true,
  });

  const { data: koreanMovies, isLoading } = useKoreanMovies({
    enabled: inView,
  });

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
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
    triggerOnce: true,
  });

  const { data: americanMovies, isLoading } = useAmericanMovies({
    enabled: inView,
  });

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
