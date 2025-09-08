import { createSelector } from "@reduxjs/toolkit";
import { generateScenarioProjection } from "@/lib/utils/projections";
import {
  selectGdrpBaseline,
  selectSimulationInputs as selectActiveScenarioInput,
  selectSavedScenarios,
  selectScenarioAName,
  selectScenarioBName,
  selectPopulationBaseline,
  selectAgricultureBaseline,
  selectLandCoverBaseline,
} from "./baseSelector";
import { SimulationState } from "../slicers/dssInputSlicer";
import { IRootState } from "../root-reducer";
import { IBaselineData } from "@/lib/types/response";
import { Selector } from "react-redux";

const createProjectionSelector = (
  selectBaseline: Selector<IRootState, IBaselineData | null>,
  selectInputs: Selector<IRootState, SimulationState | null>,
) =>
  createSelector([selectBaseline, selectInputs], (baseline, inputs) => {
    if (!baseline || !inputs) return null;
    return generateScenarioProjection(baseline, inputs);
  });

const selectComparisonScenarioA = createSelector(
  [selectSavedScenarios, selectScenarioAName],
  (saved, name) =>
    saved.find((s: SimulationState) => s.simulationName === name) || null,
);

const selectComparisonScenarioB = createSelector(
  [selectSavedScenarios, selectScenarioBName],
  (saved, name) =>
    saved.find((s: SimulationState) => s.simulationName === name) || null,
);

// gdrp selectors generate gdrp with activeInput
export const selectGdrpScenarioProjection = createProjectionSelector(
  selectGdrpBaseline,
  selectActiveScenarioInput,
);

// gdrp selectors generate gdrp with scenarioA
export const selectGdrpScenarioProjectionA = createProjectionSelector(
  selectGdrpBaseline,
  selectComparisonScenarioA,
);

// gdrp selectors generate gdrp with ScenarioB
export const selectGdrpScenarioProjectionB = createProjectionSelector(
  selectGdrpBaseline,
  selectComparisonScenarioB,
);

// population selectors generate population with activeInput
export const selectPopulationScenarioProjection = createProjectionSelector(
  selectPopulationBaseline,
  selectActiveScenarioInput,
);

// population selectors generate population with scenarioA
export const selectPopulationScenarioProjectionA = createProjectionSelector(
  selectPopulationBaseline,
  selectComparisonScenarioA,
);

// population selectors generate population with ScenarioB
export const selectPopulationScenarioProjectionB = createProjectionSelector(
  selectPopulationBaseline,
  selectComparisonScenarioB,
);

// agriculture selectors generate agriculture with activeInput
export const selectAgricultureScenarioProjection = createProjectionSelector(
  selectAgricultureBaseline,
  selectActiveScenarioInput,
);

// agriculture selectors generate agriculture with scenarioA
export const selectAgricultureScenarioProjectionA = createProjectionSelector(
  selectAgricultureBaseline,
  selectComparisonScenarioA,
);

// agriculture selectors generate agriculture with ScenarioB
export const selectAgricultureScenarioProjectionB = createProjectionSelector(
  selectAgricultureBaseline,
  selectComparisonScenarioB,
);

// agriculture selectors generate land conversion with activeInput
export const selectLandCoverProjection = createProjectionSelector(
  selectLandCoverBaseline,
  selectActiveScenarioInput,
);

// agriculture selectors generate land conversion with scenarioA
export const selectLandCoverProjectionA = createProjectionSelector(
  selectLandCoverBaseline,
  selectComparisonScenarioA,
);

// agriculture selectors generate land conversion with scenarioB
export const selectLandCoverProjectionB = createProjectionSelector(
  selectLandCoverBaseline,
  selectComparisonScenarioB,
);
