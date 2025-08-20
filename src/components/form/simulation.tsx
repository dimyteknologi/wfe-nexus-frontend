import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/stores/root-reducer";
import { updateValue } from "@/stores/slicers/dssInputSlicer";
import FormContainer from "@/components/organisms/DSSInput/DSSInput";
import { simulationFormConfig } from "@/config/form";
import { validatePercentage } from "@/lib/utils/validation";

const SimulationForm = () => {
  const dispatch = useAppDispatch();
  const simulationState = useAppSelector((state) => state.simulation);
  const [errors, setErrors] = useState<Record<string, string>>({});

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
      inputs={simulationState}
      errors={errors}
      handleChange={handleChange}
      validatePercentage={validatePercentage}
    />
  );
};

export default SimulationForm;
