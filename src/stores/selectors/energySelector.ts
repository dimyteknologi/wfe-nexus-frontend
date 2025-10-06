import { IBaselineData } from "@/lib/types/response";
import { selectPopulationDataComparison } from "./socioEconomySelector";
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
import { selectTotalEnergy } from "./demandSideSelector";
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
  housing: number[],
  industrial: number[],
) => {
  if (!Array.isArray(industrial) || !Array.isArray(housing))
    return Array(36).fill(0);
  const safeValues = industrial.map((val) => val ?? 0);
  return resultConverter(
    safeValues.map((val, i) => {
      const denominator = housing[i] ?? 0;
      return val + denominator;
    }),
  );
};

const calculateLocalEnergySuffiency = (
  localEnergyProduction: number[],
  totalWaterEnergyGeneration: number[],
) => {
  if (!Array.isArray(localEnergyProduction) && !totalWaterEnergyGeneration)
    return Array(36).fill(0);

  const safeValues = totalWaterEnergyGeneration.map((val) => val ?? 0);

  return resultConverter(
    safeValues.map((val, i) => {
      const denominator = localEnergyProduction[i] ?? 0;
      return denominator !== 0 ? (denominator / val) * 100 : 0;
    }),
  );
};

const calculateElectricityImport = (
  localEnergyProduction: number[] | null | undefined,
  totalWaterEnergyGeneration: number[],
): number[] => {
  if (!Array.isArray(localEnergyProduction) && !totalWaterEnergyGeneration)
    return Array(36).fill(0);

  const safeValues = totalWaterEnergyGeneration.map((val) => val ?? 0);
  if (!localEnergyProduction || localEnergyProduction.length === 0) {
    return safeValues;
  }

  if (localEnergyProduction.length !== safeValues.length) {
    return safeValues;
  }

  return safeValues.map((demandValue, index) => {
    const productionValue = localEnergyProduction[index] ?? 0;
    return demandValue - productionValue;
  });
};

const calculateElectricityPerCapita = (
  totalWaterEnergyGeneration: number[],
  population: number[],
): number[] => {
  if (!totalWaterEnergyGeneration) return Array(36).fill(0);

  const safeValues = totalWaterEnergyGeneration.map((val) => val ?? 0);

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
  [selectTotalEnergy, selectLocalEnergyProductionComparison],
  (totalEnergy, localEnergyProduction) => {
    return {
      active: calculateLocalEnergySuffiency(
        localEnergyProduction.active,
        totalEnergy.active,
      ),
      baseline: calculateLocalEnergySuffiency(
        localEnergyProduction.baseline,
        totalEnergy.baseline,
      ),
      scenarioA: calculateLocalEnergySuffiency(
        localEnergyProduction.scenarioA,
        totalEnergy.baseline,
      ),
      scenarioB: calculateLocalEnergySuffiency(
        localEnergyProduction.scenarioB,
        totalEnergy.baseline,
      ),
    };
  },
);

export const selectElectrityImportComparison = createSelector(
  [selectTotalEnergy, selectLocalEnergyProductionComparison],
  (totalEnergy, localEnergyProduction) => {
    return {
      active: calculateElectricityImport(
        localEnergyProduction.active,
        totalEnergy.active,
      ),
      baseline: calculateElectricityImport(
        localEnergyProduction.baseline,
        totalEnergy.baseline,
      ),
      scenarioA: calculateElectricityImport(
        localEnergyProduction.scenarioA,
        totalEnergy.scenarioA,
      ),
      scenarioB: calculateElectricityImport(
        localEnergyProduction.scenarioB,
        totalEnergy.scenarioB,
      ),
    };
  },
);

export const selectLocalRenewableEnergyContributionComparison = createSelector(
  [selectTotalEnergy, selectLocalEnergyProductionComparison],
  (totalEnergy, localEnergyProduction) => {
    return {
      active: calculateLocalEnergySuffiency(
        localEnergyProduction.active,
        totalEnergy.active,
      ),
      baseline: calculateLocalEnergySuffiency(
        localEnergyProduction.baseline,
        totalEnergy.baseline,
      ),
      scenarioA: calculateLocalEnergySuffiency(
        localEnergyProduction.scenarioA,
        totalEnergy.baseline,
      ),
      scenarioB: calculateLocalEnergySuffiency(
        localEnergyProduction.scenarioB,
        totalEnergy.baseline,
      ),
    };
  },
);

export const selectElectricityPerCapitaComparison = createSelector(
  [selectTotalEnergy, selectPopulationDataComparison],
  (totalEnergy, population) => {
    return {
      active: calculateElectricityPerCapita(
        totalEnergy.active,
        population.active,
      ),
      baseline: calculateElectricityPerCapita(
        totalEnergy.baseline,
        population.baseline,
      ),
      scenarioA: calculateElectricityPerCapita(
        totalEnergy.scenarioA,
        population.scenarioA,
      ),
      scenarioB: calculateElectricityPerCapita(
        totalEnergy.scenarioB,
        population.scenarioB,
      ),
    };
  },
);
