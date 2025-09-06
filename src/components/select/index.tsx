"use client";

import { useState } from "react";
import SelectTitle from "@/components/select/title";
import { OptionType } from "@/lib/types/select.types";

interface SelectCollapsibleProps {
  options: OptionType[];
  initialSelected?: OptionType;
  onSelect?: (option: OptionType) => void;
}

const SelectCollapsible = ({
  options,
  initialSelected,
  onSelect,
}: SelectCollapsibleProps) => {
  const [selectedOption, setSelectedOption] = useState<OptionType>(
    initialSelected || options[0],
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelectOption = (option: OptionType) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
    onSelect?.(option);
  };

  return (
    <div className="w-full relative">
      <SelectTitle
        title={selectedOption?.title}
        content={selectedOption?.content}
        isDropdownOpen={isDropdownOpen}
        onChevronClick={() => setIsDropdownOpen(!isDropdownOpen)}
      />

      {isDropdownOpen && (
        <div className="absolute w-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-20">
          <ul>
            {options.map((option, index) => (
              <li key={index}>
                <button
                  onClick={() => handleSelectOption(option)}
                  className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-300 transition-colors"
                >
                  {option.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SelectCollapsible;
