import React from "react";

const Avatar = ({ imgSrc }) => {
  return (
    <div className="w-10 h-10">
      <img
        src={imgSrc}
        alt="Avatar"
        className="w-full h-full rounded-full object-cover"
      />
    </div>
  );
};

export default Avatar;
