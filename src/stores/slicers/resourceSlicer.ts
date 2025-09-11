import { IApiData } from "@/lib/types/response";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ResourceSlicer {
  baseline: IApiData | null;
  error: string | null;
}

const initialState: ResourceSlicer = {
  baseline: null,
  error: null,
};

const resourceSlice = createSlice({
  name: "resource",
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

export const { setBaseline, setError } = resourceSlice.actions;
export default resourceSlice.reducer;
