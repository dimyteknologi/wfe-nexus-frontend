import {
  constantDevided,
  constantMultiply,
  resultConverter,
  sumData,
} from "@/lib/utils/formulas";
import { createSelector } from "@reduxjs/toolkit";
import {
  dynamicInputEnergyDomestic,
  dynamicInputEnergyIndustrialIntensity,
  dynamicInputWaterDemand,
  dynamicInputWaterIndustrial,
} from "./dynamicInputSelector";
import { selectPopulationDataComparison } from "./socioEconomySelector";
import {
  selectAgricultureScenarioProjection,
  selectAgricultureScenarioProjectionA,
  selectAgricultureScenarioProjectionB,
  selectAgricultureScenarioProjectionBaseline,
  selectGdrpScenarioProjection,
  selectGdrpScenarioProjectionA,
  selectGdrpScenarioProjectionB,
  selectGdrpScenarioProjectionBaseline,
  selectLivestockProjectionBaseline,
  selectLivestockProjection,
  selectLivestockProjectionA,
  selectLivestockProjectionB,
  selectFisheryProjection,
  selectFisheryProjectionBaseline,
  selectFisheryProjectionA,
  selectFisheryProjectionB,
} from "@/stores/selectors/site-specific/scenarioProjectionSelector";

import { IBaselineData } from "@/lib/types/response";
import { RESOURCE_DEMAND_UNIT } from "@/lib/constant/resourceDemandUnit.constant";

export const calculateMultiplyArrays = (
  data: number[],
  dynamicInput: number[],
) => {
  if (!Array.isArray(data) && !Array.isArray(dynamicInput))
    return Array(36).fill(0);

  const result = data.map((val, i) => {
    const denominator = dynamicInput[i] ?? 0;
    return denominator !== 0 ? val * denominator : 0;
  });

  return resultConverter(result);
};

export const getParameters = (baseData: IBaselineData | null, key: string) => {
  if (!baseData && !key) return Array(36).fill(0);

  const data = baseData?.parameters.find((param) => param.name.toLowerCase() === key.toLowerCase());
  if (!data) return Array(36).fill(0);

  return data.values.map((val) => val ?? 0);
};

const sumArrayData = (...arrays: number[][]): number[] => {
  if (arrays.length === 0) return Array(36).fill(0);
  const result: number[] = new Array(36).fill(0);

  for (const arr of arrays) {
    for (let i = 0; i < 36; i++) {
      result[i] += arr[i];
    }
  }

  return result.map((num) => parseFloat(((num * 100) / 100).toFixed(2)));
};

export const selectDomesticWaterDemand = createSelector(
  [dynamicInputWaterDemand, selectPopulationDataComparison],
  (inputWaterDemand, dataPopulation) => {
    return {
      active: calculateMultiplyArrays(
        dataPopulation.active,
        inputWaterDemand.active.map((item) => (item * 365) / 1000),
      ),
      baseline: calculateMultiplyArrays(
        dataPopulation.baseline,
        inputWaterDemand.baseline.map((item) => (item * 365) / 1000),
      ),
      scenarioA: calculateMultiplyArrays(
        dataPopulation.scenarioA,
        inputWaterDemand.scenarioA.map((item) => (item * 365) / 1000),
      ),
      scenarioB: calculateMultiplyArrays(
        dataPopulation.scenarioB,
        inputWaterDemand.scenarioB.map((item) => (item * 365) / 1000),
      ),
    };
  },
);

export const selectIndustrialWaterDemand = createSelector(
  [
    dynamicInputWaterIndustrial,
    selectGdrpScenarioProjection,
    selectGdrpScenarioProjectionBaseline,
    selectGdrpScenarioProjectionA,
    selectGdrpScenarioProjectionB,
  ],
  (
    inputWaterIndustrial,
    gdrpActive,
    gdrpBaseline,
    gdrpScenarioA,
    gdrpScenarioB,
  ) => {
    return {
      active: calculateMultiplyArrays(
        getParameters(gdrpActive, "C.Industri Pengolahan"),
        inputWaterIndustrial.active,
      ),
      baseline: calculateMultiplyArrays(
        getParameters(gdrpBaseline, "C.Industri Pengolahan"),
        inputWaterIndustrial.baseline,
      ),
      scenarioA: calculateMultiplyArrays(
        getParameters(gdrpScenarioA, "C.Industri Pengolahan"),
        inputWaterIndustrial.scenarioA,
      ),
      scenarioB: calculateMultiplyArrays(
        getParameters(gdrpScenarioB, "C.Industri Pengolahan"),
        inputWaterIndustrial.scenarioB,
      ),
    };
  },
);

export const selectCropsLandWater = createSelector(
  [
    selectAgricultureScenarioProjection,
    selectAgricultureScenarioProjectionBaseline,
    selectAgricultureScenarioProjectionA,
    selectAgricultureScenarioProjectionB,
  ],
  (active, baseline, scenarioA, scenarioB) => {
    return {
      active: constantMultiply(
        getParameters(active, "Lahan Panen Padi"),
        RESOURCE_DEMAND_UNIT.WATER.CROPS_LAND_DEMAND,
      ),
      baseline: constantMultiply(
        getParameters(baseline, "Lahan Panen Padi"),
        RESOURCE_DEMAND_UNIT.WATER.CROPS_LAND_DEMAND,
      ),
      scenarioA: constantMultiply(
        getParameters(scenarioA, "Lahan Panen Padi"),
        RESOURCE_DEMAND_UNIT.WATER.CROPS_LAND_DEMAND,
      ),
      scenarioB: constantMultiply(
        getParameters(scenarioB, "Lahan Panen Padi"),
        RESOURCE_DEMAND_UNIT.WATER.CROPS_LAND_DEMAND,
      ),
    };
  },
);

export const selectLivestock = createSelector(
  [
    selectLivestockProjectionBaseline,
    selectLivestockProjection,
    selectLivestockProjectionA,
    selectLivestockProjectionB,
  ],
  (baseline, active, scenarioA, scenarioB) => {
    const calculateLivestockData = (baseData: IBaselineData | null) => {
      const dataCattle = getParameters(baseData, "sapi");
      const dataGoat = getParameters(baseData, "kambing");
      const dataPoultry = getParameters(baseData, "ayam");
      
      const constantLargeCattle = RESOURCE_DEMAND_UNIT.WATER.LARGE_CATTLE;
      const constantSmallCattle = RESOURCE_DEMAND_UNIT.WATER.SMALL_CATTLE;
      const constantPoultry = RESOURCE_DEMAND_UNIT.WATER.POULTRY;

      const waterDemandLargeCattle = constantMultiply(
        dataCattle,
        constantLargeCattle,
      );

      const waterDemandSmallCattle = constantMultiply(
        dataGoat,
        constantSmallCattle,
      );

      const waterDemandPoultry = constantMultiply(dataPoultry, constantPoultry);

      return sumData(
        waterDemandLargeCattle,
        waterDemandSmallCattle,
        waterDemandPoultry,
      );
    };
    return {
      active: calculateLivestockData(active),
      baseline: calculateLivestockData(baseline),
      scenarioA: calculateLivestockData(scenarioA),
      scenarioB: calculateLivestockData(scenarioB),
    };
  },
);

export const selectAquacultureWater = createSelector(
  [
    selectFisheryProjection,
    selectFisheryProjectionBaseline,
    selectFisheryProjectionA,
    selectFisheryProjectionB,
  ],
  (active, baseline, scenarioA, scenarioB) => {
    return {
      active: constantMultiply(
        getParameters(active, "area perikanan"),
        RESOURCE_DEMAND_UNIT.WATER.AQUACULTURE_DEMAND,
      ),
      baseline: constantMultiply(
        getParameters(baseline, "area perikanan"),
        RESOURCE_DEMAND_UNIT.WATER.AQUACULTURE_DEMAND,
      ),
      scenarioA: constantMultiply(
        getParameters(scenarioA, "area perikanan"),
        RESOURCE_DEMAND_UNIT.WATER.AQUACULTURE_DEMAND,
      ),
      scenarioB: constantMultiply(
        getParameters(scenarioB, "area perikanan"),
        RESOURCE_DEMAND_UNIT.WATER.AQUACULTURE_DEMAND,
      ),
    };
  },
);

export const selectMunicipalityWater = createSelector(
  [selectDomesticWaterDemand],
  (domesticWaterDemand) => {
    return {
      active: constantMultiply(
        domesticWaterDemand.active,
        RESOURCE_DEMAND_UNIT.WATER.MUNICIPALITY,
      ),
      baseline: constantMultiply(
        domesticWaterDemand.baseline,
        RESOURCE_DEMAND_UNIT.WATER.MUNICIPALITY,
      ),
      scenarioA: constantMultiply(
        domesticWaterDemand.scenarioA,
        RESOURCE_DEMAND_UNIT.WATER.MUNICIPALITY,
      ),
      scenarioB: constantMultiply(
        domesticWaterDemand.scenarioB,
        RESOURCE_DEMAND_UNIT.WATER.MUNICIPALITY,
      ),
    };
  },
);

export const selectTotalWaterDemand = createSelector(
  [
    selectDomesticWaterDemand,
    selectIndustrialWaterDemand,
    selectCropsLandWater,
    selectLivestock,
    selectAquacultureWater,
    selectMunicipalityWater,
  ],
  (domestic, industrial, crops, livestock, aquaculture, municipality) => {
    return {
      active: sumArrayData(
        domestic.active,
        industrial.active,
        crops.active,
        livestock.active,
        aquaculture.active,
        municipality.active,
      ),
      baseline: sumArrayData(
        domestic.baseline,
        industrial.baseline,
        crops.baseline,
        livestock.baseline,
        aquaculture.baseline,
        municipality.baseline,
      ),
      scenarioA: sumArrayData(
        domestic.scenarioA,
        industrial.scenarioA,
        crops.scenarioA,
        livestock.scenarioA,
        aquaculture.scenarioA,
        municipality.scenarioA,
      ),
      scenarioB: sumArrayData(
        domestic.scenarioB,
        industrial.scenarioB,
        crops.scenarioB,
        livestock.scenarioB,
        aquaculture.scenarioB,
        municipality.scenarioB,
      ),
    };
  },
);

export const selectDomesticEnergy = createSelector(
  [dynamicInputEnergyDomestic, selectPopulationDataComparison],
  (inputEnergy, dataPopulation) => {
    return {
      active: constantDevided(
        calculateMultiplyArrays(dataPopulation.active, inputEnergy.active),
        1000000,
      ),
      baseline: constantDevided(
        calculateMultiplyArrays(dataPopulation.baseline, inputEnergy.baseline),
        1000000,
      ),
      scenarioA: constantDevided(
        calculateMultiplyArrays(
          dataPopulation.scenarioA,
          inputEnergy.scenarioA,
        ),
        1000000,
      ),
      scenarioB: constantDevided(
        calculateMultiplyArrays(
          dataPopulation.scenarioB,
          inputEnergy.scenarioB,
        ),
        1000000,
      ),
    };
  },
);

export const selectIndustrialEnergy = createSelector(
  [
    dynamicInputEnergyIndustrialIntensity,
    selectGdrpScenarioProjection,
    selectGdrpScenarioProjectionBaseline,
    selectGdrpScenarioProjectionA,
    selectGdrpScenarioProjectionB,
  ],
  (
    inputEnergyIndustrial,
    gdrpActive,
    gdrpBaseline,
    gdrpScenarioA,
    gdrpScenarioB,
  ) => {
    return {
      active: constantDevided(
        calculateMultiplyArrays(
          getParameters(gdrpActive, "C.Industri Pengolahan"),
          inputEnergyIndustrial.active,
        ),
        1000000,
      ),
      baseline: constantDevided(
        calculateMultiplyArrays(
          getParameters(gdrpBaseline, "C.Industri Pengolahan"),
          inputEnergyIndustrial.baseline,
        ),
        1000000,
      ),
      scenarioA: constantDevided(
        calculateMultiplyArrays(
          getParameters(gdrpScenarioA, "C.Industri Pengolahan"),
          inputEnergyIndustrial.scenarioA,
        ),
        1000000,
      ),
      scenarioB: constantDevided(
        calculateMultiplyArrays(
          getParameters(gdrpScenarioB, "C.Industri Pengolahan"),
          inputEnergyIndustrial.scenarioB,
        ),
        1000000,
      ),
    };
  },
);

export const selectAgricultureEnergy = createSelector(
  [
    selectAgricultureScenarioProjection,
    selectAgricultureScenarioProjectionBaseline,
    selectAgricultureScenarioProjectionA,
    selectAgricultureScenarioProjectionB,
  ],
  (active, baseline, scenarioA, scenarioB) => {
    return {
      active: constantDevided(
        constantMultiply(
          getParameters(active, "Lahan Panen Padi"),
          RESOURCE_DEMAND_UNIT.ENERGY.AGRICULTURE_ENERGY_INTENSITY,
        ),
        1000000,
      ),
      baseline: constantDevided(
        constantMultiply(
          getParameters(baseline, "Lahan Panen Padi"),
          RESOURCE_DEMAND_UNIT.ENERGY.AGRICULTURE_ENERGY_INTENSITY,
        ),
        1000000,
      ),
      scenarioA: constantDevided(
        constantMultiply(
          getParameters(scenarioA, "Lahan Panen Padi"),
          RESOURCE_DEMAND_UNIT.ENERGY.AGRICULTURE_ENERGY_INTENSITY,
        ),
        1000000,
      ),
      scenarioB: constantDevided(
        constantMultiply(
          getParameters(scenarioB, "Lahan Panen Padi"),
          RESOURCE_DEMAND_UNIT.ENERGY.AGRICULTURE_ENERGY_INTENSITY,
        ),
        1000000,
      ),
    };
  },
);

export const selectWaterGenerationEnergy = createSelector(
  [selectTotalWaterDemand],
  (waterTotal) => {
    return {
      active: constantDevided(
        constantMultiply(
          waterTotal.active,
          RESOURCE_DEMAND_UNIT.ENERGY.ENERGY_FOR_WATER,
        ),
        1000000,
      ),
      baseline: constantDevided(
        constantMultiply(
          waterTotal.baseline,
          RESOURCE_DEMAND_UNIT.ENERGY.ENERGY_FOR_WATER,
        ),
        1000000,
      ),
      scenarioA: constantDevided(
        constantMultiply(
          waterTotal.scenarioA,
          RESOURCE_DEMAND_UNIT.ENERGY.ENERGY_FOR_WATER,
        ),
        1000000,
      ),
      scenarioB: constantDevided(
        constantMultiply(
          waterTotal.scenarioB,
          RESOURCE_DEMAND_UNIT.ENERGY.ENERGY_FOR_WATER,
        ),
        1000000,
      ),
    };
  },
);

export const selectTotalEnergy = createSelector(
  [
    selectDomesticEnergy,
    selectIndustrialEnergy,
    selectAgricultureEnergy,
    selectWaterGenerationEnergy,
  ],
  (domestic, industrial, agriculture, generation) => {
    return {
      active: sumArrayData(
        domestic.active,
        industrial.active,
        agriculture.active,
        generation.active,
      ),
      baseline: sumArrayData(
        domestic.baseline,
        industrial.baseline,
        agriculture.baseline,
        generation.baseline,
      ),
      scenarioA: sumArrayData(
        domestic.scenarioA,
        industrial.scenarioA,
        agriculture.scenarioA,
        generation.scenarioA,
      ),
      scenarioB: sumArrayData(
        domestic.scenarioB,
        industrial.scenarioB,
        agriculture.scenarioB,
        generation.scenarioB,
      ),
    };
  },
);

// export const selectFoodDemand = createSelector([

// ], () => {

// })
