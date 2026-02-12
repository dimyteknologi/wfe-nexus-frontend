import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
}

const sizeStyles = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-7xl",
  xl: "max-w-screen-xl",
  full: "max-w-full",
};

const Container: React.FC<ContainerProps> = ({
  children,
  size = "lg",
  className = "",
}) => {
  return (
    <div className={`container mx-auto px-4 sm:px-6 ${sizeStyles[size]} ${className}`}>
      {children}
    </div>
  );
};

export default Container;
