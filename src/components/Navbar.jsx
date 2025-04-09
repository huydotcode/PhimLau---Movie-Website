import React from "react";
import logo from "../assets/logo.svg";
import Icons from "./Icons";
import { navlink } from "../constants/navlink";
import Button from "./ui/Button";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center h-[60px] px-4 text-white">
      <div className="w-[140px] flex items-center">
        <a className="w-full h-full text-primary" href="/">
          <img className="object-center" src={logo} alt="Phim Lâu" />
        </a>
      </div>

      <div className="absolute top-5 left-1/2 -translate-x-1/2 flex justify-center items-center">
        <ul className="flex items-center gap-4">
          {navlink.map((item, index) => (
            <li
              key={index}
              className="ml-4 text-sm font-bold hover:text-primary transition-all duration-200 hover:scale-105"
            >
              <a href={item.link}>{item.name}</a>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ul className="flex items-center gap-6">
          <Button>
            <Icons.Search className="w-5 h-5" />
          </Button>

          <Button>
            <Icons.Notification className="w-6 h-6" />
          </Button>

          <Button>
            <Icons.User className="w-6 h-6" />
          </Button>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
