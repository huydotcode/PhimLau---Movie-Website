import React from "react";

const VideoPlayer = ({ ref, src }) => {
  return (
    <>
      <iframe
        ref={ref}
        className="aspect-video border-secondary"
        src={src}
        title="Video Player"
        allowFullScreen
        allow="autoplay; encrypted-media; picture-in-picture"
      ></iframe>
    </>
  );
};

export default VideoPlayer;
