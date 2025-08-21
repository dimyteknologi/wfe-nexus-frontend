import { IBaseData, IGDPResData } from "@/lib/types/response";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GdpSliceState {
  data: IGDPResData | null;
  baseline: IBaseData | null;
  error: string | null;
}

const initialState: GdpSliceState = {
  data: null,
  baseline: null,
  error: null,
};

const gdpSlice = createSlice({
  name: "gdp",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<IGDPResData>) => {
      state.data = action.payload;
    },
    setBaseline: (state, action: PayloadAction<IBaseData>) => {
      state.baseline = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setData, setBaseline, setError } = gdpSlice.actions;
export default gdpSlice.reducer;
