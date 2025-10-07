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
}) => {
  return (
    <div className="w-full overflow-y-scroll">
      <div className="pl-2 sm:pl-4 mt-2 relative w-full">
        <div className="grid grid-cols-1 gap-2 sm:gap-3 md:gap-4 pb-8">
          {sections.map((section, index) => (
            <SectionCard key={index} title={section.title}>
              {section.inputs.map((input, i) => {
                return (
                  <InputGroup
                    key={i}
                    label={input.label}
                    periods={input.periods}
                    onBlur={(id) => {
                      handleBlur(id);
                    }}
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
