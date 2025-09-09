import { IRootState } from "@/stores";

// input slices
export const selectSimulationInputs = (state: IRootState) =>
  state.simulation.active;
export const selectIndustryInputs = (state: IRootState) =>
  state.simulation.active.industry;
export const selectDemographyInputs = (state: IRootState) =>
  state.simulation.active.demography;
export const selectAgricultureInputs = (state: IRootState) =>
  state.simulation.active.agriculture;
export const selectScenarioAName = (state: IRootState) =>
  state.simulation.active.scenario_a;
export const selectScenarioBName = (state: IRootState) =>
  state.simulation.active.scenario_b;
export const selectBaselineInput = (state: IRootState) =>
  state.simulation.baseline;

// base data from state
export const selectGdrpBaseline = (state: IRootState) => state.gdrp.baseline;
export const selectFisheryBaseline = (state: IRootState) =>
  state.fishery.baseline;
export const selectLivestockBaseline = (state: IRootState) =>
  state.livestock.baseline;
export const selectPopulationBaseline = (state: IRootState) =>
  state.population.baseline;
export const selectLandPortionBaseline = (state: IRootState) =>
  state.landPortion.baseline;
export const selectLandCoverBaseline = (state: IRootState) =>
  state.landCover.baseline;
export const selectAgricultureBaseline = (state: IRootState) =>
  state.agriculture.baseline;
export const selectSavedScenarios = (state: IRootState) => state.scenarios.data;

// ui
export const selectDisplayedIds = (state: IRootState) =>
  state.dashboard.displayedChartMetricIds;
