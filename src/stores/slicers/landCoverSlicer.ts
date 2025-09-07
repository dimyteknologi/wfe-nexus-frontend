import { IApiData } from "@/lib/types/response";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LandCoverSliceState {
  baseline: IApiData | null;
  error: string | null;
}

const initialState: LandCoverSliceState = {
  baseline: null,
  error: null,
};

const LandCoverSlice = createSlice({
  name: "landCover",
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

export const { setBaseline, setError } = LandCoverSlice.actions;
export default LandCoverSlice.reducer;
