import { IFisheriesResData } from "@/lib/types/response";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FisherySliceState {
  data: IFisheriesResData | null;
  error: string | null;
}

const initialState: FisherySliceState = {
  data: null,
  error: null,
};

const fisherySlice = createSlice({
  name: "fishery",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<IFisheriesResData>) => {
      state.data = action.payload;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.data = null;
      state.error = action.payload;
    },
  },
});

export const { setData, setError } = fisherySlice.actions;
export default fisherySlice.reducer;
