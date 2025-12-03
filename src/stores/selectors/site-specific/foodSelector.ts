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
  selectFoodSuffiencyScenarioProjection,
  selectFoodSuffiencyScenarioProjectionA,
  selectFoodSuffiencyScenarioProjectionB,
  selectFoodSuffiencyScenarioProjectionBaseline,
} from "@/stores/selectors/site-specific/scenarioProjectionSelector";
import { dynamicInputPaddyProductivity } from "./dynamicInputSelector";
import { selectPopulationDataComparison } from "@/stores/selectors/site-specific/socioEconomySelector";
import { constantMultiply, resultConverter } from "@/lib/utils/formulas";
import { calculateMultiplyArrays, getParameters } from "./demandSideSelector";
import { RESOURCE_DEMAND_UNIT } from "@/lib/constant/resourceDemandUnit.constant";

const calculateProductionSurplus = (
  projection: IBaselineData | null,
  localFoodProduction: number[],
): number[] => {
  if (!projection) return [];
  const foodDemand = projection.parameters.find(
    (param) => param.name === "Food Demand Population",
  );
  if (!foodDemand) return [];
  if (!foodDemand?.values) return [];

  const safeValues = foodDemand.values.map((val) => val ?? 0);

  return resultConverter(
    safeValues.map((val, i) => {
      const denominator = localFoodProduction[i] ?? 0;
      return denominator !== 0 ? Math.round(denominator - val) : 0;
    }),
  );
};

const calculateFoodSuffiency = (
  projection: IBaselineData | null,
  localFoodProduction: number[],
): number[] => {
  if (!projection) return [];
  const foodDemand = projection.parameters.find(
    (param) => param.name === "Food Demand",
  );
  if (!foodDemand) return [];
  if (!foodDemand?.values) return [];

  const safeValues = foodDemand.values.map((val) => val ?? 0);

  return resultConverter(
    safeValues.map((val, i) => {
      const denominator = localFoodProduction[i] ?? 0;
      return denominator !== 0 ? Math.round((denominator / val) * 100) : 0;
    }),
  );
};

const calculateAgricultureLand = (
  projection: IBaselineData | null,
): number[] => {
  if (!projection) return [];
  
  const agricultureLand = projection.parameters.find(
    (param) =>
      param.name === "Lahan Panen Padi" || param.name === "Agriculture Land",
  );

  if (!agricultureLand) return [];
  if (!agricultureLand?.values) return [];
  const safeValues = agricultureLand.values.map((val) => val ?? 0);

  return safeValues.length > 1 ? safeValues : [];
};

export const selectAgricultureLandComparison = createSelector(
  [
    selectAgricultureScenarioProjection,
    selectAgricultureScenarioProjectionBaseline,
    selectAgricultureScenarioProjectionA,
    selectAgricultureScenarioProjectionB,
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
    dynamicInputPaddyProductivity,
  ],
  (projActive, projBaseline, projA, projB, foodInputs) => {
    return {
      active: constantMultiply(
        calculateMultiplyArrays(
          getParameters(projActive, "Lahan Panen Padi"),
          foodInputs.active,
        ),
        RESOURCE_DEMAND_UNIT.FOOD.RASIO_SUSUT_BERAS,
      ),
      baseline: constantMultiply(
        calculateMultiplyArrays(
          getParameters(projBaseline, "Lahan Panen Padi"),
          foodInputs.baseline,
        ),
        RESOURCE_DEMAND_UNIT.FOOD.RASIO_SUSUT_BERAS,
      ),
      scenarioA: constantMultiply(
        calculateMultiplyArrays(
          getParameters(projA, "Lahan Panen Padi"),
          foodInputs.scenarioA,
        ),
        RESOURCE_DEMAND_UNIT.FOOD.RASIO_SUSUT_BERAS,
      ),
      scenarioB: constantMultiply(
        calculateMultiplyArrays(
          getParameters(projB, "Lahan Panen Padi"),
          foodInputs.scenarioB,
        ),
        RESOURCE_DEMAND_UNIT.FOOD.RASIO_SUSUT_BERAS,
      ),
    };
  },
);

export const selectProductionSurplusComparison = createSelector(
  [
    selectFoodSuffiencyScenarioProjection,
    selectFoodSuffiencyScenarioProjectionBaseline,
    selectFoodSuffiencyScenarioProjectionA,
    selectFoodSuffiencyScenarioProjectionB,
    selectLocalFoodProductionComparison,
  ],
  (projActive, projBase, projA, projB, localFoodProduction) => {
    return {
      active: calculateProductionSurplus(
        projActive,
        localFoodProduction.active,
      ),
      baseline: calculateProductionSurplus(
        projBase,
        localFoodProduction.baseline,
      ),
      scenarioA: calculateProductionSurplus(
        projA,
        localFoodProduction.scenarioA,
      ),
      scenarioB: calculateProductionSurplus(
        projB,
        localFoodProduction.scenarioB,
      ),
    };
  },
);

export const selectLocalFoodSuffiencyComparison = createSelector(
  [
    selectFoodSuffiencyScenarioProjection,
    selectFoodSuffiencyScenarioProjectionBaseline,
    selectFoodSuffiencyScenarioProjectionA,
    selectFoodSuffiencyScenarioProjectionB,
    selectLocalFoodProductionComparison,
  ],
  (projActive, projBase, projA, projB, localFoodProduction) => {
    return {
      active: calculateFoodSuffiency(projActive, localFoodProduction.active),
      baseline: calculateFoodSuffiency(projBase, localFoodProduction.baseline),
      scenarioA: calculateFoodSuffiency(projA, localFoodProduction.scenarioA),
      scenarioB: calculateFoodSuffiency(projB, localFoodProduction.scenarioB),
    };
  },
);

export const selectAvailabilityPerPersonComparison = createSelector(
  [selectLocalFoodProductionComparison, selectPopulationDataComparison],
  (foodProduction, population) => {
    const calculateAvailability = (food: number[], pop: number[]) => {
      if (!food || !pop || food.length !== pop.length) return [];
      const data = generateAvailabillityPerPerson(pop, food);
      return data;
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
