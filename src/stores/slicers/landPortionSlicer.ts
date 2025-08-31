import { ILandPortionData } from "@/lib/types/demand.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ILandPortionState {
  data: ILandPortionData | null;
  error: string | null;
}

const initialState: ILandPortionState = {
  data: null,
  error: null,
};

const landPortionnSlice = createSlice({
  name: "landProportion",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<ILandPortionData>) => {
      state.data = action.payload;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.data = null;
      state.error = action.payload;
    },
  },
});

export const { setData, setError } = landPortionnSlice.actions;

export default landPortionnSlice.reducer;
