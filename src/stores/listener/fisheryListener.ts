import { listenerMiddleware } from "@/stores/listenerMiddleware";
import { setData, setBaseline } from "@/stores/slicers/fisherySlicer";
import { populateInputsWithBaseline } from "@/stores/slicers/dssInputSlicer";
import { INITIAL_DATA_CONSTANT } from "@/lib/constant/initialData.constant";

import {
  generateBaseline,
  // processAllGdpData,
  // extractAverageGrowthRates
} from "@/lib/utils/projections";
import { IApiData, IApiRes, Params } from "@/lib/types/response";
import { growthDataByvalue } from "@/lib/utils/formulas";

const FISHERY_MAP: Record<string, number> = {
  "area perikanan": INITIAL_DATA_CONSTANT.PERIKANAN.LUAS_AREA_PERIKANAN,
};

const reconstructValues = (data: IApiData): IApiData => {
  return {
    ...data,
    parameters: data.parameters.map((item) => {
      const constant = FISHERY_MAP[item.name];
      if (constant) {
        return {
          ...item,
          values: growthDataByvalue(
            constant,
            (item.values ?? []).map((val) => val ?? 0),
          ),
        };
      }
      return item;
    }),
  };
};

export function addFisheryListeners() {
  listenerMiddleware.startListening({
    actionCreator: setData,
    effect: async (action, listenerApi) => {
      const response: IApiRes = action.payload;
      const data: IApiData = reconstructValues(response.data);
      const baseline = generateBaseline(data);
      let aquacultureLandGrowth;

      if (baseline) {
        listenerApi.dispatch(setBaseline(baseline));
        aquacultureLandGrowth = baseline.parameters.find(
          (item: Params) => item.name == "area perikanan",
        );
      }

      if (aquacultureLandGrowth) {
        listenerApi.dispatch(
          populateInputsWithBaseline({
            "agriculture.aquacultureLandGrowth": aquacultureLandGrowth.average,
          }),
        );
      }
    },
  });

  // another gdrp listnener
  // listenerMiddleware.startListening({ ... });
}
