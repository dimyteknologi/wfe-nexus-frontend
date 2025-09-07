import { IApiRes, IBaselineData } from "@/lib/types/response";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LivestockSliceState {
  data: IApiRes | null;
  baseline: IBaselineData | null;
  error: string | null;
}

const initialState: LivestockSliceState = {
  data: null,
  baseline: null,
  error: null,
};

const livestockSlice = createSlice({
  name: "livestock",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<IApiRes>) => {
      state.data = action.payload;
    },
    setBaseline: (state, action: PayloadAction<IBaselineData>) => {
      state.baseline = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.baseline = null;
      state.data = null;
      state.error = action.payload;
    },
  },
});

export const { setData, setError, setBaseline } = livestockSlice.actions;
export default livestockSlice.reducer;
