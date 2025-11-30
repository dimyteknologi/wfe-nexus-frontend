import { createSelector } from "@reduxjs/toolkit";
import {
  selectContextSpecificActive,
  // selectContextSpecificBaseline,
} from "../baseSelector";
import {
  selectedContextSpecificA,
  selectedContextSpecificB,
} from "./scenarioProjectionSelector";
import {
  constantDevided,
  constantMultiply,
  resultConverter,
} from "@/lib/utils/formulas";
import { FOOD_AND_YIELD } from "@/lib/constant/initialDataContext.constans";
import { ContextSpecificState } from "@/stores/slicers/contextSpecificInputSlicer";

const VARIETY_KEYS = [
  "Inpari32",
  "Ciherang",
  "Mekongga",
  "HipaSeries",
  "Lokal",
] as const;
type Variety = (typeof VARIETY_KEYS)[number];

const DEMAND_KEYS = {
  WATER_CONSUMPTION_UNIT: "WATER_CONSUMPTION_UNIT",
  CHEMICAL_FERTILIZER_DEMAND: "CHEMICAL_FERTILIZER_DEMAND",
  ORGANIC_FERTILIZER_DEMAND: "ORGANIC_FERTILIZER_DEMAND",
} as const;

type DemandKey = keyof typeof DEMAND_KEYS;

const ENERGY_KEYS = {
  LAND_PROCESSING: "LAND_PROCESSING",
  PLANTING_AND_MAINTENANCE: "PLANTING_AND_MAINTENANCE",
  IRRIGATION: "IRRIGATION",
  HARVEST_AND_TRANSPORT: "HARVEST_AND_TRANSPORT",
} as const;

type EnergyKey = keyof typeof ENERGY_KEYS;

export const varietas = [
  "Inpari32",
  "Ciherang",
  "Lokal",
  "HipaSeries",
  "Mekongga",
] as const;

export type Varietas = (typeof varietas)[number];

export const scenarios = [
  "active",
  // "baseline",
  "scenarioA",
  "scenarioB",
] as const;

export type Scenario = (typeof scenarios)[number];

export type VarietasData = Record<Scenario, number[]>;

export type PaddyFieldComparison = Record<Scenario, Record<Varietas, number[]>>;

const DEMAND_INPUT: Record<Variety, Record<DemandKey, number>> = {
  Inpari32: {
    WATER_CONSUMPTION_UNIT: FOOD_AND_YIELD.INPARI_32.WATER_CONSUMPTION_UNIT,
    CHEMICAL_FERTILIZER_DEMAND:
      FOOD_AND_YIELD.INPARI_32.CHEMICAL_FERTILIZER_DEMAND,
    ORGANIC_FERTILIZER_DEMAND:
      FOOD_AND_YIELD.INPARI_32.ORGANIC_FERTILIZER_DEMAND,
  },
  Ciherang: {
    WATER_CONSUMPTION_UNIT: FOOD_AND_YIELD.CIHERANG.WATER_CONSUMPTION_UNIT,
    CHEMICAL_FERTILIZER_DEMAND:
      FOOD_AND_YIELD.CIHERANG.CHEMICAL_FERTILIZER_DEMAND,
    ORGANIC_FERTILIZER_DEMAND:
      FOOD_AND_YIELD.CIHERANG.ORGANIC_FERTILIZER_DEMAND,
  },
  Mekongga: {
    WATER_CONSUMPTION_UNIT: FOOD_AND_YIELD.MEKONGGA.WATER_CONSUMPTION_UNIT,
    CHEMICAL_FERTILIZER_DEMAND:
      FOOD_AND_YIELD.MEKONGGA.CHEMICAL_FERTILIZER_DEMAND,
    ORGANIC_FERTILIZER_DEMAND:
      FOOD_AND_YIELD.MEKONGGA.ORGANIC_FERTILIZER_DEMAND,
  },
  HipaSeries: {
    WATER_CONSUMPTION_UNIT: FOOD_AND_YIELD.HIPASERRIES.WATER_CONSUMPTION_UNIT,
    CHEMICAL_FERTILIZER_DEMAND:
      FOOD_AND_YIELD.HIPASERRIES.CHEMICAL_FERTILIZER_DEMAND,
    ORGANIC_FERTILIZER_DEMAND:
      FOOD_AND_YIELD.HIPASERRIES.ORGANIC_FERTILIZER_DEMAND,
  },
  Lokal: {
    WATER_CONSUMPTION_UNIT: FOOD_AND_YIELD.LOKAL.WATER_CONSUMPTION_UNIT,
    CHEMICAL_FERTILIZER_DEMAND: FOOD_AND_YIELD.LOKAL.CHEMICAL_FERTILIZER_DEMAND,
    ORGANIC_FERTILIZER_DEMAND: FOOD_AND_YIELD.LOKAL.ORGANIC_FERTILIZER_DEMAND,
  },
};

const ENERGY_INPUT: Record<Variety, Record<EnergyKey, number>> = {
  Inpari32: FOOD_AND_YIELD.INPARI_32.ENERGY_DEMAND,
  Ciherang: FOOD_AND_YIELD.CIHERANG.ENERGY_DEMAND,
  Mekongga: FOOD_AND_YIELD.MEKONGGA.ENERGY_DEMAND,
  HipaSeries: FOOD_AND_YIELD.HIPASERRIES.ENERGY_DEMAND,
  Lokal: FOOD_AND_YIELD.LOKAL.ENERGY_DEMAND,
};

export const sumArrayData = (...arrays: number[][]): number[] => {
  if (arrays.length === 0) return Array(16).fill(0);
  const result: number[] = new Array(16).fill(0);

  for (const arr of arrays) {
    for (let i = 0; i < 16; i++) {
      result[i] += arr[i];
    }
  }
  return result;
};

export const multiplyArrayData = (...arrays: number[][]): number[] =>
  Array.from({ length: 16 }, (_, i) =>
    arrays.reduce((acc, arr) => acc * (arr[i] ?? 1), 1),
  );

const calculatePaddyPeryieldPerseed = (
  value: number,
  conversionRate: number,
) => {
  const years = Array.from({ length: 16 });
  const values: number[] = [];

  const rate = conversionRate / 100;

  for (let i = 0; i < years.length; i++) {
    values.push(Number(value.toFixed(10)));
    value = value * (1 - rate);
  }

  return values;
};

export const calculateDevidedArrays = (arr1: number[], arr2: number[]) => {
  if (!Array.isArray(arr1) && !Array.isArray(arr2)) return Array(16).fill(0);

  const result = arr1.map((val, i) => {
    const denominator = arr2[i] ?? 0;
    return denominator !== 0
      ? Number(((val / denominator) * 100).toFixed(10))
      : 0;
  });

  return result;
};

const additionalCompute = (
  key: DemandKey,
  value: number,
  extraKey?: ContextSpecificState,
  extraVariety?: Variety,
) => {
  switch (key) {
    case "WATER_CONSUMPTION_UNIT":
      return value;
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

const calculateDemand = (
  shares: Record<Variety, number[]>,
  key: DemandKey,
  extraKey?: ContextSpecificState,
) => {
  const years = shares.Inpari32.length;
  const result = Array(years).fill(0);
  for (let i = 0; i < years; i++) {
    let total = 0;
    for (const variety of VARIETY_KEYS) {
      total +=
        (shares[variety][i] / 100) *
        additionalCompute(key, DEMAND_INPUT[variety][key], extraKey, variety);
    }
    result[i] = Number(total.toFixed(10));
  }

  return result;
};

const calculateEnergyDemand = (
  shares: Record<Variety, number[]>,
  key: EnergyKey,
) => {
  const years = shares.Inpari32.length;
  const result = Array(years).fill(0);
  for (let i = 0; i < years; i++) {
    let total = 0;
    for (const variety of VARIETY_KEYS) {
      total += (shares[variety][i] / 100) * ENERGY_INPUT[variety][key];
    }
    result[i] = Number(total.toFixed(10));
  }

  return result;
};

export const createPaddySelector = (varietyKey: string) => {
  return createSelector(
    [
      selectContextSpecificActive,
      // selectContextSpecificBaseline,
      selectedContextSpecificA,
      selectedContextSpecificB,
    ],
    (activeState, scenarioAState, scenarioBState) => {
      const areaKey = `area${varietyKey}`;
      const convKey = `conversion${varietyKey}`;

      return {
        active: calculatePaddyPeryieldPerseed(
          activeState.agriculture[areaKey]["2015-2030"],
          activeState.agriculture[convKey]["2015-2030"],
        ),

        // baseline: calculatePaddyPeryieldPerseed(
        //     baselineState.agriculture[areaKey]["2015-2030"],
        //     baselineState.agriculture[convKey]["2015-2030"]
        // ),

        scenarioA: calculatePaddyPeryieldPerseed(
          scenarioAState ? scenarioAState.agriculture[areaKey]["2015-2030"] : 0,
          scenarioAState ? scenarioAState.agriculture[convKey]["2015-2030"] : 0,
        ),

        scenarioB: calculatePaddyPeryieldPerseed(
          scenarioBState ? scenarioBState.agriculture[areaKey]["2015-2030"] : 0,
          scenarioBState ? scenarioBState.agriculture[convKey]["2015-2030"] : 0,
        ),
      };
    },
  );
};

export const selectInpari32 = createPaddySelector("Inpari32");
export const selectCiherang = createPaddySelector("Ciherang");
export const selectLokal = createPaddySelector("Lokal");
export const selectMekongga = createPaddySelector("Mekongga");
export const selectHipaSeries = createPaddySelector("HipaSeries");

export const selectPaddyPerFieldPerYieldComparisson = createSelector(
  [
    selectInpari32,
    selectCiherang,
    selectLokal,
    selectHipaSeries,
    selectMekongga,
  ],
  (
    Inpari32: VarietasData,
    Ciherang: VarietasData,
    Lokal: VarietasData,
    HipaSeries: VarietasData,
    Mekongga: VarietasData,
  ): PaddyFieldComparison => {
    const dataMap: Record<Varietas, VarietasData> = {
      Inpari32,
      Ciherang,
      Lokal,
      HipaSeries,
      Mekongga,
    };

    const result = {} as PaddyFieldComparison;

    scenarios.forEach((scenario) => {
      const total = sumArrayData(...varietas.map((v) => dataMap[v][scenario]));

      result[scenario] = Object.fromEntries(
        varietas.map((v) => [
          v,
          calculateDevidedArrays(dataMap[v][scenario], total),
        ]),
      ) as Record<Varietas, number[]>;
    });

    return result;
  },
);

export const selectWaterDemandAveragePerScenario = createSelector(
  [selectPaddyPerFieldPerYieldComparisson],
  (shares) => ({
    active: calculateDemand(shares.active, "WATER_CONSUMPTION_UNIT"),
    // baseline: calculateDemand(shares.baseline, "WATER_CONSUMPTION_UNIT"),
    scenarioA: calculateDemand(shares.scenarioA, "WATER_CONSUMPTION_UNIT"),
    scenarioB: calculateDemand(shares.scenarioB, "WATER_CONSUMPTION_UNIT"),
  }),
);

export const selectChemicalDemandAveragePerScenario = createSelector(
  [
    selectPaddyPerFieldPerYieldComparisson,
    selectContextSpecificActive,
    // selectContextSpecificBaseline,
    selectedContextSpecificA,
    selectedContextSpecificB,
  ],
  (shares, active, scenarioA, scenarioB) => {
    return {
      active: calculateDemand(
        shares.active,
        "CHEMICAL_FERTILIZER_DEMAND",
        active,
      ),
      // baseline: calculateDemand(shares.baseline, "CHEMICAL_FERTILIZER_DEMAND", baseline),
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
    selectPaddyPerFieldPerYieldComparisson,
    selectContextSpecificActive,
    // selectContextSpecificBaseline,
    selectedContextSpecificA,
    selectedContextSpecificB,
  ],
  (shares, active, scenarioA, scenarioB) => {
    return {
      active: calculateDemand(
        shares.active,
        "ORGANIC_FERTILIZER_DEMAND",
        active,
      ),
      // baseline: calculateDemand(shares.baseline, "ORGANIC_FERTILIZER_DEMAND", baseline),
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
  createSelector([selectPaddyPerFieldPerYieldComparisson], (shares) => ({
    active: calculateEnergyDemand(shares.active, "LAND_PROCESSING"),
    // baseline: calculateEnergyDemand(shares.baseline, "LAND_PROCESSING"),
    scenarioA: calculateEnergyDemand(shares.scenarioA, "LAND_PROCESSING"),
    scenarioB: calculateEnergyDemand(shares.scenarioB, "LAND_PROCESSING"),
  }));

export const selectEnergyPlantingAndMaintenanceDemandAveragePerScenario =
  createSelector([selectPaddyPerFieldPerYieldComparisson], (shares) => ({
    active: calculateEnergyDemand(shares.active, "PLANTING_AND_MAINTENANCE"),
    // baseline: calculateEnergyDemand(shares.baseline, "PLANTING_AND_MAINTENANCE"),
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
  [selectPaddyPerFieldPerYieldComparisson],
  (shares) => ({
    active: calculateEnergyDemand(shares.active, "IRRIGATION"),
    // baseline: calculateEnergyDemand(shares.baseline, "IRRIGATION"),
    scenarioA: calculateEnergyDemand(shares.scenarioA, "IRRIGATION"),
    scenarioB: calculateEnergyDemand(shares.scenarioB, "IRRIGATION"),
  }),
);

export const selectEnergyHarvestAndTransportDemandAveragePerScenario =
  createSelector([selectPaddyPerFieldPerYieldComparisson], (shares) => ({
    active: calculateEnergyDemand(shares.active, "HARVEST_AND_TRANSPORT"),
    // baseline: calculateEnergyDemand(shares.baseline, "HARVEST_AND_TRANSPORT"),
    scenarioA: calculateEnergyDemand(shares.scenarioA, "HARVEST_AND_TRANSPORT"),
    scenarioB: calculateEnergyDemand(shares.scenarioB, "HARVEST_AND_TRANSPORT"),
  }));

export const selectTotalEnergyDemandAveragePerScenario = createSelector(
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
  ) => ({
    active: sumArrayData(
      landProcessing.active,
      plantingAndMaintenance.active,
      irrigation.active,
      harvestAndTransport.active,
    ),
    // baseline: sumArrayData(
    //   landProcessing.baseline,
    //   plantingAndMaintenance.baseline,
    //   irrigation.baseline,
    //   harvestAndTransport.baseline
    // ),
    scenarioA: sumArrayData(
      landProcessing.scenarioA,
      plantingAndMaintenance.scenarioA,
      irrigation.scenarioA,
      harvestAndTransport.scenarioA,
    ),
    scenarioB: sumArrayData(
      landProcessing.scenarioB,
      plantingAndMaintenance.scenarioB,
      irrigation.scenarioB,
      harvestAndTransport.scenarioB,
    ),
  }),
);

export const selectLandPaddyFieldPerScenario = createSelector(
  [
    selectInpari32,
    selectCiherang,
    selectLokal,
    selectHipaSeries,
    selectMekongga,
  ],
  (inpari32, ciherang, lokal, hipaseries, mekongga) => ({
    active: sumArrayData(
      inpari32.active,
      ciherang.active,
      lokal.active,
      hipaseries.active,
      mekongga.active,
    ),
    // baseline: sumArrayData(ciherang.baseline, lokal.baseline, hipaseries.baseline, mekongga.baseline),
    scenarioA: sumArrayData(
      ciherang.scenarioA,
      lokal.scenarioA,
      hipaseries.scenarioA,
      mekongga.scenarioA,
    ),
    scenarioB: sumArrayData(
      mekongga.scenarioB,
      hipaseries.scenarioB,
      lokal.scenarioB,
      ciherang.scenarioB,
      inpari32.scenarioB,
    ),
  }),
);

export const selectWaterDemandPerScenario = createSelector(
  [selectWaterDemandAveragePerScenario, selectLandPaddyFieldPerScenario],
  (waterDemand, paddyField) => ({
    active: multiplyArrayData(waterDemand.active, paddyField.active),
    // baseline: multiplyArrayData(waterDemand.baseline, paddyField.baseline),
    scenarioA: multiplyArrayData(waterDemand.scenarioA, paddyField.scenarioA),
    scenarioB: multiplyArrayData(waterDemand.scenarioB, paddyField.scenarioB),
  }),
);

export const selectChemicalDemandPerScenario = createSelector(
  [selectChemicalDemandAveragePerScenario, selectLandPaddyFieldPerScenario],
  (chemicalDemand, paddyField) => ({
    active: constantDevided(
      multiplyArrayData(chemicalDemand.active, paddyField.active),
      1000,
    ),
    // baseline: constantDevided(multiplyArrayData(chemicalDemand.baseline, paddyField.baseline), 1000),
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
  [selectOrganicDemandAveragePerScenario, selectLandPaddyFieldPerScenario],
  (organicDemand, paddyField) => ({
    active: constantDevided(
      multiplyArrayData(organicDemand.active, paddyField.active),
      1000,
    ),
    // baseline: constantDevided(multiplyArrayData(organicDemand.baseline, paddyField.baseline), 1000),
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
    selectLandPaddyFieldPerScenario,
  ],
  (landProcessing, paddyField) => ({
    active: multiplyArrayData(landProcessing.active, paddyField.active),
    // baseline: multiplyArrayData(landProcessing.baseline, paddyField.baseline),
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
      selectLandPaddyFieldPerScenario,
    ],
    (plantingAndMaintenance, paddyField) => ({
      active: multiplyArrayData(
        plantingAndMaintenance.active,
        paddyField.active,
      ),
      // baseline: multiplyArrayData(plantingAndMaintenance.baseline, paddyField.baseline),
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
    selectLandPaddyFieldPerScenario,
  ],
  (irrigation, paddyField) => ({
    active: multiplyArrayData(irrigation.active, paddyField.active),
    // baseline: multiplyArrayData(irrigation.baseline, paddyField.baseline),
    scenarioA: multiplyArrayData(irrigation.scenarioA, paddyField.scenarioA),
    scenarioB: multiplyArrayData(irrigation.scenarioB, paddyField.scenarioB),
  }),
);

export const selectEnergyHarvestAndTransportDemandTotalPerScenario =
  createSelector(
    [
      selectEnergyHarvestAndTransportDemandAveragePerScenario,
      selectLandPaddyFieldPerScenario,
    ],
    (harvestAndTransport, paddyField) => ({
      active: multiplyArrayData(harvestAndTransport.active, paddyField.active),
      // baseline: multiplyArrayData(harvestAndTransport.baseline, paddyField.baseline),
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

export const selectTotalEnergyDemandPerScenario = createSelector(
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
  ) => ({
    active: constantDevided(
      sumArrayData(
        landProcessing.active,
        plantingAndMaintenance.active,
        irrigation.active,
        harvestAndTransport.active,
      ),
      1000,
    ),
    // baseline: constantDevided(sumArrayData(
    //   landProcessing.baseline,
    //   plantingAndMaintenance.baseline,
    //   irrigation.baseline,
    //   harvestAndTransport.baseline
    // ), 1000),
    scenarioA: constantDevided(
      sumArrayData(
        landProcessing.scenarioA,
        plantingAndMaintenance.scenarioA,
        irrigation.scenarioA,
        harvestAndTransport.scenarioA,
      ),
      1000,
    ),
    scenarioB: constantDevided(
      sumArrayData(
        landProcessing.scenarioB,
        plantingAndMaintenance.scenarioB,
        irrigation.scenarioB,
        harvestAndTransport.scenarioB,
      ),
      1000,
    ),
  }),
);

export const selectNpkApplicationPerScenario = createSelector(
  [selectChemicalDemandPerScenario],
  (chemicalDemand) => ({
    active: constantMultiply(chemicalDemand.active, 0.3),
    // baseline: constantMultiply(chemicalDemand.baseline, 0.3),
    scenarioA: constantMultiply(chemicalDemand.scenarioA, 0.3),
    scenarioB: constantMultiply(chemicalDemand.scenarioB, 0.3),
  }),
);

export const selectFertilizerEmissionApplicationPerScenario = createSelector(
  [selectNpkApplicationPerScenario],
  (npkApplication) => ({
    active: constantMultiply(npkApplication.active, 0.49 * 298),
    // baseline: constantMultiply(npkApplication.baseline, 0.49 * 298),
    scenarioA: constantMultiply(npkApplication.scenarioA, 0.49 * 298),
    scenarioB: constantMultiply(npkApplication.scenarioB, 0.49 * 298),
  }),
);
