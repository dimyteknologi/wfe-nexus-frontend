import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AlertState {
  message: string;
  type: "success" | "error";
}

const initialState: AlertState = {
  message: "",
  type: "success",
};

export const alertsSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<AlertState>) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    clearAlert: (state) => {
      state.message = "";
    },
  },
});

export const { setAlert, clearAlert } = alertsSlice.actions;
export default alertsSlice.reducer;
