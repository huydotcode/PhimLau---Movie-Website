import React from "react";
import { Link } from "react-router";

const Button = ({
  type = "button",
  children,
  className = "",
  onClick = () => {},
  href = "",
}) => {
  if (href.length > 0) {
    return (
      <Link
        className={`flex items-center justify-center gap-2 cursor-pointer hover:opacity-80 transition-all duration-200 ${className}`}
        to={href}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={`flex items-center justify-center gap-2 cursor-pointer hover:opacity-80 transition-all duration-200 ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
