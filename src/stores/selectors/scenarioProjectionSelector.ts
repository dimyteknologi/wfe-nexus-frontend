import { createSelector } from "@reduxjs/toolkit";
import { generateScenarioProjection } from "@/lib/utils/projections";
import {
  selectGdrpBaseline,
  selectPopulationBaseline,
  selectAgricultureBaseline,
  selectSimulationInputs,
} from "./baseSelector";

// gdrp selectors generate gdrp with input
export const selectGdrpScenarioProjection = createSelector(
  [selectGdrpBaseline, selectSimulationInputs],
  (gdrpBaseline, simulationInputs) => {
    if (!gdrpBaseline || !simulationInputs) return null;
    return generateScenarioProjection(gdrpBaseline, simulationInputs);
  },
);

// population selectors generate population with input
export const selectPopulationScenarioProjection = createSelector(
  [selectPopulationBaseline, selectSimulationInputs],
  (populationBaseline, simulationInputs) => {
    if (!populationBaseline || !simulationInputs) return null;
    return generateScenarioProjection(populationBaseline, simulationInputs);
  },
);

// agriculture selectors generate agriculture with input
export const selectAgricultureScenarioProjection = createSelector(
  [selectAgricultureBaseline, selectSimulationInputs],
  (agricultureBaseline, simulationInputs) => {
    if (!agricultureBaseline || !simulationInputs) return null;
    return generateScenarioProjection(agricultureBaseline, simulationInputs);
  },
);
