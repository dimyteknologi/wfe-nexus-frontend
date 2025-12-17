"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Globe size={20} className="text-gray-500" />
      <button
        onClick={toggleLanguage}
        className="relative flex items-center bg-gray-200 rounded-full p-1 w-20 h-9 focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors shadow-inner"
        aria-label={language === "en" ? "Switch to Indonesian" : "Switch to English"}
        title={language === "en" ? "Switch to Indonesian" : "Switch to English"}
      >
        <motion.div
          layout
          className="absolute bg-white rounded-full w-7 h-7 shadow-md z-10 flex items-center justify-center text-[10px] font-bold text-green-700"
          initial={false}
          animate={{
            x: language === "en" ? 0 : 44,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          {language.toUpperCase()}
        </motion.div>
        <span
          className={`absolute left-2 text-xs font-bold transition-opacity duration-300 ${
            language === "en" ? "opacity-0" : "opacity-100 text-gray-500"
          }`}
        >
          EN
        </span>
        <span
          className={`absolute right-2 text-xs font-bold transition-opacity duration-300 ${
            language === "id" ? "opacity-0" : "opacity-100 text-gray-500"
          }`}
        >
          ID
        </span>
      </button>
    </div>
  );
};

export default LanguageToggle;
