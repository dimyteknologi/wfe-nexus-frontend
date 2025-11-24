import { siteSpecificInput, contextSpecificInput } from "@/config/form";
import { IRootState } from "@/stores";
import { createSelector } from "@reduxjs/toolkit";
import { SiteSpecificState } from "../slicers/siteSpecificInputSlicer";
import { ContextSpecificState } from "../slicers/contextSpecificInputSlicer";

// SITE SPECIFIC ACTIVE INPUT
export const selectSiteSpecificActive = (state: IRootState) =>
  state.siteSpecific.active;
export const selectSiteSpecificBaseline = (state: IRootState) =>
  state.siteSpecific.baseline;
export const selectSiteSpecificScenarioAName = (state: IRootState) =>
  state.siteSpecific.scenario_a;
export const selectSiteSpecificScenarioBName = (state: IRootState) =>
  state.siteSpecific.scenario_b;

// CONTEXT SPECIFIC ACTIVE INPUT
export const selectContextSpecificActive = (state: IRootState) =>
  state.contextSpecific.active;
export const selectContextSpecificBaseline = (state: IRootState) =>
  state.contextSpecific.baseline;
export const selectContextSpecificAName = (state: IRootState) =>
  state.contextSpecific.scenario_a;
export const selectContextSpecificBName = (state: IRootState) =>
  state.contextSpecific.scenario_b;

// SITE SPECIFIC BASE DATA FROM STATE (API)
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

// Saved Scenarios
export const selectSavedSiteSpecificScenarios = (state: IRootState) =>
  state.scenarios.data.siteSpecific;
export const selectSavedContextSpecificScenarios = (state: IRootState) =>
  state.scenarios.data.contextSpecific;

// Select Scenarios
export const selectScenarioByCategory =
  (name: string) => (state: IRootState) => {
    const { siteSpecific, contextSpecific } = state.scenarios.data;
    const lowerName = name.toLowerCase();
    return (
      siteSpecific.find(
        (s: SiteSpecificState) =>
          (s.simulationName?.toLowerCase() ?? "") === lowerName,
      ) ||
      contextSpecific.find(
        (s: ContextSpecificState) =>
          (s.simulationName?.toLowerCase() ?? "") === lowerName,
      )
    );
  };

// ui
export const selectDisplayedIds = (state: IRootState) =>
  state.dashboard.displayedChartMetricIds;
// export const selectActiveCategory = (state: IRootState) => state.dashboard.activeCategory;

export const selectFlattenedSiteSpecificInputs = createSelector(
  [selectSiteSpecificActive],
  (activeState) => {
    const flat: Record<string, number | null> = {};
    if (!activeState) return flat;

    siteSpecificInput.forEach((section) => {
      section.inputs.forEach((input) => {
        const path = input.id.split(".");
        input.periods.forEach((period) => {
          const uniqueId = `${input.id}.${period}`;

          let value = activeState;
          for (const segment of path) {
            value = value?.[segment];
          }
          flat[uniqueId] = value?.[period] ?? null;
        });
      });
    });

    return flat;
  },
);

export const selectFlattenedContextInputs = createSelector(
  [selectContextSpecificActive],
  (activeState) => {
    const flat: Record<string, number | null> = {};
    if (!activeState) return flat;

    contextSpecificInput.forEach((section) => {
      section.inputs.forEach((input) => {
        const path = input.id.split(".");
        input.periods.forEach((period) => {
          const uniqueId = `${input.id}.${period}`;

          let value = activeState;
          for (const segment of path) {
            value = value?.[segment];
          }
          flat[uniqueId] = value?.[period] ?? null;
        });
      });
    });

    return flat;
  },
);
