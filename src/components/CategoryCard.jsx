import React from "react";
import { useNavigate } from "react-router";
import CardContainer from "./CardContainer";

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();

  const getColorByGenre = genre => {
    switch (genre.toLowerCase()) {
      case "hành động":
        return "from-red-600 to-red-900";
      case "hài hước":
        return "from-black to-gray-800";
      case "hình sự":
        return "from-yellow-400 to-yellow-600";
      case "tình cảm":
        return "from-pink-500 to-pink-700";
      case "tâm lý":
        return "from-blue-700 to-indigo-900";
      case "phiêu lưu":
        return "from-green-400 to-green-700";
      case "chính kịch":
        return "from-purple-600 to-purple-900";

      default:
        return "from-gray-700 to-gray-900";
    }
  };

  const handleClick = () => {
    navigate(`/the-loai/${category.slug}`);
  };

  return (
    <CardContainer
      className={`bg-gradient-to-b ${getColorByGenre(category.name)}`}
      onClick={handleClick}
    >
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-20 bg-transparent">
        <h2 className="text-lg font-bold">{category.name}</h2>
      </div>
    </CardContainer>
  );
};

export default CategoryCard;
