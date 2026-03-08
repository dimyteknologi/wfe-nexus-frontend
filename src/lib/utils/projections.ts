import { IApiData, IBaselineData, Params } from "@/lib/types/response";
import {
  average,
  Computation,
  constantMultiply,
  growthRate,
  resultConverter,
  sumData,
} from "@/lib/utils/formulas";
import {
  // BaselinePayload,
  SiteSpecificState,
  // TimePeriod,
} from "@/stores/slicers/siteSpecificInputSlicer";
import { BaselinePayload } from "../constant/inputType.constant";
import { INITIAL_DATA_CONSTANT } from "../constant/initialData.constant";
import { RESOURCE_DEMAND_UNIT } from "../constant/resourceDemandUnit.constant";
import { getApAreaGrowth, getPinPoint } from "./processingData";

export const nameToStatePathMap: Record<string, string> = {
  // parameter name : input id
  "a.pertanian, kehutanan, dan perikanan": "agriculture.growthScenario",
  "c.industri pengolahan": "industry.growth",
  "Agriculture Area": "agriculture.landConversion",
  "area perikanan": "agriculture.aquacultureLandGrowth",
  "Total Populasi": "demography.populationGrowth",
  "ternak sapi": "livestock.cattleGrowth",
  "ternak kambing": "livestock.goatGrowth",
  "ternak ayam": "livestock.poultryGrowth",
  // "AP Area Industrial": "water.artificialPondIndustrial",
  // "AP Area Housing": "water.artificialPondHousing",
  // "Housing Land": "water.artificialPondIndustrial",
  // "Industrial Land": "water.artificialPondIndustrial",
  // "Domestic Water Demand": "water.domesticWaterDemand",
  // "Industrial Water Demand": "water.industrialWater",
  // "Domestic Energy Demand": "energy.domesticElectricity",
  // "Industrial Energy Demand": "energy.industrialEnergy",
};

interface GrowthResult {
  year: number;
  growth: number;
}

export const extractAverageGrowthRates = (
  parameters: Params[] | null,
): BaselinePayload => {
  const payload: BaselinePayload = {};
  if (!parameters) return payload;
  for (const param of parameters) {
    const statePath = nameToStatePathMap[param.name];
    if (statePath) {
      if (param.average !== undefined) {
        payload[statePath] = param.average;
        if (statePath == "agriculture.landConversion") {
          payload[statePath] = Math.abs(param.average);
        }
      }
    }
  }
  return payload;
};

const getInputsByName = (name: string, simulationState: SiteSpecificState) => {
  switch (name) {
    case "a.pertanian, kehutanan, dan perikanan":
      return simulationState.agriculture.growthScenario;
    case "c.industri pengolahan":
      return simulationState.industry.growth;
    case "Agriculture Area":
      return simulationState.agriculture.landConversion;
    // case "Agriculture Area":
    //   return simulationState.agriculture.area2010;
    case "Total Populasi":
      return simulationState.demography.populationGrowth;
    case "Industrial Land":
      return simulationState.water.artificialPondIndustrial;
    case "Housing Land":
      return simulationState.water.artificialPondHousing;
    case "Solar Pv Area on Industrial":
      return simulationState.energy.solarPvAreaIndustrial;
    case "Solar PV Area Percentage on Housing":
      return simulationState.energy.solarPvAreaHousing;
    default:
      return null;
  }
};

const checkType = (label: string) => {
  if (label === "PDRB") {
    return "Economy";
  }
  if (label === "populasi") {
    return "Population";
  }
  if (label === "area_perikanan_laju_perubahan") {
    return "Fishery";
  }
  if (label === "peternakan_laju_perubahan") {
    return "Livestock";
  }
  if (label === "pertanian_luas") {
    return "Agriculture";
  }
};

export const generateApAreaIndustrial = () => Array(36).fill(0);
export const generateApAreaHousing = () => Array(36).fill(0);
export const generateAvailabilityFactor = () => Array(36).fill(1);

export const generateAvailabillityPerPerson = (
  populations: number[],
  localFoods: number[],
): number[] => {
  if (!Array.isArray(populations) || !Array.isArray(localFoods) || populations.length !== localFoods.length) {
    return [];
  }

  return populations.map((population, i) => {
    const localFood = localFoods[i];
    if (typeof population === "number" && typeof localFood === "number" && population > 0) {
      return (localFood / population) * 1000;
    }
    return 0;
  });
};

export const generateLocalFoodProductionYear = (
  lahanPanenPadi: Params,
): number[] => {
  if (!lahanPanenPadi || !Array.isArray(lahanPanenPadi.values)) {
    return [];
  }

  return lahanPanenPadi.values.map((historicalValue) => {
    if (typeof historicalValue === "number") {
      return (
        historicalValue *
        RESOURCE_DEMAND_UNIT.FOOD.PRODUCTIVTY_PADDY_YEAR *
        RESOURCE_DEMAND_UNIT.FOOD.RASIO_SUSUT_BERAS
      );
    }
    return 0;
  });
};

const convertInput = (
  name: string,
  val: number | null,
  averageGrowth: number,
) => {
  // If user inputs 5% (0.05) Agricultural Land Conversion,
  // Agriculture area needs to shrink by 5% each year.
  if (name === "Agriculture Area") {
    return val !== null ? -Math.abs(val) : averageGrowth;
  }
  if (val !== null) return val;
  return averageGrowth;
};

const buildProjectionStages = (
  name: string,
  initialData: number[],
  averageGrowth: number,
  scenarioInputs: Record<string, number | null>
): number[] => {
  const pStage1 = Computation.projection({
    data: initialData,
    growth: convertInput(name, null, averageGrowth),
    finalYear: 2024,
  });

  const pStage2 = Computation.projection({
    data: pStage1,
    growth: convertInput(name, scenarioInputs?.["2025-2030"] ?? null, averageGrowth),
    finalYear: 2030,
  });

  const pStage3 = Computation.projection({
    data: pStage2,
    growth: convertInput(name, scenarioInputs?.["2031-2040"] ?? null, averageGrowth),
    finalYear: 2040,
  });

  return Computation.projection({
    data: pStage3,
    growth: convertInput(name, scenarioInputs?.["2041-2045"] ?? null, averageGrowth),
    finalYear: 2045,
  });
};

export const generateCValue = (
  dataIndustrial: number[],
  dataHousing: number[],
  dataForest: number[],
  dataAgriculture: number[],
  dataOtherLand: number[],
) => {
  const constantIndustrial = constantMultiply(
    dataIndustrial,
    RESOURCE_DEMAND_UNIT.C_AREA.INDUSTRIAL_LAND,
  );
  const constantHousting = constantMultiply(
    dataHousing,
    RESOURCE_DEMAND_UNIT.C_AREA.HOUSING_LAND,
  );
  const constantForest = constantMultiply(
    dataForest,
    RESOURCE_DEMAND_UNIT.C_AREA.FOREST_AREA,
  );
  const constantAgriculture = constantMultiply(
    dataAgriculture,
    RESOURCE_DEMAND_UNIT.C_AREA.AGRICULTURE_AREA,
  );
  const constantOtherLand = constantMultiply(
    dataOtherLand,
    RESOURCE_DEMAND_UNIT.C_AREA.OTHER_AREA,
  );

  return sumData(
    constantAgriculture,
    constantOtherLand,
    constantForest,
    constantIndustrial,
    constantHousting,
  );
};

export const transformPeriodInputs = (
  periods: { [key: string]: number | null },
  avg: number,
) => {
  const p2030 = Number(periods["2025-2030"] == 0 ? avg : periods?.["2025-2030"]);
  const p2040 = Number(periods["2031-2040"] == 0 ? avg : periods?.["2025-2040"]);
  const p2045 = Number(periods["2041-2045"] == 0 ? avg : periods?.["2025-2045"]);

  const calculateGrowth = (current: number, previous: number, yearSpan: number) => {
    if (previous <= 0 || current <= 0) return avg;
    return (current / previous) ** (1 / yearSpan) - 1;
  };

  const objData = {
    "2025-2030": calculateGrowth(p2030, avg, 5),
    "2031-2040": calculateGrowth(p2040, p2030, 10),
    "2041-2045": calculateGrowth(p2045, p2040, 5),
  };

  const values = Object.values(objData);
  const sum = values.reduce((acc, curr) => acc + curr, 0);
  return isNaN(sum / values.length) ? avg : sum / values.length;
};

export const generateLahanPanenPadi = (
  data: IApiData | null,
  simulationState: SiteSpecificState,
  finalYear: 2045
) => {
  if (
    !data ||
    !simulationState ||
    !Array.isArray(data.parameters)
  ) {
    return null;
  }

  const projectedParameters: Params[] = [];
  const initialYear = data.years[0];
  const agricultureArea = data.parameters.find((item) => item.name === 'Agriculture Area')?.values ?? Array(16).fill(0);

  const cleanDataSeries = agricultureArea
    .map((val) => val ?? 0);

  const averageGrowth = average(growthRate(cleanDataSeries)) * -1;
  const finalProjectedData: number[] = [];

  // Lahan Panen Padi depends on Agriculture Area
  // Step 1: Project Agricultural Area
  const landConversionInput = simulationState?.agriculture?.landConversion;
  const finalAgricultureArea = buildProjectionStages(
    "Agriculture Area",
    cleanDataSeries,
    averageGrowth,
    landConversionInput
  );

  // Step 2: Multiply by Cropping Intensity per period
  const defaultIntensity = 1.95;
  const intensityInputs = simulationState?.agriculture?.croppingIntensity;

  for (let i = 0; i < finalAgricultureArea.length; i++) {
    const year = 2010 + i;
    const area = finalAgricultureArea[i];

    let intensity = defaultIntensity;

    if (intensityInputs) {
      if (year >= 2025 && year <= 2030 && intensityInputs["2025-2030"] !== null) {
        intensity = intensityInputs["2025-2030"];
      } else if (year >= 2031 && year <= 2040 && intensityInputs["2031-2040"] !== null) {
        intensity = intensityInputs["2031-2040"];
      } else if (year >= 2041 && year <= 2045 && intensityInputs["2041-2045"] !== null) {
        intensity = intensityInputs["2041-2045"];
      }
    }

    finalProjectedData.push(area * intensity);
  }

  projectedParameters.push({
    name: 'Lahan Panen Padi',
    average: averageGrowth,
    growth: growthRate(cleanDataSeries),
    values: finalProjectedData,
  });

  const projectedYears = Computation.adjustTimeFrame({
    dataYear: data.years,
    finalYear: finalYear,
    initialYear,
  });

  return {
    label: simulationState.simulationName || "Baseline",
    unit: data.unit,
    years: projectedYears,
    parameters: projectedParameters,
  };
}

export const generateLandCover = (
  startYear: number,
  endYear: number,
  inputs: SiteSpecificState | null,
): IApiData => {
  const { INDUSTRIAL_LAND, HOUSING_LAND, FOREST_AREA, AVAILABLE_LAND, AGRICULTURE_AREA } =
    INITIAL_DATA_CONSTANT.LAND_COVER;

  const { LAND_COVER_CHANGES } = RESOURCE_DEMAND_UNIT;

  let industrial = INDUSTRIAL_LAND;
  let housing = HOUSING_LAND;
  let forest = FOREST_AREA;
  let agriculture = Number(inputs?.agriculture?.area2010["2025-2030"] || AGRICULTURE_AREA);

  const length = endYear - startYear + 1;

  const industrialValues: number[] = [];
  const housingValues: number[] = [];
  const forestValues: number[] = [];
  const agricultureValues: number[] = [];
  const otherValues: number[] = [];
  const availableValues: number[] = [];
  const years: number[] = [];

  for (let i = 0; i < length; i++) {
    const year = startYear + i;
    const other = AVAILABLE_LAND - (industrial + housing + forest + agriculture);

    industrialValues.push(Math.round(industrial));
    housingValues.push(Math.round(housing));
    forestValues.push(Math.round(forest));
    agricultureValues.push(Math.round(agriculture));
    otherValues.push(Math.round(other));
    availableValues.push(Math.round(AVAILABLE_LAND));
    years.push(year);

    industrial *= 1 + LAND_COVER_CHANGES.INDUSTRIAL_LAND;
    housing *= 1 + LAND_COVER_CHANGES.HOUSING_LAND;
    forest *= 1 + LAND_COVER_CHANGES.FOREST_LAND;
    agriculture *= 1 - LAND_COVER_CHANGES.AGRICULTURE_AREA;
  }

  return {
    label: "Land Cover",
    unit: "[ha]",
    years,
    parameters: [
      { name: "Industrial Land", values: industrialValues },
      { name: "Housing Land", values: housingValues },
      { name: "Forest Area", values: forestValues },
      { name: "Agriculture Area", values: agricultureValues },
      { name: "Other Land", values: otherValues },
      { name: "Available Land", values: availableValues },
    ],
  };
};

export const generateLandPortion = (landCoverData: IApiData): IApiData => {
  const { years, parameters } = landCoverData;

  const getValues = (name: string): number[] =>
    (parameters.find((p) => p.name === name)?.values ?? []).map((v) => v ?? 0);

  const industrialValues = getValues("Industrial Land");
  const housingValues = getValues("Housing Land");
  const forestValues = getValues("Forest Area");
  const agricultureValues = getValues("Agriculture Area");
  const otherValues = getValues("Other Land");
  const availableValues = getValues("Available Land");

  const industrialPortion: number[] = [];
  const housingPortion: number[] = [];
  const forestPortion: number[] = [];
  const agriculturePortion: number[] = [];
  const otherPortion: number[] = [];
  const availablePortion: number[] = [];

  years.forEach((_, i) => {
    const total = availableValues[i] ?? 0;

    if (!total) {
      industrialPortion.push(0);
      housingPortion.push(0);
      forestPortion.push(0);
      agriculturePortion.push(0);
      otherPortion.push(0);
      availablePortion.push(0);
      return;
    }

    const industrialVal = industrialValues[i] ?? 0;
    const housingVal = housingValues[i] ?? 0;
    const forestVal = forestValues[i] ?? 0;
    const agricultureVal = agricultureValues[i] ?? 0;
    const otherVal = otherValues[i] ?? 0;

    const toPercent = (val: number, total: number) =>
      Math.round((val / total) * 100) / 100;

    industrialPortion.push(toPercent(industrialVal, total));
    housingPortion.push(toPercent(housingVal, total));
    forestPortion.push(toPercent(forestVal, total));
    agriculturePortion.push(toPercent(agricultureVal, total));
    otherPortion.push(toPercent(otherVal, total));
    availablePortion.push(1.0); // selalu 100% dari total
  });

  return {
    label: "Land Portion",
    unit: "%",
    years,
    parameters: [
      { name: "Industrial Land", values: industrialPortion },
      { name: "Housing Land", values: housingPortion },
      { name: "Forest Area", values: forestPortion },
      { name: "Agriculture Area", values: agriculturePortion },
      { name: "Other Land", values: otherPortion },
      { name: "Available Land", values: availablePortion },
    ],
  };
};

export const generateBaseline = (
  baseData: IApiData | null,
  finalYear: number = 2045,
): IBaselineData | null => {
  if (!baseData || !baseData.parameters || !Array.isArray(baseData.years)) {
    return null;
  }

  const projectedParameters: Params[] = [];
  const initialYear = baseData.years[0];

  for (const param of baseData.parameters) {
    const cleanDataSeries = param.values.map((val) => val ?? 0);
    const growthRates = growthRate(cleanDataSeries);

    const averageGrowth = average(growthRates);
    const projectedData = Computation.projection({
      data: cleanDataSeries,
      growth: averageGrowth,
      finalYear: finalYear,
    });
    // push result to baseline parameters data
    projectedParameters.push({
      name: param.name,
      values: projectedData,
      average: averageGrowth,
      growth: growthRates,
    });
  }

  const projectedYears = Computation.adjustTimeFrame({
    dataYear: baseData.years,
    finalYear: finalYear,
    initialYear: initialYear,
  });
  // return baseline data
  return {
    label: `${baseData.label} (${checkType(baseData.label)} Baseline)`,
    unit: baseData.unit,
    years: projectedYears,
    parameters: projectedParameters,
  };
};

export const generateAllProjectionsForScenario = (
  allBaselines: {
    gdp: IBaselineData;
    population: IBaselineData;
    agriculture: IBaselineData;
    landCover: IBaselineData;
  },
  inputs: SiteSpecificState,
) => {
  return {
    gdrp: generateScenarioProjection(allBaselines.gdp, inputs),
    population: generateScenarioProjection(allBaselines.population, inputs),
    agriculture: generateScenarioProjection(allBaselines.agriculture, inputs),
    landCover: generateScenarioProjection(allBaselines.landCover, inputs),
  };
};

const generateApArea = (
  data: number[],
  growthResults: GrowthResult[],
  startYear: number,
  finalYear: number,
) => {
  const result: number[] = [...data];
  const lastHistoricalYear = startYear + data.length - 1;

  const growth2025 = growthResults.find((g) => g.year === 2025)?.growth ?? 0;
  const growth2030 = growthResults.find((g) => g.year === 2030)?.growth ?? 0;
  const growth2040 = growthResults.find((g) => g.year === 2040)?.growth ?? 0;

  for (let year = lastHistoricalYear + 1; year <= finalYear; year++) {
    const lastValue = result[result.length - 1];
    let nextValue = lastValue;

    if (year >= 2025 && year <= 2030) {
      nextValue = lastValue + growth2025;
    } else if (year >= 2031 && year <= 2040) {
      nextValue = lastValue * (1 + growth2030);
    } else if (year >= 2041 && year <= 2045) {
      nextValue = lastValue * (1 + growth2040);
    }
    result.push(nextValue);
  }
  return result;
};

export const generateAreaProjection = (
  name: string,
  inputs: SiteSpecificState | null,
  values?: (number | null)[],
  startYear: number = 2010,
  finalYear: number = 2045,
): number[] => {
  if (!name || !inputs) return [];

  const scenarioInputs = getInputsByName(name, inputs);

  if (!scenarioInputs) return Array(36).fill(0);

  const rawPinpoints: { year: number; key: keyof typeof scenarioInputs }[] = [
    { year: 2030, key: "2025-2030" },
    { year: 2040, key: "2031-2040" },
    { year: 2045, key: "2041-2045" },
  ];

  const pinpoints = rawPinpoints
    .map(({ year, key }) => ({
      year,
      value: Number(scenarioInputs[key] ?? 0),
    }))
    .filter((p) => Number.isFinite(p.value));

  if (pinpoints.length === 0) return Array(36).fill(0);

  const computedPinpoints = pinpoints.map((p) => getPinPoint(p.year, p.value, values));

  const growths = getApAreaGrowth(computedPinpoints);

  const projections = generateApArea(
    Array(15).fill(0),
    growths,
    startYear,
    finalYear,
  );

  return resultConverter(projections);
};

export const generateScenarioProjection = (
  historicalData: IApiData,
  simulationState: SiteSpecificState,
  finalYear = 2045,
): IBaselineData | null => {
  if (
    !historicalData ||
    !simulationState ||
    !Array.isArray(historicalData.parameters)
  ) {
    return null;
  }

  const projectedParameters: Params[] = [];
  const initialYear = historicalData.years[0];

  for (const param of historicalData.parameters) {
    const { name, values: originalDataSeries } = param;
    const cleanDataSeries = originalDataSeries
      .map((val) => val ?? 0)
      .slice(0, 15);

    const averageGrowth = average(growthRate(cleanDataSeries));
    const scenarioInputs = getInputsByName(name, simulationState);

    let finalProjectedData: number[];
    if (scenarioInputs) {
      finalProjectedData = buildProjectionStages(
        param.name,
        cleanDataSeries,
        averageGrowth,
        scenarioInputs
      );
    } else {
      finalProjectedData = Computation.projection({
        data: cleanDataSeries,
        growth: averageGrowth,
        finalYear,
      });
    }

    projectedParameters.push({
      name,
      average: averageGrowth,
      growth: growthRate(cleanDataSeries),
      values: finalProjectedData,
    });
  }

  const projectedYears = Computation.adjustTimeFrame({
    dataYear: historicalData.years,
    finalYear: finalYear,
    initialYear,
  });

  return {
    label: simulationState.simulationName || "Baseline",
    unit: historicalData.unit,
    years: projectedYears,
    parameters: projectedParameters,
  };
};