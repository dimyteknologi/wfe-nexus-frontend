import { createSelector } from "@reduxjs/toolkit";
import { generateScenarioProjection } from "@/lib/utils/projections";
import {
  // input
  selectSimulationInputs as selectActiveScenarioInput,
  selectSavedScenarios,
  selectScenarioAName,
  selectScenarioBName,
  selectBaselineInput,
  // basedata
  selectGdrpBaseline,
  selectPopulationBaseline,
  selectAgricultureBaseline,
  selectLandCoverBaseline,
  selectFoodDemandBaseline,
  selectEnergyDemandBaseline,
  selectResourceBaseline,
} from "@/stores/selectors/baseSelector";
import { SimulationState } from "@/stores/slicers/dssInputSlicer";
import { IRootState } from "@/stores";
import { IBaselineData } from "@/lib/types/response";
import { Selector } from "react-redux";

const checkInputs = () => {};

const createProjectionSelector = (
  selectBaseline: Selector<IRootState, IBaselineData | null>,
  selectInputs: Selector<IRootState, SimulationState | null>,
) =>
  createSelector([selectBaseline, selectInputs], (baseData, inputs) => {
    if (!baseData || !inputs) return null;
    // console.log(inputs);
    return generateScenarioProjection(baseData, inputs);
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

// foodDemand selectors generate foodDemand Baseline with baselineInput
export const selectResourceScenarioProjectionBaseline =
  createProjectionSelector(selectResourceBaseline, selectBaselineInput);

// foodDemand selectors generate foodDemand Baseline with activeInput
export const selectResourceScenarioProjection = createProjectionSelector(
  selectResourceBaseline,
  selectActiveScenarioInput,
);

// foodDemand selectors generate foodDemand Baseline with scenarioA
export const selectResourceScenarioProjectionA = createProjectionSelector(
  selectResourceBaseline,
  selectComparisonScenarioA,
);

// foodDemand selectors generate foodDemand Baseline with ScenarioB
export const selectResourceScenarioProjectionB = createProjectionSelector(
  selectResourceBaseline,
  selectComparisonScenarioB,
);

// foodDemand selectors generate foodDemand Baseline with baselineInput
export const selectEnergyDemandScenarioProjectionBaseline =
  createProjectionSelector(selectEnergyDemandBaseline, selectBaselineInput);

// foodDemand selectors generate foodDemand Baseline with activeInput
export const selectEnergyDemandScenarioProjection = createProjectionSelector(
  selectEnergyDemandBaseline,
  selectActiveScenarioInput,
);

// foodDemand selectors generate foodDemand Baseline with scenarioA
export const selectEnergyDemandScenarioProjectionA = createProjectionSelector(
  selectEnergyDemandBaseline,
  selectComparisonScenarioA,
);

// foodDemand selectors generate foodDemand Baseline with ScenarioB
export const selectEnergyDemandScenarioProjectionB = createProjectionSelector(
  selectEnergyDemandBaseline,
  selectComparisonScenarioB,
);

// foodDemand selectors generate foodDemand Baseline with baselineInput
export const selectFoodSuffiencyScenarioProjectionBaseline =
  createProjectionSelector(selectFoodDemandBaseline, selectBaselineInput);

// foodDemand selectors generate foodDemand Baseline with activeInput
export const selectFoodSuffiencyScenarioProjection = createProjectionSelector(
  selectFoodDemandBaseline,
  selectActiveScenarioInput,
);

// foodDemand selectors generate foodDemand Baseline with scenarioA
export const selectFoodSuffiencyScenarioProjectionA = createProjectionSelector(
  selectFoodDemandBaseline,
  selectComparisonScenarioA,
);

// foodDemand selectors generate foodDemand Baseline with ScenarioB
export const selectFoodSuffiencyScenarioProjectionB = createProjectionSelector(
  selectFoodDemandBaseline,
  selectComparisonScenarioB,
);

// gdrp selectors generate gdrp with baselineInput
export const selectGdrpScenarioProjectionBaseline = createProjectionSelector(
  selectGdrpBaseline,
  selectBaselineInput,
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

// population selectors generate population with baselineInput
export const selectPopulationScenarioProjectionBaseline =
  createProjectionSelector(selectPopulationBaseline, selectBaselineInput);

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

// agriculture selectors generate agriculture with baselineInput
export const selectAgricultureScenarioProjectionBaseline =
  createProjectionSelector(selectAgricultureBaseline, selectBaselineInput);

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
export const selectLandCoverProjectionBaseline = createProjectionSelector(
  selectLandCoverBaseline,
  selectBaselineInput,
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
