import { IApiData } from "@/lib/types/response";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FoodDemandSliceState {
  baseline: IApiData | null;
  error: string | null;
}

const initialState: FoodDemandSliceState = {
  baseline: null,
  error: null,
};

const foodDemandSlice = createSlice({
  name: "foodDemand",
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

export const { setBaseline, setError } = foodDemandSlice.actions;
export default foodDemandSlice.reducer;
