import React from "react";
import Image from "next/image";

interface LoadingProps {
  className?: string;
}

export const Loading: React.FC<LoadingProps> = ({ className }) => {
  return (
    <div className={`flex flex-col items-center justify-center min-h-[50vh] ${className}`}>
      <div className="relative w-32 h-32 mb-8 animate-pulse">
        <Image
          src="/assets/nexus-logo.png"
          alt="WFE Nexus Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-green-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-3 h-3 bg-green-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-3 h-3 bg-green-600 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};
