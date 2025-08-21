import { IEnergyDemandData, IWaterDemandData } from "@/lib/types/demand.types";
import { IAgricultureResData } from "@/lib/types/response";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IEnergyDemandSliceState {
  data: IEnergyDemandData | null;
  error: string | null;
}

const initialState: IEnergyDemandSliceState = {
  data: null,
  error: null,
};

const energyDemandSlice = createSlice({
  name: "energyDemand",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<IEnergyDemandData>) => {
      state.data = action.payload;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.data = null;
      state.error = action.payload;
    },
  },
});

export const { setData, setError } = energyDemandSlice.actions;
export default energyDemandSlice.reducer;
