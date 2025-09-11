"use client";

import { useState } from "react";
import SelectTitle from "@/components/select/title";
import { OptionType } from "@/lib/types/select.types";

interface SelectCollapsibleProps {
  groupedOptions: { category: string; options: OptionType[] }[];
  selectedValue: OptionType | null;
  onSelect: (selectedId: string) => void;
}

const groupLabel = (param: string) => {
  if (param == "SE") return "Socio Economic";
  if (param == "FOOD") return "Food Security";
  if (param == "ENERGY") return "Energy";
  if (param == "WATER") return "Water";
  return param;
};

const SelectCollapsible = ({
  groupedOptions,
  selectedValue,
  onSelect,
}: SelectCollapsibleProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(e.target.value);
    setIsDropdownOpen(false);
  };

  return (
    <div className="w-full relative">
      <SelectTitle
        title={selectedValue?.title}
        content={selectedValue?.content}
        isDropdownOpen={isDropdownOpen}
        onChevronClick={() => setIsDropdownOpen(!isDropdownOpen)}
      />
      {isDropdownOpen && (
        <div className="absolute w-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-20">
          <select
            value={selectedValue?.id || ""}
            onChange={handleSelectChange}
            className="w-full p-2 border-none outline-none"
            size={10}
            onBlur={() => setIsDropdownOpen(false)}
            autoFocus
          >
            {selectedValue && (
              <optgroup
                label="Current Selection"
                className="text-sm text-gray-400"
              >
                <option value={selectedValue.id}>{selectedValue.title}</option>
              </optgroup>
            )}

            {groupedOptions.map((group) => (
              <optgroup
                key={group.category}
                label={groupLabel(group.category)}
                className="font-bold text-gray-400 text-sm"
              >
                {group.options.map((option) => (
                  <option
                    key={option.id}
                    value={option.id}
                    className="text-sm text-slate-800"
                  >
                    {option.title}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default SelectCollapsible;
