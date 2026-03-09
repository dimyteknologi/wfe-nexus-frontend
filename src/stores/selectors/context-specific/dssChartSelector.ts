import { createSelector } from "@reduxjs/toolkit";
import { potentialDryingAgriAndFinalProcessing, selectActualCiPerScenario, selectProductionTotalPerScenario } from "./resourceSupplySelector";
import {
  selectRiceProductionPerScenario,
  selectAverageProductivityPerScenario,
  selectWaterConsumptionPerScenario,
  selectFuelConsumptionPerScenario,
  selectRenewableConsumptionPerScenario,
  selectChemicalFertillizerPerScenario,
  selectOrganicFertillizerPerScenario,
  selectTotalEmissionPerScenario,
  selectFoodSuffiencyPerScenario,
  selectEmissionIntensityPerScenario,
  selectEmissionReductionPerScenario,
  selectWaterIntensityPerScenario,
  selectFuelIntensityPerScenario,
  selectTotalCumulativeCostPerScenario,
  selectTotalCumulativeRevenuePerScenario,
  selectWaterTransportedPerScenario,
} from "./resultSelector";
import {
  selectContextSpecificAName,
  selectContextSpecificBName,
  createDeepEqualSelector
} from "../baseSelector";
import { ALL_METRICS_CONTEXT_SPECIFICS } from "@/lib/constant/metrics";

type ComparisonData = {
  active: number[];
  baseline?: number[];
  scenarioA: number[];
  scenarioB: number[];
};

const EMPTY_SERIES_RESULT = { series: [], colors: [], type: "bar" as const, invalidScenarios: [] as string[] };

export const makeSelectComparisonSeriesForMetric = (metricId: string) =>
  createSelector(
    [
      selectAllMetricsDataMap,
      selectContextSpecificAName,
      selectContextSpecificBName,
    ],
    (metricsMap, scenarioA, scenarioB) => {
      const metricConfig = ALL_METRICS_CONTEXT_SPECIFICS.find(
        (m) => m.id === metricId,
      );
      const selectedMetricData = metricsMap[metricId];

      if (!selectedMetricData) return EMPTY_SERIES_RESULT;

      const series = [];
      const colors = [];
      const invalidScenarios: string[] = [];
      const dynamicColors = ["#67B2D8", "#FF6D1F", "#478043ff", "#BF1A1A"];

      // CUSTOM OVERRIDE FOR SOLAR FINANCIAL PERFORMANCE
      if (metricId === "productionSolar") {
        series.push({
          name: "Current Installation & Investment Cost",
          data: (metricsMap.productionSolarCost?.active?.slice(0, 10) ?? []).map(v => Number(v || 0)),
        });
        colors.push(dynamicColors[0]); // Biru

        series.push({
          name: "Cumulative Revenue Baseline",
          data: (metricsMap.productionSolar?.baseline?.slice(0, 10) ?? []).map(v => Number(v || 0)),
        });
        colors.push(dynamicColors[1]); // Oranye

        if (scenarioA) {
          if (metricsMap.productionSolar?.scenarioA?.length > 0) {
            series.push({
              name: `Cumulative Revenue ${scenarioA}`,
              data: metricsMap.productionSolar.scenarioA.slice(0, 10).map(v => Number(v || 0)),
            });
            colors.push(dynamicColors[2]);
          } else {
            invalidScenarios.push(scenarioA);
          }
        }

        if (scenarioB) {
          if (metricsMap.productionSolar?.scenarioB?.length > 0) {
            series.push({
              name: `Cumulative Revenue ${scenarioB}`,
              data: metricsMap.productionSolar.scenarioB.slice(0, 10).map(v => Number(v || 0)),
            });
            colors.push(dynamicColors[3]);
          } else {
            invalidScenarios.push(scenarioB);
          }
        }

        if (!scenarioA && !scenarioB) {
          series.push({
            name: `Cumulative Revenue Current`,
            data: (metricsMap.productionSolar?.active?.slice(0, 10) ?? []).map(v => Number(v || 0)),
          });
          colors.push(dynamicColors[2]);
        }

        return { series, colors, type: "line" as const, invalidScenarios };
      }

      if (selectedMetricData?.active?.length > 0) {
        series.push({
          name: "Current",
          data: selectedMetricData?.active?.slice(0, 10) ?? Array(10).fill(0),
        });
        colors.push(dynamicColors[0]);
      }
      if (selectedMetricData?.baseline && selectedMetricData.baseline.length > 0) {
        series.push({
          name: "Baseline",
          data: selectedMetricData.baseline.slice(0, 10),
        });
        colors.push(dynamicColors[1]); // or another color
      }

      if (scenarioA) {
        if (selectedMetricData?.scenarioA?.length > 0) {
          series.push({
            name: scenarioA,
            data: selectedMetricData.scenarioA.slice(0, 10),
          });
          colors.push(dynamicColors[2]);
        } else {
          invalidScenarios.push(scenarioA);
        }
      }

      if (scenarioB) {
        if (selectedMetricData?.scenarioB?.length > 0) {
          series.push({
            name: scenarioB,
            data: selectedMetricData.scenarioB.slice(0, 10),
          });
          colors.push(dynamicColors[3]);
        } else {
          invalidScenarios.push(scenarioB);
        }
      }

      if (metricConfig?.additionalSeries) {
        for (const additional of metricConfig.additionalSeries) {
          series.push({
            name: additional.name,
            data: additional.data,
          });
          colors.push(additional.color || "#189c2aff");
        }
      }

      return { series, colors, type: metricConfig?.type ?? "bar", invalidScenarios };
    },
  );

export const selectAllMetricsDataMap = createDeepEqualSelector(
  [
    potentialDryingAgriAndFinalProcessing,
    selectWaterTransportedPerScenario,
    selectActualCiPerScenario,
    selectProductionTotalPerScenario,
    selectRiceProductionPerScenario,
    selectAverageProductivityPerScenario,
    selectWaterConsumptionPerScenario,
    selectFuelConsumptionPerScenario,
    selectRenewableConsumptionPerScenario,
    selectChemicalFertillizerPerScenario,
    selectOrganicFertillizerPerScenario,
    selectTotalEmissionPerScenario,
    selectFoodSuffiencyPerScenario,
    selectEmissionIntensityPerScenario,
    selectEmissionReductionPerScenario,
    selectWaterIntensityPerScenario,
    selectFuelIntensityPerScenario,
    selectTotalCumulativeCostPerScenario,
    selectTotalCumulativeRevenuePerScenario,
  ],
  (
    potentialExcess,
    waterTransported,
    actualCi,
    productionTotal,
    productionRice,
    productionAverage,
    waterConsumption,
    fuelConsumption,
    renewableConsumption,
    chemicalFertilizerConsumption,
    organicFertilizereConsumption,
    totalemissionImpact,
    foodSuffiencyImpact,
    emissionIntensityProductionImpact,
    emissionReductionImpact,
    waterIntensityImpact,
    fuelIntensityImpact,
    solarCost,
    solarRevenue,
  ) => {
    const productionSolar = {
      active: solarRevenue.active,
      baseline: solarRevenue.baseline,
      scenarioA: solarRevenue.scenarioA,
      scenarioB: solarRevenue.scenarioB,
    };

    const productionSolarCost = {
      active: solarCost.active,
      baseline: solarCost.baseline,
      scenarioA: solarCost.scenarioA,
      scenarioB: solarCost.scenarioB,
    };

    const metricsMap: Record<string, ComparisonData> = {
      potentialExcess,
      waterTransported,
      actualCi,
      productionTotal,
      productionRice,
      productionAverage,
      waterConsumption,
      fuelConsumption,
      renewableConsumption,
      chemicalFertilizerConsumption,
      organicFertilizereConsumption,
      totalemissionImpact,
      foodSuffiencyImpact,
      emissionIntensityProductionImpact,
      emissionReductionImpact,
      waterIntensityImpact,
      fuelIntensityImpact,
      productionSolar,
      productionSolarCost,
    };

    return metricsMap;
  },
);
