import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTopNewMovies } from "../hooks/useMovies";
import Button from "./ui/Button";

const Banner = ({
  className = "",
  hasInfo = true,
  hasSwiperThumbnail = true,
  infoPosition = "left",
}) => {
  const swiperRef = useRef();
  const navigate = useNavigate();

  const { data: bannerMovies } = useTopNewMovies({ enabled: true, limit: 10 });

  const [activeIndex, setActiveIndex] = useState(0);

  const handleClickMovie = (movie) => {
    navigate(`/xem-phim/${movie.slug}`);
  };


  const positionClass = infoPosition === "left" ? "w-3/4 lg:w-2/5 top-1/2 -translate-y-1/2 left-0" : infoPosition === "right" ? "right-0" : infoPosition === "bottom" ? "bottom-4 right-4 opacity-60 w-3/4 text-right" : "top-0";
  const isBottom = infoPosition === "bottom";

  return (
    <>
      <div className={`@container relative w-full h-[90vh] overflow-hidden ${className}`}>
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
                  <div className={`absolute z-10 flex flex-col justify-center pl-10 text-white gap-2 ${positionClass}`}>
                    <h1 className={`font-bold mb-4 ${isBottom ? "text-md w-full" : "text-3xl md:text-5xl"}`}>
                      {movie?.name}
                    </h1>
                    {hasInfo && !isBottom && <>
                      <div className={`flex gap-2 mb-3 @max-xl:hidden`}>
                        <span className="bg-white text-black px-2 py-1 text-sm rounded opacity-70">
                          IMDB: {movie?.tmdb.vote_average.toFixed(1)}
                        </span>
                        <span className={`bg-[rgba(0,0,0,0.5)] px-2 py-1 text-sm rounded ${isBottom && "text-ellipsis max-w-[100px] whitespace-nowrap overflow-hidden"}`}>
                          {movie?.category.map((cat) => cat.name).join(", ")}
                        </span>
                        <span className="bg-[rgba(0,0,0,0.5)]  px-2 py-1 text-sm rounded">
                          {movie?.country
                            .map((country) => country.name)
                            .join(", ")}
                        </span>
                      </div>
                      <div
                        className="text-justify line-clamp-5 w-full"
                        dangerouslySetInnerHTML={{
                          __html: movie?.content
                            .concat(movie?.content)
                            .concat(movie?.content),
                        }}
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
                    </>}
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>

        {/* Slider thumbnail bên dưới phải */}
        {hasSwiperThumbnail && <div className="absolute bottom-5 right-5 hidden md:flex md:w-3/4 xl:w-3/5 max-h-[130px]">
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
        </div>}
      </div>
    </>
  );
};

export default Banner;
