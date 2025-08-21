import { IWaterDemandData } from "@/lib/types/demand.types";
import { IAgricultureResData } from "@/lib/types/response";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WaterDemandSliceState {
  data: IWaterDemandData | null;
  error: string | null;
}

const initialState: WaterDemandSliceState = {
  data: null,
  error: null,
};

const waterDemandSlice = createSlice({
  name: "waterDemand",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<IWaterDemandData>) => {
      state.data = action.payload;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.data = null;
      state.error = action.payload;
    },
  },
});

export const { setData, setError } = waterDemandSlice.actions;
export default waterDemandSlice.reducer;
