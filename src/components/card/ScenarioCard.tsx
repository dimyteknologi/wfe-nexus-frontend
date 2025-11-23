"use client";

import SectionCard from "@/components/card/SectionCard";
import InputGroup from "@/components/basic/input/inputBackupGroup";

interface SectionFactoryProps {
  id: number;
  title: string;
  inputs: Record<string, number>;
  errors: Record<string, string>;
  fields: {
    label: string;
    periods: string[];
    requiresPercentageValidation?: boolean;
  }[];
  onChange: (id: string, value: number | string) => void;
  validatePercentage: (value: number) => string | undefined;
}

const ScenarioCard = ({
  title,
  inputs,
  errors,
  fields,
  onChange,
  validatePercentage,
}: SectionFactoryProps) => {
  return (
    <SectionCard title={title}>
      {fields.map((field) => (
        <InputGroup
          key={field.label}
          label={field.label}
          periods={field.periods}
          onChange={(id, value) => {
            onChange(id, value);
            if (field.requiresPercentageValidation) {
              const err = validatePercentage(value);
              if (err) onChange(id, err);
            }
          }}
          values={inputs}
          errors={errors}
        />
      ))}
    </SectionCard>
  );
};

export default ScenarioCard;
