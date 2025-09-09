import { createAsyncThunk } from "@reduxjs/toolkit";
import { IRootState } from "@/stores";
import { singleInput, resetSimulation } from "../slicers/dssInputSlicer";

import {
  selectGdrpBaseline,
  selectPopulationBaseline,
  selectAgricultureBaseline,
  selectFisheryBaseline,
  selectLivestockBaseline,
} from "../selectors/baseSelector";
interface BaselinePayload {
  [statePath: string]: number;
}
import { extractAverageGrowthRates } from "@/lib/utils/projections";

export const resetToBaseline = createAsyncThunk(
  "simulation/resetToBaseline",
  async (_, { getState, dispatch }) => {
    const state = getState() as IRootState;

    const gdrpData = selectGdrpBaseline(state);
    const populationData = selectPopulationBaseline(state);
    const agricultureData = selectAgricultureBaseline(state);
    const fisheryData = selectFisheryBaseline(state);
    const livestockData = selectLivestockBaseline(state);

    const allParameters = [
      ...(gdrpData?.parameters || []),
      ...(populationData?.parameters || []),
      ...(agricultureData?.parameters || []),
      ...(fisheryData?.parameters || []),
      ...(livestockData?.parameters || []),
    ];

    const completeBaselinePayload = extractAverageGrowthRates(allParameters);
    if (Object.keys(completeBaselinePayload).length > 0) {
      dispatch(singleInput(completeBaselinePayload));
    }

    dispatch(resetSimulation());

    return completeBaselinePayload;
  },
);
