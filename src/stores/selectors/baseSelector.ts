import { simulationFormConfig } from "@/config/form";
import { IRootState } from "@/stores";
import { createSelector } from "@reduxjs/toolkit";

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
export const selectResourceBaseline = (state: IRootState) =>
  state.resource.baseline;
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
export const selectEnergyDemandBaseline = (state: IRootState) =>
  state.energyDemand.baseline;
export const selectWaterDemandBaseline = (state: IRootState) =>
  state.waterDemand.baseline;
export const selectFoodDemandBaseline = (state: IRootState) =>
  state.foodDemand.baseline;
export const selectSavedScenarios = (state: IRootState) => state.scenarios.data;

// ui
export const selectDisplayedIds = (state: IRootState) =>
  state.dashboard.displayedChartMetricIds;
// export const selectActiveCategory = (state: IRootState) => state.dashboard.activeCategory;

export const selectFlattenedInputs = createSelector(
  [selectSimulationInputs],
  (simulationState) => {
    const flatData: Record<string, number | null> = {};
    if (!simulationState) return flatData;

    simulationFormConfig.forEach((section) => {
      section.inputs.forEach((input) => {
        const path = input.id.split(".");
        input.periods.forEach((period) => {
          const uniqueId = `${input.id}.${period}`;
          let value = simulationState;
          for (const key of path) {
            value = value?.[key];
          }
          value = value?.[period] ?? null;

          flatData[uniqueId] = value;
        });
      });
    });

    return flatData;
  },
);
