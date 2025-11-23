import { IApiRes, IBaselineData } from "@/lib/types/response";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GdrpSliceState {
  data: IApiRes | null;
  baseline: IBaselineData | null;
  error: string | null;
}

const initialState: GdrpSliceState = {
  data: null,
  baseline: null,
  error: null,
};

const gdrpSlice = createSlice({
  name: "gdrp",
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

export const { setData, setBaseline, setError } = gdrpSlice.actions;
export default gdrpSlice.reducer;
