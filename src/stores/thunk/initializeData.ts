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

      dispatch(setGdpData({ data: gdp } as unknown as IApiRes));
      dispatch(setAgricultureData({ data: agriculture } as unknown as IApiRes));
      dispatch(setFisheryData({ data: fishery } as unknown as IApiRes));
      dispatch(setLivestockData({ data: livestock } as unknown as IApiRes));
      dispatch(setPopulationData({ data: population } as unknown as IApiRes));
      
    } catch (error) {
      console.error("Failed to initialize data", error);
      throw error;
    }
  }
);
