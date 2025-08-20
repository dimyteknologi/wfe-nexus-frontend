import { InputGroupProps } from "@/lib/types/dss-input.dummy.types.rtk";
import React from "react";

const InputGroup: React.FC<InputGroupProps> = ({
  label,
  periods,
  onChange,
  values,
  errors,
  id,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="grid grid-cols-3 gap-2">
        {periods.map((period) => {
          const uniqueId = `${id}.${period}`;
          const value = values[uniqueId] ?? "";
          return (
            <div key={uniqueId} className="flex flex-col">
              <span className="text-xs text-gray-500 mb-1">{period}</span>
              <input
                type="number"
                className={`border rounded p-2 ${
                  errors[uniqueId] ? "border-red-500" : "border-gray-300"
                }`}
                value={value}
                onChange={(e) => onChange(uniqueId, +e.target.value)}
              />
              {errors[uniqueId] && (
                <span className="text-red-500 text-xs mt-1">
                  {errors[uniqueId]}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InputGroup;
