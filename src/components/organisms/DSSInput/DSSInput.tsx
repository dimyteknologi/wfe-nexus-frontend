import InputGroup from "@/components/basic/input/InputGroup";
import SectionCard from "@/components/card/SectionCard";
import { FormContainerProps } from "@/lib/types/dss-input.dummy.types.rtk";
import React from "react";
import { useAppSelector } from "@/stores/root-reducer";

const FormContainer: React.FC<FormContainerProps> = ({
  inputs,
  errors,
  handleChange,
  handleBlur,
  sections,
  category,
}) => {
  const powerGenType = useAppSelector((state) => state.powerGeneration.selectedType);

  // Determine which inputs should be disabled based on power generation selection
  const isInputDisabled = (inputId: string): boolean => {
    if (category !== "contextSpecific") return false;

    const isSolarPV = inputId.startsWith("solarPV");
    const isGeothermal = inputId.startsWith("geothermal");

    if (powerGenType === "solar" && isGeothermal) return true;
    if (powerGenType === "geothermal" && isSolarPV) return true;
    if (powerGenType === "none" && (isSolarPV || isGeothermal)) return true;

    return false;
  };
  return (
    <div className="w-full overflow-y-scroll">
      <div className="pl-2 sm:pl-4 mt-2 relative w-full">
        <div className="grid grid-cols-1 gap-2 sm:gap-3 md:gap-4 pb-8">
          {sections.map((section, index) => (
            <SectionCard key={index} title={section.title}>
              {section.inputs.map((input, i, arr) => {
                // merging input
                const compoundVarieties = [
                  {
                    areaId: "agriculture.landProduction",
                    conversionId: "agriculture.conversionLandProduction",
                  },
                ];

                const compound = compoundVarieties.find(
                  (v) => v.areaId === input.id,
                );

                if (compound) {
                  const conversionInput = arr.find(
                    (x) => x.id === compound.conversionId,
                  );
                  return (
                    <div key={i} className="grid grid-cols-2 gap-2">
                      <InputGroup
                        label={input.label}
                        periods={input.periods}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        category={category}
                        values={inputs}
                        errors={errors}
                        id={input.id}
                        information={input.information}
                        min={input.min}
                        max={input.max}
                        disabled={isInputDisabled(input.id)}
                      />
                      {conversionInput && (
                        <InputGroup
                          label={conversionInput.label}
                          periods={conversionInput.periods}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          category={category}
                          values={inputs}
                          errors={errors}
                          id={conversionInput.id}
                          information={conversionInput.information}
                          min={conversionInput.min}
                          max={conversionInput.max}
                          disabled={isInputDisabled(conversionInput.id)}
                        />
                      )}
                    </div>
                  );
                }

                // skip conversion input to avoid duplication
                if (compoundVarieties.some((v) => v.conversionId === input.id))
                  return null;

                // default
                return (
                  <InputGroup
                    key={i}
                    label={input.label}
                    periods={input.periods}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    category={category}
                    values={inputs}
                    errors={errors}
                    id={input.id}
                    information={input.information}
                    min={input.min}
                    max={input.max}
                    disabled={isInputDisabled(input.id)}
                  />
                );
              })}
            </SectionCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(FormContainer);
