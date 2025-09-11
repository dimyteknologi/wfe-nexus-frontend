import { INITIAL_DATA_CONSTANT } from "../constant/initialData.constant";
import { RESOURCE_DEMAND_UNIT } from "../constant/resourceDemandUnit.constant";
import { Computation, constantMultiply, sumData } from "./formulas";

//  WATER DEMAND
export const generateDomesticWaterDemandProcess = (data: number[]) => {
  const constant = RESOURCE_DEMAND_UNIT.WATER.DOMESTIC_DEMAND;
  return constantMultiply(data, constant);
};

export const generateIndustrialWaterDemandProcess = (data: number[]) => {
  const constant = RESOURCE_DEMAND_UNIT.WATER.INDUSTRIAL_DEMAND;
  return constantMultiply(data, constant);
};

export const generateCropsLandWaterDemandProcess = (data: number[]) => {
  const constant = RESOURCE_DEMAND_UNIT.WATER.CROPS_LAND_DEMAND;
  return constantMultiply(data, constant);
};

export const generateAquacultureWaterDemandProcess = (data: number[]) => {
  const constant = RESOURCE_DEMAND_UNIT.WATER.AQUACULTURE_DEMAND;
  return constantMultiply(data, constant);
};

export const generateMunicipalityWaterDemandProcess = (data: number[]) => {
  const constant = RESOURCE_DEMAND_UNIT.WATER.MUNICIPALITY;
  return constantMultiply(data, constant);
};

export const generateLivestockWaterDemandProcess = (
  dataCattle: number[],
  dataGoat: number[],
  dataPoultry: number[],
) => {
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

// ENERGY DEMAND
export const generateDomesticEnergyDemand = (data: number[]) => {
  const constant = RESOURCE_DEMAND_UNIT.ENERGY.DOMESTIC_DEMAND;
  const result = constantMultiply(data, constant);

  return result.map((data) => data / 1000000);
};

export const generateIndustrialEnergyDemand = (data: number[]) => {
  const constant = RESOURCE_DEMAND_UNIT.ENERGY.INDUSTRIAL_ENERGY_INTENSITY;
  const result = constantMultiply(data, constant);

  return result.map((data) => data / 1000000);
};

export const generateAgricultureEnergyDemand = (data: number[]) => {
  const constant = RESOURCE_DEMAND_UNIT.ENERGY.AGRICULTURE_ENERGY_INTENSITY;
  const result = constantMultiply(data, constant);

  return result.map((data) => data / 1000000);
};

export const generateWaterGenerationEnergyDemand = (data: number[]) => {
  const constant = RESOURCE_DEMAND_UNIT.ENERGY.ENERGY_FOR_WATER;
  const result = constantMultiply(data, constant);

  return result.map((data) => data / 1000000);
};

// FOOD DEMAND
export const generateFoodDemand = (data: number[]) => {
  const constantStaple = RESOURCE_DEMAND_UNIT.FOOD.STAPLE_PER_CAPITA;
  const constantNonStaple =
    RESOURCE_DEMAND_UNIT.FOOD.PERCENTAGE_NON_STAPLE_DEMAND;

  return data.map(
    (data) => (data * constantStaple * (1 + constantNonStaple)) / 1000,
  );
};

export const generateDomesticFoodDemand = (data: number[]) => {
  const constantStaple = RESOURCE_DEMAND_UNIT.FOOD.STAPLE_PER_CAPITA;
  return data.map((data) => (data * constantStaple) / 1000);
};

// LAND COVER
const generateIndustrialLand = (data: number[], finalYear: number) => {
  const constanta = INITIAL_DATA_CONSTANT.LAND_COVER.INDUSTRIAL_LAND;
  const growth = constanta + 1;
  return Computation.projection({ data, growth, finalYear });
};

const generateHousingLand = (data: number[], finalYear: number) => {
  const constanta = INITIAL_DATA_CONSTANT.LAND_COVER.HOUSING_LAND;
  const growth = constanta + 1;
  return Computation.projection({ data, growth, finalYear });
};

const generateForestArea = (data: number[], finalYear: number) => {
  const constanta = INITIAL_DATA_CONSTANT.LAND_COVER.FOREST_AREA;
  const growth = constanta + 1;
  return Computation.projection({ data, growth, finalYear });
};

const generateAgriculturetArea = (data: number[], finalYear: number) => {
  const constanta = INITIAL_DATA_CONSTANT.LAND_COVER.AGRICULTURE_AREA;
  const growth = 1 - constanta;
  return Computation.projection({ data, growth, finalYear });
};

//  LAND PORTION
const generateLandPortion = (data: number[], availableLand: number[]) => {
  return Computation.computeArrays(
    Computation.ARRAY_OPERATION_TYPES.DEVIDED,
    data,
    availableLand,
  );
};

export const generateCValue = (
  dataIndustrial: number[],
  dataHousing: number[],
  dataForest: number[],
  dataAgriculture: number[],
) => {
  const result = [];
  for (let i = 0; i < dataAgriculture.length; i++) {
    const value =
      (dataIndustrial[i] ?? 0) * RESOURCE_DEMAND_UNIT.C_AREA.INDUSTRIAL_LAND +
      (dataHousing[i] ?? 0) * RESOURCE_DEMAND_UNIT.C_AREA.HOUSING_LAND +
      (dataForest[i] ?? 0) * RESOURCE_DEMAND_UNIT.C_AREA.FOREST_AREA +
      (dataAgriculture[i] ?? 0) * RESOURCE_DEMAND_UNIT.C_AREA.AGRICULTURE_AREA;
    result.push(value);
  }

  return result;
};

export const generatePotentialWater = (data: number[]) => {
  return data.map((item) => item * 3760534400);
};

export const generateTotalWater = (data: number[]) => {
  return data.map((item) => item + (36528322 + 61508750));
};
