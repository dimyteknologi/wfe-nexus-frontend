"use client";

import React, { useRef, useState } from "react";

interface TiltCardProps {
  feature: {
    icon: React.ReactElement;
    description: string;
    image: string;
    color: string;
    title: string;
  };
  index: number;
  isVisible: boolean;
}

const TiltCard = ({ feature, index, isVisible }: TiltCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    setMousePosition({ x, y });

    if (cardRef.current) {
      cardRef.current.style.transform = `
        perspective(1000px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg)
        scale3d(1.02, 1.02, 1.02)
      `;
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (cardRef.current) {
      cardRef.current.style.transform = `
        perspective(1000px) 
        rotateX(0deg) 
        rotateY(0deg)
        scale3d(1, 1, 1)
      `;
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div
      ref={cardRef}
      className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden transform-gpu ${
        isVisible ? "animate-fade-in" : "opacity-0"
      }`}
      style={{
        animationDelay: `${index * 100}ms`,
        transition: "transform 0.1s ease-out, box-shadow 0.3s ease",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <div className="h-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-green-50"></div>
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center">
            <div
              className={`bg-gradient-to-r ${feature.color} rounded-full p-3 text-white`}
            >
              {feature.icon}
            </div>
          </div>
        </div>

        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.4) 0%, transparent 80%)`,
            opacity: isHovered ? 1 : 0,
          }}
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          {feature.title}
        </h3>
        <p className="text-gray-600 leading-relaxed mb-4">
          {feature.description}
        </p>
      </div>

      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          boxShadow: isHovered ? `0 0 0 2px rgba(5, 150, 105, 0.2)` : "none",
          transition: "box-shadow 0.3s ease",
        }}
      />
    </div>
  );
};

export default TiltCard;
