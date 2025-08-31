import { ILandCover, ILandCoverData } from "@/lib/types/demand.types";
import { IPopResData } from "@/lib/types/response";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LandCoverSliceState {
  data: ILandCoverData | null;
  error: string | null;
}

const initialState: LandCoverSliceState = {
  data: null,
  error: null,
};

const LandCoverSlice = createSlice({
  name: "landCover",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<ILandCoverData>) => {
      state.data = action.payload;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.data = null;
      state.error = action.payload;
    },
  },
});

export const { setData, setError } = LandCoverSlice.actions;
export default LandCoverSlice.reducer;
