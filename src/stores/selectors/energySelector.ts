import { IBaselineData } from "@/lib/types/response";
import { selectPopulationDataComparison } from "./socioEconomySelector";
import {
  selectEnergyDemandScenarioProjection,
  selectEnergyDemandScenarioProjectionA,
  selectEnergyDemandScenarioProjectionB,
  selectEnergyDemandScenarioProjectionBaseline,
} from "./scenarioProjectionSelector";
import { createSelector } from "@reduxjs/toolkit";

const calculateLocalEnergyProduction = (): number[] => {
  return Array(36).fill(0);
};

const calculateLocalEnergySuffiency = (): number[] => {
  return Array(36).fill(0.0);
};

const calculateElectricityImport = (
  projection: IBaselineData | null,
): number[] => {
  if (!projection) return [];
  const totalEnergyDemand = projection?.parameters.find(
    (item) => item.name == "Total Energy Demand",
  );
  if (!totalEnergyDemand) return [];
  if (!totalEnergyDemand.values) return [];
  return totalEnergyDemand.values.map((val) => val ?? 0);
};

const calculateElectricityPerCapita = (
  projection: IBaselineData | null,
  population: number[],
): number[] => {
  if (!projection) return [];
  const totalEnergyDemand = projection?.parameters.find(
    (item) => item.name == "Total Energy Demand",
  );
  if (!totalEnergyDemand) return [];
  if (!totalEnergyDemand.values) return [];
  const safeValues = totalEnergyDemand.values.map((val) => val ?? 0);
  return safeValues.map((val, idx) => {
    const denominator = population[idx] ?? 0;
    return denominator !== 0 ? Math.round((val * 1000000) / denominator) : 0;
  });
};

// export const selectEnergyProductionComparison = createSelector(
//   [],
//   () => {
//     return {
//       active: calculateAgricultureLand(projActive),
//       baseline: calculateAgricultureLand(projBase),
//       scenarioA: calculateAgricultureLand(projA),
//       scenarioB: calculateAgricultureLand(projB),
//     };
//   },
// );

export const selectLocalEnergyProductionComparison = createSelector(
  [
    selectEnergyDemandScenarioProjection,
    selectEnergyDemandScenarioProjectionBaseline,
    selectEnergyDemandScenarioProjectionA,
    selectEnergyDemandScenarioProjectionB,
  ],
  (projActive, projBase, projA, projB) => {
    return {
      active: projActive ? Array(36).fill(0) : [],
      baseline: projBase ? Array(36).fill(0) : [],
      scenarioA: projA ? Array(36).fill(0) : [],
      scenarioB: projB ? Array(36).fill(0) : [],
    };
  },
);

export const selectLocalEnergySuffiencyComparison = createSelector(
  [
    selectEnergyDemandScenarioProjection,
    selectEnergyDemandScenarioProjectionBaseline,
    selectEnergyDemandScenarioProjectionA,
    selectEnergyDemandScenarioProjectionB,
  ],
  (projActive, projBase, projA, projB) => {
    return {
      active: projActive ? Array(36).fill(0.0) : [],
      baseline: projBase ? Array(36).fill(0.0) : [],
      scenarioA: projA ? Array(36).fill(0.0) : [],
      scenarioB: projB ? Array(36).fill(0.0) : [],
    };
  },
);

export const selectLocalRenewableEnergyContributionComparison = createSelector(
  [
    selectEnergyDemandScenarioProjection,
    selectEnergyDemandScenarioProjectionBaseline,
    selectEnergyDemandScenarioProjectionA,
    selectEnergyDemandScenarioProjectionB,
  ],
  (projActive, projBase, projA, projB) => {
    return {
      active: projActive ? Array(36).fill(0.0) : [],
      baseline: projBase ? Array(36).fill(0.0) : [],
      scenarioA: projA ? Array(36).fill(0.0) : [],
      scenarioB: projB ? Array(36).fill(0.0) : [],
    };
  },
);

export const selectElectrityImportComparison = createSelector(
  [
    selectEnergyDemandScenarioProjection,
    selectEnergyDemandScenarioProjectionBaseline,
    selectEnergyDemandScenarioProjectionA,
    selectEnergyDemandScenarioProjectionB,
  ],
  (projActive, projBase, projA, projB) => {
    return {
      active: calculateElectricityImport(projActive),
      baseline: calculateElectricityImport(projBase),
      scenarioA: calculateElectricityImport(projA),
      scenarioB: calculateElectricityImport(projB),
    };
  },
);

export const selectElectricityPerCapitaComparison = createSelector(
  [
    selectEnergyDemandScenarioProjection,
    selectEnergyDemandScenarioProjectionBaseline,
    selectEnergyDemandScenarioProjectionA,
    selectEnergyDemandScenarioProjectionB,
    selectPopulationDataComparison,
  ],
  (projActive, projBase, projA, projB, population) => {
    return {
      active: calculateElectricityPerCapita(projActive, population.active),
      baseline: calculateElectricityPerCapita(projBase, population.baseline),
      scenarioA: calculateElectricityPerCapita(projA, population.scenarioA),
      scenarioB: calculateElectricityPerCapita(projB, population.scenarioB),
    };
  },
);
