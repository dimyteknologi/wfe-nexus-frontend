import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DashboardState {
  displayedChartMetricIds: string[];
}

const initialState: DashboardState = {
  displayedChartMetricIds: [
    "gdrp",
    "population",
    "economicGrowth",
    "gdrpPerCapita",
  ],
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
  },
});

export const { updateChartMetric } = dashboardSlice.actions;
export default dashboardSlice.reducer;
