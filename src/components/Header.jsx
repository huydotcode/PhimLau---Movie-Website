import React from "react";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className="z-20 fixed top-0 left-0 right-0 w-screen bg-[rgba(0,0,0,0.1)] backdrop-blur-sm h-[60px]">
      <Navbar />
    </header>
  );
};

export default Header;
