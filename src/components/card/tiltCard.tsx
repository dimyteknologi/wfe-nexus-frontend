"use client";
import React, { useRef, useEffect, RefObject } from "react";
import Image from "next/image";

interface TiltEffect {
  rotateX: number;
  rotateY: number;
  translateZ: number;
  glowX: number;
  glowY: number;
  shadowX: number;
  shadowY: number;
}

interface ITiltCard {
  path: string;
  name: string;
}

const TiltCard = ({ path, name }: ITiltCard) => {
  const cardRef: RefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent): void => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate tilt angles (reduced intensity for smoother effect)
      const rotateX = (y - centerY) / 8;
      const rotateY = (centerX - x) / 8;

      // Calculate glow position
      const glowX = (x / rect.width) * 100;
      const glowY = (y / rect.height) * 100;

      // Calculate shadow offset
      const shadowX = (x - centerX) / 15;
      const shadowY = (y - centerY) / 15;

      const tiltEffect: TiltEffect = {
        rotateX,
        rotateY,
        translateZ: 20,
        glowX,
        glowY,
        shadowX,
        shadowY,
      };

      applyTiltEffect(card, tiltEffect);
    };

    const handleMouseLeave = (): void => {
      if (!card) return;

      card.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
      card.style.background = "";
      card.style.boxShadow = "0 10px 25px rgba(0,0,0,0.1)";
    };

    const applyTiltEffect = (
      element: HTMLElement,
      effect: TiltEffect,
    ): void => {
      const { rotateX, rotateY, translateZ, glowX, glowY, shadowX, shadowY } =
        effect;

      element.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateZ(${translateZ}px)
      `;

      // Add glow effect
      element.style.background = `
        radial-gradient(circle at ${glowX}% ${glowY}%, 
        rgba(255,255,255,0.8) 0%, 
        rgba(255,255,255,0.3) 50%, 
        rgba(255,255,255,0.1) 100%)
      `;

      // Add dynamic shadow
      element.style.boxShadow = `
        ${shadowX}px ${shadowY}px 30px rgba(0,0,0,0.2),
        0 0 50px rgba(59, 130, 246, 0.3)
      `;
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`group cursor-pointer tilt-card`}
      style={{
        transformStyle: "preserve-3d",
        transition: "transform 0.1s ease-out, box-shadow 0.1s ease-out",
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        userSelect: "none",
      }}
    >
      <div className="relative overflow-hidden rounded-xl h-64 bg-white">
        <div className="absolute inset-0">
          <Image
            src={path}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            style={{
              transform: "translateZ(30px)",
            }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />

          {/* Overlay gradient */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ transform: "translateZ(40px)" }}
          />
        </div>
      </div>
    </div>
  );
};

export default TiltCard;
