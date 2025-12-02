import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRootState } from "@/stores";

import {
  AgricultureState,
  LivestockState,
  EnergyState,
  IndustryState,
  WaterState,
  DemographyState,
  BaselinePayload,
  initialTimePeriodData,
} from "@/lib/constant/inputType.constant";
import { ContextSpecificState } from "./contextSpecificInputSlicer";

export interface SiteSpecificState {
  simulationName: string | null;
  agriculture: AgricultureState;
  livestock: LivestockState;
  energy: EnergyState;
  industry: IndustryState;
  water: WaterState;
  demography: DemographyState;
}

export const SiteSpecific: SiteSpecificState = {
  simulationName: null,
  agriculture: {
    growthScenario: { ...initialTimePeriodData },
    landConversion: { ...initialTimePeriodData },
    aquacultureLandGrowth: { ...initialTimePeriodData },
    productivityTarget: { ...initialTimePeriodData },
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
    industrialEnergy: { ...initialTimePeriodData },
    domesticElectricity: { ...initialTimePeriodData },
  },
  industry: {
    growth: { ...initialTimePeriodData },
  },
  water: {
    artificialPondIndustrial: { ...initialTimePeriodData },
    artificialPondHousing: { ...initialTimePeriodData },
    groundWaterCapacity: { ...initialTimePeriodData },
    surfaceWaterCapacity: { ...initialTimePeriodData },
    domesticWaterDemand: { ...initialTimePeriodData },
    industrialWater: { ...initialTimePeriodData },
  },
  demography: {
    populationGrowth: { ...initialTimePeriodData },
  },
};

export interface DssSiteSpecificState {
  active: SiteSpecificState;
  baseline: SiteSpecificState;
  scenario_a: string | null;
  scenario_b: string | null;
}

const initialState: DssSiteSpecificState = {
  active: SiteSpecific,
  baseline: SiteSpecific,
  scenario_a: null,
  scenario_b: null,
};

const DssSiteSpecific = createSlice({
  name: "siteSpecific",
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
    resetSimulation: (state) => {
      state.active.simulationName = null;
    },
    setAllActiveInputs: (state, action: PayloadAction<SiteSpecificState>) => {
      state.active = action.payload;
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
  resetSimulation,
  singleInput,
  updateSimulationSelect,
  updateSimulationName,
  populateInputsWithBaseline,
  setAllActiveInputs,
} = DssSiteSpecific.actions;
export default DssSiteSpecific.reducer;
