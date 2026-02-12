import { SiteSpecificState } from "@/stores/slicers/siteSpecificInputSlicer";
import { ContextSpecificState } from "@/stores/slicers/contextSpecificInputSlicer";
import { FormInput, siteSpecificInput } from "@/config/form";

interface ValidationOptions {
  min?: number;
  max?: number;
}

export const getNestedValue = (obj: object, path: string[]): unknown => {
  return path.reduce((currentObject: unknown, key: string) => {
    if (
      currentObject &&
      typeof currentObject === "object" &&
      key in currentObject
    ) {
      return (currentObject as Record<string, unknown>)[key];
    }

    return undefined;
  }, obj);
};

export const findInputConfig = (id: string): FormInput | undefined => {
  const inputId = id.substring(0, id.lastIndexOf("."));
  for (const section of siteSpecificInput) {
    const found = section.inputs.find((input) => input.id === inputId);
    if (found) return found;
  }
  return undefined;
};

export const validateValue = (
  value: number | null,
  options: ValidationOptions = {},
): string | undefined => {
  if (value === null || value === undefined) return undefined;

  const num = Number(value);

  if (isNaN(num)) return "Input should be number.";

  const { min, max } = options;
  if (min !== undefined && num < min) {
    return `input invalid minimum ${min}.`;
  }
  if (max !== undefined && num > max) {
    return `input invalid maximum: ${max}.`;
  }

  return undefined;
};

export const validatePercentage = (
  value: string | null,
): string | undefined => {
  if (value === null) return undefined;
  const num = Number(value);
  if (isNaN(num)) return "input incorrect (number)";
  if (num < 0 || num > 100) return "input between 0 - 100";

  return undefined;
};

export const validateParameters = (
  simulationState: SiteSpecificState | ContextSpecificState,
): Record<string, string> => {
  const errors: Record<string, string> = {};
  siteSpecificInput.forEach((section) => {
    section.inputs.forEach((input) => {
      input.periods.forEach((period) => {
        const uniqueId = `${input.id}.${period}`;
        const path = input.id.split(".");

        const valueToValidate = getNestedValue(simulationState, [
          ...path,
          period,
        ]) as number | null;

        // const errorMessage = validatePercentage(valueToValidate);
        const errorMessage = validateValue(valueToValidate);
        if (errorMessage) {
          errors[uniqueId] = errorMessage;
        }
      });
    });
  });

  return errors;
};
