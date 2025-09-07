import { createSelector } from "@reduxjs/toolkit";
import { Computation } from "@/lib/utils/formulas";
import {
  selectGdrpScenarioProjection,
  selectPopulationScenarioProjection,
} from "./scenarioProjectionSelector";

const selectProjectedGdrpTotal = createSelector(
  [selectGdrpScenarioProjection],
  (projection) => {
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
  },
);

export const selectProjectedPopulationTotal = createSelector(
  [selectPopulationScenarioProjection],
  (projection) => {
    if (!projection || !Array.isArray(projection.parameters)) return [];
    const totalPopulationParam = projection.parameters.find(
      (param) => param.name === "total" || param.name === "total_population",
    );
    return totalPopulationParam?.values || [];
  },
);

// final selectors data

export const selectGdrpInBillions = createSelector(
  [selectProjectedGdrpTotal],
  (gdrpTotal) => gdrpTotal.map((val) => val.toFixed(2)),
);

export const selectEconomicGrowth = createSelector(
  [selectProjectedGdrpTotal],
  (gdrpTotal) => Computation.calculateGrowthRates(gdrpTotal),
);
export const selectGdrpPerCapita = createSelector(
  [selectProjectedGdrpTotal, selectProjectedPopulationTotal],
  (gdrpTotal, population) => {
    if (gdrpTotal.length !== population.length) return [];
    return gdrpTotal.map((gdrp, index) => {
      const pop = population[index];
      return pop ? parseFloat((gdrp / pop).toFixed(2)) : 0;
    });
  },
);

export const selectPopulationData = selectProjectedPopulationTotal;
