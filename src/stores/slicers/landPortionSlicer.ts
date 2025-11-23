import { IApiData } from "@/lib/types/response";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface ILandPortionState {
  baseline: IApiData | null;
  error: string | null;
}

const initialState: ILandPortionState = {
  baseline: null,
  error: null,
};

const landPortionnSlice = createSlice({
  name: "landProportion",
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

export const { setBaseline, setError } = landPortionnSlice.actions;

export default landPortionnSlice.reducer;
