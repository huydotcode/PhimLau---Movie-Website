import React from "react";

const LayoutWithoutBanner = ({ children }) => {
  return (
    <div className="@container container mx-auto px-4 pt-[80px] pb-10">
      {children}
    </div>
  );
};

export default LayoutWithoutBanner;
