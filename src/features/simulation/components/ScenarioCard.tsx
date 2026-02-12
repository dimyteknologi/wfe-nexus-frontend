"use client";

import SectionCard from "./SectionCard";
import InputGroup from "./basic/input/InputGroup";

interface SectionFactoryProps {
  id: number;
  title: string;
  inputs: Record<string, string | null>;
  errors: Record<string, string>;
  category: "siteSpecific" | "contextSpecific";
  fields: {
    label: string;
    periods: string[];
    requiresPercentageValidation?: boolean;
    id: string;
    information: string;
    min: number;
    max: number;
  }[];
  onChange: (id: string, value: number | string) => void;
  onBlur: (id: string) => void;
  validatePercentage: (value: number) => string | undefined;
}

const ScenarioCard = ({
  title,
  inputs,
  errors,
  category,
  fields,
  onChange,
  onBlur,
  validatePercentage,
}: SectionFactoryProps) => {
  return (
    <SectionCard title={title}>
      {fields.map((field) => (
        <InputGroup
          key={field.label}
          label={field.label}
          periods={field.periods}
          category={category}
          id={field.id}
          information={field.information}
          min={field.min}
          max={field.max}
          onChange={(id, value) => {
            onChange(id, value);
            if (field.requiresPercentageValidation) {
              const numValue = typeof value === 'string' ? parseFloat(value) : value;
              if (!isNaN(numValue)) {
                const err = validatePercentage(numValue);
                if (err) onChange(id, err);
              }
            }
          }}
          onBlur={onBlur}
          values={inputs}
          errors={errors}
        />
      ))}
    </SectionCard>
  );
};

export default ScenarioCard;
