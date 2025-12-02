import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const DEFAULT_CHARTS_BY_CATEGORY_SITE: Record<string, string[]> = {
  DEFAULT: [
    "waterAvailability",
    "population",
    "localFoodProduction",
    "electricityPerCapita",
  ],
  SE: ["gdrp", "population", "economicGrowth", "gdrpPerCapita"],
  FOOD: [
    "agricultureLand",
    "localFoodProduction",
    "availabilityPerson",
    "localFoodSuffiency",
    "productionSurplus",
  ],
  ENERGY: [
    "localEnergySuffiency",
    "electricityImport",
    "localEnergyProduction",
    "localRenewableEnergy",
    "electricityPerCapita",
  ],
  WATER: ["annualWaterSuply", "localWaterSuffiency", "waterAvailability"],
};

const DEFAULT_CHARTS_BY_CATEGORY_CONTEXT: Record<string, string[]> = {
  DEFAULT: [
    "productionTotal",
    "waterConsumption",
    "totalemissionImpact",
    "productionRice",
  ],
  PRODUCTION: [
    "productionTotal",
    "productionRice",
    "productionAverage",
    "productionSolar",
  ],
  RESOURCE: [
    "fuelConsumption",
    "chemicalFertilizerConsumption",
    "renewableConsumption",
    "organicFertilizereConsumption",
  ],
  IMPACT: [
    "totalemissionImpact",
    "foodSuffiencyImpact",
    "emissionIntensityProductionImpact",
    "emissionReductionImpact",
    "waterIntensityImpact",
    "fuelIntensityImpact",
  ],
};

interface DashboardState {
  displayedChartSiteSpecifics: string[];
  displayedChartContextSpecifics: string[];
}

const initialState: DashboardState = {
  displayedChartSiteSpecifics: DEFAULT_CHARTS_BY_CATEGORY_SITE["DEFAULT"].slice(
    0,
    4,
  ),
  displayedChartContextSpecifics: DEFAULT_CHARTS_BY_CATEGORY_CONTEXT[
    "DEFAULT"
  ].slice(0, 4),
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    updateChartMetric: (
      state,
      action: PayloadAction<{
        target: "site" | "context";
        chartIndex: number;
        newMetricId: string;
      }>,
    ) => {
      const { target, chartIndex, newMetricId } = action.payload;

      if (target === "site") {
        if (state.displayedChartSiteSpecifics[chartIndex]) {
          state.displayedChartSiteSpecifics[chartIndex] = newMetricId;
        }
      } else {
        if (state.displayedChartContextSpecifics[chartIndex]) {
          state.displayedChartContextSpecifics[chartIndex] = newMetricId;
        }
      }
    },

    setChartsToCategoryPreset: (
      state,
      action: PayloadAction<{ target: "site" | "context"; category: string }>,
    ) => {
      const { target, category } = action.payload;

      if (target === "site") {
        const defaults = DEFAULT_CHARTS_BY_CATEGORY_SITE[category] || [];
        state.displayedChartSiteSpecifics = defaults.slice(0, 4);
      } else {
        const defaults = DEFAULT_CHARTS_BY_CATEGORY_CONTEXT[category] || [];
        state.displayedChartContextSpecifics = defaults.slice(0, 4);
      }
    },
  },
});

export const { updateChartMetric, setChartsToCategoryPreset } =
  dashboardSlice.actions;
export default dashboardSlice.reducer;
