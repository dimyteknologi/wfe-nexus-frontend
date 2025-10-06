"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: SelectOption[];
  selectedValues: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selectedValues,
  onChange,
  placeholder = "Select options...",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  const handleRemove = (value: string, e: React.MouseEvent) => {
    e.stopPropagation();
    handleSelect(value);
  };

  const selectedOptions = options.filter((opt) =>
    selectedValues.includes(opt.value),
  );

  return (
    <div ref={containerRef} className="relative w-full">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex min-h-[38px] cursor-pointer items-center gap-2 rounded border border-gray-300 bg-white p-2"
      >
        <div className="flex flex-grow flex-wrap gap-1">
          {selectedOptions.length > 0 ? (
            selectedOptions.map((option) => (
              <div
                key={option.value}
                className="flex items-center gap-1 rounded bg-gray-200 px-2 py-0.5 text-xs"
              >
                {option.label}
                <button onClick={(e) => handleRemove(option.value, e)}>
                  <X size={12} />
                </button>
              </div>
            ))
          ) : (
            <span className="text-gray-500 text-xs">{placeholder}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {/* <button
            onClick={(e) => {
              e.stopPropagation();
              onChange([]);
            }}
          > */}
          {/* <X size={18} className="text-gray-500" /> */}
          {/* </button> */}
          {/* <div className="h-full w-px bg-gray-300"></div> */}
          <ChevronDown
            size={12}
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </div>

      {isOpen && (
        <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded border border-gray-200 bg-white shadow-lg">
          {options.map((option) => {
            const isSelected = selectedValues.includes(option.value);
            return (
              <li
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`cursor-pointer text-xs px-4 py-2 hover:bg-gray-100 ${
                  isSelected ? "bg-blue-100 font-semibold" : ""
                }`}
              >
                {option.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default MultiSelect;
