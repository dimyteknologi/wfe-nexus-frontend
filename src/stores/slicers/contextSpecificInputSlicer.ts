import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRootState } from "@/stores";

import {
  FoodDemandState,
  AgricultureProductionState,
  FertilizerState,
  RainfallState,
  initialTimePeriodData,
  TimePeriodData,
  initialTimePeriodDataContext,
  BaselinePayload,
} from "@/lib/constant/inputType.constant";

export interface ContextSpecificState {
  simulationName: string | null;
  food: FoodDemandState;
  agriculture: AgricultureProductionState;
  fertilizer: FertilizerState;
  rainfall: RainfallState;
}

export const ContextSpecific: ContextSpecificState = {
  simulationName: null,
  food: {
    populationInitial: { "2015-2030": 950000 },
    populationGrowth: { "2015-2030": 1.32 },
    riceDemandPerPerson: { "2015-2030": 79.2 },
    convertionFactorToRice: { "2015-2030": 0.63 },
    convertionFactoTOGkg: { "2015-2030": 0.85 },
  },
  agriculture: {
    areaInpari32: { "2015-2030": 15000 },
    conversionInpari32: { "2015-2030": 1.32 },
    areaCiherang: { "2015-2030": 25000 },
    conversionCiherang: { "2015-2030": 0.88 },
    areaMekongga: { "2015-2030": 32000 },
    conversionMekongga: { "2015-2030": 1.7 },
    areaHipaSeries: { "2015-2030": 12500 },
    conversionHipaSeries: { "2015-2030": 1.2 },
    areaLokal: { "2015-2030": 7500 },
    conversionLokal: { "2015-2030": 2.1 },
  },
  fertilizer: {
    percentageOfChemical: { "2015-2030": 30 },
    ratioOrganic: { "2015-2030": 17 },
  },
  rainfall: {
    annualRainfall: { "2015-2030": 150 },
    areaSize: { "2015-2030": 110 },
  },
};

export interface DssContextSpecificState {
  active: ContextSpecificState;
  // baseline: ContextSpecificState;
  scenario_a: string | null;
  scenario_b: string | null;
}

const initialState: DssContextSpecificState = {
  active: ContextSpecific,
  // baseline: ContextSpecific,
  scenario_a: null,
  scenario_b: null,
};

const DssContextSpecific = createSlice({
  name: "contextSpecific",
  initialState: initialState,
  reducers: {
    updateSimulationName: (state, action: PayloadAction<string | null>) => {
      state.active.simulationName = action.payload;
    },
    updateSimulationSelect: (
      state,
      action: PayloadAction<{ name: string; value: string | null }>,
    ) => {
      const { name, value } = action.payload;
      if (name === "scenario_a") {
        state.scenario_a = value;
      } else {
        state.scenario_b = value;
      }
    },
    setAllActiveInputs: (
      state,
      action: PayloadAction<ContextSpecificState>,
    ) => {
      state.active = action.payload;
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
          // let baselineTarget: IRootState = state.baseline;
          for (let i = 0; i < pathParts.length; i++) {
            activeTarget = activeTarget[pathParts[i]];
            // baselineTarget = baselineTarget[pathParts[i]];
          }
          // if (activeTarget && baselineTarget) {
          if (activeTarget) {
            for (const period in activeTarget) {
              activeTarget[period] = value;
              // baselineTarget[period] = value;
            }
          }
        } catch (e) {
          console.error(e);
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
  setAllActiveInputs,
  updateSimulationName,
  updateSimulationSelect,
  populateInputsWithBaseline,
  singleInput,
  resetSimulation,
} = DssContextSpecific.actions;

export default DssContextSpecific.reducer;
