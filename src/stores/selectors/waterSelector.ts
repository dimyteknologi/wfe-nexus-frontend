import {
  selectResourceScenarioProjection,
  selectResourceScenarioProjectionA,
  selectResourceScenarioProjectionB,
  selectResourceScenarioProjectionBaseline,
  selectApAreaHousingProjection,
  selectApAreaHousingProjectionA,
  selectApAreaHousingProjectionB,
  selectApAreaHousingProjectionBaseline,
  selectApAreaIndustrialProjection,
  selectApAreaIndustrialProjectionA,
  selectApAreaIndustrialProjectionB,
  selectApAreaIndustrialProjectionBaseline,
} from "@/stores/selectors/scenarioProjectionSelector";
import { selectResourceBaseline } from "@/stores/selectors/baseSelector";
import { selectPopulationDataComparison } from "@/stores/selectors/socioEconomySelector";
import { selectWaterDemandBaseline } from "@/stores/selectors/baseSelector";
import { createSelector } from "@reduxjs/toolkit";
import { IBaselineData } from "@/lib/types/response";
import { constantAdd, resultConverter, sumData } from "@/lib/utils/formulas";

const calculateApWater = (projection: number[] | null) => {
  if (!projection) return [];
  return projection.map((item) => item * 1500 * 2);
};

const calculateTotalSupply = (
  ApWaterIndustrial: number[],
  ApWaterHousing: number[],
  ResourceBaseline: IBaselineData | null,
) => {
  if (!ResourceBaseline) return [];

  const potentialWaterSupply = ResourceBaseline.parameters.find(
    (param) => param.name === "Potential Water Supply",
  );
  if (!potentialWaterSupply) return [];
  if (!potentialWaterSupply.values) return [];

  const safeValues = potentialWaterSupply.values.map((val) => val ?? 0);

  return safeValues.map((val, i) => {
    return (
      val + 36528322 + 61508750 + (ApWaterHousing[i] + ApWaterIndustrial[i])
    );
  });
};

const calculateAnnualWaterSupply = (totalWaterSupply: number[]) => {
  if (!Array.isArray(totalWaterSupply) && totalWaterSupply.length)
    return Array(36).fill(0);

  // const safeValues = totalWaterSupply.map((val) => val ? val / 1000000 : 0);
  return resultConverter(totalWaterSupply);
};

const calculateLocalWaterSuffiency = (
  projection: number[],
  waterDemand: IBaselineData | null,
): number[] => {
  if (!projection) return [];

  const totalWaterDemand = waterDemand?.parameters.find(
    (param) => param.name === "Total Water Demand",
  );

  if (!totalWaterDemand) return [];
  if (!totalWaterDemand?.values) return [];

  const safeValues = totalWaterDemand.values.map((val) => val ?? 0);

  return resultConverter(
    safeValues.map((val, i) => {
      const denominator = projection[i] ?? 0;
      return denominator !== 0 ? (val / denominator) * 100 : 0;
    }),
  );
};

const calculateWaterAvailability = (
  projection: number[],
  population: number[],
): number[] => {
  if (!projection) return [];

  const safeValues = projection.map((val) => val ?? 0);

  return resultConverter(
    safeValues.map((val, i) => {
      const denominator = population[i] ?? 0;
      return denominator !== 0 ? val / denominator : 0;
    }),
  );
};

export const ApWaterIndustrialComparison = createSelector(
  [
    selectApAreaIndustrialProjection,
    selectApAreaIndustrialProjectionA,
    selectApAreaIndustrialProjectionB,
    selectApAreaIndustrialProjectionBaseline,
  ],
  (projActive, projA, projB, baseline) => {
    return {
      active: calculateApWater(projActive),
      baseline: calculateApWater(baseline),
      scenarioA: calculateApWater(projA),
      scenarioB: calculateApWater(projB),
    };
  },
);

export const ApWaterHousingComparison = createSelector(
  [
    selectApAreaHousingProjection,
    selectApAreaHousingProjectionA,
    selectApAreaHousingProjectionB,
    selectApAreaHousingProjectionBaseline,
  ],
  (projActive, projA, projB, baseline) => {
    return {
      active: calculateApWater(projActive),
      baseline: calculateApWater(baseline),
      scenarioA: calculateApWater(projA),
      scenarioB: calculateApWater(projB),
    };
  },
);

export const totalWaterSupplyComparsion = createSelector(
  [
    ApWaterHousingComparison,
    ApWaterIndustrialComparison,
    selectResourceScenarioProjection,
    selectResourceScenarioProjectionA,
    selectResourceScenarioProjectionB,
    selectResourceScenarioProjectionBaseline,
    selectApAreaHousingProjection,
    selectApAreaIndustrialProjection,
  ],
  (housing, industrial, projActive, projA, projB, baseline) => {
    return {
      active: calculateTotalSupply(
        housing.active,
        industrial.active,
        projActive,
      ),
      baseline: calculateTotalSupply(
        housing.baseline,
        industrial.baseline,
        baseline,
      ),
      scenarioA: calculateTotalSupply(
        housing.scenarioA,
        industrial.scenarioA,
        projA,
      ),
      scenarioB: calculateTotalSupply(
        housing.scenarioB,
        industrial.scenarioB,
        projB,
      ),
    };
  },
);

export const AnnualWaterSupplyComparison = createSelector(
  [totalWaterSupplyComparsion],
  (totalWater) => {
    return {
      active: calculateAnnualWaterSupply(totalWater.active),
      baseline: calculateAnnualWaterSupply(totalWater.baseline),
      scenarioA: calculateAnnualWaterSupply(totalWater.scenarioA),
      scenarioB: calculateAnnualWaterSupply(totalWater.scenarioB),
    };
  },
);

export const LocalWaterSuffiencyComparison = createSelector(
  [totalWaterSupplyComparsion, selectWaterDemandBaseline],
  (totalWater, waterDemand) => {
    return {
      active: calculateLocalWaterSuffiency(totalWater.active, waterDemand),
      baseline: calculateLocalWaterSuffiency(totalWater.baseline, waterDemand),
      scenarioA: calculateLocalWaterSuffiency(
        totalWater.scenarioA,
        waterDemand,
      ),
      scenarioB: calculateLocalWaterSuffiency(
        totalWater.scenarioB,
        waterDemand,
      ),
    };
  },
);

export const WaterAvailabilityPerPerson = createSelector(
  [totalWaterSupplyComparsion, selectPopulationDataComparison],
  (totalWater, population) => {
    return {
      active: calculateWaterAvailability(totalWater.active, population.active),
      baseline: calculateWaterAvailability(
        totalWater.baseline,
        population.baseline,
      ),
      scenarioA: calculateWaterAvailability(
        totalWater.scenarioA,
        population.scenarioA,
      ),
      scenarioB: calculateWaterAvailability(
        totalWater.scenarioB,
        population.scenarioB,
      ),
    };
  },
);
