import InputGroup from "@/components/basic/input/InputGroup";
import SectionCard from "@/components/card/SectionCard";
import { FormContainerProps } from "@/lib/types/dss-input.dummy.types.rtk";
import React from "react";

const FormContainer: React.FC<FormContainerProps> = ({
  inputs,
  errors,
  handleChange,
  handleBlur,
  validatePercentage,
  sections,
  category,
}) => {
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
                    areaId: "agriculture.areaInpari32",
                    conversionId: "agriculture.conversionInpari32",
                  },
                  {
                    areaId: "agriculture.areaCiherang",
                    conversionId: "agriculture.conversionCiherang",
                  },
                  {
                    areaId: "agriculture.areaHipaSeries",
                    conversionId: "agriculture.conversionHipaSeries",
                  },
                  {
                    areaId: "agriculture.areaMekongga",
                    conversionId: "agriculture.conversionMekongga",
                  },
                  {
                    areaId: "agriculture.areaLokal",
                    conversionId: "agriculture.conversionLokal",
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
