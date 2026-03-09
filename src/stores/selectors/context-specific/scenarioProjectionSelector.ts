import { createDeepEqualSelector } from "../baseSelector";
import {
  selectContextSpecificActive,
  selectContextSpecificBaseline,
  selectContextSpecificAName,
  selectContextSpecificBName,
  selectSavedContextSpecificScenarios,
} from "../baseSelector";
import { ContextSpecificState } from "@/stores/slicers/contextSpecificInputSlicer";

export const selectedContextSpecificA = createDeepEqualSelector(
  [selectContextSpecificAName, selectSavedContextSpecificScenarios],
  (nameA, savedScenarios) => {
    return (
      savedScenarios?.find(
        (scenario: ContextSpecificState) => scenario.simulationName === nameA,
      )?.data || null
    );
  },
);

export const selectedContextSpecificB = createDeepEqualSelector(
  [selectContextSpecificBName, selectSavedContextSpecificScenarios],
  (nameB, savedScenarios) => {
    return (
      savedScenarios?.find(
        (scenario: ContextSpecificState) => scenario.simulationName === nameB,
      )?.data || null
    );
  },
);

const EMPTY_ARRAY = Array(16).fill(0);

export const selectSolarPumpInputCapacitySelector = createDeepEqualSelector(
  [selectContextSpecificActive, selectContextSpecificBaseline, selectedContextSpecificA, selectedContextSpecificB],
  (active, baseline, scenarioA, scenarioB) => {

    const getCap = (scenario: ContextSpecificState) =>
      scenario?.solarPV?.installedCapacity?.["2025-2034"] ?? 0;

    const makeArray = (scenario: ContextSpecificState) => {
      const cap = getCap(scenario);
      if (cap === 0) return EMPTY_ARRAY;
      return [0, ...Array(15).fill(cap)];
    };

    return {
      active: makeArray(active),
      baseline: makeArray(baseline ?? active),
      scenarioA: makeArray(scenarioA),
      scenarioB: makeArray(scenarioB),
    }
  }
);
