import { InputGroupProps } from "@/lib/types/dss-input.dummy.types";
import React from "react";

const InputGroup: React.FC<InputGroupProps> = ({
  label,
  periods,
  onChange,
  values,
  errors,
  id = label.toLowerCase().replace(/\s+/g, "-"),
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="grid grid-cols-3 gap-2">
        {periods.map((period) => {
          const fieldId = `${id}-${period.replace(/\s+/g, "-").toLowerCase()}`;
          return (
            <div key={fieldId} className="flex flex-col">
              <span className="text-xs text-gray-500 mb-1">{period}</span>
              <input
                type="text"
                className={`border rounded p-2 ${
                  errors[fieldId] ? "border-red-500" : "border-gray-300"
                }`}
                value={values[fieldId] || ""}
                onChange={(e) => onChange(fieldId, +e.target.value)}
              />
              {errors[fieldId] && (
                <span className="text-red-500 text-xs mt-1">
                  {errors[fieldId]}
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
