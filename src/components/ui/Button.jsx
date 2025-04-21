import React from "react";

const Button = ({
  type = "button",
  children,
  className = "",
  onClick = () => {},
  href = "",
}) => {
  if (href.length > 0) {
    return (
      <a
        className={`flex items-center justify-center gap-2 cursor-pointer hover:opacity-80 transition-all duration-200 ${className}`}
        href={href}
      >
        {children}
      </a>
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
