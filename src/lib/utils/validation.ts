import { SimulationState } from "@/stores/slicers/dssInputSlicer";
import { simulationFormConfig } from "@/config/form";

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

export const validatePercentage = (
  value: number | null,
): string | undefined => {
  if (value === null) return undefined;
  const num = Number(value);
  if (isNaN(num)) return "Harus angka";
  if (num < 0 || num > 100) return "Nilai antara 0 & 100";

  return undefined;
};

export const validateParameters = (
  simulationState: SimulationState,
): Record<string, string> => {
  const errors: Record<string, string> = {};
  simulationFormConfig.forEach((section) => {
    section.inputs.forEach((input) => {
      input.periods.forEach((period) => {
        const uniqueId = `${input.id}.${period}`;
        const path = input.id.split(".");

        const valueToValidate = getNestedValue(simulationState, [
          ...path,
          period,
        ]) as number | null;

        const errorMessage = validatePercentage(valueToValidate);
        if (errorMessage) {
          errors[uniqueId] = errorMessage;
        }
      });
    });
  });

  return errors;
};
