import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import CommentSection from "../components/CommentSection";
import Container from "../components/Container";
import Icons from "../components/Icons";
import MovieCard from "../components/MovieCard";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthProvider"; // hook custom nếu bạn có
import { useScrollToTop } from "../hooks/useScrollToTop";
import { useSearchMovies } from "../hooks/useSearchMovie";
import { addFavorite } from "../services/favoriteService"; // hoặc đúng đường dẫn
import { addSavedMovie } from "../services/movieSavedService"; // hoặc đường dẫn đúng
import { TopNewMovieSection } from "./HomePage";
import { Modal } from "antd";
import { SORT_OPTIONS } from "../constants/sortFilter";

const MovieInfomationPage = () => {
  const { slug } = useParams();
  const naviagte = useNavigate();

  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const [episodes, setEpisodes] = useState([]);
  const [showModalShare, setShowModalShare] = useState(false);
  useScrollToTop();

  const currentUrl = window.location.href; // Lấy URL hiện tại của trang

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(movie?.title || "Xem phim hay tại đây!")}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(movie?.title)}`,
    email: `mailto:?subject=${encodeURIComponent("Mời bạn xem phim " + movie?.title)}&body=${encodeURIComponent(currentUrl)}`,
  };

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
  const { user } = useAuth();
  const handleAddFavorite = async () => {
    if (!user) {
      toast.warning("Bạn cần đăng nhập để thêm yêu thích.");
      return;
    }

    try {
      const result = await addFavorite({ userId: user.uid, movie });
      if (result) {
        toast.success("❤️ Đã thêm vào danh sách yêu thích!");
      } else {
        toast.info("Phim đã có trong danh sách yêu thích.");
      }
    } catch (error) {
      console.error("Lỗi khi thêm yêu thích:", error);
      toast.error("⚠️ Lỗi khi thêm yêu thích!");
    }
  };

  const handleSaveMovie = async () => {
    if (!user) {
      toast.warning("Bạn cần đăng nhập để lưu phim.");
      return;
    }

    try {
      const result = await addSavedMovie({
        userId: user.uid,
        movieId: movie._id,
      });
      if (result) {
        toast.success("Đã lưu phim thành công!");
      } else {
        toast.info("Phim đã được lưu trước đó.");
      }
    } catch (error) {
      toast.error("Lỗi khi lưu phim.");
      console.error(error);
    }
  };

  const handleShare = () => {
    setShowModalShare(true);
  };

  return (
    <div className="@container">
      <div className="relative w-screen">
        {/* Banner */}
        <div className="absolute inset-0 gradient-left-right z-10"></div>

        <div
          className="relative inset-0 bg-cover bg-center brightness-[.5] h-[50vh] lg:h-[80vh]"
          style={{
            backgroundImage: `url(${movie.poster_url})`,
          }}
        ></div>
      </div>

      <Container className="-top-[160px] z-10">
        <div className="rounded-xl mt-10 flex justify-between gap-4 flex-col lg:flex-row">
          {/* Thông tin phim */}
          <div className="flex flex-col gap-4 lg:bg-gradient-to-t lg:from-foreground lg:to-foreground via-transparent rounded-xl p-6 w-full lg:w-1/3">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col justify-center items-center">
                <img
                  src={movie.thumb_url}
                  alt={movie.name}
                  className="object-cover w-1/2 lg:w-full rounded-xl"
                />

                <div className="flex lg:hidden flex-col justify-center items-center mt-4">
                  <p className="text-2xl font-bold text-center">
                    {movie.origin_name}
                  </p>
                  <p className="text-gray-500 text-sm text-center">
                    {movie.name}
                  </p>
                </div>
              </div>

              <div className="hidden lg:block">
                <InfomationSection movie={movie} />
              </div>
            </div>
          </div>

          {/* Các hành động xem phim */}
          <div className="flex-1 bg-gradient-to-t from-foreground to-foreground via-transparent rounded-xl p-4 flex flex-col gap-10">
            <div className="flex items-center justify-center lg:justify-start flex-wrap gap-4">
              <Button
                className="bg-primary px-8 py-3 rounded-full font-semibold uppercase flex items-center gap-2 text-md hover:opacity-40"
                onClick={() => {
                  naviagte(`/xem-phim/${movie.slug}`);
                }}
              >
                <Icons.Play /> Xem ngay
              </Button>

              <div className="flex-1 flex items-center justify-start gap-2">
                <Button
                  className="bg-transparent px-4 py-2 rounded-full flex items-center gap-2 flex-col text-sm hover:text-primary"
                  onClick={handleSaveMovie}
                >
                  <Icons.Play /> Xem sau
                </Button>

                <Button
                  className="bg-transparent px-4 py-2 rounded-full flex items-center gap-2 flex-col text-sm hover:text-primary"
                  onClick={handleAddFavorite}
                >
                  <Icons.Heart /> Yêu thích
                </Button>

                <Button
                  className="bg-transparent px-4 py-2 rounded-full flex items-center gap-2 flex-col text-sm hover:text-primary"
                  onClick={handleShare}
                >
                  <Icons.Share /> Chia sẻ
                </Button>

                <Modal
                  open={showModalShare}
                  onCancel={() => setShowModalShare(false)}
                  footer={null}
                  centered
                  title="Chia sẻ phim"
                  className="w-[90vw] lg:w-[50vw]"
                >
                  <div className="mt-6 flex items-center gap-4">
                    <a
                      href={shareLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      <Icons.Facebook className="w-8 h-8" />
                    </a>

                    <a
                      href={shareLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      <Icons.Twitter className="w-8 h-8" />
                    </a>

                    <a
                      href={shareLinks.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      <Icons.Telegram className="w-8 h-8" />
                    </a>

                    <a href={shareLinks.email} className="hover:underline">
                      <Icons.Gmail className="w-10 h-10 text-gray-500" />
                    </a>

                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(currentUrl);
                        toast("Đã sao chép liên kết!");
                      }}
                      className="text-gray-700 hover:underline"
                    >
                      <Icons.Link className="w-8 h-8" />
                    </button>
                  </div>
                </Modal>
              </div>
            </div>

            <div className="lg:hidden">
              <InfomationSection movie={movie} />
            </div>

            {episodes?.server_data && episodes?.server_data.length > 0 && (
              <div className="flex flex-col">
                <h2 className="text-xl font-semibold">Danh sách tập phim</h2>

                <div className="mt-2 grid grid-cols-2 md:grid-cols-5 gap-2 max-h-[50vh] overflow-y-scroll scrollbar-white pr-1 rounded-xl">
                  {episodes?.server_data.map((episode, index) => (
                    <Button
                      key={index}
                      className="flex items-center bg-secondary rounded-sm px-4 py-2 text-sm font-semibold text-white"
                      href={`/xem-phim/${movie.slug}?t=${episode.slug}`}
                    >
                      <Icons.Play /> Tập {episode.name}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Trailer */}
            {movie?.trailer_url && (
              <div className="flex flex-col gap-4 mt-6">
                <h2 className="text-xl font-semibold">Trailer</h2>
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <iframe
                    className="w-full aspect-video"
                    src={movie?.trailer_url.replace("watch?v=", "embed/")}
                    title={`Trailer của ${movie?.title}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            )}

            {/* Comment Section */}

            {movie && <CommentSection movieId={movie._id} />}
          </div>
        </div>
      </Container>

      <Container className="px-4">
        <SuggestionMovie movie={movie} />
        <TopNewMovieSection />
      </Container>
    </div>
  );
};

const InfomationSection = ({ movie }) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-xl font-bold text-center hidden lg:block">
        {movie.origin_name} - {movie.name}
      </p>

      <div className="flex flex-wrap gap-2 my-2">
        <span className="border-2 px-1 rounded-md">
          IMDb:{" "}
          <span className="text-primary">
            {movie.tmdb?.vote_average.toFixed(1)}
          </span>
        </span>

        {movie?.year && (
          <span className="font-semibold p-1 rounded-md border text-sm ">
            {movie.year}
          </span>
        )}

        {movie?.category &&
          movie?.category?.map((cat) => (
            <div
              className="p-1 rounded-md border text-sm bg-secondary"
              key={cat.name}
            >
              {cat.name}
            </div>
          ))}
      </div>

      <div className="font-semibold">Nội dung:</div>
      <p
        className="text-sm text-justify"
        dangerouslySetInnerHTML={{ __html: movie.content }}
      ></p>

      {movie?.country?.length > 0 && (
        <p className="font-semibold">
          Quốc gia:{" "}
          <span className="font-light">
            {movie.country?.map((country) => country.name).join(", ")}
          </span>
        </p>
      )}

      {movie?.episode_total && (
        <p className="font-semibold">
          Số tập: <span className="font-light">{movie.episode_total}</span>
        </p>
      )}

      {movie?.time && (
        <p className="font-semibold">
          Thời gian: <span className="font-light">{movie.time}</span>
        </p>
      )}

      <p className="font-semibold">
        Trạng thái:{" "}
        <span className="font-light">
          {movie.status == "completed" ? "Hoàn thành" : "Chưa hoàn thành"}
        </span>
      </p>

      {movie?.actor && movie?.actor.length > 0 && (
        <p className="font-semibold">
          Diễn viên:{" "}
          <span className="font-light">
            {movie.actor?.slice(0, 10).join(", ")}
          </span>
        </p>
      )}

      {movie?.director && movie?.director.length > 0 && (
        <p className="font-semibold">
          Đạo diễn:{" "}
          <span className="font-light">{movie.director.join(", ")}</span>
        </p>
      )}
    </div>
  );
};

// Gợi ý phim theo chủ đề của phim hiện tại
const SuggestionMovie = ({ movie }) => {
  const { data: suggestionMovies, isLoading } = useSearchMovies({
    filters: {
      category: movie?.category?.map((cat) => cat.slug),
      country: movie?.country?.map((country) => country.slug),
      sort: SORT_OPTIONS.IMDB,
    },
    page: 1,
  });

  const navigate = useNavigate();

  if (isLoading) return <div>Đang tải...</div>;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Gợi ý phim cho bạn</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {suggestionMovies?.movies &&
          suggestionMovies?.movies.map((suggestion) => (
            <MovieCard
              key={suggestion._id}
              movie={suggestion}
              className="relative"
              onClick={() => navigate(`/phim/${suggestion.slug}`)}
            />
          ))}
      </div>
    </div>
  );
};

export default MovieInfomationPage;
