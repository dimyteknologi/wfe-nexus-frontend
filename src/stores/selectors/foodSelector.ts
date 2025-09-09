import { createSelector } from "@reduxjs/toolkit";
import { IBaselineData } from "@/lib/types/response";
import {
  generateLocalFoodProductionYear,
  generateAvailabillityPerPerson,
} from "@/lib/utils/projections";
import {
  selectAgricultureScenarioProjectionBaseline,
  selectAgricultureScenarioProjection,
  selectAgricultureScenarioProjectionA,
  selectAgricultureScenarioProjectionB,
  selectLandCoverProjectionBaseline,
  selectLandCoverProjection,
  selectLandCoverProjectionA,
  selectLandCoverProjectionB,
} from "@/stores/selectors/scenarioProjectionSelector";
import { selectPopulationDataComparison } from "@/stores/selectors/socioEconomySelector";

const calculateAgricultureLand = (
  projection: IBaselineData | null,
): number[] => {
  if (!projection) return [];
  const agricultureLand = projection.parameters.find(
    (param) =>
      param.name === "Agriculture Area" || param.name === "Agriculture Land",
  );
  if (!agricultureLand) return [];
  if (!agricultureLand?.values) return [];
  const safeValues = agricultureLand.values.map((val) => val ?? 0);

  return safeValues.length > 1 ? safeValues : [];
};

const calculateLocalFoodProduction = (
  projection: IBaselineData | null,
): number[] => {
  if (!projection || !Array.isArray(projection.parameters)) return [];

  const lahanPanenPadi = projection.parameters.find(
    (item) => item.name === "Lahan Panen Padi",
  );
  if (!lahanPanenPadi) return [];

  return generateLocalFoodProductionYear(lahanPanenPadi);
};

export const selectAgricultureLandComparison = createSelector(
  [
    selectLandCoverProjection,
    selectLandCoverProjectionBaseline,
    selectLandCoverProjectionA,
    selectLandCoverProjectionB,
  ],
  (projActive, projBase, projA, projB) => {
    return {
      active: calculateAgricultureLand(projActive),
      baseline: calculateAgricultureLand(projBase),
      scenarioA: calculateAgricultureLand(projA),
      scenarioB: calculateAgricultureLand(projB),
    };
  },
);

export const selectLocalFoodProductionComparison = createSelector(
  [
    selectAgricultureScenarioProjection,
    selectAgricultureScenarioProjectionBaseline,
    selectAgricultureScenarioProjectionA,
    selectAgricultureScenarioProjectionB,
  ],
  (projActive, projBase, projA, projB) => {
    return {
      active: calculateLocalFoodProduction(projActive),
      baseline: calculateLocalFoodProduction(projBase),
      scenarioA: calculateLocalFoodProduction(projA),
      scenarioB: calculateLocalFoodProduction(projB),
    };
  },
);

export const selectAvailabilityPerPersonComparison = createSelector(
  [selectLocalFoodProductionComparison, selectPopulationDataComparison],
  (foodProduction, population) => {
    const calculateAvailability = (food: number[], pop: number[]) => {
      if (!food || !pop || food.length !== pop.length) return [];
      return generateAvailabillityPerPerson(food, pop);
    };

    return {
      active: calculateAvailability(foodProduction.active, population.active),
      baseline: calculateAvailability(
        foodProduction.baseline,
        population.baseline,
      ),
      scenarioA: calculateAvailability(
        foodProduction.scenarioA,
        population.scenarioA,
      ),
      scenarioB: calculateAvailability(
        foodProduction.scenarioB,
        population.scenarioB,
      ),
    };
  },
);
