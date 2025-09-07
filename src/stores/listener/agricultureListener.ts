import { listenerMiddleware } from "@/stores/listenerMiddleware";
import {
  setData,
  setBaseline as setAgricultureBaseline,
} from "@/stores/slicers/agricultureSlicer";
import { setBaseline as setLandPortionBaseline } from "@/stores/slicers/landPortionSlicer";
import { setBaseline as setLandCoverBaseline } from "@/stores/slicers/landCoverSlicer";
import { populateInputsWithBaseline } from "@/stores/slicers/dssInputSlicer";

import {
  generateBaseline,
  generateLandCover,
  generateLandPortion,
  // processAllGdpData,
  // extractAverageGrowthRates
} from "@/lib/utils/projections";
import { IApiData, IApiRes, IBaselineData, Params } from "@/lib/types/response";

export function addAgricultureListener() {
  // set baseline for agriculture area (lahan panen padi)
  listenerMiddleware.startListening({
    actionCreator: setData,
    effect: async (action, listenerApi) => {
      const response: IApiRes = action.payload;
      const data: IApiData = response.data;
      const baseline: IBaselineData | null = generateBaseline(data);
      let agricultureLandConversion;

      // set baseline
      if (baseline) {
        listenerApi.dispatch(setAgricultureBaseline(baseline));
        agricultureLandConversion = baseline.parameters.find(
          (item: Params) => item.name == "Lahan Panen Padi",
        );
      }
      // set input
      if (agricultureLandConversion) {
        listenerApi.dispatch(
          populateInputsWithBaseline({
            "agriculture.landConversion": agricultureLandConversion.average,
          }),
        );
      }
    },
  });
  listenerMiddleware.startListening({
    actionCreator: setData,
    effect: async (action, listenerApi) => {
      const landCoverData: IApiData = generateLandCover(2010, 2045);
      const landPortionData: IApiData = generateLandPortion(landCoverData);
      listenerApi.dispatch(setLandCoverBaseline(landCoverData));
      listenerApi.dispatch(setLandPortionBaseline(landPortionData));
    },
  });
}
