import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRootState } from "@/stores";
export interface BaselinePayload {
  [key: string]: number;
}
export type TimePeriod = "2025-2030" | "2031-2040" | "2041-2045";
export type TimePeriodData = Record<TimePeriod, number | null>;
export interface AgricultureState {
  growthScenario: TimePeriodData;
  landConversion: TimePeriodData;
  aquacultureLandGrowth: TimePeriodData;
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
  onGrid: TimePeriodData;
  offGrid: TimePeriodData;
  electricitySupply: TimePeriodData;
  electricityDemand: TimePeriodData;
}
export interface IndustryState {
  growth: TimePeriodData;
}
export interface WaterState {
  artificialPondIndustrial: TimePeriodData;
  artificialPondHousing: TimePeriodData;
  surfaceWaterCapacity: TimePeriodData;
  groundWaterCapacity: TimePeriodData;
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
  "2025-2030": 0,
  "2031-2040": 0,
  "2041-2045": 0,
};

export const Simulation: SimulationState = {
  simulationName: null,
  scenario_a: null,
  scenario_b: null,
  agriculture: {
    growthScenario: { ...initialTimePeriodData },
    landConversion: { ...initialTimePeriodData },
    aquacultureLandGrowth: { ...initialTimePeriodData },
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
    onGrid: { ...initialTimePeriodData },
    offGrid: { ...initialTimePeriodData },
    electricitySupply: { ...initialTimePeriodData },
    electricityDemand: { ...initialTimePeriodData },
  },
  industry: {
    growth: { ...initialTimePeriodData },
  },
  water: {
    artificialPondIndustrial: { ...initialTimePeriodData },
    artificialPondHousing: { ...initialTimePeriodData },
    groundWaterCapacity: { ...initialTimePeriodData },
    surfaceWaterCapacity: { ...initialTimePeriodData },
  },
  demography: {
    populationGrowth: { ...initialTimePeriodData },
  },
};

interface DssInputSliceState {
  active: SimulationState;
  baseline: SimulationState;
}

const initialState: DssInputSliceState = {
  active: Simulation,
  baseline: Simulation,
};

const dssSimulationSlice = createSlice({
  name: "simulation",
  initialState: initialState,
  reducers: {
    updateValue: (state, action: PayloadAction<UpdatePayload>) => {
      const { path, value } = action.payload;
      let currentState: IRootState = state.active;

      for (let i = 0; i < path.length - 1; i++) {
        currentState = currentState[path[i]];
      }
      currentState[path[path.length - 1]] = value;
    },
    resetSimulation: (state) => {
      state.active.simulationName = null;
    },
    populateInputsWithBaseline: (
      state,
      action: PayloadAction<BaselinePayload>,
    ) => {
      const baselineValues = action.payload;

      for (const path in baselineValues) {
        const value = baselineValues[path];
        const pathParts = path.split(".");

        try {
          let activeTarget: IRootState = state.active;
          let baselineTarget: IRootState = state.baseline;
          for (let i = 0; i < pathParts.length; i++) {
            activeTarget = activeTarget[pathParts[i]];
            baselineTarget = baselineTarget[pathParts[i]];
          }

          if (activeTarget && baselineTarget) {
            for (const period in activeTarget) {
              activeTarget[period] = value;
              baselineTarget[period] = value;
            }
          }
        } catch (e) {
          // console.log(e);
        }
      }
    },
    singleInput: (state, action: PayloadAction<BaselinePayload>) => {
      const baselineValues = action.payload;
      for (const key in baselineValues) {
        const path = key.split(".");
        const value = baselineValues[key];
        const currentState: IRootState = state.active;
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
  singleInput,
  populateInputsWithBaseline,
} = dssSimulationSlice.actions;
export default dssSimulationSlice.reducer;
