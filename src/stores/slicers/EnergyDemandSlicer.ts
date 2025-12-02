import { IApiData } from "@/lib/types/response";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IEnergyDemandSliceState {
  baseline: IApiData | null;
  error: string | null;
}

const initialState: IEnergyDemandSliceState = {
  baseline: null,
  error: null,
};

const energyDemandSlice = createSlice({
  name: "energyDemand",
  initialState,
  reducers: {
    setBaseline: (state, action: PayloadAction<IApiData>) => {
      state.baseline = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.baseline = null;
      state.error = action.payload;
    },
  },
});

export const { setBaseline, setError } = energyDemandSlice.actions;
export default energyDemandSlice.reducer;
