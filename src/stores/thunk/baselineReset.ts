import { createAsyncThunk } from "@reduxjs/toolkit";
import { IRootState } from "../root-reducer";
import {
  populateInputsWithBaseline,
  resetSimulation,
} from "../slicers/dssInputSlicer";

import {
  selectGdrpBaseline,
  selectPopulationBaseline,
  selectAgricultureBaseline,
  selectFisheryBaseline,
  selectLivestockBaseline,
} from "../selectors/baseSelector";
import { Params } from "@/lib/types/response";
import { average, growthRate } from "@/lib/utils/formulas";
interface BaselinePayload {
  [statePath: string]: number;
}

const nameToStatePathMap: Record<string, string> = {
  // parameter name : input id
  "A.Pertanian, Kehutanan, dan Perikanan": "agriculture.growthScenario",
  "C.Industri Pengolahan": "industry.growth",
  "Lahan Panen Padi": "agriculture.landConversion",
  "area perikanan": "agriculture.aquacultureLandGrowth",
  total: "demography.populationGrowth",
  "ternak sapi": "livestock.cattleGrowth",
  "ternak kambing": "livestock.goatGrowth",
  "ternak ayam": "livestock.poultryGrowth",
};

const extractAverageGrowthRates = (
  parameters: Params[] | null,
): BaselinePayload => {
  const payload: BaselinePayload = {};
  if (!parameters) return payload;
  for (const param of parameters) {
    const statePath = nameToStatePathMap[param.name];
    if (statePath) {
      if (param.average !== undefined) {
        payload[statePath] = param.average;
      } else {
        const cleanValues = param.values.map((v) => v ?? 0);
        payload[statePath] = average(growthRate(cleanValues)) * 100;
      }
    }
  }
  return payload;
};

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
      dispatch(populateInputsWithBaseline(completeBaselinePayload));
    }

    dispatch(resetSimulation());

    return completeBaselinePayload;
  },
);
