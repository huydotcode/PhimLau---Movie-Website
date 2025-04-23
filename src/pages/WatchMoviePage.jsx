import React, { useEffect, useRef, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router";
import CommentSection from "../components/CommentSection";
import VideoPlayer from "../components/VideoPlayer";
import { TopMovieSection } from "./HomePage";

/**
 "movie": {
"tmdb": {
"type": "movie",
"id": "1419826",
"season": null,
"vote_average": 8,
"vote_count": 1
},
"imdb": {
"id": "tt26595906"
},
"created": {
"time": "2025-04-08T21:23:51.000Z"
},
"modified": {
"time": "2025-04-08T21:59:44.000Z"
},
"_id": "67f53177b42714dde6d85605",
"name": "Thế Giới Hiểm Nguy",
"slug": "the-gioi-hiem-nguy",
"origin_name": "The World Will Tremble",
"content": "<p>Bộ phim dựa trên câu chuyện có thật đầy kinh ngạc về một nhóm tù nhân trong Thế chiến thứ hai, những người đã thực hiện một cuộc trốn thoát tưởng chừng bất khả thi khỏi trại hủy diệt Chełmno - trại tử thần đầu tiên của Đức Quốc xã - nhằm cung cấp bằng chứng trực tiếp đầu tiên về Holocaust (Cuộc diệt chủng Do Thái).phim xoay quanh Solomon Wiener (Oliver Jackson-Cohen) và Michael Podchlebnik (Jeremy Neumark Jones), hai tù nhân tại trại Chełmno, nơi hàng ngàn người, chủ yếu là người Do Thái, bị sát hại dã man bằng cách ngạt khí trong các xe tải. Họ chứng kiến những cảnh tượng kinh hoàng: những con người bị giết chết bằng khí độc, tiếng hét của các nạn nhân khi họ ngạt thở, và những thi thể bị chôn vùi trong các hố chôn tập thể. Trước thực tại rằng cái chết là không thể tránh khỏi nếu ở lại, nhóm tù nhân, bao gồm cả Solomon và Michael, quyết định lên kế hoạch trốn thoát để cảnh báo thế giới về những gì đang xảy ra.</p><p>&nbsp;</p>",
"type": "single",
"status": "completed",
"thumb_url": "https://img.ophim.live/uploads/movies/the-gioi-hiem-nguy-thumb.jpg",
"poster_url": "https://img.ophim.live/uploads/movies/the-gioi-hiem-nguy-poster.jpg",
"is_copyright": false,
"sub_docquyen": false,
"chieurap": false,
"trailer_url": "https://www.youtube.com/watch?v=XOo51-v7sxM",
"time": "109 Phút",
"episode_current": "Full",
"episode_total": "1",
"quality": "HD",
"lang": "Vietsub",
"notify": "",
"showtimes": "",
"year": 2025,
"view": 164,
"actor": [
"Oliver Jackson-Cohen",
"Jeremy Neumark Jones",
"David Kross",
"Michael Epp"
],
"director": [
"Lior Geller"
],
"category": [
{
"id": "620a2253e0fc277084dfd339",
"name": "Chiến Tranh",
"slug": "chien-tranh"
},
{
"id": "620f3d2b91fa4af90ab697fe",
"name": "Chính kịch",
"slug": "chinh-kich"
}
],
"country": [
{
"id": "620a231fe0fc277084dfd7ce",
"name": "Âu Mỹ",
"slug": "au-my"
},
{
"id": "620a2370e0fc277084dfd91e",
"name": "Anh",
"slug": "anh"
},
{
"id": "62121edd1f1609c9d9345940",
"name": "Nga",
"slug": "nga"
}
]
},
"episodes": [
{
"server_name": "Vietsub #1",
"server_data": [
{
"name": "Full",
"slug": "full",
"filename": "(Sub Viet) The World Will Tremble 2025 1080p AMZN WEB-DL DDP2 0 H 264-BYNDR",
"link_embed": "https://vip.opstream90.com/share/254ed7d2de3b23ab10936522dd547b78",
"link_m3u8": "https://vip.opstream90.com/20250408/4002_254ed7d2/index.m3u8"
}
]
}
]
 */

const WatchMoviePage = () => {
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const t = parseInt(searchParams[0].get("t")) - 1 || 0;

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentEpisode, setCurrentEpisode] = useState(t < 0 ? 0 : t);
  const [episodes, setEpisodes] = useState([]);
  const videoRef = useRef(null);

  useEffect(() => {
    console.log({ currentEpisode });
  }, [currentEpisode]);

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

  // Scroll to video ref
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentEpisode, videoRef.current]);

  useEffect(() => {
    // console.log("movie", movie);
  }, [movie]);

  return (
    <div className="@container relative bg-gradient-to-t from-foreground to-foreground via-transparent">
      {movie && (
        <div className="@container relative flex h-[90vh]">
          {/* Hình background */}
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

          {/* Thông tin phim bên trái */}
          <div className="relative z-10 flex flex-col justify-center pl-10 text-white w-1/2 gap-2 mt-[20vh] @max-3xl:w-3/4 @max-3xl:mt-[5vh]">
            <h1 className="text-5xl font-bold mb-4">{movie?.name}</h1>
            <div className="flex gap-2 mb-3 @max-xl:hidden">
              <span className="bg-white text-black px-2 py-1 text-sm rounded opacity-70">
                IMDB: {movie?.tmdb.vote_average.toFixed(1)}
              </span>
              <span className="bg-[rgba(0,0,0,0.5)]  px-2 py-1 text-sm rounded">
                {movie?.category.map(cat => cat.name).join(", ")}
              </span>
              <span className="bg-[rgba(0,0,0,0.5)]  px-2 py-1 text-sm rounded">
                {movie?.country.map(country => country.name).join(", ")}
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

        {/* Separte */}
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
            <div className="flex flex-wrap gap-4">
              {episodes?.server_data &&
                episodes?.server_data.map((episode, index) => (
                  <Link
                    key={index}
                    className={`px-4 py-2 rounded-lg ${
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

        <TopMovieSection />
      </div>
    </div>
  );
};

export default WatchMoviePage;
