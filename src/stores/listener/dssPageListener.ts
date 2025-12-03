import { listenerMiddleware } from "@/stores/listenerMiddleware";
import { IRootState } from "@/stores";
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
import { populateInputsWithBaseline } from "@/stores/slicers/siteSpecificInputSlicer";
import {
  extractAverageGrowthRates,
  generateApAreaHousing,
  generateApAreaIndustrial,
  generateCValue,
  generateBaseline,
  generateLandCover,
  generateLandPortion,
  generateAvailabilityFactor,
} from "@/lib/utils/projections";
import { IApiData, IBaselineData, Params } from "@/lib/types/response";
// import { INITIAL_DATA_CONSTANT } from "@/lib/constant/initialData.constant";
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
  selectEnergyDemandBaseline,
} from "@/stores/selectors/baseSelector";
import {
  generateAgricultureEnergyDemand,
  generateApWater,
  generateAquacultureWaterDemandProcess,
  generateCropsLandWaterDemandProcess,
  generateDomesticEnergyDemand,
  generateDomesticFoodDemand,
  generateDomesticWaterDemandProcess,
  generateEnergySupply,
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
import {
  dynamicalInputs,
  RESOURCE_DEMAND_UNIT,
} from "@/lib/constant/resourceDemandUnit.constant";
import { getConstants } from "@/lib/utils/constantsHelper";
import { INITIAL_DATA_CONSTANT } from "@/lib/constant/initialData.constant";

interface TransformationRule {
  sourceParamName: string[] | string;
  calculationFn: (...values: any[]) => number[];
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

    const sourceValues: any[] = [];

    for (const name of sourceNames) {
      if (processedResults.has(name)) {
        sourceValues.push(processedResults.get(name)!);
      } else if (sourceMap.has(name)) {
        sourceValues.push(sourceMap.get(name)!.map((v) => v ?? 0));
      }
    }

    if (sourceValues.length === sourceNames.length) {
      // Add extra arguments if the calculation function expects them (e.g., constants)
      // This part is tricky with the current generic implementation.
      // We might need to bind the constants to the functions before passing them here,
      // or pass the constants as part of the config/context.
      // For now, let's assume the functions in config are already bound or we handle it in the listener.
      // BUT, since we are defining config outside, we need a way to inject constants.
      // Let's modify the listener to recreate config with constants or pass constants as extra args.
      // However, `preprocessData` is generic.
      // A better approach: Pass a context object to `preprocessData` which contains constants,
      // and update `preprocessData` to pass this context to `calculationFn` if needed?
      // Or, simpler: wrapper functions in the listener.

      // Let's try to pass the constants as the last argument if the function needs it.
      // But `calculationFn` signature varies.
      // Let's assume we pass `resourceDemandUnit` and `initialData` as the LAST arguments to ALL functions called here?
      // No, that breaks the signature.

      // Alternative: Re-define the configs inside the listener where we have access to state/constants.
      // This seems cleanest.
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

// We need to generate configs dynamically based on constants
const getFoodDemandConfig = (
  resourceDemandUnit: typeof RESOURCE_DEMAND_UNIT,
): ProcessingConfig => ({
  label: "Food",
  unit: "ton/year",
  transformations: [
    {
      sourceParamName: "Total Populasi",
      calculationFn: (data: number[]) =>
        generateFoodDemand(data, resourceDemandUnit),
      outputParamName: "Food Demand",
    },
    {
      sourceParamName: "Total Populasi",
      calculationFn: (data: number[]) =>
        generateDomesticFoodDemand(data, resourceDemandUnit),
      outputParamName: "Food Demand Population",
    },
  ],
});

const getEnergyDemandConfig = (
  resourceDemandUnit: typeof RESOURCE_DEMAND_UNIT,
): ProcessingConfig => ({
  label: "Energy Demand",
  unit: "GWh/year",
  transformations: [
    {
      sourceParamName: "Total Populasi",
      calculationFn: (data: number[]) =>
        generateDomesticEnergyDemand(data, resourceDemandUnit),
      outputParamName: "Domestic Energy Demand",
    },
    {
      sourceParamName: "c.industri pengolahan",
      calculationFn: generateIndustrialEnergyDemand,
      outputParamName: "Industry Energy Demand",
    },
    {
      sourceParamName: "Lahan Panen Padi",
      calculationFn: (data: number[]) =>
        generateAgricultureEnergyDemand(data, resourceDemandUnit),
      outputParamName: "Agriculture Demand",
    },
    {
      sourceParamName: "Total Water Demand",
      calculationFn: (data: number[]) =>
        generateWaterGenerationEnergyDemand(data, resourceDemandUnit),
      outputParamName: "Water Generation",
    },
    {
      sourceParamName: [
        "Domestic Energy Demand",
        "Industry Energy Demand",
        "Agriculture Demand",
        "Water Generation",
      ],
      calculationFn: sumData,
      outputParamName: "Total Energy Demand",
    },
  ],
});

const getResourceConfig = (
  resourceDemandUnit: typeof RESOURCE_DEMAND_UNIT,
  initialData: typeof INITIAL_DATA_CONSTANT,
): ProcessingConfig => ({
  label: "Resource",
  unit: "m3/year",
  transformations: [
    {
      sourceParamName: [
        "Industrial Land",
        "Housing Land",
        "Forest Area",
        "Agriculture Area",
        "Other Land",
      ],
      calculationFn: (
        d1: number[],
        d2: number[],
        d3: number[],
        d4: number[],
        d5: number[],
      ) => generateCValue(d1, d2, d3, d4, d5, resourceDemandUnit),
      outputParamName: "C Value",
    },
    {
      sourceParamName: "C Value",
      calculationFn: (data: number[]) =>
        generatePotentialWater(data, initialData),
      outputParamName: "Potential Water Supply",
    },
    {
      sourceParamName: "Industrial Land",
      calculationFn: generateApAreaIndustrial,
      outputParamName: "AP Area Industrial",
    },
    {
      sourceParamName: "Housing Land",
      calculationFn: generateApAreaHousing,
      outputParamName: "AP Area Housing",
    },
    {
      sourceParamName: "Housing Land",
      calculationFn: generateAvailabilityFactor,
      outputParamName: "Availability Factor",
    },
    {
      sourceParamName: ["Availability Factor", "Total Energy Demand"],
      calculationFn: generateEnergySupply,
      outputParamName: "Energy Supply",
    },
    {
      sourceParamName: "AP Area Industrial",
      calculationFn: (data: number[]) => generateApWater(data, initialData),
      outputParamName: "AP Water Industrial",
    },
    {
      sourceParamName: "AP Area Housing",
      calculationFn: (data: number[]) => generateApWater(data, initialData),
      outputParamName: "AP Water Housing Area",
    },
    {
      sourceParamName: [
        "Potential Water Supply",
        "AP Water Industrial",
        "AP Water Housing Area",
      ],
      calculationFn: (d1: number[], d2: number[], d3: number[]) =>
        generateTotalWater(d1, d2, d3, initialData),
      outputParamName: "Total Water Supply",
    },
  ],
});

const getWaterDemandConfig = (
  resourceDemandUnit: typeof RESOURCE_DEMAND_UNIT,
): ProcessingConfig => ({
  label: "Water Demand",
  unit: "m3/year",
  transformations: [
    {
      sourceParamName: "Total Populasi",
      calculationFn: (data: number[]) =>
        generateDomesticWaterDemandProcess(data, resourceDemandUnit),
      outputParamName: "Domestic Water Demand",
    },
    {
      sourceParamName: "c.industri pengolahan",
      calculationFn: generateIndustrialWaterDemandProcess,
      outputParamName: "Industrial Water Demand",
    },
    {
      sourceParamName: "Lahan Panen Padi",
      calculationFn: (data: number[]) =>
        generateCropsLandWaterDemandProcess(data, resourceDemandUnit),
      outputParamName: "Crops Land",
    },
    {
      sourceParamName: ["sapi", "kambing", "ayam"],
      calculationFn: generateLivestockWaterDemandProcess,
      outputParamName: "Livestock",
    },
    {
      sourceParamName: "area perikanan",
      calculationFn: (data: number[]) =>
        generateAquacultureWaterDemandProcess(data, resourceDemandUnit),
      outputParamName: "Aquaculture",
    },
    {
      sourceParamName: "Domestic Water Demand",
      calculationFn: (data: number[]) =>
        generateMunicipalityWaterDemandProcess(data, resourceDemandUnit),
      outputParamName: "Municipality",
    },
    {
      sourceParamName: [
        "Domestic Water Demand",
        "Industrial Water Demand",
        "Crops Land",
        "Livestock",
        "Aquaculture",
        "Municipality",
      ],
      calculationFn: sumData,
      outputParamName: "Total Water Demand",
    },
  ],
});

const preprocessFisheryData = (
  data: IApiData,
  initialData: typeof INITIAL_DATA_CONSTANT,
): IApiData => {
  const FISHERY_MAP: Record<string, number> = {
    "area perikanan": initialData.PERIKANAN.LUAS_AREA_PERIKANAN,
  };

const LIVESTOCK_MAP: Record<string, number> = {
  "sapi": INITIAL_DATA_CONSTANT.PETERNAKAN.POPULASI_TERNAK_SAPI,
  "kambing": INITIAL_DATA_CONSTANT.PETERNAKAN.POPULASI_TERNAK_KAMBING,
  "ayam": INITIAL_DATA_CONSTANT.PETERNAKAN.POPULASI_TERNAK_AYAM,
};

const preprocessLivestockData = (
  data: IApiData,
  initialData: typeof INITIAL_DATA_CONSTANT,
): IApiData => {
  const LIVESTOCK_MAP: Record<string, number> = {
    "ternak sapi": initialData.PETERNAKAN.POPULASI_TERNAK_SAPI,
    "ternak kambing": initialData.PETERNAKAN.POPULASI_TERNAK_KAMBING,
    "ternak ayam": initialData.PETERNAKAN.POPULASI_TERNAK_AYAM,
  };

  return {
    ...data,
    parameters: data.parameters.map((item) => ({
      ...item,
      values: growthDataByvalue(
        LIVESTOCK_MAP[item.name],
        (item.values ?? []).map((val) => val ?? 0),
      ),
    })),
  };
};

const preprocessPopulationData = (data: IApiData): IApiData => {
  const totalValues = data.parameters.reduce<number[]>((acc, item) => {
    (item.values ?? []).forEach((val, idx) => {
      acc[idx] = (acc[idx] ?? 0) + (val ?? 0);
    });
    return acc;
  }, []);

  return {
    ...data,
    parameters: [
      ...data.parameters,
      { name: "Total Populasi", values: totalValues },
    ],
  };
};

// custom listener
const addFoodDemandListener = () => {
  listenerMiddleware.startListening({
    matcher: isAnyOf(setBaselinePopulation),
    effect: async (action, listenerApi) => {
      listenerApi.cancelActiveListeners();
      const state = listenerApi.getState() as IRootState;
      const region = state.siteSpecific.region;
      const { resourceDemandUnit } = getConstants(region);

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
        getFoodDemandConfig(resourceDemandUnit),
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
      const state = listenerApi.getState() as IRootState;
      const region = state.siteSpecific.region;
      const { resourceDemandUnit } = getConstants(region);

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
        getEnergyDemandConfig(resourceDemandUnit),
      );
      if (processedResults?.parameters.length > 0) {
        listenerApi.dispatch(setEnergyDemandBaseline(processedResults));
      }
    },
  });
};

const addResourceListener = () => {
  listenerMiddleware.startListening({
    matcher: isAnyOf(
      setLandPortionBaseline,
      setDataApArea,
      setEnergyDemandBaseline,
    ),
    effect: async (action, listenerApi) => {
      listenerApi.cancelActiveListeners();
      const state = listenerApi.getState() as IRootState;
      const region = state.siteSpecific.region;
      const { resourceDemandUnit, initialData } = getConstants(region);

      const allParameters = [
        ...(selectLandPortionBaseline(state)?.parameters || []),
        ...(selectAgricultureBaseline(state)?.parameters || []),
        ...(selectEnergyDemandBaseline(state)?.parameters || []),
      ];

      const sourceDataForProcessing: IBaselineData = {
        label: "Resource",
        unit: "m3/year",
        years: Array.from({ length: 36 }, (_, i) => 2010 + i),
        parameters: allParameters,
      };

      const results = preprocessData(
        sourceDataForProcessing,
        getResourceConfig(resourceDemandUnit, initialData),
      );
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
      const state = listenerApi.getState() as IRootState;
      const region = state.siteSpecific.region;
      const { resourceDemandUnit } = getConstants(region);

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
        getWaterDemandConfig(resourceDemandUnit),
      );
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
      setWaterDemandBaseline,
      setEnergyDemandBaseline,
    ),

    effect: async (action, listenerApi) => {
      listenerApi.cancelActiveListeners();

      const state = listenerApi.getState() as IRootState;
      const allParameters = [
        ...(selectGdrpBaseline(state)?.parameters || []),
        ...(selectPopulationBaseline(state)?.parameters || []),
        ...(selectAgricultureBaseline(state)?.parameters || []),
        ...(selectFisheryBaseline(state)?.parameters || []),
        ...(selectLivestockBaseline(state)?.parameters || []),
        ...(selectWaterDemandBaseline(state)?.parameters || []),
        ...(selectEnergyDemandBaseline(state)?.parameters || []),
      ];
      const completeBaselinePayload = {
        ...extractAverageGrowthRates(allParameters),
        ...dynamicalInputs,
      };
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
      const state = listenerApi.getState() as IRootState;
      const region = state.siteSpecific.region;
      const { initialData } = getConstants(region);

      if (typeof preprocessFisheryData === "function") {
        data = preprocessFisheryData(data, initialData);
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
      const state = listenerApi.getState() as IRootState;
      const region = state.siteSpecific.region;
      const { initialData } = getConstants(region);

      if (typeof preprocessLivestockData === "function") {
        data = preprocessLivestockData(data, initialData);
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

      const state = listenerApi.getState() as IRootState;
      const region = state.siteSpecific.region;
      const { initialData, resourceDemandUnit } = getConstants(region);

      const landCoverData = generateLandCover(
        2010,
        2045,
        initialData,
        resourceDemandUnit,
      );
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
