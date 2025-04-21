import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Container from "../components/Container";
import Button from "../components/ui/Button";
import Icons from "../components/Icons";
import { TopMovieSection } from "./HomePage";

/*
{
    "status": true,
    "msg": "",
    "movie": {
        "tmdb": {
            "type": "tv",
            "id": "216005",
            "season": null,
            "vote_average": 6.971,
            "vote_count": 52
        },
        "imdb": {
            "id": "tt23732458"
        },
        "created": {
            "time": "2023-01-04T17:02:21.000Z"
        },
        "modified": {
            "time": "2025-04-09T11:24:51.000Z"
        },
        "_id": "63b54eadee616770bad8be46",
        "name": "MADOFF: Quái vật phố Wall",
        "origin_name": "MADOFF: The Monster of Wall Street",
        "content": "<p>Loạt phim tài liệu này dõi theo hành trình thăng trầm của nhà tài chính Bernie Madoff, người dàn dựng một trong những mô hình Ponzi lớn nhất lịch sử Phố Wall.</p>",
        "type": "series",
        "status": "completed",
        "thumb_url": "https://img.ophim.live/uploads/movies/madoff-quai-vat-pho-wall-thumb.jpg",
        "poster_url": "https://img.ophim.live/uploads/movies/madoff-quai-vat-pho-wall-poster.jpg",
        "is_copyright": false,
        "sub_docquyen": false,
        "chieurap": false,
        "trailer_url": "",
        "time": "54 phút/tập",
        "episode_current": "Hoàn Tất (4/4)",
        "episode_total": "4 Tập",
        "quality": "HD",
        "lang": "Vietsub",
        "notify": "",
        "showtimes": "",
        "slug": "madoff-quai-vat-pho-wall",
        "year": 2023,
        "view": 222,
        "actor": [
            ""
        ],
        "director": [
            ""
        ],
        "category": [
            {
                "id": "620e0e64d9648f114cde7728",
                "name": "Tài Liệu",
                "slug": "tai-lieu"
            }
        ],
        "country": [
            {
                "id": "620a231fe0fc277084dfd7ce",
                "name": "Âu Mỹ",
                "slug": "au-my"
            }
        ]
    },
    "episodes": [
        {
            "server_name": "Vietsub #1",
            "server_data": [
                {
                    "name": "1",
                    "slug": "1",
                    "filename": "MADOFF_ Quái vật phố Wall_S01E01_Kẻ nói dối, không phải kẻ thất bại",
                    "link_embed": "https://vip.opstream14.com/share/e3030406173074724559c34666f5830f",
                    "link_m3u8": "https://vip.opstream14.com/20230104/29074_52cf140a/index.m3u8"
                },
                {
                    "name": "2",
                    "slug": "2",
                    "filename": "MADOFF_ Quái vật phố Wall_S01E02_Đừng hỏi, đừng nói",
                    "link_embed": "https://vip.opstream14.com/share/b025330edaf516645245e837c04682f8",
                    "link_m3u8": "https://vip.opstream14.com/20230104/29075_c82938fb/index.m3u8"
                },
                {
                    "name": "3",
                    "slug": "3",
                    "filename": "MADOFF_ Quái vật phố Wall_S01E03_Nhắm mắt làm ngơ",
                    "link_embed": "https://vip.opstream14.com/share/744c7571cf7ab98667accb835b549b85",
                    "link_m3u8": "https://vip.opstream14.com/20230104/29076_5aa1c0fb/index.m3u8"
                },
                {
                    "name": "4",
                    "slug": "4",
                    "filename": "MADOFF_ Quái vật phố Wall_S01E04_Cái giá của việc tin tưởng",
                    "link_embed": "https://vip.opstream14.com/share/0853de1f652d3a206e18264d18eb3bb0",
                    "link_m3u8": "https://vip.opstream14.com/20230104/29077_db934b4a/index.m3u8"
                }
            ]
        }
    ]
}
*/

const MovieInfomationPage = () => {
  const { slug } = useParams();
  const naviagte = useNavigate();

  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const [episodes, setEpisodes] = useState([]);

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

  // Scroll to top first time smothly
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    console.log(movie);
  }, [movie]);

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
          <div className="flex flex-col gap-4 lg:bg-gradient-to-t lg:from-foreground lg:to-foreground via-transparent rounded-xl p-6 w-full lg:w-1/3">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col justify-center items-center">
                <img
                  src={movie.thumb_url}
                  alt={movie.name}
                  className="object-cover w-1/2 lg:w-full rounded-xl"
                />

                <div className="flex lg:hidden flex-col justify-center items-center mt-4">
                  <p className="text-2xl font-bold">{movie.origin_name}</p>
                  <p className="text-gray-500 text-sm">{movie.name}</p>
                </div>
              </div>

              <div className="hidden lg:block">
                <InfomationSection movie={movie} />
              </div>
            </div>
          </div>

          <div className="flex-1 bg-gradient-to-t from-foreground to-foreground via-transparent rounded-xl p-6 flex flex-col gap-10">
            <div className="flex items-center flex-wrap gap-4">
              <Button
                className="bg-primary px-8 py-4 rounded-full font-semibold uppercase flex items-center gap-2 text-lg hover:opacity-40"
                onClick={() => {
                  naviagte(`/xem-phim/${movie.slug}`);
                }}
              >
                <Icons.Play /> Xem ngay
              </Button>

              <div className="flex-1 flex items-center gap-2">
                <Button className="bg-transparent px-4 py-2 rounded-full flex items-center gap-2 flex-col text-sm hover:text-primary">
                  <Icons.Play /> Xem sau
                </Button>

                <Button className="bg-transparent px-4 py-2 rounded-full flex items-center gap-2 flex-col text-sm hover:text-primary">
                  <Icons.Heart /> Yêu thích
                </Button>
              </div>
            </div>

            <div className="lg:hidden">
              <InfomationSection movie={movie} />
            </div>

            {episodes?.server_data && episodes?.server_data.length > 0 && (
              <div className="flex flex-col">
                <h2 className="text-xl font-semibold">Danh sách tập phim</h2>

                <div className="mt-2 grid grid-cols-4 md:grid-cols-5 gap-2 max-h-[50vh] overflow-y-scroll scrollbar-white pr-1 rounded-xl">
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

            <CommentSection movieId={movie._id} />
          </div>
        </div>
      </Container>

      <TopMovieSection />

      {loading && (
        <div className="flex justify-center items-center h-screen">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8.009 8.009 0 0 1 12 20Z"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

const InfomationSection = ({ movie }) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-xl font-bold">
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
          movie?.category?.map(cat => (
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
            {movie.country?.map(country => country.name).join(", ")}
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

export default MovieInfomationPage;
