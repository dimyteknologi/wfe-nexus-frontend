import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PowerGenerationType = "solar" | "geothermal" | "both" | "none";

interface PowerGenerationState {
  selectedType: PowerGenerationType;
}

const initialState: PowerGenerationState = {
  selectedType: "both",
};

const powerGenerationSlice = createSlice({
  name: "powerGeneration",
  initialState,
  reducers: {
    setPowerGeneration: (state, action: PayloadAction<PowerGenerationType>) => {
      state.selectedType = action.payload;
    },
  },
});

export const { setPowerGeneration } = powerGenerationSlice.actions;
export const powerGenerationReducer = powerGenerationSlice.reducer;
