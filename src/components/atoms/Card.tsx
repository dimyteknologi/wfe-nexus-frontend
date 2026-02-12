import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingStyles = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hover = false,
  padding = "md",
}) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md ${paddingStyles[padding]} ${
        hover ? "transition-transform hover:scale-105 duration-300" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
