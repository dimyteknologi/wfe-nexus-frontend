"use client";

import { useState, ReactNode } from "react";
import IconChevronRight from "../icon/ChevronRight";

interface iCollapsibleTitle {
  title?: string;
  content: ReactNode;
  onClick: () => void;
}

const CollapsibleTitle = ({ title, content, onClick }: iCollapsibleTitle) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full relative">
      {/* Container Title */}
      <div className="relative flex items-center w-full p-2">
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-200">
          <div className="h-full bg-green-700" style={{ width: "100%" }}></div>
        </div>
        <div className="w-[10%] flex items-center">
          <button
            onClick={onClick}
            disabled
            aria-disabled="true"
            className="transition-transform duration-300 cursor-not-allowed"
          >
            <IconChevronRight className="text-xs" />
          </button>
        </div>
        <div className="flex-grow text-left">
          <h2 className="text-lg md:text-xl text-gray-800">{title}</h2>
        </div>
        <div className="w-[10%] flex justify-end">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            className="w-7 h-7 flex items-center justify-center bg-white border-2 border-gray-400 rounded-full text-gray-500 font-bold text-lg hover:bg-gray-100 transition-colors"
          >
            i
          </button>
        </div>
      </div>
      {/* Content */}
      <div
        className={`
          absolute w-full left-0 transition-all duration-300 ease-in-out
          ${
            isOpen
              ? "opacity-100 translate-y-0 visible z-10"
              : "opacity-0 -translate-y-4 invisible -z-10"
          }
        `}
      >
        <div className="p-4 bg-white text-sm text-justify rounded-b-md shadow-lg border-none h-[200px]">
          {content}
        </div>
      </div>
    </div>
  );
};

export default CollapsibleTitle;
