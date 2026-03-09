import { createAsyncThunk } from "@reduxjs/toolkit";
import { gdpApi } from "@/stores/api/gdpApi";
import { agricultureApi } from "@/stores/api/agricultureApi";
import { fisheryApi } from "@/stores/api/fisheryApi";
import { livestockApi } from "@/stores/api/livestockApi";
import { populationApi } from "@/stores/api/populationApi";

import { setData as setGdpData } from "@/stores/slicers/gdrpSlicer";
import { setData as setAgricultureData } from "@/stores/slicers/agricultureSlicer";
import { setData as setFisheryData } from "@/stores/slicers/fisherySlicer";
import { setData as setLivestockData } from "@/stores/slicers/livestockSlicer";
import { setData as setPopulationData } from "@/stores/slicers/populationSlicer";
import { IApiRes } from "@/lib/types/response";

export const initializeData = createAsyncThunk(
  "app/initializeData",
  async (_, { dispatch }) => {
    try {
      const gdpPromise = dispatch(gdpApi.endpoints.getGdps.initiate(undefined, { forceRefetch: true }));
      const agriculturePromise = dispatch(agricultureApi.endpoints.getAgricultures.initiate(undefined, { forceRefetch: true }));
      const fisheryPromise = dispatch(fisheryApi.endpoints.getFisheries.initiate(undefined, { forceRefetch: true }));
      const livestockPromise = dispatch(livestockApi.endpoints.getLiveStocks.initiate(undefined, { forceRefetch: true }));
      const populationPromise = dispatch(populationApi.endpoints.getPopulations.initiate(undefined, { forceRefetch: true }));

      const [gdp, agriculture, fishery, livestock, population] = await Promise.all([
        gdpPromise.unwrap(),
        agriculturePromise.unwrap(),
        fisheryPromise.unwrap(),
        livestockPromise.unwrap(),
        populationPromise.unwrap(),
      ]);

      dispatch(setGdpData(gdp as unknown as IApiRes));
      dispatch(setAgricultureData(agriculture as unknown as IApiRes));
      dispatch(setFisheryData(fishery as unknown as IApiRes));
      dispatch(setLivestockData(livestock as unknown as IApiRes));
      dispatch(setPopulationData(population as unknown as IApiRes));

      return { success: true };
    } catch (error) {
      console.warn("Failed to initialize data from API. The application will continue with default/empty data.", error);
      // Don't throw - let the app continue with default/empty data
      return { success: false, error };
    }
  }
);
