import { listenerMiddleware } from "@/stores/listenerMiddleware";
import { setData, setBaseline } from "@/stores/slicers/populationSlicer";
import { populateInputsWithBaseline } from "@/stores/slicers/dssInputSlicer";

import {
  generateBaseline,
  // processAllGdpData,
  // extractAverageGrowthRates
} from "@/lib/utils/projections";
import { IApiData, IApiRes, Params } from "@/lib/types/response";

const generateTotalPopulation = (data: IApiData): IApiData => {
  const totalValues = data.parameters.reduce<number[]>((acc, item) => {
    (item.values ?? []).forEach((val, idx) => {
      acc[idx] = (acc[idx] ?? 0) + (val ?? 0);
    });
    return acc;
  }, []);

  const totalItem = {
    name: "total",
    values: totalValues,
  };

  return {
    ...data,
    parameters: [...data.parameters, totalItem],
  };
};

export function addPopulationListeners() {
  listenerMiddleware.startListening({
    actionCreator: setData,
    effect: async (action, listenerApi) => {
      const response: IApiRes = action.payload;
      const data: IApiData = generateTotalPopulation(response.data);
      const baseline = generateBaseline(data);
      let populationGrowth;
      // set baseline
      if (baseline) {
        listenerApi.dispatch(setBaseline(baseline));
        // const maleValues: number[] = data.parameters
        //                 .filter((item) => item.name === "laki-laki")
        //                 .flatMap((item) => (item.values ?? []).map((v) => v ?? 0));

        // const femaleValues: number[] = data.parameters
        //                 .filter((item) => item.name === "perempuan")
        //                 .flatMap((item) => (item.values ?? []).map((v) => v ?? 0));
        // values = Computation.computeArrays("ADD", maleValues, femaleValues);
        // populationGrowth = Number(
        //     (
        //         baseline.parameters.reduce((sum, item) => {
        //         const avg = item.average ?? 0;
        //         return sum + avg;
        //         }, 0) / baseline.parameters.length
        //     ).toFixed(2)
        // );
        // listenerApi.dispatch(populateInputsWithBaseline({'demography.populationGrowth' : populationGrowth}))
        populationGrowth = baseline.parameters.find(
          (item: Params) => item.name == "total",
        );
      }

      if (populationGrowth) {
        listenerApi.dispatch(
          populateInputsWithBaseline({
            "demography.populationGrowth": populationGrowth.average,
          }),
        );
      }
    },
  });

  // another gdrp listnener
  // listenerMiddleware.startListening({ ... });
}
