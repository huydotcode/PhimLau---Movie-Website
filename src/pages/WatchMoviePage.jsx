import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useSearchParams } from "react-router";
import CommentSection from "../components/CommentSection";
import VideoPlayer from "../components/VideoPlayer";
import { useAuth } from "../context/AuthProvider";

import {
  addWatchedMovieThunk,
  fetchWatchedMovies,
} from "../features/movies/watchedMovieThunk";
import { useEpsicodes, useMovie } from "../hooks/useMovie";
import { TopNewMovieSection } from "./HomePage";
import { SuggestionMovieByMovie } from "./MovieInfomationPage";

const WatchMoviePage = () => {
  const { user } = useAuth();
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const tParam = searchParams[0].get("t");
  const t = tParam ? parseInt(tParam) - 1 : 0;
  const currentEpisode = t < 0 ? 0 : t;

  const { data: movie, isLoading } = useMovie({
    slug,
    enabled: true,
  });
  const { data: episodes } = useEpsicodes({
    slug: movie?.slug,
    enabled: !!movie?.slug,
  });
  const { watchedMovies, loading } = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  const videoRef = useRef(null);

  useEffect(() => {
    if (user?.uid) {
      dispatch(fetchWatchedMovies(user.uid));
    }
  }, [dispatch, user?.uid]); // ⚠️ Đã bỏ watchedMovies

  // Lưu lại tập phim đã xem
  useEffect(() => {
    if (
      user?.uid &&
      movie?._id &&
      !watchedMovies.some(
        (item) =>
          item.movie_id === movie._id && item.episode === currentEpisode,
      ) &&
      !loading
    ) {
      dispatch(
        addWatchedMovieThunk({
          uid: user.uid,
          movie,
          currentEpisode,
        }),
      );
    }
  }, [dispatch, user?.uid, movie?._id, currentEpisode]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentEpisode]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <svg
          className="animate-spin h-10 w-10 text-primary"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v2a6 6 0 100 12v2a8 8 0 01-8-8z"
          ></path>
        </svg>
      </div>
    );
  }

  return (
    <div className="@container relative bg-gradient-to-t from-foreground to-foreground via-transparent">
      {movie && (
        <div className="@container relative flex h-[90vh]">
          <div
            className="absolute inset-0 bg-cover bg-top brightness-[.5]"
            style={{
              backgroundImage: `url(${movie.poster_url})`,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "url('/dotted.png')",
            }}
          ></div>

          <div className="relative z-10 flex flex-col justify-center pl-10 text-white w-1/2 gap-2 mt-[20vh] @max-3xl:w-3/4 @max-3xl:mt-[5vh]">
            <h1 className="text-5xl font-bold mb-4">{movie?.name}</h1>
            <div className="flex gap-2 mb-3 @max-xl:hidden">
              {
                <span className="bg-white text-black px-2 py-1 text-sm rounded opacity-70">
                  IMDB: {movie?.tmdb?.vote_average.toFixed(1)}
                </span>
              }
              <span className="bg-[rgba(0,0,0,0.5)]  px-2 py-1 text-sm rounded">
                {movie?.category.map((cat) => cat.name).join(", ")}
              </span>
              <span className="bg-[rgba(0,0,0,0.5)]  px-2 py-1 text-sm rounded">
                {movie?.country.map((country) => country.name).join(", ")}
              </span>
            </div>
            <div
              className="text-sm max-w-md text-justify line-clamp-10 @max-3xl:line-clamp-5 @max-xl:max-w-3/4"
              dangerouslySetInnerHTML={{ __html: movie?.content }}
            />
          </div>
        </div>
      )}

      <div className="flex flex-col gap-6 justify-center text-white pb-[200px] w-full lg:w-[90vw] mx-auto mt-2 z-50 bg-black p-10 rounded-xl lg:px-[100px]">
        <h2 className="text-3xl font-bold">
          <span className="text-primary font-bold">{movie?.name} </span>
          {movie &&
            episodes?.server_data &&
            episodes?.server_data[currentEpisode] &&
            movie?.type !== "single" && (
              <span className="font-bold">
                - Tập {episodes?.server_data[currentEpisode]?.name}
              </span>
            )}
        </h2>

        <div className="h-[1px] bg-gray-500 opacity-20 w-full" />

        {episodes?.server_data &&
          episodes?.server_data[currentEpisode]?.link_embed.length > 0 && (
            <VideoPlayer
              ref={videoRef}
              src={episodes?.server_data[currentEpisode]?.link_embed}
              poster={movie.poster_url}
            />
          )}

        {episodes?.server_data &&
          episodes?.server_data[currentEpisode] &&
          episodes?.server_data[currentEpisode]?.link_embed.length == 0 && (
            <div className="flex items-center justify-center h-[50vh]">
              Xin lỗi, không tìm thấy video
            </div>
          )}

        {movie && movie?.type !== "single" && (
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Chọn tập phim</h2>
            <div className="grid grid-cols-[repeat(auto-fit,_minmax(50px,_80px))] gap-4 max-h-[50vh] overflow-scroll">
              {episodes?.server_data &&
                episodes?.server_data.map((episode, index) => (
                  <Link
                    key={index}
                    className={`px-4 py-2 rounded-lg text-center ${currentEpisode === index ? "bg-primary" : "bg-secondary"
                      }`}
                    to={`/xem-phim/${movie.slug}?t=${index + 1}`}
                  >
                    {episode.name}
                  </Link>
                ))}
            </div>
          </div>
        )}

        {movie?._id && <CommentSection movieId={movie._id} />}

        <SuggestionMovieByMovie movie={movie} />
        <TopNewMovieSection />
      </div>
    </div>
  );
};

export default WatchMoviePage;
