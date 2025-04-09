import React, { useEffect, useRef, useState } from "react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Button from "./ui/Button";

const Banner = () => {
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
  const swiperRef = useRef();

  const [bannerMovies, setBannerMovies] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    (async () => {
      // Read json from src/json/movies_top.json
      const response = await fetch("/src/json/movies_top_rated.json");
      const data = await response.json();

      if (data && data.length > 0) {
        setBannerMovies(data);
      }
    })();
  }, []);

  useEffect(() => {
    console.log("bannerMovies", bannerMovies);
  }, [bannerMovies]);

  return (
    <>
      <div className="relative w-full h-[90vh] overflow-hidden">
        <Swiper
          onSwiper={swiper => (swiperRef.current = swiper)}
          slidesPerView={1}
          loop
          spaceBetween={0}
          modules={[Autoplay]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          onSlideChange={swiper => {
            setActiveIndex(swiper.realIndex);
          }}
          className="w-full h-full"
        >
          {bannerMovies.map(movie => (
            <SwiperSlide key={movie._id}>
              <div className="relative flex h-full">
                {/* Hình background */}
                <div
                  className="absolute inset-0 bg-cover bg-top brightness-[.5]"
                  style={{
                    backgroundImage: `url(${movie.poster_url})`,
                  }}
                />

                {/* Thông tin phim bên trái */}
                <div className="relative z-10 flex flex-col justify-center pl-10 text-white w-1/2 gap-2 mt-[20vh]">
                  <h1 className="text-5xl font-bold mb-4">{movie?.name}</h1>
                  <div className="flex gap-2 mb-3">
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
                    className="text-sm max-w-md text-justify line-clamp-10"
                    dangerouslySetInnerHTML={{ __html: movie?.content }}
                  />
                  <div className="mt-5">
                    <Button className="bg-primary text-white px-6 py-2 rounded-3xl h-12 font-semibold uppercase">
                      Xem ngay
                    </Button>
                    <Button className="ml-4 border text-xs border-white px-4 py-2 rounded-full h-10">
                      Chi tiết
                    </Button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Slider thumbnail bên dưới phải */}
        <div className="absolute bottom-5 right-5 w-2/5">
          <Swiper slidesPerView={6} spaceBetween={10}>
            {bannerMovies.map((movie, index) => (
              <SwiperSlide
                key={movie._id}
                onClick={() => {
                  setActiveIndex(index);
                  if (swiperRef.current) {
                    swiperRef.current.slideTo(index); // Chuyển đến slide tương ứng
                  }
                }}
                className={`rounded-xl border-white border-2 overflow-hidden cursor-pointer hover:opacity-90 ${activeIndex === index ? "opacity-100" : "opacity-50"}`}
              >
                <img src={movie.thumb_url} className={"  object-cover"} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default Banner;
