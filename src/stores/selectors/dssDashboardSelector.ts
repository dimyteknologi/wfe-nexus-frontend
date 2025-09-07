// --- SELECTORS ---

import { createSelector } from "@reduxjs/toolkit";
import { ALL_METRICS } from "@/lib/constant/metrics";
import { selectDisplayedIds } from "./baseSelector";
import { selectGdrpScenarioProjection } from "./scenarioProjectionSelector";
import {
  selectEconomicGrowth,
  selectGdrpInBillions,
  selectGdrpPerCapita,
  selectPopulationData,
} from "./socioEconomySelector";
import {
  selectAgricultureLandProjection,
  selectAvailabillityPerPerson,
  selectProjectedLocalFoodProduction,
} from "./foodSelector";

export const selectFinalSocioEconomicData = createSelector(
  [
    selectGdrpScenarioProjection,
    selectGdrpInBillions,
    selectEconomicGrowth,
    selectGdrpPerCapita,
    selectPopulationData,
    selectAgricultureLandProjection,
    selectProjectedLocalFoodProduction,
    selectAvailabillityPerPerson,
  ],
  (
    projection,
    gdrpInBillions,
    economicGrowth,
    gdrpPerCapita,
    population,
    agricultureLand,
    localFoodProductionPerYear,
    availabilityPerson,
  ) => {
    if (!projection) return null;

    const { years } = projection;
    const finalLength = years.length;

    return {
      years: years.map(String),
      metrics: {
        gdrp: gdrpInBillions.slice(0, finalLength),
        economicGrowth: economicGrowth.slice(0, finalLength),
        gdrpPerCapita: gdrpPerCapita.slice(0, finalLength),
        population: population.slice(0, finalLength),
        agricultureLand: agricultureLand.slice(0, finalLength),
        localFoodProduction: localFoodProductionPerYear.slice(0, finalLength),
        availabilityPerson: availabilityPerson.slice(0, finalLength),
      },
    };
  },
);

// Selector dasar untuk mengambil array ID yang sedang ditampilkan

/**
 * Selector untuk mendapatkan data LENGKAP dari metrik yang sedang ditampilkan.
 * Menggabungkan 'ALL_METRICS' dengan 'displayedChartMetricIds'.
 */
export const selectDisplayedMetrics = createSelector(
  [selectDisplayedIds], // Input: array string ['population', 'gdrp']
  (displayedIds) => {
    // Langkah 1: Filter
    const filtered = ALL_METRICS.filter((metric) =>
      displayedIds.includes(metric.id),
    );

    // Langkah 2: Urutkan
    const sorted = filtered.sort((a, b) => {
      const indexA = displayedIds.indexOf(a.id);
      const indexB = displayedIds.indexOf(b.id);
      return indexA - indexB;
    });

    return sorted;
  },
);

/**
 * Selector untuk mendapatkan metrik yang TERSEDIA untuk dipilih
 * (semua metrik KECUALI yang sudah ditampilkan).
 */
export const selectAvailableMetrics = createSelector(
  [selectDisplayedIds],
  (displayedIds) => {
    const displayedIdSet = new Set(displayedIds);
    return ALL_METRICS.filter((metric) => !displayedIdSet.has(metric.id));
  },
);
