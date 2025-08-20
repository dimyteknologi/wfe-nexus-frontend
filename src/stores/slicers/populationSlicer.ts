import { IPopResData } from "@/lib/types/response";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PopulationSliceState {
  data: IPopResData | null;
  error: string | null;
}

const initialState: PopulationSliceState = {
  data: null,
  error: null,
};

const PopulationSlice = createSlice({
  name: "population",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<IPopResData>) => {
      state.data = action.payload;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.data = null;
      state.error = action.payload;
    },
  },
});

export const { setData, setError } = PopulationSlice.actions;
export default PopulationSlice.reducer;
