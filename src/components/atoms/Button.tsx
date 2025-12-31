"use client";

import React from "react";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-md hover:shadow-lg",
  secondary:
    "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg",
  outline:
    "bg-transparent border-2 border-green-600 text-green-700 hover:bg-green-50",
  ghost:
    "bg-transparent hover:bg-gray-100 text-gray-700",
  danger:
    "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-md hover:shadow-lg",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  iconPosition = "left",
  onClick,
  type = "button",
  className = "",
}) => {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`
        inline-flex items-center justify-center gap-2
        font-semibold rounded-lg
        transition-all duration-300
        transform hover:-translate-y-0.5
        focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? "w-full" : ""}
        ${isDisabled ? "opacity-50 cursor-not-allowed hover:transform-none" : ""}
        ${className}
      `}
    >
      {loading && (
        <svg
          className="animate-spin h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {!loading && icon && iconPosition === "left" && icon}
      {children}
      {!loading && icon && iconPosition === "right" && icon}
    </button>
  );
};

export default Button;
