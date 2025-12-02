import { IApiRes, IBaselineData } from "@/lib/types/response";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PopulationSliceState {
  data: IApiRes | null;
  baseline: IBaselineData | null;
  error: string | null;
}

const initialState: PopulationSliceState = {
  data: null,
  baseline: null,
  error: null,
};

const PopulationSlice = createSlice({
  name: "population",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<IApiRes>) => {
      state.data = action.payload;
    },
    setBaseline: (state, action: PayloadAction<IBaselineData>) => {
      state.baseline = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.data = null;
      state.baseline = null;
      state.error = action.payload;
    },
  },
});

export const { setData, setError, setBaseline } = PopulationSlice.actions;
export default PopulationSlice.reducer;
