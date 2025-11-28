import { createSelector } from "@reduxjs/toolkit";
import {
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
