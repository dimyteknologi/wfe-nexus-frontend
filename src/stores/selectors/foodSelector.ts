// import { createSelector } from "@reduxjs/toolkit";
// import {
//   generateLocalFoodProductionYear,
//   generateAvailabillityPerPerson,
//   generateScenarioProjection,
// } from "@/lib/utils/projections";

// export const selectProjectedLocalFoodProduction = createSelector(
//   [selectAgricultureBaseline, selectSimulationInputs],
//   (agriculture, inputs) => {
//     if (!agriculture || !Array.isArray(agriculture.parameters)) return [];
//     const newAgriculture = generateScenarioProjection(agriculture, inputs);
//     const selectLahanPanenPadi = newAgriculture
//       ? newAgriculture.parameters.find(
//           (item: Params) => item.name == "Lahan Panen Padi",
//         )
//       : agriculture.parameters.find(
//           (item: Params) => item.name == "Lahan Panen Padi",
//         );
//     return generateLocalFoodProductionYear(selectLahanPanenPadi);
//   },
// );

// export const selectAgricultureLandProjection = createSelector(
//   [selectLandCoverBaseline],
//   (landCover) => {
//     if (!landCover || !Array.isArray(landCover.parameters)) return [];
//     const agricultureLand = landCover.parameters.find(
//       (param: Params) =>
//         param.name === "Agriculture Area" || param.name === "Agriculture Land",
//     );
//     return agricultureLand?.values || [];
//   },
// );

// export const selectAvailabillityPerPerson = createSelector(
//   [selectProjectedLocalFoodProduction, selectProjectedPopulationTotal],
//   (localFoods, populations) => {
//     if (!localFoods || !populations || localFoods.length !== populations.length)
//       return [];
//     if (populations.length === 0 || localFoods.length === 0) return [];

//     const safePopulations = populations.map((val) => val ?? 0);
//     return generateAvailabillityPerPerson(safePopulations, localFoods);
//   },
// );
import { createSelector } from "@reduxjs/toolkit";
import { IBaselineData } from "@/lib/types/response";
import {
  generateLocalFoodProductionYear,
  generateAvailabillityPerPerson,
} from "@/lib/utils/projections";
import {
  selectAgricultureScenarioProjection,
  selectAgricultureScenarioProjectionA,
  selectAgricultureScenarioProjectionB,
  selectLandCoverProjection,
  selectLandCoverProjectionA,
  selectLandCoverProjectionB,
} from "./scenarioProjectionSelector";
import { selectPopulationDataComparison } from "./socioEconomySelector"; // Impor hasil perbandingan populasi

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
    selectLandCoverProjectionA,
    selectLandCoverProjectionB,
  ],
  (projActive, projA, projB) => {
    return {
      active: calculateAgricultureLand(projActive),
      scenarioA: calculateAgricultureLand(projA),
      scenarioB: calculateAgricultureLand(projB),
    };
  },
);

export const selectLocalFoodProductionComparison = createSelector(
  [
    selectAgricultureScenarioProjection,
    selectAgricultureScenarioProjectionA,
    selectAgricultureScenarioProjectionB,
  ],
  (projActive, projA, projB) => {
    console.log(calculateLocalFoodProduction(projActive));
    return {
      active: calculateLocalFoodProduction(projActive),
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
