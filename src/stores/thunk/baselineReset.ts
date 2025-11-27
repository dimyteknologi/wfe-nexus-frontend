import { createAsyncThunk } from "@reduxjs/toolkit";
import { IRootState } from "@/stores";
import { singleInput as siteSingleInput } from "../slicers/siteSpecificInputSlicer";
import { singleInput as contextSingleInput } from "../slicers/contextSpecificInputSlicer";

import {
  selectGdrpBaseline,
  selectPopulationBaseline,
  selectAgricultureBaseline,
  selectFisheryBaseline,
  selectLivestockBaseline,
} from "../selectors/baseSelector";
import { BaselinePayload } from "@/lib/constant/inputType.constant";
import { extractAverageGrowthRates } from "@/lib/utils/projections";
export const CONTEXT_BASELINE_PAYLOAD = {
  "food.populationInitial": 950000,
  "food.populationGrowth": 1.32,
  "food.riceDemandPerPerson": 79.2,
  "food.convertionFactorToRice": 0.63,
  "food.convertionFactoTOGkg": 0.85,

  "agriculture.areaInpari32": 15000,
  "agriculture.conversionInpari32": 1.32,
  "agriculture.areaCiherang": 25000,
  "agriculture.conversionCiherang": 0.88,
  "agriculture.areaMekongga": 32000,
  "agriculture.conversionMekongga": 1.7,
  "agriculture.areaHipaSeries": 12500,
  "agriculture.conversionHipaSeries": 1.2,
  "agriculture.areaLokal": 7500,
  "agriculture.conversionLokal": 2.1,

  "fertilizer.percentageOfChemical": 30,
  "fertilizer.ratioOrganic": 17,

  "rainfall.annualRainfall": 150,
  "rainfall.areaSize": 110,
};
type ResetCategory = "siteSpecific" | "contextSpecific";

export const resetToBaseline = createAsyncThunk(
  "simulation/resetToBaseline",
  async (category: ResetCategory, { getState, dispatch }) => {
    const state = getState() as IRootState;

    if (category === "siteSpecific") {
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
        dispatch(siteSingleInput(mergedPayload));
      }

      return mergedPayload;
    }

    if (category === "contextSpecific") {
      dispatch(contextSingleInput(CONTEXT_BASELINE_PAYLOAD));
      return CONTEXT_BASELINE_PAYLOAD;
    }
  },
);
