import { createAsyncThunk } from "@reduxjs/toolkit";
import { IRootState } from "@/stores";
import {
  singleInput,
  //  resetSimulation
} from "../slicers/siteSpecificInputSlicer";

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
    let mergedPayload: BaselinePayload = {};

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

    const hardCodedBaselinePayload = {
      "energy.solarPvAreaIndustrial": 0,
      "energy.solarPvAreaHousing": 0,
      "energy.industrialEnergy": 0,
      "energy.domesticElectricity": 0,
      "water.artificialPondIndustrial": 0,
      "water.artificialPondHousing": 0,
      "water.domesticWaterDemand": 125,
      "water.industrialWater": 1.687,
    };

    const completeBaselinePayload = extractAverageGrowthRates(allParameters);
    if (Object.keys(completeBaselinePayload).length > 0) {
      mergedPayload = {
        ...completeBaselinePayload,
        ...hardCodedBaselinePayload,
      };
      dispatch(singleInput(mergedPayload));
    }

    // dispatch(resetSimulation());
    return mergedPayload;
  },
);
