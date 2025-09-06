import React, { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/stores/root-reducer";
import { updateValue } from "@/stores/slicers/dssInputSlicer";
import FormContainer from "@/components/organisms/DSSInput/DSSInput";
import { simulationFormConfig } from "@/config/form";
import { validatePercentage } from "@/lib/utils/validation";

const SimulationForm = () => {
  const dispatch = useAppDispatch();
  const simulationState = useAppSelector((state) => state.simulation);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const flattenedInputs = useMemo(() => {
    const flatData: Record<string, number | null> = {};
    simulationFormConfig.forEach((section) => {
      section.inputs.forEach((input) => {
        const path = input.id.split(".");
        input.periods.forEach((period) => {
          const uniqueId = `${input.id}.${period}`;
          const value = simulationState[path[0]]?.[path[1]]?.[period] ?? null;
          flatData[uniqueId] = value;
        });
      });
    });

    return flatData;
  }, [simulationState]);

  const handleChange = (id: string, value: number) => {
    const numericValue = value === null ? 0 : Number(value);
    const path = id.split(".");
    dispatch(updateValue({ path, value: numericValue }));

    const errorMessage = validatePercentage(numericValue);

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (errorMessage) {
        newErrors[id] = errorMessage;
      } else {
        delete newErrors[id];
      }
      return newErrors;
    });
  };

  return (
    <FormContainer
      sections={simulationFormConfig}
      inputs={flattenedInputs}
      errors={errors}
      handleChange={handleChange}
      validatePercentage={validatePercentage}
    />
  );
};

export default SimulationForm;
