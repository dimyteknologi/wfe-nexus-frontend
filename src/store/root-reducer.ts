import { combineReducers } from "@reduxjs/toolkit";
import { simulasiReducer } from "./dss-input/dss-input.reducer";

export const rootReducer = combineReducers({
  simulasi: simulasiReducer,
});
