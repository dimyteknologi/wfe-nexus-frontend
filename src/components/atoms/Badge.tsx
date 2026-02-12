import React from "react";

type BadgeVariant = "default" | "success" | "info" | "warning";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-gray-100 text-gray-800",
  success: "bg-green-100 text-green-800",
  info: "bg-blue-100 text-blue-800",
  warning: "bg-amber-100 text-amber-800",
};

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  className = "",
}) => {
  return (
    <div
      className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${variantStyles[variant]} ${className}`}
    >
      {children}
    </div>
  );
};

export default Badge;
