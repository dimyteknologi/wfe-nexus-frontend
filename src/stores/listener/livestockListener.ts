import { listenerMiddleware } from "@/stores/listenerMiddleware";
import { setData, setBaseline } from "@/stores/slicers/livestockSlicer";
import { INITIAL_DATA_CONSTANT } from "@/lib/constant/initialData.constant";
import { populateInputsWithBaseline } from "@/stores/slicers/dssInputSlicer";
// import { populateInputsWithBaseline } from '../slicers/dssInputSlicer';
import {
  generateBaseline,
  // processAllGdpData,
  // extractAverageGrowthRates
} from "@/lib/utils/projections";
import { IApiData, IApiRes, IBaselineData, Params } from "@/lib/types/response";
import { growthDataByvalue } from "@/lib/utils/formulas";

const LIVESTOCK_MAP: Record<string, number> = {
  "ternak sapi": INITIAL_DATA_CONSTANT.PETERNAKAN.POPULASI_TERNAK_SAPI,
  "ternak kambing": INITIAL_DATA_CONSTANT.PETERNAKAN.POPULASI_TERNAK_KAMBING,
  "ternak ayam": INITIAL_DATA_CONSTANT.PETERNAKAN.POPULASI_TERNAK_AYAM,
};

// reconstruct values for generating baseline
const reconstructValues = (data: IApiData): IApiData => {
  return {
    ...data,
    parameters: data.parameters.map((item) => {
      const constant = LIVESTOCK_MAP[item.name];
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

export function addLivestockListeners() {
  listenerMiddleware.startListening({
    actionCreator: setData,
    effect: async (action, listenerApi) => {
      const response: IApiRes = action.payload;
      const data: IApiData = reconstructValues(response.data);
      const baseline: IBaselineData | null = generateBaseline(data);
      let livestockGrowthCattleValues,
        livestockGrowthGoatValues,
        livestockGrowthPoultry;
      // set baseline
      if (baseline) {
        listenerApi.dispatch(setBaseline(baseline));
        livestockGrowthCattleValues = baseline.parameters.find(
          (item: Params) => item.name == "ternak sapi",
        );
        livestockGrowthGoatValues = baseline.parameters.find(
          (item: Params) => item.name == "ternak kambing",
        );
        livestockGrowthPoultry = baseline.parameters.find(
          (item: Params) => item.name == "ternak ayam",
        );
      }
      // set input
      if (
        livestockGrowthCattleValues &&
        livestockGrowthGoatValues &&
        livestockGrowthPoultry
      ) {
        listenerApi.dispatch(
          populateInputsWithBaseline({
            "livestock.cattleGrowth": livestockGrowthCattleValues.average,
          }),
        );
        listenerApi.dispatch(
          populateInputsWithBaseline({
            "livestock.goatGrowth": livestockGrowthGoatValues.average,
          }),
        );
        listenerApi.dispatch(
          populateInputsWithBaseline({
            "livestock.poultryGrowth": livestockGrowthPoultry.average,
          }),
        );
      }
    },
  });

  // another gdrp listnener
  // listenerMiddleware.startListening({ ... });
}
