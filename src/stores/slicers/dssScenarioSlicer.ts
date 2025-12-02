import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SiteSpecificState } from "./siteSpecificInputSlicer";
import { ContextSpecificState } from "./contextSpecificInputSlicer";

export const STORAGE_KEY = "scenarios";

// SCENARIO STRUCTURE
export interface ScenarioItem {
  simulationName: string;
  category: "siteSpecific" | "contextSpecific";
  data: SiteSpecificState | ContextSpecificState;
}

export interface CategoryState {
  siteSpecific: ScenarioItem[];
  contextSpecific: ScenarioItem[];
}

interface ScenarioState {
  data: CategoryState;
  error?: string;
  success?: string;
}

const initialCategoryState: CategoryState = {
  siteSpecific: [],
  contextSpecific: [],
};

const initialState: ScenarioState = {
  data: initialCategoryState,
  error: undefined,
  success: undefined,
};

export const scenarioSlice = createSlice({
  name: "scenarios",
  initialState,
  reducers: {
    setScenariosFromStorage: (state, action: PayloadAction<CategoryState>) => {
      state.data = action.payload;
      state.success = "Loaded scenarios";
    },

    addScenarioSuccess: (state, action: PayloadAction<ScenarioItem>) => {
      const item = action.payload;

      // replace if exists
      const targetList = state.data[item.category];
      const index = targetList.findIndex(
        (x) =>
          x.simulationName.toLowerCase() === item.simulationName.toLowerCase(),
      );

      if (index !== -1) {
        targetList[index] = item;
        state.success = "Scenario updated!";
      } else {
        targetList.push(item);
        state.success = "Scenario saved!";
      }
    },

    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setScenariosFromStorage, addScenarioSuccess, setError } =
  scenarioSlice.actions;

export default scenarioSlice.reducer;
