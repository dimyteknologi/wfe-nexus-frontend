import { listenerMiddleware } from "@/stores/listenerMiddleware";
import { setData, setBaseline } from "@/stores/slicers/gdrpSlicer";
import { populateInputsWithBaseline } from "@/stores/slicers/dssInputSlicer";
import {
  generateBaseline,
  // processAllGdpData,
  // extractAverageGrowthRates
} from "@/lib/utils/projections";
import { IApiData, IApiRes, Params } from "@/lib/types/response";

export function addGdpListeners() {
  listenerMiddleware.startListening({
    actionCreator: setData,
    effect: async (action, listenerApi) => {
      const response: IApiRes = action.payload;
      const data: IApiData = response.data;
      const baseline = generateBaseline(data);
      let agricultureGrowthScenario, industrialGrowthScenario;

      // set baseline
      if (baseline) {
        listenerApi.dispatch(setBaseline(baseline));
        agricultureGrowthScenario = baseline.parameters.find(
          (item: Params) =>
            item.name == "A.Pertanian, Kehutanan, dan Perikanan",
        );
        industrialGrowthScenario = baseline.parameters.find(
          (item: Params) => item.name == "C.Industri Pengolahan",
        );
      }

      // set input
      if (agricultureGrowthScenario && industrialGrowthScenario) {
        listenerApi.dispatch(
          populateInputsWithBaseline({
            "agriculture.growthScenario": agricultureGrowthScenario.average,
          }),
        );
        listenerApi.dispatch(
          populateInputsWithBaseline({
            "industry.growth": industrialGrowthScenario.average,
          }),
        );
      }
    },
  });

  // another gdrp listnener
  // listenerMiddleware.startListening({ ... });
}
