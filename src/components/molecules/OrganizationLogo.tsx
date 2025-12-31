import React from "react";

interface OrganizationLogoProps {
  id: number;
  name: string;
  imgSrc: string;
  size?: "sm" | "md" | "lg";
  showName?: boolean;
  className?: string;
}

const sizeStyles = {
  sm: "w-12 h-12",
  md: "h-20 w-28",
  lg: "w-32 h-32",
};

const OrganizationLogo: React.FC<OrganizationLogoProps> = ({
  name,
  imgSrc,
  size = "md",
  showName = false,
  className = "",
}) => {
  if (showName) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 transition-transform hover:scale-110 duration-300">
        <div
          className={`${sizeStyles[size]} hover:grayscale-0 transition-all duration-500 ${className}`}
        >
          <img
            className="w-full h-full object-contain"
            src={imgSrc}
            alt={name}
          />
        </div>
        <p className="text-gray-500 text-sm text-center">{name}</p>
      </div>
    );
  }

  return (
    <div
      className={`${sizeStyles[size]} rounded-full bg-white border border-green-700 shadow-md p-3 ${className}`}
    >
      <img className="object-cover" src={imgSrc} alt={name} />
    </div>
  );
};

export default OrganizationLogo;
