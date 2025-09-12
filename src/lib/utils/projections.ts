import { IApiData, IBaselineData, Params } from "@/lib/types/response";
import { average, Computation, growthRate } from "@/lib/utils/formulas";
import {
  BaselinePayload,
  SimulationState,
} from "@/stores/slicers/dssInputSlicer";
import { INITIAL_DATA_CONSTANT } from "../constant/initialData.constant";
import { RESOURCE_DEMAND_UNIT } from "../constant/resourceDemandUnit.constant";

export const nameToStatePathMap: Record<string, string> = {
  // parameter name : input id
  "A.Pertanian, Kehutanan, dan Perikanan": "agriculture.growthScenario",
  "C.Industri Pengolahan": "industry.growth",
  "Lahan Panen Padi": "agriculture.landConversion",
  "area perikanan": "agriculture.aquacultureLandGrowth",
  total: "demography.populationGrowth",
  "ternak sapi": "livestock.cattleGrowth",
  "ternak kambing": "livestock.goatGrowth",
  "ternak ayam": "livestock.poultryGrowth",
  "AP Area Industrial": "water.artificialPondIndustrial",
  "AP Area Housing": "water.artificialPondHousing",
};

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
      } else {
        const cleanValues = param.values.map((v) => v ?? 0);
        payload[statePath] = average(growthRate(cleanValues)) * 100;
      }
    }
  }
  return payload;
};

const getInputsByName = (name: string, simulationState: SimulationState) => {
  switch (name) {
    case "A.Pertanian, Kehutanan, dan Perikanan":
      return simulationState.agriculture.growthScenario;
    case "C.Industri Pengolahan":
      return simulationState.industry.growth;
    case "Lahan Panen Padi":
      return simulationState.agriculture.landConversion;
    case "total":
      return simulationState.demography.populationGrowth;
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

// export const generateFoodDemandWithInput = (
//   foodDemand: number[],

// );

export const generateApAreaIndustrial = () => {
  return Array.from({ length: 15 }, () => 0);
};

export const generateApAreaHousing = () => {
  return Array.from({ length: 15 }, () => 0);
};

export const generateAvailabillityPerPerson = (
  populations: number[],
  localFoods: number[],
): number[] => {
  if (
    !Array.isArray(populations) ||
    !Array.isArray(localFoods) ||
    populations.length !== localFoods.length
  ) {
    return [];
  }

  const availabilityPerPerson: number[] = [];

  for (let i = 0; i < populations.length; i++) {
    const population = populations[i];
    const localFood = localFoods[i];

    if (
      typeof population === "number" &&
      typeof localFood === "number" &&
      population > 0
    ) {
      const availability = (localFood / population) * 1000;
      availabilityPerPerson.push(availability);
    } else {
      availabilityPerPerson.push(0);
    }
  }

  return availabilityPerPerson;
};

export const generateLocalFoodProductionYear = (
  lahanPanenPadi: Params,
): number[] | [] => {
  if (!lahanPanenPadi || !Array.isArray(lahanPanenPadi.values)) {
    return [];
  }

  const productionValues: number[] = [];
  const years: number[] = [];

  const startYear = 2010;

  for (let i = 0; i < lahanPanenPadi.values.length; i++) {
    const historicalValue = lahanPanenPadi.values[i];

    if (typeof historicalValue === "number") {
      const production =
        historicalValue *
        RESOURCE_DEMAND_UNIT.FOOD.PRODUCTIVTY_PADDY_YEAR *
        RESOURCE_DEMAND_UNIT.FOOD.RASIO_SUSUT_BERAS;
      productionValues.push(production);

      years.push(startYear + i);
    } else {
      productionValues.push(0);
      years.push(startYear + i);
    }
  }

  return productionValues ?? [];
};

export const generateScenarioProjection = (
  historicalData: IApiData,
  simulationState: SimulationState,
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
      .slice(0, 16);

    const scenarioInputs = getInputsByName(name, simulationState);
    const averageGrowth = average(growthRate(cleanDataSeries));

    let finalProjectedData: number[];
    if (scenarioInputs) {
      const projectionStage1 = Computation.projection({
        data: cleanDataSeries,
        growth: averageGrowth,
        finalYear: 2024,
      });

      const projectionStage2 = Computation.projection({
        data: projectionStage1,
        growth: scenarioInputs["2025-2030"] ?? averageGrowth,
        finalYear: 2030,
      });

      const projectionStage3 = Computation.projection({
        data: projectionStage2,
        growth: scenarioInputs["2031-2040"] ?? averageGrowth,
        finalYear: 2040,
      });

      finalProjectedData = Computation.projection({
        data: projectionStage3,
        growth: scenarioInputs["2041-2045"] ?? averageGrowth,
        finalYear: 2045,
      });
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
      growth: cleanDataSeries,
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

export const generateLandCover = (
  startYear: number,
  endYear: number,
): IApiData => {
  const {
    INDUSTRIAL_LAND,
    HOUSING_LAND,
    FOREST_AREA,
    AGRICULTURE_AREA,
    AVAILABLE_LAND,
  } = INITIAL_DATA_CONSTANT.LAND_COVER;

  const { LAND_COVER_CHANGES } = RESOURCE_DEMAND_UNIT;

  let industrial = INDUSTRIAL_LAND;
  let housing = HOUSING_LAND;
  let forest = FOREST_AREA;
  let agriculture = AGRICULTURE_AREA;

  const industrialValues: number[] = [];
  const housingValues: number[] = [];
  const forestValues: number[] = [];
  const agricultureValues: number[] = [];
  const otherValues: number[] = [];
  const availableValues: number[] = [];
  const years: number[] = [];

  for (let year = startYear; year <= endYear; year++) {
    const other =
      AVAILABLE_LAND - (industrial + housing + forest + agriculture);

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
    years: years,
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
  inputs: SimulationState,
) => {
  return {
    gdrp: generateScenarioProjection(allBaselines.gdp, inputs),
    population: generateScenarioProjection(allBaselines.population, inputs),
    agriculture: generateScenarioProjection(allBaselines.agriculture, inputs),
    landCover: generateScenarioProjection(allBaselines.landCover, inputs),
  };
};
