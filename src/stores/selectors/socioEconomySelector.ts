import { createSelector } from "@reduxjs/toolkit";
import { Computation } from "@/lib/utils/formulas";
import {
  selectGdrpScenarioProjection,
  selectGdrpScenarioProjectionA,
  selectGdrpScenarioProjectionB,
  selectPopulationScenarioProjection,
  selectPopulationScenarioProjectionA,
  selectPopulationScenarioProjectionB,
} from "./scenarioProjectionSelector";
import { IBaselineData } from "@/lib/types/response";

// const selectProjectedGdrpTotal = createSelector(
//   [selectGdrpScenarioProjection],
//   (projection) => {
//     if (!projection) return [];
//     const { parameters, years } = projection;
//     const aggregateKeysToExclude = new Set([
//       "Produk Domestik Regional Bruto",
//       "PDRB Tanpa Migas",
//       "Produk Domestik Regional Bruto Non Pemerintahan",
//     ]);
//     const gdrpTotalByYear = new Array(years.length).fill(0);

//     const gdrpSectors = parameters.filter(
//       (param) => !aggregateKeysToExclude.has(param.name),
//     );

//     for (const sector of gdrpSectors) {
//       sector.values.forEach((value, index) => {
//         gdrpTotalByYear[index] += value ?? 0;
//       });
//     }
//     return gdrpTotalByYear;
//   },
// );

// export const selectProjectedPopulationTotal = createSelector(
//   [selectPopulationScenarioProjection],
//   (projection) => {
//     if (!projection || !Array.isArray(projection.parameters)) return [];
//     const totalPopulationParam = projection.parameters.find(
//       (param) => param.name === "total" || param.name === "total_population",
//     );
//     return totalPopulationParam?.values || [];
//   },
// );

// // final selectors data
// export const selectGdrpInBillions = createSelector(
//   [selectProjectedGdrpTotal],
//   (gdrpTotal) => gdrpTotal.map((val) => val.toFixed(2)),
// );

// export const selectEconomicGrowth = createSelector(
//   [selectProjectedGdrpTotal],
//   (gdrpTotal) => Computation.calculateGrowthRates(gdrpTotal),
// );

// export const selectGdrpPerCapita = createSelector(
//   [selectProjectedGdrpTotal, selectProjectedPopulationTotal],
//   (gdrpTotal, population) => {
//     if (gdrpTotal.length !== population.length) return [];
//     return gdrpTotal.map((gdrp, index) => {
//       const pop = population[index];
//       return pop ? parseFloat((gdrp / pop).toFixed(2)) : 0;
//     });
//   },
// );

// export const selectPopulationData = selectProjectedPopulationTotal;

const calculateGdrpTotal = (projection: IBaselineData | null): number[] => {
  if (!projection) return [];
  const { parameters, years } = projection;
  const aggregateKeysToExclude = new Set([
    "Produk Domestik Regional Bruto",
    "PDRB Tanpa Migas",
    "Produk Domestik Regional Bruto Non Pemerintahan",
  ]);
  const gdrpTotalByYear = new Array(years.length).fill(0);
  const gdrpSectors = parameters.filter(
    (param) => !aggregateKeysToExclude.has(param.name),
  );
  for (const sector of gdrpSectors) {
    sector.values.forEach((value, index) => {
      gdrpTotalByYear[index] += value ?? 0;
    });
  }
  return gdrpTotalByYear;
};

const calculatePopulationTotal = (
  projection: IBaselineData | null,
): number[] => {
  if (!projection) return [];

  const totalPopulationParam = projection.parameters.find(
    (param) => param.name === "total" || param.name === "total_population",
  );
  if (!totalPopulationParam?.values) return [];
  const safeValues = totalPopulationParam.values.map((val) => val ?? 0);

  return safeValues.length > 1 ? safeValues : [];
};

export const selectGdrpPerCapitaComparison = createSelector(
  [
    selectGdrpScenarioProjection,
    selectPopulationScenarioProjection,
    selectGdrpScenarioProjectionA,
    selectPopulationScenarioProjectionA,
    selectGdrpScenarioProjectionB,
    selectPopulationScenarioProjectionB,
  ],
  (projGdpActive, projPopActive, projGdpA, projPopA, projGdpB, projPopB) => {
    const calculatePerCapita = (
      gdpProj: IBaselineData | null,
      popProj: IBaselineData | null,
    ) => {
      const gdrpTotal = calculateGdrpTotal(gdpProj);
      const population = calculatePopulationTotal(popProj);
      if (gdrpTotal.length !== population.length) return [];
      return gdrpTotal.map((gdrp, index) => {
        const pop = population[index];
        return pop ? parseFloat((gdrp / pop).toFixed(2)) : 0;
      });
    };

    return {
      active: calculatePerCapita(projGdpActive, projPopActive),
      scenarioA: calculatePerCapita(projGdpA, projPopA),
      scenarioB: calculatePerCapita(projGdpB, projPopB),
    };
  },
);

export const selectEconomicGrowthComparison = createSelector(
  [
    selectGdrpScenarioProjection,
    selectGdrpScenarioProjectionA,
    selectGdrpScenarioProjectionB,
  ],
  (projActive, projA, projB) => {
    const activeGdpTotal = calculateGdrpTotal(projActive);
    const gdpTotalA = calculateGdrpTotal(projA);
    const gdpTotalB = calculateGdrpTotal(projB);

    return {
      active: Computation.calculateGrowthRates(activeGdpTotal),
      scenarioA: Computation.calculateGrowthRates(gdpTotalA),
      scenarioB: Computation.calculateGrowthRates(gdpTotalB),
    };
  },
);

export const selectGdrpInBillionsComparison = createSelector(
  [
    selectGdrpScenarioProjection,
    selectGdrpScenarioProjectionA,
    selectGdrpScenarioProjectionB,
  ],
  (projActive, projA, projB) => {
    const transform = (projection: IBaselineData | null) => {
      const gdrpTotal = calculateGdrpTotal(projection);
      return gdrpTotal.map((val) => parseFloat(val.toFixed(2)));
    };
    return {
      active: transform(projActive),
      scenarioA: transform(projA),
      scenarioB: transform(projB),
    };
  },
);

export const selectPopulationDataComparison = createSelector(
  [
    selectPopulationScenarioProjection,
    selectPopulationScenarioProjectionA,
    selectPopulationScenarioProjectionB,
  ],
  (projActive, projA, projB) => {
    return {
      active: calculatePopulationTotal(projActive),
      scenarioA: calculatePopulationTotal(projA),
      scenarioB: calculatePopulationTotal(projB),
    };
  },
);
