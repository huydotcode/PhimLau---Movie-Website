import React from "react";

const Button = ({ children, className = "", onClick, href }) => {
  if (href) {
    return (
      <a
        className={`flex items-center justify-center gap-2 cursor-pointer hover:opacity-80 ${className}`}
        href={href}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={`flex items-center justify-center gap-2 cursor-pointer hover:opacity-80 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
