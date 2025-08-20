import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SimulationState } from "./dssInputSlicer";

interface ScenarioState {
  scenarios: SimulationState[];
}

const initialState: ScenarioState = {
  scenarios: [],
};

const ScenarioSlice = createSlice({
  name: "scenarios",
  initialState,
  reducers: {
    loadScenarios: (state) => {
      const key = "scenarios";
      try {
        const scenariosRaw = localStorage.getItem(key);
        if (scenariosRaw) {
          state.scenarios = JSON.parse(scenariosRaw);
        }
      } catch (error) {
        console.error("Gagal memuat skenario dari localStorage:", error);
        state.scenarios = [];
      }
    },
    addScenario: (state, action: PayloadAction<SimulationState>) => {
      state.scenarios.push(action.payload);
    },
  },
});

export const { loadScenarios, addScenario } = ScenarioSlice.actions;
export default ScenarioSlice.reducer;
