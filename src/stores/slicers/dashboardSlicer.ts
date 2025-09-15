import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const DEFAULT_CHARTS_BY_CATEGORY: Record<string, string[]> = {
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
interface DashboardState {
  displayedChartMetricIds: string[];
}

const initialState: DashboardState = {
  displayedChartMetricIds: DEFAULT_CHARTS_BY_CATEGORY["SE"].slice(0, 4),
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    updateChartMetric: (
      state,
      action: PayloadAction<{ chartIndex: number; newMetricId: string }>,
    ) => {
      const { chartIndex, newMetricId } = action.payload;
      if (state.displayedChartMetricIds[chartIndex]) {
        state.displayedChartMetricIds[chartIndex] = newMetricId;
      }
    },
    setChartsToCategoryPreset: (state, action: PayloadAction<string>) => {
      const category = action.payload;
      const defaultCharts = DEFAULT_CHARTS_BY_CATEGORY[category] || [];
      state.displayedChartMetricIds = defaultCharts.slice(0, 4);
    },
  },
});

export const { updateChartMetric, setChartsToCategoryPreset } =
  dashboardSlice.actions;
export default dashboardSlice.reducer;
