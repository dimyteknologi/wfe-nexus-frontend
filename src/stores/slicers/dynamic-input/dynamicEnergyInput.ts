import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Params } from "@/lib/types/response";

interface DynamicEnergyInputState {
  data: Omit<Params, "average" | "growth">[];
}

const initialState: DynamicEnergyInputState = {
  data: [],
};

export const DynamicEnergyInput = createSlice({
  name: "dynamicEnergy",
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

export const { setData } = DynamicEnergyInput.actions;
export default DynamicEnergyInput.reducer;
