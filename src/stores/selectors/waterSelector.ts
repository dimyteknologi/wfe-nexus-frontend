import {
  selectResourceScenarioProjection,
  selectResourceScenarioProjectionA,
  selectResourceScenarioProjectionB,
  selectResourceScenarioProjectionBaseline,
} from "@/stores/selectors/scenarioProjectionSelector";
import { selectResourceBaseline } from "@/stores/selectors/baseSelector";
import { selectPopulationDataComparison } from "@/stores/selectors/socioEconomySelector";
import { selectWaterDemandBaseline } from "@/stores/selectors/baseSelector";
import { createSelector } from "@reduxjs/toolkit";
import { IBaselineData } from "@/lib/types/response";

const calculateAnnualWater = (projection: IBaselineData | null): number[] => {
  if (!projection) return [];
  const totalWater = projection.parameters.find(
    (param) => param.name === "Total Water Supply",
  );
  if (!totalWater) return [];
  if (!totalWater?.values) return [];

  const safeValues = totalWater.values.map((val) => val ?? 0);

  return safeValues.map((val, i) => val / 1000000);
};

const calculateWaterAvailability = (
  projection: IBaselineData | null,
  population: number[],
): number[] => {
  if (!projection) return [];
  const totalWater = projection.parameters.find(
    (param) => param.name === "Total Water Supply",
  );
  // console.log(totalWater);
  if (!totalWater) return [];
  if (!totalWater?.values) return [];

  const safeValues = totalWater.values.map((val) => val ?? 0);

  return safeValues.map((val, i) => {
    const denominator = population[i] ?? 0;
    return denominator !== 0 ? val / denominator : 0;
  });
};

const calculatLocalWaterSuffiency = (
  projection: IBaselineData | null,
  waterDemand: IBaselineData | null,
): number[] => {
  if (!projection) return [];
  const totalWater = projection.parameters.find(
    (param) => param.name === "Total Water Supply",
  );
  const totalWaterDemand = waterDemand?.parameters.find(
    (param) => param.name === "Total Water Demand",
  );

  if (!totalWater) return [];
  if (!totalWater?.values) return [];

  const safeValues = totalWater.values.map((val) => val ?? 0);

  return safeValues.map((val, i) => {
    const denominator = totalWaterDemand?.values[i] ?? 0;
    return denominator !== 0 ? val / denominator : 0;
  });
};

export const AnnualWaterSupplyComparison = createSelector(
  [
    selectResourceScenarioProjection,
    selectResourceScenarioProjectionBaseline,
    selectResourceScenarioProjectionA,
    selectResourceScenarioProjectionB,
    selectResourceBaseline,
  ],
  (projActive, projBase, projA, projB, baseline) => {
    return {
      active: projActive ? calculateAnnualWater(baseline) : [],
      baseline: projBase ? calculateAnnualWater(baseline) : [],
      scenarioA: projA ? calculateAnnualWater(baseline) : [],
      scenarioB: projB ? calculateAnnualWater(baseline) : [],
    };
  },
);

export const WaterAvailabilityPerPerson = createSelector(
  [
    selectResourceScenarioProjection,
    selectResourceScenarioProjectionBaseline,
    selectResourceScenarioProjectionA,
    selectResourceScenarioProjectionB,
    selectResourceBaseline,
    selectPopulationDataComparison,
  ],
  (projActive, projBase, projA, projB, baseline, population) => {
    return {
      active: projActive
        ? calculateWaterAvailability(baseline, population.active)
        : [],
      baseline: projBase
        ? calculateWaterAvailability(baseline, population.baseline)
        : [],
      scenarioA: projA
        ? calculateWaterAvailability(baseline, population.scenarioA)
        : [],
      scenarioB: projB
        ? calculateWaterAvailability(baseline, population.scenarioB)
        : [],
    };
  },
);

export const LocalWaterSuffiencyComparison = createSelector(
  [
    selectResourceScenarioProjection,
    selectResourceScenarioProjectionBaseline,
    selectResourceScenarioProjectionA,
    selectResourceScenarioProjectionB,
    selectWaterDemandBaseline,
  ],
  (projActive, projBase, projA, projB, water) => {
    return {
      active: calculatLocalWaterSuffiency(projActive, water),
      baseline: calculatLocalWaterSuffiency(projBase, water),
      scenarioA: calculatLocalWaterSuffiency(projA, water),
      scenarioB: calculatLocalWaterSuffiency(projB, water),
    };
  },
);
