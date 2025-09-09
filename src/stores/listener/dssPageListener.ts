import { listenerMiddleware } from "@/stores/listenerMiddleware";
import {
  setData as setDataAgriculture,
  setBaseline as setAgricultureBaseline,
} from "@/stores/slicers/agricultureSlicer";
import {
  setData as setDataGdrp,
  setBaseline as setGdrpBaseline,
} from "@/stores/slicers/gdrpSlicer";
import {
  setData as setDataLivestock,
  setBaseline as setBaselineLivestock,
} from "@/stores/slicers/livestockSlicer";
import { setBaseline as setLandPortionBaseline } from "@/stores/slicers/landPortionSlicer";
import { setBaseline as setLandCoverBaseline } from "@/stores/slicers/landCoverSlicer";
import {
  setData as setDataFishery,
  setBaseline as setFisheryBaseline,
} from "@/stores/slicers/fisherySlicer";
import {
  setData as setDataPopulation,
  setBaseline as setBaselinePopulation,
} from "@/stores/slicers/populationSlicer";
import { populateInputsWithBaseline } from "@/stores/slicers/dssInputSlicer";

import {
  extractAverageGrowthRates,
  generateBaseline,
  generateLandCover,
  generateLandPortion,
} from "@/lib/utils/projections";
import { IApiData } from "@/lib/types/response";
import { INITIAL_DATA_CONSTANT } from "@/lib/constant/initialData.constant";
import { growthDataByvalue } from "@/lib/utils/formulas";
import { isAnyOf } from "@reduxjs/toolkit";
import {
  selectGdrpBaseline,
  selectPopulationBaseline,
  selectAgricultureBaseline,
  selectFisheryBaseline,
  selectLivestockBaseline,
} from "@/stores/selectors/baseSelector";
const FISHERY_MAP: Record<string, number> = {
  "area perikanan": INITIAL_DATA_CONSTANT.PERIKANAN.LUAS_AREA_PERIKANAN,
};

const LIVESTOCK_MAP: Record<string, number> = {
  "ternak sapi": INITIAL_DATA_CONSTANT.PETERNAKAN.POPULASI_TERNAK_SAPI,
  "ternak kambing": INITIAL_DATA_CONSTANT.PETERNAKAN.POPULASI_TERNAK_KAMBING,
  "ternak ayam": INITIAL_DATA_CONSTANT.PETERNAKAN.POPULASI_TERNAK_AYAM,
};

const preprocessFisheryData = (data: IApiData): IApiData => ({
  ...data,
  parameters: data.parameters.map((item) => ({
    ...item,
    values: growthDataByvalue(
      FISHERY_MAP[item.name],
      (item.values ?? []).map((val) => val ?? 0),
    ),
  })),
});

const preprocessLivestockData = (data: IApiData): IApiData => ({
  ...data,
  parameters: data.parameters.map((item) => ({
    ...item,
    values: growthDataByvalue(
      LIVESTOCK_MAP[item.name],
      (item.values ?? []).map((val) => val ?? 0),
    ),
  })),
});

const preprocessPopulationData = (data: IApiData): IApiData => {
  const totalValues = data.parameters.reduce<number[]>((acc, item) => {
    (item.values ?? []).forEach((val, idx) => {
      acc[idx] = (acc[idx] ?? 0) + (val ?? 0);
    });
    return acc;
  }, []);

  return {
    ...data,
    parameters: [...data.parameters, { name: "total", values: totalValues }],
  };
};

// custom listener
const addPopulateFormListener = () => {
  listenerMiddleware.startListening({
    matcher: isAnyOf(
      setDataAgriculture,
      setDataGdrp,
      setDataFishery,
      setDataLivestock,
      setDataPopulation,
    ),

    effect: async (action, listenerApi) => {
      listenerApi.cancelActiveListeners();
      // debounce
      // await listenerApi.delay(50);

      const state = listenerApi.getState();
      const allParameters = [
        ...(selectGdrpBaseline(state)?.parameters || []),
        ...(selectPopulationBaseline(state)?.parameters || []),
        ...(selectAgricultureBaseline(state)?.parameters || []),
        ...(selectFisheryBaseline(state)?.parameters || []),
        ...(selectLivestockBaseline(state)?.parameters || []),
      ];
      const completeBaselinePayload = extractAverageGrowthRates(allParameters);

      if (Object.keys(completeBaselinePayload).length > 0) {
        listenerApi.dispatch(
          populateInputsWithBaseline(completeBaselinePayload),
        );
      }
    },
  });
};

// listener
export function DssPageListener() {
  listenerMiddleware.startListening({
    actionCreator: setDataGdrp,
    effect: async (action, listenerApi) => {
      const response = action.payload;
      const baseline = generateBaseline(response.data);
      if (baseline) {
        listenerApi.dispatch(setGdrpBaseline(baseline));
      }
    },
  });

  listenerMiddleware.startListening({
    actionCreator: setDataFishery,
    effect: async (action, listenerApi) => {
      let data = action.payload.data;
      if (typeof preprocessFisheryData === "function") {
        data = preprocessFisheryData(data);
      }
      const baseline = generateBaseline(data);
      if (baseline) {
        listenerApi.dispatch(setFisheryBaseline(baseline));
      }
    },
  });

  listenerMiddleware.startListening({
    actionCreator: setDataLivestock,
    effect: async (action, listenerApi) => {
      let data = action.payload.data;
      if (typeof preprocessLivestockData === "function") {
        data = preprocessLivestockData(data);
      }
      const baseline = generateBaseline(data);
      if (baseline) {
        listenerApi.dispatch(setBaselineLivestock(baseline));
      }
    },
  });

  listenerMiddleware.startListening({
    actionCreator: setDataPopulation,
    effect: async (action, listenerApi) => {
      let data = action.payload.data;
      if (typeof preprocessPopulationData === "function") {
        data = preprocessPopulationData(data);
      }
      const baseline = generateBaseline(data);
      if (baseline) {
        listenerApi.dispatch(setBaselinePopulation(baseline));
      }
    },
  });

  listenerMiddleware.startListening({
    actionCreator: setDataAgriculture,
    effect: async (action, listenerApi) => {
      const response = action.payload;
      const baseline = generateBaseline(response.data);
      if (baseline) {
        listenerApi.dispatch(setAgricultureBaseline(baseline));
      }

      const landCoverData = generateLandCover(2010, 2045);
      const landPortionData = generateLandPortion(landCoverData);
      listenerApi.dispatch(setLandCoverBaseline(landCoverData));
      listenerApi.dispatch(setLandPortionBaseline(landPortionData));
    },
  });

  addPopulateFormListener();
}
