import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import CardContainer from "./CardContainer";

import Loading from "./Loading";
import { LazyLoadImage } from "react-lazy-load-image-component";

/*
{
    "tmdb": {
      "type": "tv",
      "id": "204519",
      "season": null,
      "vote_average": 6.732,
      "vote_count": 28
    },
    "imdb": {
      "id": "tt21929398"
    },
    "created": {
      "time": "2023-01-05T08:27:02.000Z"
    },
    "modified": {
      "time": "2025-04-09T13:36:54.000Z"
    },
    "_id": "63b6276626368c50d47e044a",
    "name": "Anh Chàng Băng Giá Và Cô Đồng Nghiệp Lạnh Lùng",
    "origin_name": "The Ice Guy and His Cool Female Colleague",
    "content": "<p>Himuro là một nhân viên văn phòng thuộc chủng tộc siêu nhiên với sức mạnh kỳ lạ. Bất cứ khi nào anh ấy tập trung cao độ, anh ấy vô thức đẩy những người đồng nghiệp tội nghiệp của mình vào một màn trình diễn gần gũi của Bắc Cực. Mặc dù vậy, Himuro là một người ấm áp và tốt bụng. Himuro có thiện cảm với đồng nghiệp Fuyutsuki, một người phụ nữ điềm tĩnh, có sở trường đưa ra những giải pháp đơn giản cho những vấn đề khác thường của anh. Được thúc đẩy bởi sự tôn thờ và ham muốn to lớn, Himuro sẵn sàng làm bất cứ điều gì cần thiết để chiếm được trái tim cô.</p>",
    "type": "hoathinh",
    "status": "completed",
    "thumb_url": "https://img.ophim.live/uploads/movies/the-ice-guy-and-his-cool-female-colleague-thumb.jpg",
    "poster_url": "https://img.ophim.live/uploads/movies/the-ice-guy-and-his-cool-female-colleague-poster.jpg",
    "is_copyright": false,
    "sub_docquyen": false,
    "chieurap": false,
    "trailer_url": "",
    "time": "24 phút/tập",
    "episode_current": "Hoàn tất (12/12)",
    "episode_total": "12",
    "quality": "HD",
    "lang": "Vietsub",
    "notify": "",
    "showtimes": "",
    "slug": "the-ice-guy-and-his-cool-female-colleague",
    "year": 2023,
    "view": 50,
    "actor": [""],
    "director": [""],
    "category": [
      {
        "id": "620a220de0fc277084dfd16d",
        "name": "Tình Cảm",
        "slug": "tinh-cam"
      },
      {
        "id": "620a221de0fc277084dfd1c1",
        "name": "Hài Hước",
        "slug": "hai-huoc"
      },
      {
        "id": "620a2282e0fc277084dfd435",
        "name": "Viễn Tưởng",
        "slug": "vien-tuong"
      }
    ],
    "country": [
      {
        "id": "620a2307e0fc277084dfd726",
        "name": "Nhật Bản",
        "slug": "nhat-ban"
      }
    ]
  },
*/

const MovieCard = ({ movie, espicode = null }) => {
  const navigate = useNavigate();
  const handleClickMovie = () => {
    if (espicode) {
      navigate(`/xem-phim/${movie.slug}${espicode ? `?t=${espicode}` : ""}`);
    } else {
      navigate(`/phim/${movie.slug}`);
    }
  };

  return (
    <div className="relative bg-transparent">
      <CardContainer onClick={handleClickMovie}>
        <LazyLoadImage
          className="absolute inset-0 w-full h-full object-bottom object-cover"
          src={movie.thumb_url}
          alt={movie.name}
          placeholder={
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "url('/logo.png') no-repeat center center",
                backgroundSize: "contain",
              }}
            />
          }
        />
      </CardContainer>

      {espicode && (
        <span className="text-sm absolute top-2 left-2 bg-[rgba(0,0,0,0.5)] text-white px-2 py-1 rounded-md">
          Xem tiếp tập {espicode}
        </span>
      )}

      <motion.div
        className="absolute top-1 right-1 flex items-end justify-center text-white text-sm font-semibold flex-col gap-1 select-none bg-transparent"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {movie?.tmdb?.vote_average > 0 && (
          <span className="bg-[rgba(0,0,0,0.8)] px-2 py-1 rounded-md flex items-center gap-1 text-primary">
            {movie.tmdb.vote_average.toFixed(1)}
          </span>
        )}

        {movie?.episode_total > 1 && (
          <span className="bg-[rgba(0,0,0,0.4)] px-2 py-1 rounded-md">
            {movie.episode_total} Tập
          </span>
        )}

        <span className="bg-[rgba(0,0,0,0.4)] px-2 py-1 rounded-md">
          {movie.year}
        </span>
      </motion.div>

      <h3 className="p-2 text-white text-base font-semibold truncate whitespace-break-spaces text-center">
        {movie.name}{" "}
      </h3>
    </div>
  );
};

export default MovieCard;
