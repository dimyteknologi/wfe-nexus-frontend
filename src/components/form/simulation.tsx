import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useAppDispatch } from "@/stores/root-reducer";
import {
  BaselinePayload,
  setAllActiveInputs,
  SimulationState,
} from "@/stores/slicers/dssInputSlicer";
import FormContainer from "@/components/organisms/DSSInput/DSSInput";
import { simulationFormConfig } from "@/config/form";
import { validatePercentage } from "@/lib/utils/validation";
// import { selectFlattenedInputs } from "@/stores/selectors/baseSelector";
import { useDebounce } from "@/hooks/useDebounce";
interface SimulationFormProps {
  simulationState: SimulationState;
}

const SimulationForm: React.FC<SimulationFormProps> = ({ simulationState }) => {
  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [localInputs, setLocalInputs] = useState(simulationState);
  const debouncedInputs = useDebounce(localInputs, 750);

  useEffect(() => {
    setLocalInputs(simulationState);
  }, [simulationState]);

  useEffect(() => {
    if (JSON.stringify(debouncedInputs) !== JSON.stringify(simulationState)) {
      dispatch(setAllActiveInputs(debouncedInputs));
    }
  }, [debouncedInputs, dispatch]);

  const flattenedInputs = useMemo(() => {
    const flatData: Record<string, number | null> = {};
    if (!localInputs) return flatData;

    simulationFormConfig.forEach((section) => {
      section.inputs.forEach((input) => {
        const path = input.id.split(".");
        input.periods.forEach((period) => {
          const uniqueId = `${input.id}.${period}`;
          let value: unknown = localInputs;
          for (const key of path) {
            if (typeof value === "object" && value !== null) {
              value = (value as Record<string, unknown>)[key];
            } else {
              value = null;
              break;
            }
          }
          let finalValue: number | null = null;
          if (typeof value === "object" && value !== null) {
            const periodValue = (value as Record<string, unknown>)[period];
            if (typeof periodValue === "number") {
              finalValue = periodValue;
            }
          }

          flatData[uniqueId] = finalValue;
        });
      });
    });

    return flatData;
  }, [localInputs, simulationFormConfig]);

  const handleChange = useCallback((id: string, value: number) => {
    const numericValue = value === null ? 0 : Number(value);
    setLocalInputs((prevState: SimulationState) => {
      const keys = id.split(".");
      const newState = JSON.parse(JSON.stringify(prevState));
      let obj = newState;
      for (let i = 0; i < keys.length - 1; i++) {
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = numericValue;
      return newState;
    });

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
  }, []);

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

export default React.memo(SimulationForm);
