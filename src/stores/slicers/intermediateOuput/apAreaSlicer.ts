import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IApiData } from "../../../lib/types/response";

interface IAp {
  apAreaIndustrial: number[];
  apAreaHousing: number[];
}

interface IApArea {
  baseline: IAp | null;
  error: string | null;
}

const initialState: IApArea = {
  baseline: null,
  error: null,
};

const apAreaSlice = createSlice({
  name: "apArea",
  initialState: initialState,
  reducers: {
    setDataApArea: (state, action: PayloadAction<IAp>) => {
      state.baseline = action.payload;
      state.error = null;
    },
  },
});

export const { setDataApArea } = apAreaSlice.actions;
export const apAreaReducer = apAreaSlice.reducer;
