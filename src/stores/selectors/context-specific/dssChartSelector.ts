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
} from "../baseSelector";
import { ALL_METRICS_CONTEXT_SPECIFICS } from "@/lib/constant/metrics";

type ComparisonData = {
  active: number[];
  baseline?: number[];
  scenarioA: number[];
  scenarioB: number[];
};

export const makeSelectComparisonSeriesForMetric = (metricId: string) =>
  createSelector(
    [
      potentialDryingAgriAndFinalProcessing,
      selectWaterTransportedPerScenario,
      selectActualCiPerScenario,
      selectTotalCumulativeCostPerScenario,
      selectTotalCumulativeRevenuePerScenario,
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
      selectContextSpecificAName,
      selectContextSpecificBName,
    ],(
      potentialExcess,
      waterTransported,
      actualCi,
      productionSolarCost,
      productionSolarRevenue,
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
      scenarioA,
      scenarioB,
    ) => {
      const metricsMap: Record<string, ComparisonData> = {
        potentialExcess,
        waterTransported,
        actualCi,
        productionSolar: productionSolarCost,
        productionSolarRevenue,
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
      };
      const metricConfig = ALL_METRICS_CONTEXT_SPECIFICS.find(
        (m) => m.id === metricId,
      );
      const selectedMetricData = metricsMap[metricId];

      if (!selectedMetricData) return { series: [], colors: [] };
      const series = [];
      const colors = [];
      const dynamicColors = ["#67B2D8", "#73AF6F", "#BF1A1A"];
      if (selectedMetricData.active?.length > 0) {
        series.push({
          name: "Current",
          data: selectedMetricData.active.slice(0, 10),
        });
        colors.push(dynamicColors[0]);
      }
      if (selectedMetricData.scenarioA?.length > 0 && scenarioA) {
        series.push({
          name: scenarioA,
          data: selectedMetricData.scenarioA.slice(0, 10),
        });
        colors.push(dynamicColors[1]);
      }
      if (selectedMetricData.scenarioB?.length > 0 && scenarioB) {
        series.push({
          name: scenarioB,
          data: selectedMetricData.scenarioB.slice(0, 10),
        });
        colors.push(dynamicColors[2]);
      }
      if (metricConfig?.additionalSeries) {
        for (const additional of metricConfig.additionalSeries) {
          series.push({
            name: additional.name,
            data: metricId === "productionSolar"
                ? productionSolarRevenue?.active?.slice(0, 10)
                : additional.data,
          });
          colors.push(additional.color || "#FF6D1F");
        }
      }
      // if (metricConfig?.additionalSeries) {
      //   for (const additional of metricConfig.additionalSeries) {
      //     if (metricId === "productionSolar") {
      //       series.push(
      //         {
      //           name: `${additional.name} (Active)`,
      //           data: productionSolarCost?.active?.slice(0, 10) ?? [],
      //         },
      //         {
      //           name: `${additional.name} (Scenario A)`,
      //           data: productionSolarCost?.scenarioA?.slice(0, 10) ?? [],
      //         },
      //         {
      //           name: `${additional.name} (Scenario B)`,
      //           data: productionSolarCost?.scenarioB?.slice(0, 10) ?? [],
      //         }
      //       );

      //       colors.push(
      //         additional.color || "#FF6D1F",
      //         additional.color || "#FF6D1F",
      //         additional.color || "#FF6D1F"
      //       );
      //     } else {
      //       series.push({
      //         name: additional.name,
      //         data: additional.data,
      //       });

      //       colors.push(additional.color || "#FF6D1F");
      //     }
      //   }
      // }
      return { series, colors, type: metricConfig?.type ?? "bar" };
    },
  );

export const selectAllMetricsDataMap = createSelector(
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
    };
    return metricsMap;
  },
);
