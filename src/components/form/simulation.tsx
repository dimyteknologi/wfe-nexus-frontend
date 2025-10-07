import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useAppDispatch } from "@/stores/root-reducer";
import {
  setAllActiveInputs,
  SimulationState,
} from "@/stores/slicers/dssInputSlicer";
import FormContainer from "@/components/organisms/DSSInput/DSSInput";
import { simulationFormConfig } from "@/config/form";
import {
  findInputConfig,
  validatePercentage,
  validateValue,
} from "@/lib/utils/validation";
import { useDebounce } from "@/hooks/useDebounce";

// const getValueFromNestedState = (state: SimulationState, path: string): string => {
//   return path.split('.').reduce((acc: SimulationState | undefined, part) => acc && acc[part], state) ?? '';
// };

export const getValueFromNestedState = (
  state: SimulationState,
  path: string,
): unknown => {
  return (
    path.split(".").reduce((acc: unknown, part: string) => {
      if (acc && typeof acc === "object" && acc !== null) {
        return (acc as Record<string, unknown>)[part];
      }
      return undefined;
    }, state) ?? ""
  );
};
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
    const flatData: Record<string, string | null> = {};
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
          let finalValue: string | null = null;
          if (typeof value === "object" && value !== null) {
            const periodValue = (value as Record<string, unknown>)[period];
            if (typeof periodValue === "number") {
              finalValue = periodValue.toString();
            }
          }

          flatData[uniqueId] = finalValue;
        });
      });
    });

    return flatData;
  }, [localInputs, simulationFormConfig]);

  const handleChange = useCallback((id: string, value: string) => {
    if (value === "" || value === "-") {
      setLocalInputs((prevState: SimulationState) => {
        const keys = id.split(".");
        const newState = JSON.parse(JSON.stringify(prevState));
        let obj = newState;
        for (let i = 0; i < keys.length - 1; i++) {
          obj = obj[keys[i]];
        }
        obj[keys[keys.length - 1]] = value;
        return newState;
      });
      // delete current input validated
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[id];
        return newErrors;
      });
      return;
    }

    const numericValue = parseFloat(value);

    if (!isNaN(numericValue)) {
      // update local state with clamp value
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
    }
  }, []);

  const handleBlur = useCallback(
    (id: string) => {
      const value = getValueFromNestedState(localInputs, id);
      const numericValue = parseFloat(value ? value.toString() : "");
      const config = findInputConfig(id);
      // validated value from input
      const errorMessage = validateValue(numericValue, {
        min: config?.min,
        max: config?.max,
      });
      // update error state
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        if (errorMessage) {
          newErrors[id] = errorMessage;
        } else {
          delete newErrors[id];
        }
        return newErrors;
      });
      // update clamp
      let finalValue = numericValue;
      if (config && config.min !== undefined && config.max !== undefined) {
        finalValue = Math.max(config.min, Math.min(numericValue, config.max));
      }

      setLocalInputs((prevState: SimulationState) => {
        const keys = id.split(".");
        const newState = JSON.parse(JSON.stringify(prevState));
        let obj = newState;
        for (let i = 0; i < keys.length - 1; i++) {
          obj = obj[keys[i]];
        }
        obj[keys[keys.length - 1]] = finalValue;
        return newState;
      });
    },
    [localInputs],
  );

  return (
    <FormContainer
      sections={simulationFormConfig}
      inputs={flattenedInputs}
      errors={errors}
      handleChange={handleChange}
      handleBlur={handleBlur}
      validatePercentage={validatePercentage}
    />
  );
};

export default React.memo(SimulationForm);
