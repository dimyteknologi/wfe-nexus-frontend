import InputGroup from "@/components/basic/input/InputGroup";
import SectionCard from "@/components/card/SectionCard";
import { FormContainerProps } from "@/lib/types/dss-input.dummy.types.rtk";
import React from "react";

const FormContainer: React.FC<FormContainerProps> = ({
  inputs,
  errors,
  handleChange,
  validatePercentage,
  sections,
}) => {
  // console.log(inputs);
  return (
    <div className="w-full">
      <div className="pl-2 sm:pl-4 mt-2 relative h-[70dvh] overflow-y-auto w-full">
        <div className="grid grid-cols-1 gap-2 sm:gap-3 md:gap-4 pb-8">
          {sections.map((section, index) => (
            <SectionCard key={index} title={section.title}>
              {section.inputs.map((input, i) => {
                // console.log(inputs);
                return (
                  <InputGroup
                    key={i}
                    label={input.label}
                    periods={input.periods}
                    onChange={(id, value) => {
                      handleChange(id, value);
                      if (input.withValidation && validatePercentage) {
                        const err = validatePercentage(value);
                        if (err) handleChange(id, value);
                      }
                    }}
                    values={inputs}
                    errors={errors}
                    id={input.id}
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

export default FormContainer;
