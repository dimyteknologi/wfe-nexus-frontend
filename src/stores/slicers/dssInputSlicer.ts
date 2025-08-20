import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRootState } from "../root-reducer";
export interface BaselinePayload {
  [key: string]: number;
}
export type TimePeriod = "2025-2030" | "2031-2040" | "2041-2045";
export type TimePeriodData = Record<TimePeriod, number | null>;
export interface AgricultureState {
  growthScenario: TimePeriodData;
  landConversion: TimePeriodData;
}
export interface LivestockState {
  cattleGrowth: TimePeriodData;
  poultryGrowth: TimePeriodData;
  goatGrowth: TimePeriodData;
}
export interface EnergyState {
  solarPvCoverage: TimePeriodData;
  solarPvAreaIndustrial: TimePeriodData;
  solarPvAreaHousing: TimePeriodData;
}
export interface IndustryState {
  growth: TimePeriodData;
}
export interface WaterState {
  aquacultureLandGrowth: TimePeriodData;
  artificialPondIndustrial: TimePeriodData;
  artificialPondHousing: TimePeriodData;
}

export interface DemographyState {
  populationGrowth: TimePeriodData;
}

export interface SimulationState {
  simulationName: string | null;
  scenario_a: string | null;
  scenario_b: string | null;
  agriculture: AgricultureState;
  livestock: LivestockState;
  energy: EnergyState;
  industry: IndustryState;
  water: WaterState;
  demography: DemographyState;
}

export interface UpdatePayload {
  path: string[];
  value: number | string | null;
}

const initialTimePeriodData: TimePeriodData = {
  "2025-2030": null,
  "2031-2040": null,
  "2041-2045": null,
};

export const initialState: SimulationState = {
  simulationName: null,
  scenario_a: null,
  scenario_b: null,
  agriculture: {
    growthScenario: { ...initialTimePeriodData },
    landConversion: { ...initialTimePeriodData },
  },
  livestock: {
    cattleGrowth: { ...initialTimePeriodData },
    poultryGrowth: { ...initialTimePeriodData },
    goatGrowth: { ...initialTimePeriodData },
  },
  energy: {
    solarPvCoverage: { ...initialTimePeriodData },
    solarPvAreaIndustrial: { ...initialTimePeriodData },
    solarPvAreaHousing: { ...initialTimePeriodData },
  },
  industry: {
    growth: { ...initialTimePeriodData },
  },
  water: {
    aquacultureLandGrowth: { ...initialTimePeriodData },
    artificialPondIndustrial: { ...initialTimePeriodData },
    artificialPondHousing: { ...initialTimePeriodData },
  },
  demography: {
    populationGrowth: { ...initialTimePeriodData },
  },
};

const dssSimulationSlice = createSlice({
  name: "simulation",
  initialState: initialState,
  reducers: {
    updateValue: (state, action: PayloadAction<UpdatePayload>) => {
      const { path, value } = action.payload;
      let currentState: IRootState = state;

      for (let i = 0; i < path.length - 1; i++) {
        currentState = currentState[path[i - 1]];
      }
      currentState[path[path.length - 1]] = value;
    },
    resetSimulation: () => {
      return initialState;
    },
    saveSimulation: (state) => {
      if (!state.simulationName) {
        alert("Gagal menyimpan: Nama simulasi tidak boleh kosong.");
        return;
      }
      const key = "scenarios";
      try {
        const existingScenariosRaw = localStorage.getItem(key);
        const existingScenarios: SimulationState[] = existingScenariosRaw
          ? JSON.parse(existingScenariosRaw)
          : [];
        existingScenarios.push(state);
        localStorage.setItem(key, JSON.stringify(existingScenarios));
        alert("Simulasi berhasil disimpan!");
      } catch (error) {
        alert("Gagal menyimpan simulasi ke localStorage:" + error);
      }
    },
    populateInputsWithBaseline: (
      state,
      action: PayloadAction<BaselinePayload>,
    ) => {
      const baselineValues = action.payload;
      for (const key in baselineValues) {
        const path = key.split(".");
        const value = baselineValues[key];
        const currentState: IRootState = state;
        const targetObject = currentState[path[0]][path[1]];
        if (targetObject) {
          for (const period in targetObject) {
            targetObject[period] = value;
          }
        }
      }
    },
  },
});

export const {
  updateValue,
  resetSimulation,
  saveSimulation,
  populateInputsWithBaseline,
} = dssSimulationSlice.actions;
export default dssSimulationSlice.reducer;
