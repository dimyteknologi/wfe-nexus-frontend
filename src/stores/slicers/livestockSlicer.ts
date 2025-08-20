import { ILivestockResData } from "@/lib/types/response";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LivestockSliceState {
  data: ILivestockResData | null;
  error: string | null;
}

const initialState: LivestockSliceState = {
  data: null,
  error: null,
};

const livestockSlice = createSlice({
  name: "livestock",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<ILivestockResData>) => {
      state.data = action.payload;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.data = null;
      state.error = action.payload;
    },
  },
});

export const { setData, setError } = livestockSlice.actions;
export default livestockSlice.reducer;
