import { createSelector } from "@reduxjs/toolkit";
import {
  selectContextSpecificActive,
  selectContextSpecificBaseline,
  createDeepEqualSelector
} from "../baseSelector";
import {
  selectedContextSpecificA,
  selectedContextSpecificB,
} from "./scenarioProjectionSelector";
import {
  constantDevided,
  constantMultiply,
} from "@/lib/utils/formulas";
import { FOOD_AND_YIELD } from "@/lib/constant/initialDataContext.constans";
import { ContextSpecificState } from "@/stores/slicers/contextSpecificInputSlicer";

export const varietas = [
  "landConversion",
] as const;

const VARIETY_KEYS = [
  "landConversion",
] as const;

export const scenarios = [
  "active",
  "scenarioA",
  "scenarioB",
] as const;

const ENERGY_KEYS = {
  LAND_PROCESSING: "LAND_PROCESSING",
  PLANTING_AND_MAINTENANCE: "PLANTING_AND_MAINTENANCE",
  IRRIGATION: "IRRIGATION",
  HARVEST_AND_TRANSPORT: "HARVEST_AND_TRANSPORT",
} as const;

type EnergyKey = keyof typeof ENERGY_KEYS;

const DEMAND_KEYS = {
  WATER_CONSUMPTION_UNIT: "WATER_CONSUMPTION_UNIT",
  CHEMICAL_FERTILIZER_DEMAND: "CHEMICAL_FERTILIZER_DEMAND",
  ORGANIC_FERTILIZER_DEMAND: "ORGANIC_FERTILIZER_DEMAND",
} as const;

type DemandKey = keyof typeof DEMAND_KEYS;
type Variety = (typeof VARIETY_KEYS)[number];

const ENERGY_INPUT: Record<Variety, Record<EnergyKey, number>> = {
  landConversion: FOOD_AND_YIELD.INPARI_32.ENERGY_DEMAND,
};

const DEMAND_INPUT: Record<Variety, Record<DemandKey, number>> = {
  landConversion: {
    WATER_CONSUMPTION_UNIT: FOOD_AND_YIELD.INPARI_32.WATER_CONSUMPTION_UNIT,
    CHEMICAL_FERTILIZER_DEMAND:
      FOOD_AND_YIELD.INPARI_32.CHEMICAL_FERTILIZER_DEMAND,
    ORGANIC_FERTILIZER_DEMAND:
      FOOD_AND_YIELD.INPARI_32.ORGANIC_FERTILIZER_DEMAND,
  }
};

const additionalCompute = (
  key: DemandKey,
  value: number,
  extraKey?: ContextSpecificState,
  extraVariety?: Variety,
) => {
  switch (key) {
    case "WATER_CONSUMPTION_UNIT":
      const waterIntensity = extraKey?.agriculture?.waterIntensity?.["2015-2030"] ?? value;
      return waterIntensity;
    case "CHEMICAL_FERTILIZER_DEMAND":
      return (
        (value *
          (extraKey?.fertilizer?.percentageOfChemical?.["2015-2030"] ?? 1)) /
        100
      );
    case "ORGANIC_FERTILIZER_DEMAND":
      if (extraVariety)
        return (
          DEMAND_INPUT[extraVariety]["CHEMICAL_FERTILIZER_DEMAND"] *
          (1 -
            (extraKey?.fertilizer?.percentageOfChemical?.["2015-2030"] ?? 1) /
            100) *
          (extraKey?.fertilizer?.ratioOrganic?.["2015-2030"] ?? 0)
        );
    default:
      return 0;
  }
};

const EMPTY_ARRAY = Array(16).fill(0);

export const sumArrayData = (...arrays: number[][]): number[] => {
  if (arrays.length === 0) return EMPTY_ARRAY;
  const result: number[] = new Array(16).fill(0);

  for (const arr of arrays) {
    for (let i = 0; i < 16; i++) {
      result[i] += arr[i];
    }
  }
  return result;
};

const calculateDemand = (
  shares: number[],
  key: DemandKey,
  extraKey?: ContextSpecificState,
) => {
  const years = shares.length;
  const result = Array(years).fill(0);
  for (let i = 0; i < years; i++) {
    let total = 0;
    for (const variety of VARIETY_KEYS) {
      total +=
        (shares[i] / 100) *
        additionalCompute(key, DEMAND_INPUT[variety][key], extraKey, variety);
    }
    result[i] = Number(total.toFixed(10));
  }

  return result;
};

export const multiplyArrayData = (...arrays: number[][]): number[] =>
  Array.from({ length: 16 }, (_, i) =>
    arrays.reduce((acc, arr) => acc * (arr[i] ?? 1), 1),
  );



export const calculateDevidedArrays = (arr1: number[], arr2: number[]) => {
  if (!Array.isArray(arr1) && !Array.isArray(arr2)) return EMPTY_ARRAY;

  const result = arr1.map((val, i) => {
    const denominator = arr2[i] ?? 0;
    return denominator !== 0
      ? Number(((val / denominator) * 100).toFixed(10))
      : 0;
  });

  return result;
};

export const calculateInput = (
  initial: number = 0,
  percentage: number = 0,
  length: number = 16
): number[] => {
  const result = Array(length).fill(0);

  const pct = Math.abs(percentage) > 1 ? percentage / 100 : percentage;
  const multiplier = 1 - pct;
  result[0] = initial;

  for (let i = 1; i < length; i++) {
    result[i] = Math.round(result[i - 1] * multiplier);
  }

  return result;
};


export const calculatePaddyLandShare = (value: number = 0, total: number = 0) => {
  if (total === 0) return 0;
  return value / total;
};

const calculateEnergyDemand = (
  shares: number[],
  key: EnergyKey,
) => {
  const years = shares.length;
  const result = Array(years).fill(0);
  for (let i = 0; i < years; i++) {
    let total = 0;
    for (const variety of VARIETY_KEYS) {
      total += (shares[i] / 100) * ENERGY_INPUT[variety][key];
    }
    result[i] = Number(total.toFixed(10));
  }

  return result;
};

export const agricultureLandPerScenario = createSelector(
  [
    selectContextSpecificActive,
    selectContextSpecificBaseline,
    selectedContextSpecificA,
    selectedContextSpecificB
  ],
  (activeState, baselineState, scenarioAState, scenarioBState) => ({
    active: calculateInput(
      activeState.agriculture.landProduction["2015-2030"],
      activeState.agriculture.conversionLandProduction["2015-2030"]
    ),
    baseline: calculateInput(
      baselineState?.agriculture?.landProduction["2015-2030"] ?? activeState.agriculture.landProduction["2015-2030"],
      baselineState?.agriculture?.conversionLandProduction["2015-2030"] ?? activeState.agriculture.conversionLandProduction["2015-2030"]
    ),
    scenarioA: calculateInput(
      scenarioAState?.agriculture?.landProduction["2015-2030"],
      scenarioAState?.agriculture?.conversionLandProduction["2015-2030"]
    ),
    scenarioB: calculateInput(
      scenarioBState?.agriculture?.landProduction["2015-2030"],
      scenarioBState?.agriculture?.conversionLandProduction["2015-2030"]
    ),
  })
);

export const agricultureLandPaddyPerscenario = createSelector(
  [agricultureLandPerScenario],
  (agriculture) => ({
    active: agriculture.active,
    baseline: agriculture.baseline,
    scenarioA: agriculture.scenarioA,
    scenarioB: agriculture.scenarioB,
  })
)

export const selectWaterDemandAveragePerScenario = createSelector(
  [agricultureLandPaddyPerscenario,
    selectContextSpecificActive,
    selectContextSpecificBaseline,
    selectedContextSpecificA,
    selectedContextSpecificB],
  (shares, active, baseline, scenarioA, scenarioB) => {
    const getInputValue = (scenario: ContextSpecificState) =>
      (scenario?.agriculture?.croppingIntensity?.["2015-2030"] ?? 0);

    return {
      active: constantMultiply(calculateDemand(shares.active, "WATER_CONSUMPTION_UNIT", active), getInputValue(active)),
      baseline: constantMultiply(calculateDemand(shares.baseline ?? shares.active, "WATER_CONSUMPTION_UNIT", baseline), getInputValue(baseline ?? active)),
      scenarioA: constantMultiply(calculateDemand(shares.scenarioA, "WATER_CONSUMPTION_UNIT", scenarioA), getInputValue(scenarioA)),
      scenarioB: constantMultiply(calculateDemand(shares.scenarioB, "WATER_CONSUMPTION_UNIT", scenarioB), getInputValue(scenarioB)),
    }
  },
);

export const selectChemicalDemandAveragePerScenario = createSelector(
  [
    agricultureLandPaddyPerscenario,
    selectContextSpecificActive,
    selectContextSpecificBaseline,
    selectedContextSpecificA,
    selectedContextSpecificB,
  ],
  (shares, active, baseline, scenarioA, scenarioB) => {
    return {
      active: calculateDemand(
        shares.active,
        "CHEMICAL_FERTILIZER_DEMAND",
        active,
      ),
      baseline: calculateDemand(
        shares.baseline ?? shares.active,
        "CHEMICAL_FERTILIZER_DEMAND",
        baseline ?? active,
      ),
      scenarioA: calculateDemand(
        shares.scenarioA,
        "CHEMICAL_FERTILIZER_DEMAND",
        scenarioA,
      ),
      scenarioB: calculateDemand(
        shares.scenarioB,
        "CHEMICAL_FERTILIZER_DEMAND",
        scenarioB,
      ),
    };
  },
);

export const selectOrganicDemandAveragePerScenario = createSelector(
  [
    agricultureLandPaddyPerscenario,
    selectContextSpecificActive,
    selectContextSpecificBaseline,
    selectedContextSpecificA,
    selectedContextSpecificB,
  ],
  (shares, active, baseline, scenarioA, scenarioB) => {
    return {
      active: calculateDemand(
        shares.active,
        "ORGANIC_FERTILIZER_DEMAND",
        active,
      ),
      baseline: calculateDemand(
        shares.baseline ?? shares.active,
        "ORGANIC_FERTILIZER_DEMAND",
        baseline ?? active,
      ),
      scenarioA: calculateDemand(
        shares.scenarioA,
        "ORGANIC_FERTILIZER_DEMAND",
        scenarioA,
      ),
      scenarioB: calculateDemand(
        shares.scenarioB,
        "ORGANIC_FERTILIZER_DEMAND",
        scenarioB,
      ),
    };
  },
);

export const selectEnergyLandProcessingDemandAveragePerScenario =
  createSelector([agricultureLandPaddyPerscenario], (shares) => ({
    active: calculateEnergyDemand(shares.active, "LAND_PROCESSING"),
    baseline: calculateEnergyDemand(shares.baseline ?? shares.active, "LAND_PROCESSING"),
    scenarioA: calculateEnergyDemand(shares.scenarioA, "LAND_PROCESSING"),
    scenarioB: calculateEnergyDemand(shares.scenarioB, "LAND_PROCESSING"),
  }));

export const selectEnergyPlantingAndMaintenanceDemandAveragePerScenario =
  createSelector([agricultureLandPaddyPerscenario], (shares) => ({
    active: calculateEnergyDemand(shares.active, "PLANTING_AND_MAINTENANCE"),
    baseline: calculateEnergyDemand(shares.baseline ?? shares.active, "PLANTING_AND_MAINTENANCE"),
    scenarioA: calculateEnergyDemand(
      shares.scenarioA,
      "PLANTING_AND_MAINTENANCE",
    ),
    scenarioB: calculateEnergyDemand(
      shares.scenarioB,
      "PLANTING_AND_MAINTENANCE",
    ),
  }));

export const selectEnergyIrrigationDemandAveragePerScenario = createSelector(
  [agricultureLandPaddyPerscenario],
  (shares) => ({
    active: calculateEnergyDemand(shares.active, "IRRIGATION"),
    baseline: calculateEnergyDemand(shares.baseline ?? shares.active, "IRRIGATION"),
    scenarioA: calculateEnergyDemand(shares.scenarioA, "IRRIGATION"),
    scenarioB: calculateEnergyDemand(shares.scenarioB, "IRRIGATION"),
  }),
);

export const selectEnergyHarvestAndTransportDemandAveragePerScenario =
  createSelector([agricultureLandPaddyPerscenario], (shares) => ({
    active: calculateEnergyDemand(shares.active, "HARVEST_AND_TRANSPORT"),
    baseline: calculateEnergyDemand(shares.baseline ?? shares.active, "HARVEST_AND_TRANSPORT"),
    scenarioA: calculateEnergyDemand(shares.scenarioA, "HARVEST_AND_TRANSPORT"),
    scenarioB: calculateEnergyDemand(shares.scenarioB, "HARVEST_AND_TRANSPORT"),
  }));

export const selectTotalEnergyDemandAveragePerScenario = createDeepEqualSelector(
  [
    selectEnergyLandProcessingDemandAveragePerScenario,
    selectEnergyPlantingAndMaintenanceDemandAveragePerScenario,
    selectEnergyIrrigationDemandAveragePerScenario,
    selectEnergyHarvestAndTransportDemandAveragePerScenario,
  ],
  (
    landProcessing,
    plantingAndMaintenance,
    irrigation,
    harvestAndTransport,
  ) => {
    const fastSum4 = (a: number[], b: number[], c: number[], d: number[]) => {
      const result = new Array(16);
      for (let i = 0; i < 16; i++) {
        result[i] = (a[i] ?? 0) + (b[i] ?? 0) + (c[i] ?? 0) + (d[i] ?? 0);
      }
      return result;
    }
    return {
      active: fastSum4(
        landProcessing.active,
        plantingAndMaintenance.active,
        irrigation.active,
        harvestAndTransport.active,
      ),
      baseline: fastSum4(
        landProcessing.baseline ?? landProcessing.active,
        plantingAndMaintenance.baseline ?? plantingAndMaintenance.active,
        irrigation.baseline ?? irrigation.active,
        harvestAndTransport.baseline ?? harvestAndTransport.active,
      ),
      scenarioA: fastSum4(
        landProcessing.scenarioA,
        plantingAndMaintenance.scenarioA,
        irrigation.scenarioA,
        harvestAndTransport.scenarioA,
      ),
      scenarioB: fastSum4(
        landProcessing.scenarioB,
        plantingAndMaintenance.scenarioB,
        irrigation.scenarioB,
        harvestAndTransport.scenarioB,
      ),
    };
  },
);

export const selectLandPaddyFieldPerScenario = createSelector(
  [
    agricultureLandPaddyPerscenario
  ],
  (land) => ({
    active: land.active,
    baseline: land.baseline,
    scenarioA: land.scenarioA,
    scenarioB: land.scenarioB
  }),
);

// should change
export const selectWaterDemandPerScenario = createSelector(
  [selectWaterDemandAveragePerScenario, agricultureLandPerScenario],
  (waterDemand, paddyField) => ({
    active: multiplyArrayData(waterDemand.active, paddyField.active),
    baseline: multiplyArrayData(waterDemand.baseline ?? waterDemand.active, paddyField.baseline ?? paddyField.active),
    scenarioA: multiplyArrayData(waterDemand.scenarioA, paddyField.scenarioA),
    scenarioB: multiplyArrayData(waterDemand.scenarioB, paddyField.scenarioB),
  }),
);

export const selectChemicalDemandPerScenario = createSelector(
  [selectChemicalDemandAveragePerScenario, agricultureLandPerScenario],
  (chemicalDemand, paddyField) => ({
    active: constantDevided(
      multiplyArrayData(chemicalDemand.active, paddyField.active),
      1000,
    ),
    baseline: constantDevided(
      multiplyArrayData(chemicalDemand.baseline ?? chemicalDemand.active, paddyField.baseline ?? paddyField.active),
      1000,
    ),
    scenarioA: constantDevided(
      multiplyArrayData(chemicalDemand.scenarioA, paddyField.scenarioA),
      1000,
    ),
    scenarioB: constantDevided(
      multiplyArrayData(chemicalDemand.scenarioB, paddyField.scenarioB),
      1000,
    ),
  }),
);

export const selectOrganicDemandPerScenario = createSelector(
  [selectOrganicDemandAveragePerScenario, agricultureLandPerScenario],
  (organicDemand, paddyField) => ({
    active: constantDevided(
      multiplyArrayData(organicDemand.active, paddyField.active),
      1000,
    ),
    baseline: constantDevided(
      multiplyArrayData(organicDemand.baseline ?? organicDemand.active, paddyField.baseline ?? paddyField.active),
      1000,
    ),
    scenarioA: constantDevided(
      multiplyArrayData(organicDemand.scenarioA, paddyField.scenarioA),
      1000,
    ),
    scenarioB: constantDevided(
      multiplyArrayData(organicDemand.scenarioB, paddyField.scenarioB),
      1000,
    ),
  }),
);

export const selectEnergyLandProcessingDemandTotalPerScenario = createSelector(
  [
    selectEnergyLandProcessingDemandAveragePerScenario,
    agricultureLandPerScenario,
  ],
  (landProcessing, paddyField) => ({
    active: multiplyArrayData(landProcessing.active, paddyField.active),
    baseline: multiplyArrayData(landProcessing.baseline ?? landProcessing.active, paddyField.baseline ?? paddyField.active),
    scenarioA: multiplyArrayData(
      landProcessing.scenarioA,
      paddyField.scenarioA,
    ),
    scenarioB: multiplyArrayData(
      landProcessing.scenarioB,
      paddyField.scenarioB,
    ),
  }),
);

export const selectEnergyPlantingAndMaintenanceDemandTotalPerScenario =
  createSelector(
    [
      selectEnergyPlantingAndMaintenanceDemandAveragePerScenario,
      agricultureLandPerScenario,
    ],
    (plantingAndMaintenance, paddyField) => ({
      active: multiplyArrayData(
        plantingAndMaintenance.active,
        paddyField.active,
      ),
      baseline: multiplyArrayData(
        plantingAndMaintenance.baseline ?? plantingAndMaintenance.active,
        paddyField.baseline ?? paddyField.active,
      ),
      scenarioA: multiplyArrayData(
        plantingAndMaintenance.scenarioA,
        paddyField.scenarioA,
      ),
      scenarioB: multiplyArrayData(
        plantingAndMaintenance.scenarioB,
        paddyField.scenarioB,
      ),
    }),
  );

export const selectEnergyIrrigationDemandTotalPerScenario = createSelector(
  [
    selectEnergyIrrigationDemandAveragePerScenario,
    agricultureLandPerScenario,
  ],
  (irrigation, paddyField) => ({
    active: multiplyArrayData(irrigation.active, paddyField.active),
    baseline: multiplyArrayData(irrigation.baseline ?? irrigation.active, paddyField.baseline ?? paddyField.active),
    scenarioA: multiplyArrayData(irrigation.scenarioA, paddyField.scenarioA),
    scenarioB: multiplyArrayData(irrigation.scenarioB, paddyField.scenarioB),
  }),
);

export const selectEnergyHarvestAndTransportDemandTotalPerScenario =
  createSelector(
    [
      selectEnergyHarvestAndTransportDemandAveragePerScenario,
      agricultureLandPerScenario,
    ],
    (harvestAndTransport, paddyField) => ({
      active: multiplyArrayData(harvestAndTransport.active, paddyField.active),
      baseline: multiplyArrayData(harvestAndTransport.baseline ?? harvestAndTransport.active, paddyField.baseline ?? paddyField.active),
      scenarioA: multiplyArrayData(
        harvestAndTransport.scenarioA,
        paddyField.scenarioA,
      ),
      scenarioB: multiplyArrayData(
        harvestAndTransport.scenarioB,
        paddyField.scenarioB,
      ),
    }),
  );

export const selectTotalEnergyDemandPerScenario = createDeepEqualSelector(
  [
    selectEnergyLandProcessingDemandTotalPerScenario,
    selectEnergyPlantingAndMaintenanceDemandTotalPerScenario,
    selectEnergyIrrigationDemandTotalPerScenario,
    selectEnergyHarvestAndTransportDemandTotalPerScenario,
  ],
  (
    landProcessing,
    plantingAndMaintenance,
    irrigation,
    harvestAndTransport,
  ) => {
    const sumAndDivide = (a: number[], b: number[], c: number[], d: number[]) => {
      const result = new Array(16);
      for (let i = 0; i < 16; i++) {
        result[i] = ((a[i] ?? 0) + (b[i] ?? 0) + (c[i] ?? 0) + (d[i] ?? 0)) / 1000;
      }
      return result;
    }
    return {
      active: sumAndDivide(
        landProcessing.active,
        plantingAndMaintenance.active,
        irrigation.active,
        harvestAndTransport.active,
      ),
      baseline: sumAndDivide(
        landProcessing.baseline ?? landProcessing.active,
        plantingAndMaintenance.baseline ?? plantingAndMaintenance.active,
        irrigation.baseline ?? irrigation.active,
        harvestAndTransport.baseline ?? harvestAndTransport.active,
      ),
      scenarioA: sumAndDivide(
        landProcessing.scenarioA,
        plantingAndMaintenance.scenarioA,
        irrigation.scenarioA,
        harvestAndTransport.scenarioA,
      ),
      scenarioB: sumAndDivide(
        landProcessing.scenarioB,
        plantingAndMaintenance.scenarioB,
        irrigation.scenarioB,
        harvestAndTransport.scenarioB,
      ),
    }
  },
);

export const selectNpkApplicationPerScenario = createSelector(
  [selectChemicalDemandPerScenario],
  (chemicalDemand) => ({
    active: constantMultiply(chemicalDemand.active, 0.3),
    baseline: constantMultiply(chemicalDemand.baseline ?? chemicalDemand.active, 0.3),
    scenarioA: constantMultiply(chemicalDemand.scenarioA, 0.3),
    scenarioB: constantMultiply(chemicalDemand.scenarioB, 0.3),
  }),
);


