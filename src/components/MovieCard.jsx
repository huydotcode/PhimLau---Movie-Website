import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import CardContainer from "./CardContainer";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const handleClickMovie = () => {
    navigate(`/movie/${movie.slug}`);
  };

  return (
    <CardContainer onClick={handleClickMovie}>
      <img
        src={movie.poster_url}
        alt={movie.name}
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-2">
        <h3 className="text-white text-base font-semibold truncate">
          {movie.name}
        </h3>
      </div>
    </CardContainer>
  );
};

export default MovieCard;
