import { createSelector } from "@reduxjs/toolkit";
import {
  selectEconomicGrowthComparison,
  selectGdrpInBillionsComparison,
  selectGdrpPerCapitaComparison,
  selectPopulationDataComparison,
} from "./socioEconomySelector";
import {
  selectAgricultureLandComparison,
  selectAvailabilityPerPersonComparison,
  selectLocalFoodProductionComparison,
} from "./foodSelector";
import { selectScenarioAName, selectScenarioBName } from "./baseSelector";

type ComparisonData = {
  active: number[];
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
    ) => {
      const metricsMap: Record<string, ComparisonData> = {
        gdrp: gdrpInBillions,
        economicGrowth: economicGrowth,
        gdrpPerCapita: gdrpPerCapita,
        population: population,
        agricultureLand: agricultureLand,
        availabilityPerson: availabilityPerson,
        localFoodProduction: localFoodProduction,
        // ...
      };

      const selectedMetricData = metricsMap[metricId];
      if (!selectedMetricData) return [];

      const series = [];
      if (selectedMetricData.active?.length > 0) {
        series.push({ name: "User Scenario", data: selectedMetricData.active });
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
