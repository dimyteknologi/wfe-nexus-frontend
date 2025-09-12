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
import { setBaseline as setEnergyDemandBaseline } from "@/stores/slicers/EnergyDemandSlicer";
import { setBaseline as setWaterDemandBaseline } from "@/stores/slicers/waterDemandSlicer";
import { setBaseline as setResourceBaseline } from "@/stores/slicers/resourceSlicer";
import { setBaseline as setFoodDemandBaseline } from "@/stores/slicers/foodDemandSlicer";
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
  generateApAreaHousing,
  generateApAreaIndustrial,
  generateBaseline,
  generateLandCover,
  generateLandPortion,
} from "@/lib/utils/projections";
import { IApiData, IBaselineData, Params } from "@/lib/types/response";
import { INITIAL_DATA_CONSTANT } from "@/lib/constant/initialData.constant";
import {
  average,
  growthDataByvalue,
  growthRate,
  sumData,
} from "@/lib/utils/formulas";
import { isAnyOf } from "@reduxjs/toolkit";
import {
  selectGdrpBaseline,
  selectPopulationBaseline,
  selectAgricultureBaseline,
  selectFisheryBaseline,
  selectLivestockBaseline,
  selectWaterDemandBaseline,
  selectLandPortionBaseline,
} from "@/stores/selectors/baseSelector";
import {
  generateAgricultureEnergyDemand,
  generateAquacultureWaterDemandProcess,
  generateCropsLandWaterDemandProcess,
  generateCValue,
  generateDomesticEnergyDemand,
  generateDomesticFoodDemand,
  generateDomesticWaterDemandProcess,
  generateFoodDemand,
  generateIndustrialEnergyDemand,
  generateIndustrialWaterDemandProcess,
  generateLivestockWaterDemandProcess,
  generateMunicipalityWaterDemandProcess,
  generatePotentialWater,
  generateTotalWater,
  generateWaterGenerationEnergyDemand,
} from "@/lib/utils/processingData";
import { setDataApArea } from "../slicers/intermediateOuput/apAreaSlicer";

interface TransformationRule {
  sourceParamName: string[] | string;
  calculationFn: (...values: number[][]) => number[];
  outputParamName: string;
}

interface ProcessingConfig {
  label: string;
  unit: string;
  transformations: TransformationRule[];
}

// preprocess pipeline
const preprocessData = (
  data: IBaselineData,
  config: ProcessingConfig,
): IBaselineData => {
  const sourceMap = new Map(data.parameters.map((p) => [p.name, p.values]));
  const processedResults = new Map<string, number[]>();
  for (const rule of config.transformations) {
    const sourceNames = Array.isArray(rule.sourceParamName)
      ? rule.sourceParamName
      : [rule.sourceParamName];

    const sourceValues: number[][] = [];

    for (const name of sourceNames) {
      if (processedResults.has(name)) {
        sourceValues.push(processedResults.get(name)!);
      } else if (sourceMap.has(name)) {
        sourceValues.push(sourceMap.get(name)!.map((v) => v ?? 0));
      }
    }

    if (sourceValues.length === sourceNames.length) {
      const calculatedValues = rule.calculationFn(...sourceValues);
      processedResults.set(rule.outputParamName, calculatedValues);
    } else {
      console.warn(
        `failed to run "${rule.outputParamName}" source not provided.`,
      );
    }
  }

  const finalParameters: Params[] = [];
  processedResults.forEach((values, name) => {
    finalParameters.push({
      name: name,
      values: values,
      average: average(growthRate(values)),
      growth: growthRate(values),
    });
  });

  return {
    ...data,
    label: config.label,
    unit: config.unit,
    parameters: finalParameters,
  };
};

const foodDemandConfig: ProcessingConfig = {
  label: "Food",
  unit: "ton/year",
  transformations: [
    {
      sourceParamName: "total",
      calculationFn: generateFoodDemand,
      outputParamName: "Food Demand",
    },
    {
      sourceParamName: "total",
      calculationFn: generateDomesticFoodDemand,
      outputParamName: "Food Demand Population",
    },
  ],
};

const energyDemandConfig: ProcessingConfig = {
  label: "Energy",
  unit: "GWh/year",
  transformations: [
    {
      sourceParamName: "total",
      calculationFn: generateDomesticEnergyDemand,
      outputParamName: "Domestic Demand",
    },
    {
      sourceParamName: "C.Industri Pengolahan",
      calculationFn: generateIndustrialEnergyDemand,
      outputParamName: "Industry Demand",
    },
    {
      sourceParamName: "Lahan Panen Padi",
      calculationFn: generateAgricultureEnergyDemand,
      outputParamName: "Agriculture Demand",
    },
    {
      sourceParamName: "Total Water Demand",
      calculationFn: generateWaterGenerationEnergyDemand,
      outputParamName: "Water Generation",
    },
    {
      sourceParamName: [
        "Domestic Demand",
        "Industry Demand",
        "Agriculture Demand",
        "Water Generation",
      ],
      calculationFn: sumData,
      outputParamName: "Total Energy Demand",
    },
  ],
};

const resourceConfig: ProcessingConfig = {
  label: "Resource",
  unit: "m3/year",
  transformations: [
    {
      sourceParamName: [
        "Industrial Land",
        "Housing Land",
        "Forest Area",
        "Agriculture Area",
      ],
      calculationFn: generateCValue,
      outputParamName: "C Value",
    },
    {
      sourceParamName: "C Value",
      calculationFn: generatePotentialWater,
      outputParamName: "Potential Water",
    },
    {
      sourceParamName: "Potential Water",
      calculationFn: generateTotalWater,
      outputParamName: "Total Water Supply",
    },
    {
      sourceParamName: "Industrial land",
      calculationFn: generateApAreaIndustrial,
      outputParamName: "AP Area Industrial",
    },

    {
      sourceParamName: "Housing land",
      calculationFn: generateApAreaHousing,
      outputParamName: "AP Area Housing",
    },
  ],
};

const waterDemandConfig: ProcessingConfig = {
  label: "Water",
  unit: "m3/year",
  transformations: [
    {
      sourceParamName: "total",
      calculationFn: generateDomesticWaterDemandProcess,
      outputParamName: "Domestic Demand",
    },
    {
      sourceParamName: "C.Industri Pengolahan",
      calculationFn: generateIndustrialWaterDemandProcess,
      outputParamName: "Industrial Demand",
    },
    {
      sourceParamName: "Lahan Panen Padi",
      calculationFn: generateCropsLandWaterDemandProcess,
      outputParamName: "Crops Land",
    },
    {
      sourceParamName: ["ternak sapi", "ternak kambing", "ternak ayam"],
      calculationFn: generateLivestockWaterDemandProcess,
      outputParamName: "Livestock",
    },
    {
      sourceParamName: "area perikanan",
      calculationFn: generateAquacultureWaterDemandProcess,
      outputParamName: "Aquaculture",
    },
    {
      sourceParamName: "Domestic Demand",
      calculationFn: generateMunicipalityWaterDemandProcess,
      outputParamName: "Municipality",
    },
    {
      sourceParamName: [
        "Domestic Demand",
        "Industrial Demand",
        "Crops Land",
        "Livestock",
        "Aquaculture",
        "Municipality",
      ],
      calculationFn: sumData,
      outputParamName: "Total Water Demand",
    },
  ],
};

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

const addFoodDemandListener = () => {
  listenerMiddleware.startListening({
    matcher: isAnyOf(setBaselinePopulation),
    effect: async (action, listenerApi) => {
      listenerApi.cancelActiveListeners();
      const state = listenerApi.getState();
      const allParameters = [
        ...(selectPopulationBaseline(state)?.parameters || []),
      ];
      const sourceDataForProcessing: IBaselineData = {
        label: "Food Demand",
        unit: "ton/year",
        years: Array.from({ length: 36 }, (_, i) => 2010 + i),
        parameters: allParameters,
      };

      const processedResults = preprocessData(
        sourceDataForProcessing,
        foodDemandConfig,
      );
      if (processedResults?.parameters.length > 0) {
        listenerApi.dispatch(setFoodDemandBaseline(processedResults));
      }
    },
  });
};

const addEnergyDemandListener = () => {
  listenerMiddleware.startListening({
    matcher: isAnyOf(
      setGdrpBaseline,
      setAgricultureBaseline,
      setWaterDemandBaseline,
      setBaselinePopulation,
    ),
    effect: async (action, listenerApi) => {
      listenerApi.cancelActiveListeners();
      const state = listenerApi.getState();
      const allParameters = [
        ...(selectGdrpBaseline(state)?.parameters || []),
        ...(selectPopulationBaseline(state)?.parameters || []),
        ...(selectAgricultureBaseline(state)?.parameters || []),
        ...(selectWaterDemandBaseline(state)?.parameters || []),
      ];
      const sourceDataForProcessing: IBaselineData = {
        label: "Energy Demand",
        unit: "GWh/year",
        years: Array.from({ length: 36 }, (_, i) => 2010 + i),
        parameters: allParameters,
      };

      const processedResults = preprocessData(
        sourceDataForProcessing,
        energyDemandConfig,
      );
      //  console.log(processedResults);
      if (processedResults?.parameters.length > 0) {
        listenerApi.dispatch(setEnergyDemandBaseline(processedResults));
      }
    },
  });
};

const addResourceListener = () => {
  listenerMiddleware.startListening({
    matcher: isAnyOf(setLandPortionBaseline, setDataApArea),
    effect: async (action, listenerApi) => {
      listenerApi.cancelActiveListeners();
      const state = listenerApi.getState();
      const allParameters = [
        ...(selectLandPortionBaseline(state)?.parameters || []),
        ...(selectAgricultureBaseline(state)?.parameters || []),
      ];
      const sourceDataForProcessing: IBaselineData = {
        label: "Resource",
        unit: "m3/year",
        years: Array.from({ length: 36 }, (_, i) => 2010 + i),
        parameters: allParameters,
      };

      const results = preprocessData(sourceDataForProcessing, resourceConfig);
      console.log(results);
      if (results?.parameters.length > 0) {
        listenerApi.dispatch(setResourceBaseline(results));
      }
    },
  });
};

const addWaterDemandListener = () => {
  listenerMiddleware.startListening({
    matcher: isAnyOf(
      setGdrpBaseline,
      setAgricultureBaseline,
      setFisheryBaseline,
      setBaselineLivestock,
      setBaselinePopulation,
    ),
    effect: async (action, listenerApi) => {
      listenerApi.cancelActiveListeners();
      const state = listenerApi.getState();
      const allParameters = [
        ...(selectGdrpBaseline(state)?.parameters || []),
        ...(selectPopulationBaseline(state)?.parameters || []),
        ...(selectAgricultureBaseline(state)?.parameters || []),
        ...(selectFisheryBaseline(state)?.parameters || []),
        ...(selectLivestockBaseline(state)?.parameters || []),
      ];
      const sourceDataForProcessing: IBaselineData = {
        label: "Water Demand",
        unit: "m3/year",
        years: Array.from({ length: 36 }, (_, i) => 2010 + i),
        parameters: allParameters,
      };

      const processedWaterData = preprocessData(
        sourceDataForProcessing,
        waterDemandConfig,
      );
      //  console.log(processedWaterData);
      if (processedWaterData?.parameters.length > 0) {
        listenerApi.dispatch(setWaterDemandBaseline(processedWaterData));
      }
    },
  });
};

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
  addFoodDemandListener();
  addWaterDemandListener();
  addEnergyDemandListener();
  addResourceListener();
}
