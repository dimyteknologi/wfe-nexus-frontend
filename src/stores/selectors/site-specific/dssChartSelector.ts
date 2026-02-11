import { createSelector } from "@reduxjs/toolkit";
import {
  selectEconomicGrowthComparison,
  selectGdrpInBillionsComparison,
  selectGdrpPerCapitaComparison,
  selectPopulationDataComparison,
} from "@/stores/selectors/site-specific/socioEconomySelector";
import {
  selectAgricultureLandComparison,
  selectAvailabilityPerPersonComparison,
  selectLocalFoodProductionComparison,
  selectLocalFoodSuffiencyComparison,
  selectProductionSurplusComparison,
} from "@/stores/selectors/site-specific/foodSelector";
import {
  selectElectricityPerCapitaComparison,
  selectElectrityImportComparison,
  selectLocalEnergyProductionComparison,
  selectLocalEnergySuffiencyComparison,
  selectLocalRenewableEnergyContributionComparison,
} from "@/stores/selectors/site-specific/energySelector";
import {
  AnnualWaterSupplyComparison,
  LocalWaterSuffiencyComparison,
  WaterAvailabilityPerPerson,
} from "@/stores/selectors/site-specific/waterSelector";
import {
  // Site Specific
  selectSiteSpecificScenarioAName,
  selectSiteSpecificScenarioBName,
  selectSiteSpecificBaseline,
  // Context Specific
  // selectContextSpecificAName,
  // selectContextSpecificBName,
  // selectContextSpecificBaseline
  // selectIndustryInputs,
} from "@/stores/selectors/baseSelector";
import { ALL_METRICS_SITE_SPECIFICS } from "@/lib/constant/metrics";
// import { selectTotalWaterDemand } from "./demandSideSelector";

type ScenarioKey = "active" | "baseline" | "scenarioA" | "scenarioB";
type ComparisonData = Record<ScenarioKey, number[]>;

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
      selectLocalFoodSuffiencyComparison,
      selectProductionSurplusComparison,
      selectElectricityPerCapitaComparison,
      selectElectrityImportComparison,
      selectLocalEnergyProductionComparison,
      selectLocalEnergySuffiencyComparison,
      selectLocalRenewableEnergyContributionComparison,
      AnnualWaterSupplyComparison,
      LocalWaterSuffiencyComparison,
      WaterAvailabilityPerPerson,
      selectSiteSpecificScenarioAName,
      selectSiteSpecificScenarioBName,
      // selectSiteSpecificBaseline,
    ],
    (
      gdrpInBillions,
      economicGrowth,
      gdrpPerCapita,
      population,
      agricultureLand,
      availabilityPerson,
      localFoodProduction,
      localFoodSuffiency,
      productionSurplus,
      electricityPerCapita,
      electricityImport,
      localEnergyProduction,
      localEnergySuffiency,
      localRenewableEnergy,
      annualWaterSuply,
      localWaterSuffiency,
      waterAvailability,
      siteNameA,
      siteNameB,
      // siteBaseline,
    ) => {
      const metricsMap: Record<string, ComparisonData> = {
        gdrp: gdrpInBillions,
        economicGrowth: economicGrowth,
        gdrpPerCapita: gdrpPerCapita,
        population: population,
        agricultureLand: agricultureLand,
        availabilityPerson: availabilityPerson,
        localFoodProduction: localFoodProduction,
        localFoodSuffiency: localFoodSuffiency,
        productionSurplus: productionSurplus,
        electricityPerCapita: electricityPerCapita,
        electricityImport: electricityImport,
        localEnergyProduction: localEnergyProduction,
        localEnergySuffiency: localEnergySuffiency,
        localRenewableEnergy: localRenewableEnergy,
        annualWaterSuply,
        localWaterSuffiency,
        waterAvailability,
      };
      
      const metricConfig = ALL_METRICS_SITE_SPECIFICS.find(
        (m) => m.id === metricId,
      );
      const selectedMetricData = metricsMap[metricId];
      if (!selectedMetricData) return { series: [], colors: [] };
      const series = [];
      const colors = [];

      const dynamicColors = ["#0004ffff", "#FF6C0C", "#FFE08F"];
      if (selectedMetricData.baseline?.length > 0) {
        series.push({ name: "Baseline", data: selectedMetricData.baseline });
        colors.push(dynamicColors[0]);
      }
      if (selectedMetricData.active?.length > 0) {
        series.push({ name: "Current", data: selectedMetricData.active });
        colors.push(dynamicColors[1]);
      }
      if (selectedMetricData.scenarioA?.length > 0 && siteNameA) {
        series.push({ name: siteNameA, data: selectedMetricData.scenarioA });
        colors.push(dynamicColors[2]);
      }
      if (selectedMetricData.scenarioB?.length > 0 && siteNameB) {
        series.push({ name: siteNameB, data: selectedMetricData.scenarioB });
        colors.push(dynamicColors[3]);
      }
      if (metricConfig?.additionalSeries) {
        for (const additional of metricConfig.additionalSeries) {
          series.push({ name: additional.name, data: additional.data });
          colors.push(additional.color || "#808080");
        }
      }
      return { series, colors, type: metricConfig?.type ?? "line" };
    },
  );

export const selectAllMetricsDataMap = createSelector(
  [
    selectGdrpInBillionsComparison,
    selectEconomicGrowthComparison,
    selectGdrpPerCapitaComparison,
    selectPopulationDataComparison,
    selectAgricultureLandComparison,
    selectAvailabilityPerPersonComparison,
    selectLocalFoodProductionComparison,
    selectLocalFoodSuffiencyComparison,
    selectProductionSurplusComparison,
    selectElectricityPerCapitaComparison,
    selectElectrityImportComparison,
    selectLocalEnergyProductionComparison,
    selectLocalEnergySuffiencyComparison,
    selectLocalRenewableEnergyContributionComparison,
    AnnualWaterSupplyComparison,
    LocalWaterSuffiencyComparison,
    WaterAvailabilityPerPerson,
    selectSiteSpecificScenarioAName,
    selectSiteSpecificScenarioBName,
    selectSiteSpecificBaseline,
  ],
  (
    gdrpInBillions,
    economicGrowth,
    gdrpPerCapita,
    population,
    agricultureLand,
    availabilityPerson,
    localFoodProduction,
    localFoodSuffiency,
    productionSurplus,
    electricityPerCapita,
    electricityImport,
    localEnergyProduction,
    localEnergySuffiency,
    localRenewableEnergy,
    annualWaterSuply,
    localWaterSuffiency,
    waterAvailability,
  ) => {
    const metricsMap: Record<string, ComparisonData> = {
      gdrp: gdrpInBillions,
      economicGrowth: economicGrowth,
      gdrpPerCapita: gdrpPerCapita,
      population: population,
      agricultureLand: agricultureLand,
      availabilityPerson: availabilityPerson,
      localFoodProduction: localFoodProduction,
      localFoodSuffiency: localFoodSuffiency,
      productionSurplus: productionSurplus,
      electricityPerCapita: electricityPerCapita,
      electricityImport: electricityImport,
      localEnergyProduction: localEnergyProduction,
      localEnergySuffiency: localEnergySuffiency,
      localRenewableEnergy: localRenewableEnergy,
      annualWaterSuply,
      localWaterSuffiency,
      waterAvailability,
    };

    return metricsMap;
  },
);
