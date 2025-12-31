"use client";

import React from "react";
import { motion } from "framer-motion";

interface SecurityCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgColor: string;
  iconBgColor: string;
  iconColor: string;
}

const SecurityCard: React.FC<SecurityCardProps> = ({
  icon,
  title,
  description,
  bgColor,
  iconBgColor,
  iconColor,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`${bgColor} p-6 rounded-xl`}
    >
      <div
        className={`w-16 h-16 ${iconBgColor} rounded-full flex items-center justify-center mb-4 mx-auto`}
      >
        <div className={iconColor}>{icon}</div>
      </div>
      <h3 className="text-xl font-semibold text-center mb-2">{title}</h3>
      <p className="text-gray-600 text-center text-sm leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

export default SecurityCard;
