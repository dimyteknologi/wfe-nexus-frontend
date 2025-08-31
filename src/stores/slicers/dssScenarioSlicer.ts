import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SimulationState } from "./dssInputSlicer";
const STORAGE_KEY = "scenarios";
interface ScenarioState {
  data: SimulationState[];
  error?: string;
  success?: string;
}

const initialState: ScenarioState = {
  data: [],
  error: undefined,
  success: undefined,
};

const scenarioSlice = createSlice({
  name: "scenarios",
  initialState,
  reducers: {
    addScenario: (state, action: PayloadAction<SimulationState>) => {
      const data = action.payload;

      if (!data.simulationName || data.simulationName.trim() === "") {
        state.error = "Fail: required simulation name!";
        return;
      }

      try {
        const existingScenariosRaw = localStorage.getItem(STORAGE_KEY);
        const existingScenarios: SimulationState[] = existingScenariosRaw
          ? JSON.parse(existingScenariosRaw)
          : [];

        const existingIndex = existingScenarios.findIndex(
          (s) =>
            s.simulationName?.toLocaleLowerCase() ===
            data.simulationName?.toLocaleLowerCase(),
        );

        if (existingIndex !== -1) {
          existingScenarios[existingIndex] = data;
          state.success = "Success: scenario updated!";
        } else {
          existingScenarios.push(data);
          state.success = "Success: scenario saved!";
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(existingScenarios));
        state.data = existingScenarios;
        state.error = undefined;
      } catch (error) {
        state.error = "Fail: " + error;
      }
    },

    loadScenarios: (state) => {
      try {
        const savedScenariosRaw = localStorage.getItem(STORAGE_KEY);
        const savedScenarios: SimulationState[] = savedScenariosRaw
          ? JSON.parse(savedScenariosRaw)
          : [];
        state.data = savedScenarios;
      } catch (error) {
        state.error = "Fail: " + error;
      }
    },
  },
});

export const { addScenario, loadScenarios } = scenarioSlice.actions;
export default scenarioSlice.reducer;
