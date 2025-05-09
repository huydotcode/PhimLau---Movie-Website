import React, { useEffect, useRef, useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Button from "./ui/Button";
import { useNavigate } from "react-router";
import { useTopNewMovies } from "../hooks/useMovies";
import Loading from "./Loading";

/*
  {
    "tmdb": {
      "type": "movie",
      "id": "157336",
      "season": null,
      "vote_average": 8.44,
      "vote_count": 35297
    },
    "imdb": {
      "id": "tt0816692"
    },
    "created": {
      "time": "2022-03-17T12:22:00.363Z"
    },
    "modified": {
      "time": "2024-10-06T11:46:33.000Z"
    },
    "_id": "623327e83c735a9a446e003c",
    "name": "Hố Đen Tử Thần",
    "origin_name": "Interstellar",
    "content": "<p>Tương lai của Trái đất đã bị thủng bởi thảm họa, nạn đói và hạn hán. Chỉ có một cách để đảm bảo sự tồn tại của nhân loại: Du lịch giữa các vì sao. Một wormhole mới được phát hiện ở xa tầm xa của hệ mặt trời của chúng ta cho phép một nhóm phi hành gia đi nơi không có người đàn ông nào đi trước đó, một hành tinh có thể có môi trường phù hợp để duy trì cuộc sống của con người.</p>",
    "type": "single",
    "status": "completed",
    "thumb_url": "ho-den-tu-than-thumb.jpg",
    "is_copyright": false,
    "trailer_url": "",
    "time": "Đang cập nhật",
    "episode_current": "Full",
    "episode_total": "1",
    "quality": "HD",
    "lang": "Vietsub",
    "notify": "",
    "showtimes": "",
    "slug": "ho-den-tu-than",
    "year": 2014,
    "view": 442,
    "actor": [""],
    "director": [""],
    "category": [
      {
        "id": "620a2282e0fc277084dfd435",
        "name": "Viễn Tưởng",
        "slug": "vien-tuong"
      },
      {
        "id": "620a229be0fc277084dfd4dd",
        "name": "Khoa Học",
        "slug": "khoa-hoc"
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
        "id": "620a2381e0fc277084dfd9c6",
        "name": "Canada",
        "slug": "canada"
      }
    ],
    "chieurap": false,
    "poster_url": "ho-den-tu-than-poster.jpg",
    "sub_docquyen": false
  },
  */
const Banner = () => {
  const swiperRef = useRef();
  const navigate = useNavigate();

  const { data: bannerMovies } = useTopNewMovies({ enabled: true, limit: 10 });

  const [activeIndex, setActiveIndex] = useState(0);

  const handleClickMovie = (movie) => {
    navigate(`/xem-phim/${movie.slug}`);
  };

  return (
    <>
      <div className="@container relative w-screen h-[90vh] overflow-hidden">
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          slidesPerView={1}
          loop
          spaceBetween={0}
          modules={[Autoplay]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.activeIndex);
          }}
          className="w-full h-full cursor-pointer"
        >
          {bannerMovies &&
            bannerMovies.map((movie, index) => (
              <SwiperSlide key={movie._id} virtualIndex={index}>
                <div className="@container relative flex h-full">
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
                  <div className="relative z-10 flex flex-col justify-center pl-10 text-white w-1/2 gap-2 mt-[20vh] @max-3xl:w-3/4 @max-3xl:mt-[20vh]">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4">
                      {movie?.name}
                    </h1>
                    <div className="flex gap-2 mb-3 @max-xl:hidden">
                      <span className="bg-white text-black px-2 py-1 text-sm rounded opacity-70">
                        IMDB: {movie?.tmdb.vote_average.toFixed(1)}
                      </span>
                      <span className="bg-[rgba(0,0,0,0.5)]  px-2 py-1 text-sm rounded">
                        {movie?.category.map((cat) => cat.name).join(", ")}
                      </span>
                      <span className="bg-[rgba(0,0,0,0.5)]  px-2 py-1 text-sm rounded">
                        {movie?.country
                          .map((country) => country.name)
                          .join(", ")}
                      </span>
                    </div>
                    <div
                      className="text-sm max-w-md text-justify line-clamp-10 @max-3xl:line-clamp-5 @max-xl:max-w-3/4"
                      dangerouslySetInnerHTML={{ __html: movie?.content }}
                    />
                    <div className="mt-5 flex gap-4 items-center">
                      <Button
                        className="bg-primary text-white px-6 py-2 rounded-3xl h-12 font-semibold uppercase"
                        onClick={() => handleClickMovie(movie)}
                      >
                        Xem ngay
                      </Button>
                      <Button
                        className="border text-xs border-white px-4 py-2 rounded-full h-10"
                        onClick={() => {
                          navigate(`/phim/${movie.slug}`);
                        }}
                      >
                        Chi tiết
                      </Button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>

        {/* Slider thumbnail bên dưới phải */}
        <div className="absolute bottom-5 right-5 w-4/5 md:w-3/4 xl:w-3/5 flex max-h-[130px]">
          <Swiper slidesPerView={10} spaceBetween={10}>
            {bannerMovies &&
              bannerMovies.map((movie, index) => (
                <SwiperSlide
                  key={movie._id}
                  onClick={() => {
                    setActiveIndex(index);
                    if (swiperRef.current) {
                      swiperRef.current.slideTo(index); // Chuyển đến slide tương ứng
                    }
                  }}
                  className={`rounded-xl border-white h-full border-2 overflow-hidden cursor-pointer hover:opacity-90 ${activeIndex === index ? "opacity-100" : "opacity-50"}`}
                >
                  <img src={movie.thumb_url} className={"object-cover"} />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default Banner;
