import { InputGroupProps } from "@/lib/types/dss-input.dummy.types.rtk";
import { Info } from "lucide-react";
import React, { useCallback, useState } from "react";

const InputGroup: React.FC<InputGroupProps> = ({
  label,
  periods,
  onChange,
  onBlur,
  values,
  errors,
  id,
  information,
  min,
  max,
}) => {
  const [isHover, setIsHover] = useState(false);

  const mouseHover = useCallback(() => setIsHover((current) => !current), []);
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center text-sm font-medium text-gray-700 mb-1">
        <div>{label}</div>
        <div
          className="relative"
          onMouseEnter={mouseHover}
          onMouseLeave={mouseHover}
        >
          <div>
            <Info size={15} />
          </div>
          {isHover && (
            <div className="absolute z-500 right-0 top-0 w-75 translate-y-5 bg-white border-2 border-green-600 rounded-xl p-2 shadow-xl">
              <p className="text-xs">
                <span className="text-black">Description:</span> {information}
              </p>
              <p className="text-xs">
                <span className="text-black">Min:</span> {min}
              </p>
              <p className="text-xs">
                <span className="text-black">Max:</span> {max}
              </p>
            </div>
          )}
        </div>
      </div>
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
                onChange={(e) => onChange(uniqueId, e.target.value)}
                onBlur={() => onBlur(uniqueId)}
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
