"use client";

import { useState, ReactNode } from "react";
import { ChevronRight, InfoIcon } from "lucide-react";

interface SelectTitleProps {
  title?: string;
  content?: ReactNode;
  isDropdownOpen: boolean;
  height?: number | string;
  onChevronClick: () => void;
}

const SelectTitle = ({
  title,
  content,
  isDropdownOpen,
  onChevronClick,
}: SelectTitleProps) => {
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  return (
    <div className="w-full relative bg-white">
      <div className="relative flex items-center w-full p-2">
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-200">
          <div className="h-full bg-green-700" style={{ width: "100%" }}></div>
        </div>
        <div className="w-[10%] flex items-center">
          <button
            onClick={onChevronClick}
            className={`transition-transform duration-300 cursor-pointer ${isDropdownOpen ? "rotate-90" : "rotate-0"}`}
          >
            <ChevronRight className="text-xs" />
          </button>
        </div>
        <div className="flex-grow text-left">
          <h2 className="text-md md:text-sm text-gray-800">{title}</h2>
        </div>
        <div className="w-[10%] flex justify-end">
          <button
            onClick={() => setIsInfoOpen(!isInfoOpen)}
            aria-expanded={isInfoOpen}
            className="w-7 h-7 flex items-center justify-center bg-white rounded-full text-gray-500 font-bold text-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <InfoIcon />
          </button>
        </div>
      </div>
      <div
        className={`
          absolute w-full left-0 transition-all max-h-20 duration-300 ease-in-out z-10
          ${
            isInfoOpen
              ? "opacity-100 translate-y-0 visible"
              : "opacity-0 -translate-y-4 invisible"
          }
        `}
      >
        <div
          className={`p-4 bg-white h-[220px] text-sm text-slate-500 text-justify rounded-b-md shadow-lg overflow-y-auto`}
        >
          {content}
        </div>
      </div>
    </div>
  );
};

export default SelectTitle;
