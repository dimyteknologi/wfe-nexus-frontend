import { IAgricultureResData } from "@/lib/types/response";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AgricultureSliceState {
  data: IAgricultureResData | null;
  error: string | null;
}

const initialState: AgricultureSliceState = {
  data: null,
  error: null,
};

const agricultureSlice = createSlice({
  name: "agriculture",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<IAgricultureResData>) => {
      state.data = action.payload;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.data = null;
      state.error = action.payload;
    },
  },
});

export const { setData, setError } = agricultureSlice.actions;
export default agricultureSlice.reducer;
