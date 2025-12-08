import { createSelector } from "@reduxjs/toolkit";
import {
  selectContextSpecificActive,
  selectContextSpecificAName,
  selectContextSpecificBName,
  selectSavedContextSpecificScenarios,
} from "../baseSelector";
import { ContextSpecificState } from "@/stores/slicers/contextSpecificInputSlicer";

export const selectedContextSpecificA = createSelector(
  [selectContextSpecificAName, selectSavedContextSpecificScenarios],
  (nameA, savedScenarios) => {
    return (
      savedScenarios?.find(
        (scenario: ContextSpecificState) => scenario.simulationName === nameA,
      )?.data || null
    );
  },
);

export const selectedContextSpecificB = createSelector(
  [selectContextSpecificBName, selectSavedContextSpecificScenarios],
  (nameB, savedScenarios) => {
    return (
      savedScenarios?.find(
        (scenario: ContextSpecificState) => scenario.simulationName === nameB,
      )?.data || null
    );
  },
);

export const selectSolarPumpInputCapacitySelector = createSelector(
  [selectContextSpecificActive, selectedContextSpecificA, selectedContextSpecificB],
  (active, scenarioA, scenarioB) => {

    const getCap = (scenario: ContextSpecificState) =>
      scenario?.solarPV?.installedCapacity?.["2025-2034"] ?? 0;

    const makeArray = (scenario: ContextSpecificState) => {
      const cap = getCap(scenario);
      return [0, ...Array(15).fill(cap)];
    };
    
    return {
      active: makeArray(active),
      scenarioA: makeArray(scenarioA),
      scenarioB: makeArray(scenarioB),
    }
  }
);
