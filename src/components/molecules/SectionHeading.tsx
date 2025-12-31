import React from "react";
import Badge from "@/components/atoms/Badge";

interface SectionHeadingProps {
  badge?: string;
  badgeVariant?: "default" | "success" | "info" | "warning";
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  badgeVariant = "success",
  title,
  subtitle,
  align = "center",
  className = "",
}) => {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-3xl mb-16 ${alignClass} ${className}`}>
      {badge && (
        <Badge variant={badgeVariant} className="mb-4">
          {badge}
        </Badge>
      )}
      <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-xl text-gray-600 leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
};

export default SectionHeading;
