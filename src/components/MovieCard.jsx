import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router";
import CardContainer from "./CardContainer";

import { LazyLoadImage } from "react-lazy-load-image-component";
import Loading from "./Loading";

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
        <Link
          to={`/phim/${movie.slug}`}
          className="absolute inset-0 z-10"
        ></Link>
        <LazyLoadImage
          wrapperClassName="w-full h-full"
          src={movie.thumb_url}
          alt={movie.name}
          className="w-full h-full object-cover object-center"
          effect="opacity"
          placeholder={<Loading />}
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
        {movie.name}
      </h3>
    </div>
  );
};

export default MovieCard;
