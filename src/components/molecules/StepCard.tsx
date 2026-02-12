import React from "react";

interface StepCardProps {
  step: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const StepCard: React.FC<StepCardProps> = ({ step, title, description, icon }) => {
  return (
    <div className="flex flex-col items-center text-center group">
      <div className="w-24 h-24 rounded-2xl bg-white border border-white shadow-lg flex items-center justify-center text-green mb-6 relative z-10 group-hover:text-white group-hover:bg-green-600 transition-all duration-300">
        {icon}
        <div className="absolute -top-3 -right-3 w-8 h-8 bg-green-700 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
          {step}
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-green-700 transition-colors">
        {title}
      </h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default StepCard;
