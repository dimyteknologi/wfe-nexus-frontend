import { IFoodDemandData, IWaterDemandData } from "@/lib/types/demand.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FoodDemandSliceState {
  data: IFoodDemandData | null;
  error: string | null;
}

const initialState: FoodDemandSliceState = {
  data: null,
  error: null,
};

const foodDemandSlice = createSlice({
  name: "foodDemand",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<IFoodDemandData>) => {
      state.data = action.payload;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.data = null;
      state.error = action.payload;
    },
  },
});

export const { setData, setError } = foodDemandSlice.actions;
export default foodDemandSlice.reducer;
