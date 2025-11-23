import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Params } from "@/lib/types/response";

interface DynamicWaterState {
  data: Omit<Params, "average" | "growth">[];
}

const initialState: DynamicWaterState = {
  data: [],
};

export const DynamicWater = createSlice({
  name: "dynamicWater",
  initialState,
  reducers: {
    setData: (
      state,
      action: PayloadAction<Omit<Params, "average" | "growth">>,
    ) => {
      const payload = action.payload;
      state.data.push(payload);
    },
  },
});

export const { setData } = DynamicWater.actions;
export default DynamicWater.reducer;
