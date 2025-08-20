import { IGDPResData } from "@/lib/types/response";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GdpSliceState {
  data: IGDPResData | null;
  error: string | null;
}

const initialState: GdpSliceState = {
  data: null,
  error: null,
};

const gdpSlice = createSlice({
  name: "gdp",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<IGDPResData>) => {
      state.data = action.payload;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.data = null;
      state.error = action.payload;
    },
  },
});

export const { setData, setError } = gdpSlice.actions;
export default gdpSlice.reducer;
