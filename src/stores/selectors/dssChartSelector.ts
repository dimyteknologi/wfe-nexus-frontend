import { createSelector } from "@reduxjs/toolkit";
import {
  selectEconomicGrowthComparison,
  selectGdrpInBillionsComparison,
  selectGdrpPerCapitaComparison,
  selectPopulationDataComparison,
} from "@/stores/selectors/socioEconomySelector";
import {
  selectAgricultureLandComparison,
  selectAvailabilityPerPersonComparison,
  selectLocalFoodProductionComparison,
} from "@/stores/selectors/foodSelector";
import {
  selectScenarioAName,
  selectScenarioBName,
  selectBaselineInput,
} from "@/stores/selectors/baseSelector";

type ComparisonData = {
  active: number[];
  baseline: number[];
  scenarioA: number[];
  scenarioB: number[];
};

export const makeSelectComparisonSeriesForMetric = (metricId: string) =>
  createSelector(
    [
      selectGdrpInBillionsComparison,
      selectEconomicGrowthComparison,
      selectGdrpPerCapitaComparison,
      selectPopulationDataComparison,
      selectAgricultureLandComparison,
      selectAvailabilityPerPersonComparison,
      selectLocalFoodProductionComparison,
      selectScenarioAName,
      selectScenarioBName,
      selectBaselineInput,
    ],
    (
      gdrpInBillions,
      economicGrowth,
      gdrpPerCapita,
      population,
      agricultureLand,
      availabilityPerson,
      localFoodProduction,
      nameA,
      nameB,
      baseline,
    ) => {
      const metricsMap: Record<string, ComparisonData> = {
        gdrp: gdrpInBillions,
        economicGrowth: economicGrowth,
        gdrpPerCapita: gdrpPerCapita,
        population: population,
        agricultureLand: agricultureLand,
        availabilityPerson: availabilityPerson,
        localFoodProduction: localFoodProduction,
        baseline: baseline,
        // ...
      };

      const selectedMetricData = metricsMap[metricId];
      if (!selectedMetricData) return [];

      const series = [];
      if (selectedMetricData.baseline?.length > 0) {
        series.push({ name: "Baseline", data: selectedMetricData.baseline });
      }
      if (selectedMetricData.active?.length > 0) {
        series.push({ name: "Current", data: selectedMetricData.active });
      }
      if (selectedMetricData.scenarioA?.length > 0 && nameA) {
        series.push({ name: nameA, data: selectedMetricData.scenarioA });
      }
      if (selectedMetricData.scenarioB?.length > 0 && nameB) {
        series.push({ name: nameB, data: selectedMetricData.scenarioB });
      }
      return series;
    },
  );
