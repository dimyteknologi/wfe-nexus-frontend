import { IApiData } from "@/lib/types/response";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WaterDemandSliceState {
  baseline: IApiData | null;
  error: string | null;
}

const initialState: WaterDemandSliceState = {
  baseline: null,
  error: null,
};

const waterDemandSlice = createSlice({
  name: "waterDemand",
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

export const { setBaseline, setError } = waterDemandSlice.actions;
export default waterDemandSlice.reducer;
