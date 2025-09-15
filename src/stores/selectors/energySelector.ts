import { IBaselineData } from "@/lib/types/response";
import { selectPopulationDataComparison } from "./socioEconomySelector";
import {
  selectEnergyDemandScenarioProjection,
  selectEnergyDemandScenarioProjectionB,
  selectEnergyDemandScenarioProjectionA,
  selectEnergyDemandScenarioProjectionBaseline,
} from "./scenarioProjectionSelector";
import { selectLandCoverBaseline } from "./baseSelector";
import {
  selectPvAreaHousingProjection,
  selectPvAreaHousingProjectionA,
  selectPvAreaHousingProjectionB,
  selectPvAreaHousingProjectionBaseline,
  selectPvAreaIndustrialProjection,
  selectPvAreaIndustrialProjectionA,
  selectPvAreaIndustrialProjectionB,
  selectPvAreaIndustrialProjectionBaseline,
} from "./scenarioProjectionSelector";
import { createSelector } from "@reduxjs/toolkit";
import { resultConverter } from "@/lib/utils/formulas";

const calculatePvAreaPercentage = (data: number[]): number[] => {
  if (!Array.isArray(data)) return Array(36).fill(0);
  return resultConverter(data);
};

const calculatePvAreaInAreaIndustrial = (
  data: number[],
  LandCover: IBaselineData | null,
  landCoverName: string,
) => {
  if (!Array.isArray(data) && !LandCover) return Array(36).fill(0);
  const industrialLand = LandCover?.parameters.find(
    (param) => param.name === landCoverName,
  );

  if (!industrialLand) return [];
  if (!industrialLand?.values) return [];

  const safeValues = industrialLand.values.map((val) => val ?? 0);

  const result = resultConverter(
    safeValues.map((val, i) => {
      const denominator = data[i] ?? 0;
      return denominator !== 0 ? val * denominator * 0.5 * 0.6 * 10000 : 0;
    }),
  );

  return result;
};

const calculatePvAreaInAreaHousing = (
  data: number[],
  LandCover: IBaselineData | null,
  landCoverName: string,
) => {
  if (!Array.isArray(data) && !LandCover) return Array(36).fill(0);
  const industrialLand = LandCover?.parameters.find(
    (param) => param.name === landCoverName,
  );

  if (!industrialLand) return [];
  if (!industrialLand?.values) return [];

  const safeValues = industrialLand.values.map((val) => val ?? 0);

  const result = resultConverter(
    safeValues.map((val, i) => {
      const denominator = data[i] ?? 0;
      return denominator !== 0 ? val * denominator * 0.7 * 0.6 * 10000 : 0;
    }),
  );

  return result;
};

const calculateEnergyProductionSolar = (data: number[]) => {
  if (!Array.isArray(data)) return Array(36).fill(0);

  const safeValues = data.map((val) => val ?? 0);
  const result = resultConverter(
    safeValues.map((val, i) => {
      return (332.60625 * val) / 1000000 / 100;
    }),
  );

  return result;
};

const calculateLocalEnergyProduction = (
  industrial: number[],
  housing: number[],
) => {
  if (!Array.isArray(industrial) && !Array.isArray(housing))
    return Array(36).fill(0);
  const safeValues = industrial.map((val) => val ?? 0);
  return resultConverter(
    safeValues.map((val, i) => {
      const denominator = housing[i] ?? 0;
      return denominator !== 0 ? val + denominator : 0;
    }),
  );
};

const calculateLocalEnergySuffiency = (
  localEnergyProduction: number[],
  energyDemand: IBaselineData | null,
) => {
  if (!Array.isArray(localEnergyProduction) && !energyDemand)
    return Array(36).fill(0);

  const totalEnergyDemand = energyDemand?.parameters.find(
    (param) => param.name === "Total Energy Demand",
  );

  if (!totalEnergyDemand) return Array(36).fill(0);
  if (!totalEnergyDemand?.values) return Array(36).fill(0);

  const safeValues = totalEnergyDemand.values.map((val) => val ?? 0);

  return resultConverter(
    safeValues.map((val, i) => {
      const denominator = localEnergyProduction[i] ?? 0;
      return denominator !== 0 ? (denominator / val) * 100 : 0;
    }),
  );
};

const calculateRenewableEnergy = (
  localEnergyProduction: number[],
  energyDemand: IBaselineData | null,
) => {
  if (!energyDemand) return Array(36).fill(0);

  const totalEnergyDemand = energyDemand?.parameters.find(
    (param) => param.name === "Total Energy Demand",
  );

  if (!totalEnergyDemand) return [Array(36).fill(0)];
  if (!totalEnergyDemand?.values) return [Array(36).fill(0)];

  const safeValues = totalEnergyDemand.values.map((val) => val ?? 0);
  if (!Array.isArray(localEnergyProduction)) return safeValues;

  return resultConverter(
    safeValues.map((val, i) => {
      const denominator = localEnergyProduction[i] ?? 0;
      return denominator !== 0 ? val - denominator : 0;
    }),
  );
};

const calculateElectricityImport = (
  localEnergyProduction: number[] | null | undefined,
  energyDemand: IBaselineData | null | undefined,
): number[] => {
  const totalEnergyDemandParam = energyDemand?.parameters.find(
    (param) => param.name === "Total Energy Demand",
  );

  if (!totalEnergyDemandParam?.values) {
    return [];
  }

  const safeDemandValues = totalEnergyDemandParam.values.map((val) => val ?? 0);
  if (!localEnergyProduction || localEnergyProduction.length === 0) {
    return safeDemandValues;
  }

  if (localEnergyProduction.length !== safeDemandValues.length) {
    return safeDemandValues;
  }

  return safeDemandValues.map((demandValue, index) => {
    const productionValue = localEnergyProduction[index] ?? 0;
    return demandValue - productionValue;
  });
};

const calculateElectricityPerCapita = (
  projection: IBaselineData | null,
  population: number[],
): number[] => {
  if (!projection) return Array(36).fill(0);
  const totalEnergyDemand = projection?.parameters.find(
    (item) => item.name == "Total Energy Demand",
  );
  if (!totalEnergyDemand) return Array(36).fill(0);
  if (!totalEnergyDemand.values) return Array(36).fill(0);
  const safeValues = totalEnergyDemand.values.map((val) => val ?? 0);
  return resultConverter(
    safeValues.map((val, idx) => {
      const denominator = population[idx] ?? 0;
      return denominator !== 0 ? (val * 1000000) / denominator : 0;
    }),
  );
};

export const selectAreaPvIndustrialComparisson = createSelector(
  [
    selectPvAreaIndustrialProjection,
    selectPvAreaIndustrialProjectionA,
    selectPvAreaIndustrialProjectionB,
    selectPvAreaIndustrialProjectionBaseline,
  ],
  (projActive, projA, projB, baseline) => {
    return {
      active: calculatePvAreaPercentage(projActive),
      baseline: calculatePvAreaPercentage(baseline),
      scenarioA: calculatePvAreaPercentage(projA),
      scenarioB: calculatePvAreaPercentage(projB),
    };
  },
);

export const selectAreaPvHousingComparisson = createSelector(
  [
    selectPvAreaHousingProjection,
    selectPvAreaHousingProjectionA,
    selectPvAreaHousingProjectionB,
    selectPvAreaHousingProjectionBaseline,
  ],
  (projActive, projA, projB, baseline) => {
    return {
      active: calculatePvAreaPercentage(projActive),
      baseline: calculatePvAreaPercentage(baseline),
      scenarioA: calculatePvAreaPercentage(projA),
      scenarioB: calculatePvAreaPercentage(projB),
    };
  },
);

export const selectAreaInAreaPvIndustrialComparisson = createSelector(
  [selectAreaPvIndustrialComparisson, selectLandCoverBaseline],
  (areaPv, landCover) => {
    return {
      active: calculatePvAreaInAreaIndustrial(
        areaPv.active,
        landCover,
        "Industrial Land",
      ),
      baseline: calculatePvAreaInAreaIndustrial(
        areaPv.baseline,
        landCover,
        "Industrial Land",
      ),
      scenarioA: calculatePvAreaInAreaIndustrial(
        areaPv.scenarioA,
        landCover,
        "Industrial Land",
      ),
      scenarioB: calculatePvAreaInAreaIndustrial(
        areaPv.scenarioB,
        landCover,
        "Industrial Land",
      ),
    };
  },
);

export const selectAreaInAreaPvHousingComparisson = createSelector(
  [selectAreaPvHousingComparisson, selectLandCoverBaseline],
  (areaPv, landCover) => {
    return {
      active: calculatePvAreaInAreaHousing(
        areaPv.active,
        landCover,
        "Housing Land",
      ),
      baseline: calculatePvAreaInAreaHousing(
        areaPv.baseline,
        landCover,
        "Housing Land",
      ),
      scenarioA: calculatePvAreaInAreaHousing(
        areaPv.scenarioA,
        landCover,
        "Housing Land",
      ),
      scenarioB: calculatePvAreaInAreaHousing(
        areaPv.scenarioB,
        landCover,
        "Housing Land",
      ),
    };
  },
);

export const selectEnergyProductionIndustrialComparisson = createSelector(
  [selectAreaInAreaPvIndustrialComparisson],
  (areaPv) => {
    return {
      active: calculateEnergyProductionSolar(areaPv.active),
      baseline: calculateEnergyProductionSolar(areaPv.baseline),
      scenarioA: calculateEnergyProductionSolar(areaPv.scenarioA),
      scenarioB: calculateEnergyProductionSolar(areaPv.scenarioB),
    };
  },
);

export const selectEnergyProductionHousingComparisson = createSelector(
  [selectAreaInAreaPvHousingComparisson],
  (areaPv) => {
    return {
      active: calculateEnergyProductionSolar(areaPv.active),
      baseline: calculateEnergyProductionSolar(areaPv.baseline),
      scenarioA: calculateEnergyProductionSolar(areaPv.scenarioA),
      scenarioB: calculateEnergyProductionSolar(areaPv.scenarioB),
    };
  },
);

export const selectLocalEnergyProductionComparison = createSelector(
  [
    selectEnergyProductionHousingComparisson,
    selectEnergyProductionIndustrialComparisson,
  ],
  (housing, industrial) => {
    return {
      active: calculateLocalEnergyProduction(housing.active, industrial.active),
      baseline: calculateLocalEnergyProduction(
        housing.baseline,
        industrial.baseline,
      ),
      scenarioA: calculateLocalEnergyProduction(
        housing.scenarioA,
        industrial.scenarioA,
      ),
      scenarioB: calculateLocalEnergyProduction(
        housing.scenarioB,
        industrial.scenarioB,
      ),
    };
  },
);

export const selectLocalEnergySuffiencyComparison = createSelector(
  [
    selectEnergyDemandScenarioProjection,
    selectEnergyDemandScenarioProjectionB,
    selectEnergyDemandScenarioProjectionA,
    selectEnergyDemandScenarioProjectionBaseline,
    selectLocalEnergyProductionComparison,
  ],
  (projActive, projB, projA, baseline, localEnergyProduction) => {
    return {
      active: calculateLocalEnergySuffiency(
        localEnergyProduction.active,
        projActive,
      ),
      baseline: calculateLocalEnergySuffiency(
        localEnergyProduction.baseline,
        baseline,
      ),
      scenarioA: calculateLocalEnergySuffiency(
        localEnergyProduction.scenarioA,
        projA,
      ),
      scenarioB: calculateLocalEnergySuffiency(
        localEnergyProduction.scenarioB,
        projB,
      ),
    };
  },
);

export const selectElectrityImportComparison = createSelector(
  [
    selectEnergyDemandScenarioProjection,
    selectEnergyDemandScenarioProjectionB,
    selectEnergyDemandScenarioProjectionA,
    selectEnergyDemandScenarioProjectionBaseline,
    selectLocalEnergyProductionComparison,
  ],
  (projActive, projB, projA, baseline, localEnergyProduction) => {
    return {
      active: calculateElectricityImport(
        localEnergyProduction.active,
        projActive,
      ),
      baseline: calculateElectricityImport(
        localEnergyProduction.baseline,
        baseline,
      ),
      scenarioA: calculateElectricityImport(
        localEnergyProduction.scenarioA,
        projA,
      ),
      scenarioB: calculateElectricityImport(
        localEnergyProduction.scenarioB,
        projB,
      ),
    };
  },
);

export const selectLocalRenewableEnergyContributionComparison = createSelector(
  [
    selectEnergyDemandScenarioProjection,
    selectEnergyDemandScenarioProjectionB,
    selectEnergyDemandScenarioProjectionA,
    selectEnergyDemandScenarioProjectionBaseline,
    selectLocalEnergyProductionComparison,
  ],
  (projActive, projB, projA, baseline, localEnergyProduction) => {
    return {
      active: calculateRenewableEnergy(
        localEnergyProduction.active,
        projActive,
      ),
      baseline: calculateRenewableEnergy(
        localEnergyProduction.baseline,
        baseline,
      ),
      scenarioA: calculateRenewableEnergy(
        localEnergyProduction.scenarioA,
        projA,
      ),
      scenarioB: calculateRenewableEnergy(
        localEnergyProduction.scenarioB,
        projB,
      ),
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
