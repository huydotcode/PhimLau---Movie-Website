import React, { useEffect, useRef, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router";
import CommentSection from "../components/CommentSection";
import VideoPlayer from "../components/VideoPlayer";
import { TopNewMovieSection } from "./HomePage";
import { useAuth } from "../context/AuthProvider";
import { addWatchedMovie } from "../services/watchedService";
import { addSavedMovie } from "../services/movieSavedService";
import { addFavorite } from "../services/favoriteService";
// const [isFavorited, setIsFavorited] = useState(false);

const WatchMoviePage = () => {
  const { user } = useAuth();
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const t = parseInt(searchParams[0].get("t")) - 1 || 0;

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentEpisode, setCurrentEpisode] = useState(t < 0 ? 0 : t);
  const [episodes, setEpisodes] = useState([]);
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`https://ophim1.com/phim/${slug}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setMovie(data.movie);
        if (data.episodes && data.episodes.length > 0) {
          setEpisodes(data.episodes[0]);
        }
      } catch (error) {
        console.error("Error fetching movie data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [slug]);

  useEffect(() => {
    if (user?.uid && movie?._id) {
      addWatchedMovie({
        userId: user.uid,
        movie: {
          _id: movie._id,
          name: movie.name,
          origin_name: movie.origin_name,
          thumb_url: movie.thumb_url,
          slug: movie.slug,
          year: movie.year,
          quality: movie.quality,
          lang: movie.lang,
        },
      });
    }
  }, [user, movie]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentEpisode]);

  useEffect(() => {
    const saveMovie = async () => {
      if (user?.uid && movie?._id) {
        try {
          await addSavedMovie({
            userId: user.uid,
            movieId: movie._id,
          });
          console.log("luu phim thanh cong");
        } catch (error) {
          console.error("Lỗi khi lưu phim đã xem:", error);
        }
      }
    };

    saveMovie();
  }, [user, movie]);

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
              <span className="bg-white text-black px-2 py-1 text-sm rounded opacity-70">
                IMDB: {movie?.tmdb.vote_average.toFixed(1)}
              </span>
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

      <div className="flex flex-col gap-6 justify-center text-white pb-[500px] w-full lg:w-[90vw] mx-auto mt-2 z-50 bg-black p-10 rounded-xl lg:px-[100px]">
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

        {episodes?.server_data && (
          <VideoPlayer
            ref={videoRef}
            src={episodes?.server_data[currentEpisode]?.link_embed}
            poster={movie.poster_url}
          />
        )}

        {movie && movie?.type !== "single" && (
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Chọn tập phim</h2>
            <div className="grid grid-cols-[repeat(auto-fit,_minmax(50px,_80px))] gap-4">
              {episodes?.server_data &&
                episodes?.server_data.map((episode, index) => (
                  <Link
                    key={index}
                    className={`px-4 py-2 rounded-lg text-center ${
                      currentEpisode === index ? "bg-primary" : "bg-secondary"
                    }`}
                    onClick={() => setCurrentEpisode(index)}
                  >
                    {episode.name}
                  </Link>
                ))}
            </div>
          </div>
        )}

        {movie?._id && <CommentSection movieId={movie._id} />}

        <TopNewMovieSection />
      </div>
    </div>
  );
};

export default WatchMoviePage;
