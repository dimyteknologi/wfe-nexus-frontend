import { arrayBuffer } from "stream/consumers";
import { INITIAL_DATA_CONSTANT } from "../constant/initialData.constant";
import { RESOURCE_DEMAND_UNIT } from "../constant/resourceDemandUnit.constant";
import {
  Computation,
  constantAdd,
  constantMultiply,
  dataProjection,
  sumData,
} from "./formulas";

//  WATER DEMAND
export const generateDomesticWaterDemandProcess = (
  data: number[],
  resourceDemandUnit: typeof RESOURCE_DEMAND_UNIT,
) => {
  if (!resourceDemandUnit?.WATER) return data.map(() => 0);
  const constant = resourceDemandUnit.WATER.DOMESTIC_DEMAND;
  return constantMultiply(data, constant);
};

export const generateIndustrialWaterDemandProcess = (
  data: number[],
  resourceDemandUnit: typeof RESOURCE_DEMAND_UNIT,
) => {
  if (!resourceDemandUnit?.WATER) return data.map(() => 0);
  const constant = resourceDemandUnit.WATER.INDUSTRIAL_DEMAND;
  return constantMultiply(data, constant);
};

export const generateCropsLandWaterDemandProcess = (
  data: number[],
  resourceDemandUnit: typeof RESOURCE_DEMAND_UNIT,
) => {
  if (!resourceDemandUnit?.WATER) return data.map(() => 0);
  const constant = resourceDemandUnit.WATER.CROPS_LAND_DEMAND;
  return constantMultiply(data, constant);
};

export const generateAquacultureWaterDemandProcess = (
  data: number[],
  resourceDemandUnit: typeof RESOURCE_DEMAND_UNIT,
) => {
  if (!resourceDemandUnit?.WATER) return data.map(() => 0);
  const constant = resourceDemandUnit.WATER.AQUACULTURE_DEMAND;
  return constantMultiply(data, constant);
};

export const generateMunicipalityWaterDemandProcess = (
  data: number[],
  resourceDemandUnit: typeof RESOURCE_DEMAND_UNIT,
) => {
  if (!resourceDemandUnit?.WATER) return data.map(() => 0);
  const constant = resourceDemandUnit.WATER.MUNICIPALITY;
  return constantMultiply(data, constant);
};

export const generateLivestockWaterDemandProcess = (
  dataCattle: number[],
  dataGoat: number[],
  dataPoultry: number[],
  resourceDemandUnit: typeof RESOURCE_DEMAND_UNIT,
) => {
  if (!resourceDemandUnit?.WATER) return dataCattle.map(() => 0);
  const constantLargeCattle = resourceDemandUnit.WATER.LARGE_CATTLE;
  const constantSmallCattle = resourceDemandUnit.WATER.SMALL_CATTLE;
  const constantPoultry = resourceDemandUnit.WATER.POULTRY;
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
export const generateDomesticEnergyDemand = (
  data: number[],
  resourceDemandUnit: typeof RESOURCE_DEMAND_UNIT,
) => {
  if (!resourceDemandUnit?.ENERGY) return data.map(() => 0);
  const constant = resourceDemandUnit.ENERGY.DOMESTIC_DEMAND;
  const result = constantMultiply(data, constant);

  return result.map((data) => data / 1000000);
};

export const generateIndustrialEnergyDemand = (
  data: number[],
  resourceDemandUnit: typeof RESOURCE_DEMAND_UNIT,
) => {
  if (!resourceDemandUnit?.ENERGY) return data.map(() => 0);
  const constant = resourceDemandUnit.ENERGY.INDUSTRIAL_ENERGY_INTENSITY;
  const result = constantMultiply(data, constant);

  return result.map((data) => data / 1000000);
};

export const generateAgricultureEnergyDemand = (
  data: number[],
  resourceDemandUnit: typeof RESOURCE_DEMAND_UNIT,
) => {
  if (!resourceDemandUnit?.ENERGY) return data.map(() => 0);
  const constant = resourceDemandUnit.ENERGY.AGRICULTURE_ENERGY_INTENSITY;
  const result = constantMultiply(data, constant);

  return result.map((data) => data / 1000000);
};

export const generateWaterGenerationEnergyDemand = (
  data: number[],
  resourceDemandUnit: typeof RESOURCE_DEMAND_UNIT,
) => {
  if (!resourceDemandUnit?.ENERGY) return data.map(() => 0);
  const constant = resourceDemandUnit.ENERGY.ENERGY_FOR_WATER;
  const result = constantMultiply(data, constant);

  return result.map((data) => data / 1000000);
};

// FOOD DEMAND
export const generateFoodDemand = (
  data: number[],
  resourceDemandUnit: typeof RESOURCE_DEMAND_UNIT,
) => {
  if (!resourceDemandUnit?.FOOD) return data.map(() => 0);
  const constantStaple = resourceDemandUnit.FOOD.STAPLE_PER_CAPITA;
  const constantNonStaple =
    resourceDemandUnit.FOOD.PERCENTAGE_NON_STAPLE_DEMAND;

  return data.map(
    (data) => (data * constantStaple * (1 + constantNonStaple)) / 1000,
  );
};

export const generateDomesticFoodDemand = (
  data: number[],
  resourceDemandUnit: typeof RESOURCE_DEMAND_UNIT,
) => {
  if (!resourceDemandUnit?.FOOD) return data.map(() => 0);
  const constantStaple = resourceDemandUnit.FOOD.STAPLE_PER_CAPITA;
  return data.map((data) => (data * constantStaple) / 1000);
};

// LAND COVER
const generateIndustrialLand = (
  data: number[],
  finalYear: number,
  initialData: typeof INITIAL_DATA_CONSTANT,
) => {
  const constanta = initialData.LAND_COVER.INDUSTRIAL_LAND;
  const growth = constanta + 1;
  return Computation.projection({ data, growth, finalYear });
};

const generateHousingLand = (
  data: number[],
  finalYear: number,
  initialData: typeof INITIAL_DATA_CONSTANT,
) => {
  const constanta = initialData.LAND_COVER.HOUSING_LAND;
  const growth = constanta + 1;
  return Computation.projection({ data, growth, finalYear });
};

const generateForestArea = (
  data: number[],
  finalYear: number,
  initialData: typeof INITIAL_DATA_CONSTANT,
) => {
  const constanta = initialData.LAND_COVER.FOREST_AREA;
  const growth = constanta + 1;
  return Computation.projection({ data, growth, finalYear });
};

const generateAgriculturetArea = (
  data: number[],
  finalYear: number,
  initialData: typeof INITIAL_DATA_CONSTANT,
) => {
  const constanta = initialData.LAND_COVER.AGRICULTURE_AREA;
  const growth = 1 - constanta;
  return Computation.projection({ data, growth, finalYear });
};

//  LAND PORTION
const generateLandPortion = (data: number[], availableLand: number[]) => {
  return Computation.computeArrays(
    Computation.ARRAY_OPERATION_TYPES.DIVIDED,
    data,
    availableLand,
  );
};

// AP AREA
// value bu user input in year 2030 , 2040 , 2045
export const getPinPoint = (
  year: number,
  input: number,
  dataAgriculture?: (number | null)[],
) => {
  const initYear = 2010;
  const index = year - initYear;
  return {
    year,
    value: dataAgriculture
      ? (Number(dataAgriculture[index] ?? 0) * input) / 100
      : input,
  };
};

interface data {
  year: number;
  value: number;
}

// interface IApGrowth {
//   data: data[];
// }

type IApGrowth = data[];

interface GrowthResult {
  year: number;
  growth: number;
}

// growthrate for 2025-2029, 2030-2039, 2040-2045
export const getApAreaGrowth = (data: IApGrowth): GrowthResult[] => {
  const results: GrowthResult[] = [];

  const getValueByYear = (year: number): number | undefined => {
    return data.find((item) => item.year === year)?.value;
  };

  const calculateCAGR = (
    endValue: number,
    startValue: number,
    years: number,
  ): number => {
    if (startValue === 0 || years === 0) return 0;
    return Math.pow(endValue / startValue, 1 / years) - 1;
  };

  const value2030 = getValueByYear(2030);
  const value2040 = getValueByYear(2040);
  const value2045 = getValueByYear(2045);

  if (value2030 !== undefined) {
    results.push({
      year: 2025,
      growth: value2030 / 6,
    });
  }

  if (value2030 !== undefined && value2040 !== undefined) {
    results.push({
      year: 2030,
      growth: calculateCAGR(value2040, value2030, 10),
    });
  }

  if (value2040 !== undefined && value2045 !== undefined) {
    results.push({
      year: 2040,
      growth: calculateCAGR(value2045, value2040, 5),
    });
  }

  return results;
};

// projection for each pin point of year
export const generateApArea = (
  data: (number | null)[],
  finalYear: number,
  pinPoint: { value: number; year: number },
  growth: GrowthResult[],
  // lastYearResult?: number,
  initialYear: number = 2010,
) => {
  const result: (number | null)[] = [];
  if (data.length == 0) return result;
  result.push(...data.map((val) => val ?? 0));
  let lastYear = initialYear + result.length - 1;
  if (finalYear === 2030) {
    const growth2025 = growth.filter((g) => g.year === 2025)[0].growth;
    result.push(growth2025);
    while (lastYear < finalYear - 1) {
      lastYear += 1;
      const lastValue = result[result.length - 1] ?? 0;
      const nexValue = lastValue + growth2025;
      result.push(nexValue ?? 0);
    }
    return result;
  }
  // if (finalYear === 2040) {
  //   const growth2025 = growth.filter((g) => g.year === 2030)[0].growth;
  //   result.push(growth2025);
  //   while (lastYear < finalYear - 1) {
  //     lastYear += 1;
  //     const lastValue = result[result.length - 1] ?? 0;
  //     const nexValue = lastValue + growth2025;
  //     result.push(nexValue ?? 0);
  //   }
  //   return result;
  // }
  const growthRate = growth.filter((g) => g.year === finalYear)[0]?.growth;

  const projection = dataProjection(
    result.map((val) => val ?? 0),
    growthRate,
    finalYear,
  );

  return projection;
};
// export const generateApArea = (
//   data: (number | null)[],
//   finalYear: number,
//   pinPoint: { value: number; year: number },
//   growth: GrowthResult[],
//   initialYear: number = 2010,
// ) => {
//   const result: number[] = [];
//   if (data.length === 0) return result;
//   result.push(...data.map((val) => val ?? 0));

//   let lastYear = initialYear + result.length - 1;

//   if (finalYear === 2029) {
//     const growth2025 = growth.find((g) => g.year === 2025)?.growth ?? 0;

//     result.push(growth2025);

//     while (lastYear < finalYear - 1) {
//       lastYear += 1;
//       const lastValue = result[result.length - 1] ?? 0;
//       const nextValue = lastValue + growth2025;
//       result.push(Number.isFinite(nextValue) ? nextValue : 0);
//     }

//     return result;
//   }
//   result.push(pinPoint?.value ?? 0);
//   const growthRate = growth.find((g) => g.year === finalYear)?.growth ?? 0;

//   const projection = dataProjection(
//     result.map((val) => (Number.isFinite(val) ? val : 0)),
//     growthRate,
//     finalYear,
//   );

//   return projection.map((val) => (Number.isFinite(val) ? val : 0));
// };

export const generateCValue = (
  dataIndustrial: number[],
  dataHousing: number[],
  dataForest: number[],
  dataAgriculture: number[],
  resourceDemandUnit: typeof RESOURCE_DEMAND_UNIT,
) => {
  const result = [];
  for (let i = 0; i < dataAgriculture.length; i++) {
    const value =
      (dataIndustrial[i] ?? 0) * resourceDemandUnit.C_AREA.INDUSTRIAL_LAND +
      (dataHousing[i] ?? 0) * resourceDemandUnit.C_AREA.HOUSING_LAND +
      (dataForest[i] ?? 0) * resourceDemandUnit.C_AREA.FOREST_AREA +
      (dataAgriculture[i] ?? 0) * resourceDemandUnit.C_AREA.AGRICULTURE_AREA;
    result.push(value);
  }

  return result;
};

export const generatePotentialWater = (
  data: number[],
  initialData: typeof INITIAL_DATA_CONSTANT,
) => {
  return constantMultiply(data, initialData.WATER.POTENTIAL_WATER_FACTOR);
};

export const generateTotalWater = (
  dataWaterSupply: number[],
  dataApWaterIndustrial: number[],
  dataApWaterHousing: number[],
  initialData: typeof INITIAL_DATA_CONSTANT,
) => {
  return sumData(
    constantAdd(dataWaterSupply, initialData.WATER.BASE_WATER_SUPPLY),
    sumData(dataApWaterIndustrial, dataApWaterHousing),
  );
};

export const generateApWater = (
  data: number[],
  initialData: typeof INITIAL_DATA_CONSTANT,
) => {
  return constantMultiply(data, initialData.WATER.AP_WATER_FACTOR);
};

export const generateEnergySupply = (
  dataTotalEnergyDemand: number[],
  dataAvailabilityFactor: number[],
) => {
  const result = [];
  for (let i = 0; i < dataTotalEnergyDemand.length; i++) {
    result.push(dataTotalEnergyDemand[i] * dataAvailabilityFactor[i]);
  }
  return result;
};
