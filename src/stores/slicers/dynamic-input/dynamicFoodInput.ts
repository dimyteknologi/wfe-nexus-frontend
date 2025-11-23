import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Params } from "@/lib/types/response";

interface DynamicFoodInputState {
  data: Omit<Params, "average" | "growth">[];
}

const initialState: DynamicFoodInputState = {
  data: [],
};

export const DynamicFoodInput = createSlice({
  name: "dynamicFood",
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

export const { setData } = DynamicFoodInput.actions;
export default DynamicFoodInput.reducer;
