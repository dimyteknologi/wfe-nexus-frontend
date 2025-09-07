import { IApiRes, IBaselineData } from "@/lib/types/response";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AgricultureSliceState {
  data: IApiRes | null;
  baseline: IBaselineData | null;
  error: string | null;
}

const initialState: AgricultureSliceState = {
  data: null,
  baseline: null,
  error: null,
};

const agricultureSlice = createSlice({
  name: "agriculture",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<IApiRes>) => {
      state.data = action.payload;
      state.error = null;
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

export const { setData, setError, setBaseline } = agricultureSlice.actions;
export default agricultureSlice.reducer;
