import React from "react";

const Container = ({ className = "", children }) => {
  return (
    <div
      className={`@container relative w-screen h-full max-w-screen-2xl mx-auto px-4 lg:px-10 xl:px-14 2xl:px-20 ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
