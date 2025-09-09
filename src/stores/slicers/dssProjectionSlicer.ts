import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRootState } from "@/stores";
import { IGDPResData } from "@/lib/types/response";

export interface ProjectionResultState {
  data: IGDPResData | null;
}

const initialState: ProjectionResultState = {
  data: null,
};

const projectionResultSlice = createSlice({
  name: "projectionResult",
  initialState,
  reducers: {
    setProjectionResult: (state, action: PayloadAction<IGDPResData | null>) => {
      state.data = action.payload;
    },
  },
});

export const { setProjectionResult } = projectionResultSlice.actions;
export const selectProjectionData = (state: IRootState) =>
  state.projectionResult.data;

export default projectionResultSlice.reducer;
