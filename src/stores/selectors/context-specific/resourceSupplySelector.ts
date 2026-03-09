import { createSelector } from "@reduxjs/toolkit";
import {
  calculateDevidedArrays,
  multiplyArrayData,
  selectChemicalDemandPerScenario,
  selectEnergyHarvestAndTransportDemandTotalPerScenario,
  selectEnergyLandProcessingDemandTotalPerScenario,
  selectEnergyPlantingAndMaintenanceDemandTotalPerScenario,
  selectOrganicDemandPerScenario,
  selectWaterDemandPerScenario,
  sumArrayData,
  selectNpkApplicationPerScenario,
  agricultureLandPerScenario,
  selectEnergyIrrigationDemandTotalPerScenario,
} from "./foodAndSupplyInputDemandSelector";
import {
  selectContextSpecificActive,
  selectContextSpecificBaseline,
  createDeepEqualSelector
} from "../baseSelector";
import {
  selectedContextSpecificA,
  selectedContextSpecificB,
  selectSolarPumpInputCapacitySelector,
} from "./scenarioProjectionSelector";
import {
  constantDevided,
  constantMultiply,
} from "@/lib/utils/formulas";
import { RESOURCE_SUPPLY_INPUT } from "@/lib/constant/resourceSupplyInput.constant";
import { ContextSpecificState } from "@/stores/slicers/contextSpecificInputSlicer";
import { GEOTHERMAL_INITIAL_DATA } from "@/lib/constant/initialDataContext.constans";
import { getGeothermalPotentialGeneration, getRatioSteamToElecticityGeneraion } from "./geothermalImpactSelector";


const EMPTY_ARRAY = Array(16).fill(0);
const ONE_ARRAY = Array(16).fill(1);

export const findResourceSupplyByTitle = (title: string) => {
  return RESOURCE_SUPPLY_INPUT.find((item) => item.title === title);
};

export const divideEnergy = (data: Record<string, number[]>) => ({
  active: constantDevided(constantDevided(data.active, 36.9), 1000),
  scenarioA: constantDevided(constantDevided(data.scenarioA, 36.9), 1000),
  scenarioB: constantDevided(constantDevided(data.scenarioB, 36.9), 1000),
});

export const selectEnergyLandProccessingPerScenario = createSelector(
  [selectEnergyLandProcessingDemandTotalPerScenario],
  (energy) => divideEnergy(energy),
);

export const selectEnergyPlantingAndMaintenancePerScenario = createSelector(
  [selectEnergyPlantingAndMaintenanceDemandTotalPerScenario],
  (energy) => divideEnergy(energy),
);

export const selectEnergyHarvestAndTransportPerScenario = createSelector(
  [selectEnergyHarvestAndTransportDemandTotalPerScenario],
  (energy) => divideEnergy(energy),
);


export const minArrayData = (...arrays: number[][]): number[] => {
  if (arrays.length === 0) return Array(16).fill(0);

  const result = [...arrays[0]];

  for (let a = 1; a < arrays.length; a++) {
    for (let i = 0; i < 16; i++) {
      result[i] -= arrays[a][i];
    }
  }

  return result;
};

export const minValueArrayData = (...arrays: number[][]): number[] => {
  if (arrays.length === 0) return Array(16).fill(0);

  const result: number[] = Array(16).fill(Infinity);

  for (let i = 0; i < 16; i++) {
    for (let a = 0; a < arrays.length; a++) {
      const value = arrays[a]?.[i] ?? Infinity;
      if (value < result[i]) {
        result[i] = value;
      }
    }

    if (!isFinite(result[i])) result[i] = 0;
  }

  return result;
};


const calculateWaterAllocationAgri = (
  supplyMinusGeoArr: number[],
  demandArr: number[],
) => {
  return supplyMinusGeoArr.map((supplyMinusGeo, i) => {
    const demand = demandArr[i] ?? 0;
    return Math.min(supplyMinusGeo, demand);
  });
};

const calculateGeothermalAllocation = (
  supply: number[],
  demandGeothermal: number[],
  availability: number[],
) => {
  return supply.map((supplyVal, i) => {
    const demand = demandGeothermal[i] ?? 0;
    const avail = availability[i] ?? 0;

    if (avail >= 1) {
      return demand;
    }

    return Math.min(supplyVal, demand);
  });
};

const calculateRainfallAvailabillity = (arr1: number[], arr2: number[]) => {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) return Array(16).fill(0);
  return arr1.map((val, i) => {
    const denominator = arr2[i] ?? 0;
    if (denominator === 0) return 0;

    return Number((val / denominator).toFixed(10));
  });
};


const calculateImpactWaterGeothermal = (
  allocationGeo: number[],
  demandGeo: number[],
) => {
  return allocationGeo.map((alloc, i) => {
    const demand = demandGeo[i] ?? 0;

    if (demand === 0) return 1;

    const ratio = alloc / demand;

    // if (ratio === 0) return 0;

    // if (ratio >= 1) return 1;

    // return 1 / (1 + Math.exp(-(ratio * 10 - 5)));
    return ratio;
  });
};

const sigmoidCache = new Map<number, number>();

const sigmoidImpactOptimized = (value: number): number => {
  if (value === 0) return 0;
  if (value >= 1) return 1;
  if (sigmoidCache.has(value)) return sigmoidCache.get(value)!;

  const result = 1 / (1 + Math.exp(-(value * 10 - 5)));
  sigmoidCache.set(value, result);
  return result;
};

const applySigmoidToArray = (arr: number[]) => {
  return arr.map((v) => sigmoidImpactOptimized(v));
};

const getWaterPumpDiesel = (
  data: number[],
  input?: ContextSpecificState
): number[] => {

  if (!input) return Array(data.length).fill(0);

  const result: number[] = [];

  const installedCapacity =
    input.diesel?.installedCapacity?.["2015-2030"] ?? 0;

  const calculatedValue =
    installedCapacity * 1000 / (1000 * 9.81 * 30) * (60 * 6 * 3600);

  for (let i = 0; i < data.length; i++) {
    if (data[i] <= 0) {
      result.push(calculatedValue);
    } else {
      result.push(0);
    }
  }

  return result;
};

const getRainfallDebit = (input?: ContextSpecificState): number[] => {
  if (!input) return Array(16).fill(0);

  const annualRainfall = input.rainfall?.annualRainfall?.["2015-2030"] ?? 0;
  const areaSize = input.rainfall?.areaSize?.["2015-2030"] ?? 0;

  return Array(16).fill((annualRainfall / 1000) * areaSize * 10000);
};

const geothermalCapaccity = (inputs?: ContextSpecificState) => {
  if (!inputs) {
    return EMPTY_ARRAY;
  }
  const units = inputs.geothermal?.installedUnit["2025-2034"] ?? 0;
  const cap = inputs.geothermal?.capacityPerUnit["2025-2034"] ?? 0;
  const result = units * cap;
  return Array(16).fill(result);
};


// export const selectInstalledCapacityPerScenario = createSelector(
//   [() => RESOURCE_SUPPLY_INPUT],
//   (resourceInput) => {
//     const geothermal =
//       resourceInput.find((item) => item.title === "Geothermal capacity")
//         ?.values ?? Array(16).fill(0);

//     return {
//       active: geothermal,
//       scenarioA: geothermal,
//       scenarioB: geothermal,
//     };
//   },
// );

export const selectPotentialGenerationPerScenario = createSelector(
  [selectContextSpecificActive, selectContextSpecificBaseline,
    selectedContextSpecificA,
    selectedContextSpecificB],
  (active, baseline, scenarioA, scenarioB) => ({
    active: getGeothermalPotentialGeneration(active),
    baseline: getGeothermalPotentialGeneration(baseline ?? active),
    scenarioA: getGeothermalPotentialGeneration(scenarioA),
    scenarioB: getGeothermalPotentialGeneration(scenarioB),
  }),
);

export const selectWaterDemandforGeothermalPerScenario = createSelector(
  [selectPotentialGenerationPerScenario,
    selectContextSpecificActive, selectContextSpecificBaseline,
    selectedContextSpecificA,
    selectedContextSpecificB],
  (potentialGenerationPerScenario, active, baseline, scenarioA, scenarioB) => {
    const factor = 0.72 * 3.785;
    const utilizationOfSurfaceWater = (input?: ContextSpecificState) => {
      return input?.geothermal?.utilizationOfSurfaceWater?.["2025-2034"] ?? 0
    };
    return {
      active: constantMultiply(constantMultiply(potentialGenerationPerScenario.active, factor), utilizationOfSurfaceWater(active)),
      baseline: constantMultiply(constantMultiply(potentialGenerationPerScenario.baseline ?? potentialGenerationPerScenario.active, factor), utilizationOfSurfaceWater(baseline ?? active)),
      scenarioA: constantMultiply(constantMultiply(
        potentialGenerationPerScenario.scenarioA,
        factor
      ), utilizationOfSurfaceWater(scenarioA)),
      scenarioB: constantMultiply(constantMultiply(
        potentialGenerationPerScenario.scenarioB,
        factor,
      ), utilizationOfSurfaceWater(scenarioB))
    };
  },
);

// water consumption demand input as water demand for agriculture
export const selectTotalWaterDemandPerScenario = createDeepEqualSelector(
  [selectWaterDemandPerScenario,
    selectWaterDemandforGeothermalPerScenario],
  (waterDemandForAgriculture, geothermalWaterDemandPerScenario) => {
    const sumTwoArrays = (a: number[], b: number[]) => {
      const result = new Array(16);
      for (let i = 0; i < 16; i++) {
        result[i] = (a[i] ?? 0) + (b[i] ?? 0);
      }
      return result;
    }
    return {
      active: sumTwoArrays(
        waterDemandForAgriculture.active,
        geothermalWaterDemandPerScenario.active,
      ),
      baseline: sumTwoArrays(
        waterDemandForAgriculture.baseline ?? waterDemandForAgriculture.active,
        geothermalWaterDemandPerScenario.baseline ?? geothermalWaterDemandPerScenario.active,
      ),
      scenarioA: sumTwoArrays(
        waterDemandForAgriculture.scenarioA,
        geothermalWaterDemandPerScenario.scenarioA,
      ),
      scenarioB: sumTwoArrays(
        waterDemandForAgriculture.scenarioB,
        geothermalWaterDemandPerScenario.scenarioB,
      ),
    }
  },
);

// rainfall debit & surface water
export const selectWaterRainfallDebitPerScenario = createSelector(
  selectContextSpecificActive,
  selectContextSpecificBaseline,
  selectedContextSpecificA,
  selectedContextSpecificB,
  (active, baseline, scenarioA, scenarioB) => ({
    active: getRainfallDebit(active),
    baseline: getRainfallDebit(baseline ?? active),
    scenarioA: getRainfallDebit(scenarioA),
    scenarioB: getRainfallDebit(scenarioB),
  }),
);

export const selectSurfaceWaterPerScenario = createSelector(
  [selectWaterRainfallDebitPerScenario],
  (rainfalldebit) => ({
    active: constantMultiply(rainfalldebit.active, 0.74),
    baseline: constantMultiply(rainfalldebit.baseline ?? rainfalldebit.active, 0.74),
    scenarioA: constantMultiply(rainfalldebit.scenarioA, 0.74),
    scenarioB: constantMultiply(rainfalldebit.scenarioB, 0.74),
  })
)

export const selectWaterAvailableSurfacePerScenario = createSelector(
  selectSurfaceWaterPerScenario,
  (surfaceWater) => ({
    active: constantMultiply(surfaceWater.active, 1.0),
    baseline: constantMultiply(surfaceWater.baseline ?? surfaceWater.active, 1.0),
    scenarioA: constantMultiply(surfaceWater.scenarioA, 1.0),
    scenarioB: constantMultiply(surfaceWater.scenarioB, 1.0),
  }),
);

const calcDieselPumpCapacity = (
  input?: ContextSpecificState
): number[] => {
  if (!input) return Array(16).fill(0);

  const installedCapacity =
    input.diesel?.installedCapacity?.["2015-2030"] ?? 0;

  const factor = (60 * 6 * 3600) / (9.81 * 30);

  return Array(16).fill(installedCapacity * factor);
};

// current static value 0
const groundWaters = Array(16).fill(0);

export const selectGroundWaterPerScenario = createSelector(
  () => groundWaters,
  (gw) => ({
    active: gw,
    baseline: gw,
    scenarioA: gw,
    scenarioB: gw,
  }),
);

// export const selectGroundWaterWithdrawalPerScenario = createSelector(
//   () => {
//     return {
//       active: EMPTY_ARRAY,
//       baseline: EMPTY_ARRAY,
//       scenarioA: EMPTY_ARRAY,
//       scenarioB: EMPTY_ARRAY,
//     };
//   },
// );

// sum Available surface water, Ground water, Ground water withdrawal
export const selectSumWaterGroundWaterWithdrawal = createSelector(
  selectWaterAvailableSurfacePerScenario,
  selectGroundWaterPerScenario,
  // selectGroundWaterWithdrawalPerScenario,
  // (surfaceWater, groundWater, groundWaterWithdrawal) => ({
  (surfaceWater, groundWater) => ({
    active: sumArrayData(
      surfaceWater.active,
      groundWater.active,
      EMPTY_ARRAY,
    ),
    baseline: sumArrayData(surfaceWater.baseline, groundWater.baseline, EMPTY_ARRAY),
    scenarioA: sumArrayData(
      surfaceWater.scenarioA,
      groundWater.scenarioA,
      EMPTY_ARRAY,
    ),
    scenarioB: sumArrayData(
      surfaceWater.scenarioB,
      groundWater.scenarioB,
      EMPTY_ARRAY,
    ),
  }),
);

export const selectWaterGapPerScenario = createSelector(
  selectWaterDemandPerScenario,
  // selectWaterPumpDieselPerScenario,
  selectWaterAvailableSurfacePerScenario,
  (waterDemandForAgriculture, waterSurface) => ({
    active: minArrayData(waterDemandForAgriculture.active, waterSurface.active),
    baseline: minArrayData(waterDemandForAgriculture.baseline ?? waterDemandForAgriculture.active, waterSurface.baseline ?? waterSurface.active),
    scenarioA: minArrayData(waterDemandForAgriculture.scenarioA, waterSurface.scenarioA),
    scenarioB: minArrayData(waterDemandForAgriculture.scenarioB, waterSurface.scenarioB),
  }),
);

export const selectSolarWaterPumpPerScenario = createSelector(
  selectSolarPumpInputCapacitySelector,
  selectWaterGapPerScenario,
  (solarPump, waterGap) => {
    const numeratorFactor = 6 * 365 * 3600;
    const denominatorFactor = 9.81 * 30;
    const calculate = (pump: number[], gap: number[]) =>
      minValueArrayData(
        constantDevided(constantMultiply(constantMultiply(pump, 0.8), numeratorFactor), denominatorFactor),
        gap
      );
    console
    return {
      active: calculate(solarPump.active, waterGap.active),
      baseline: calculate(solarPump.baseline ?? solarPump.active, waterGap.baseline ?? waterGap.active),
      scenarioA: calculate(solarPump.scenarioA, waterGap.scenarioA),
      scenarioB: calculate(solarPump.scenarioB, waterGap.scenarioB),
    };
  }
);

export const selectWaterPumpDieselPerScenario = createSelector(
  [selectContextSpecificActive, selectContextSpecificBaseline, selectedContextSpecificA, selectedContextSpecificB, selectSolarWaterPumpPerScenario],
  (activeState, baseline, scenarioA, scenarioB, waterPump) => ({
    active: getWaterPumpDiesel(waterPump.active, activeState),
    baseline: getWaterPumpDiesel(waterPump.baseline ?? waterPump.active, baseline ?? activeState),
    scenarioA: getWaterPumpDiesel(waterPump.scenarioA, scenarioA),
    scenarioB: getWaterPumpDiesel(waterPump.scenarioB, scenarioB),
  })
)

export const selectSupplyWaterTotalPerScenario = createSelector(
  [
    selectSolarWaterPumpPerScenario,
    selectWaterAvailableSurfacePerScenario,
    selectWaterPumpDieselPerScenario
  ],
  (solarPump, surfaceWater, waterDiesel) => {
    return {
      active: sumArrayData(solarPump.active, sumArrayData(surfaceWater.active, waterDiesel.active)),
      baseline: sumArrayData(solarPump.baseline ?? solarPump.active, sumArrayData(
        surfaceWater.baseline ?? surfaceWater.active,
        waterDiesel.baseline ?? waterDiesel.active,
      )),
      scenarioA: sumArrayData(solarPump.scenarioA, sumArrayData(
        surfaceWater.scenarioA,
        waterDiesel.scenarioA,
      )),
      scenarioB: sumArrayData(solarPump.scenarioB, sumArrayData(
        surfaceWater.scenarioB,
        waterDiesel.scenarioB,
      )),
    }
  },
);

export const selectWaterAllocationForAgriPerScenario = createSelector(
  [
    selectSupplyWaterTotalPerScenario,
    selectWaterDemandforGeothermalPerScenario,
    selectWaterDemandPerScenario,
  ],
  (supplyWater, waterGeothermal, waterDemandAgri) => {
    return {
      active: calculateWaterAllocationAgri(
        minArrayData(supplyWater.active, waterGeothermal.active),
        waterDemandAgri.active,
      ),
      baseline: calculateWaterAllocationAgri(
        minArrayData(supplyWater.baseline ?? supplyWater.active, waterGeothermal.baseline ?? waterGeothermal.active),
        waterDemandAgri.baseline ?? waterDemandAgri.active,
      ),
      scenarioA: calculateWaterAllocationAgri(
        minArrayData(supplyWater.scenarioA, waterGeothermal.scenarioA),
        waterDemandAgri.scenarioA,
      ),
      scenarioB: calculateWaterAllocationAgri(
        minArrayData(supplyWater.scenarioB, waterGeothermal.scenarioB),
        waterDemandAgri.scenarioB,
      ),
    }
  },
);

export const selectRainfallAvailabilltyPerScenario = createSelector(
  [selectWaterAllocationForAgriPerScenario, selectTotalWaterDemandPerScenario],
  (waterAllocAgri, totalWater) => ({
    active: calculateRainfallAvailabillity(
      waterAllocAgri.active,
      totalWater.active,
    ),
    baseline: calculateRainfallAvailabillity(waterAllocAgri.baseline, totalWater.baseline),
    scenarioA: calculateRainfallAvailabillity(
      waterAllocAgri.scenarioA,
      totalWater.scenarioA,
    ),
    scenarioB: calculateRainfallAvailabillity(
      waterAllocAgri.scenarioB,
      totalWater.scenarioB,
    ),
  }),
);

export const selectWaterAllocationForGeoPerScenario = createSelector(
  [
    selectRainfallAvailabilltyPerScenario,
    selectSupplyWaterTotalPerScenario,
    selectWaterDemandforGeothermalPerScenario,
  ],
  (availability, supplyWater, demandGeothermal) => ({
    active: calculateGeothermalAllocation(
      supplyWater.active,
      demandGeothermal.active,
      availability.active,
    ),
    baseline: calculateGeothermalAllocation(
      supplyWater.baseline ?? supplyWater.active,
      demandGeothermal.baseline ?? demandGeothermal.active,
      availability.baseline ?? availability.active,
    ),
    scenarioA: calculateGeothermalAllocation(
      supplyWater.scenarioA,
      demandGeothermal.scenarioA,
      availability.scenarioA,
    ),
    scenarioB: calculateGeothermalAllocation(
      supplyWater.scenarioB,
      demandGeothermal.scenarioB,
      availability.scenarioB,
    ),
  }),
);

// export const selectImpactOfWaterAvailabilityForAgri = createSelector(
//   [selectWaterAllocationForAgriPerScenario, selectWaterDemandPerScenario],
//   (allocationAgri, demandAgri) => {
//     return {
//       active: calculateImpactWaterAgri(allocationAgri.active, demandAgri.active),
//       baseline: calculateImpactWaterAgri(
//         allocationAgri.baseline ?? allocationAgri.active,
//         demandAgri.baseline ?? demandAgri.active,
//       ),
//       scenarioA: calculateImpactWaterAgri(
//         allocationAgri.scenarioA,
//         demandAgri.scenarioA,
//       ),
//       scenarioB: calculateImpactWaterAgri(
//         allocationAgri.scenarioB,
//         demandAgri.scenarioB,
//       ),
//     }
//   }
// );

export const selectImpactOfWaterAvailabilityForAgri = createSelector(
  [selectRainfallAvailabilltyPerScenario],
  (rainfallAvailabillity) => {
    return {
      active: rainfallAvailabillity.active,
      baseline: rainfallAvailabillity.baseline,
      scenarioA: rainfallAvailabillity.scenarioA,
      scenarioB: rainfallAvailabillity.scenarioB,
    }
  }
);

export const selectImpactOfWaterAvailabilityForGeothermal = createSelector(
  [
    selectWaterAllocationForGeoPerScenario,
    selectWaterDemandforGeothermalPerScenario,
  ],
  (allocationGeo, demandGeo) => ({
    active: calculateImpactWaterGeothermal(
      allocationGeo.active,
      demandGeo.active,
    ),
    baseline: calculateImpactWaterGeothermal(
      allocationGeo.baseline ?? allocationGeo.active,
      demandGeo.baseline ?? demandGeo.active,
    ),
    scenarioA: calculateImpactWaterGeothermal(
      allocationGeo.scenarioA,
      demandGeo.scenarioA,
    ),
    scenarioB: calculateImpactWaterGeothermal(
      allocationGeo.scenarioB,
      demandGeo.scenarioB,
    ),
  }),
);


// geothermal impact
export const selectGeothermalActualGenerationPerScenario = createDeepEqualSelector(
  [
    selectContextSpecificActive,
    selectContextSpecificBaseline,
    selectedContextSpecificA,
    selectedContextSpecificB,
    selectImpactOfWaterAvailabilityForGeothermal
  ],
  (active, baseline, scenarioA, scenarioB, waterImpactGeo) => {
    return {
      active: multiplyArrayData(
        waterImpactGeo.active,
        getGeothermalPotentialGeneration(active)
      ),

      baseline: multiplyArrayData(
        waterImpactGeo.baseline ?? waterImpactGeo.active,
        getGeothermalPotentialGeneration(baseline ?? active)
      ),

      scenarioA: multiplyArrayData(
        waterImpactGeo.scenarioA,
        getGeothermalPotentialGeneration(scenarioA)
      ),

      scenarioB: multiplyArrayData(
        waterImpactGeo.scenarioB,
        getGeothermalPotentialGeneration(scenarioB)
      ),
    };
  }
);


export const selectPotentialExcessSteamToUse = createSelector(
  [
    selectContextSpecificActive,
    selectContextSpecificBaseline,
    selectedContextSpecificA,
    selectedContextSpecificB,
    selectGeothermalActualGenerationPerScenario
  ],
  (active, baseline, scenarioA, scenarioB, geoActualGeneration) => {
    const conversionFactor = 0.7 * 2450 / 1000 / 3600;

    return {
      active: constantMultiply(
        multiplyArrayData(
          geoActualGeneration.active,
          getRatioSteamToElecticityGeneraion(active)
        ),
        conversionFactor
      ),

      baseline: constantMultiply(
        multiplyArrayData(
          geoActualGeneration.baseline ?? geoActualGeneration.active,
          getRatioSteamToElecticityGeneraion(baseline ?? active)
        ),
        conversionFactor
      ),

      scenarioA: constantMultiply(
        multiplyArrayData(
          geoActualGeneration.scenarioA,
          getRatioSteamToElecticityGeneraion(scenarioA)
        ),
        conversionFactor
      ),

      scenarioB: constantMultiply(
        multiplyArrayData(
          geoActualGeneration.scenarioB,
          getRatioSteamToElecticityGeneraion(scenarioB)
        ),
        conversionFactor
      ),
    };
  }
);

export const potentialDryingAgriAndFinalProcessing = createSelector(
  [
    selectContextSpecificActive,
    selectContextSpecificBaseline,
    selectedContextSpecificA,
    selectedContextSpecificB,
    selectPotentialExcessSteamToUse
  ],
  (active, baseline, scenarioA, scenarioB, potentialExcessSteamToUse) => {
    const constantFactor = GEOTHERMAL_INITIAL_DATA.STANDARD_ENERGY_FOR_RICE_DRYING;

    return {
      active: constantDevided(constantMultiply(potentialExcessSteamToUse.active, 1000000), constantFactor),
      baseline: constantDevided(constantMultiply(potentialExcessSteamToUse.baseline ?? potentialExcessSteamToUse.active, 1000000), constantFactor),
      scenarioA: constantDevided(constantMultiply(potentialExcessSteamToUse.scenarioA, 1000000), constantFactor),
      scenarioB: constantDevided(constantMultiply(potentialExcessSteamToUse.scenarioB, 1000000), constantFactor),
    };
  }
);



export const selectActualGenerationPerScenario = createSelector(
  [
    selectPotentialGenerationPerScenario,
    selectImpactOfWaterAvailabilityForGeothermal,
  ],
  (potentialWater, impactWater) => ({
    active: multiplyArrayData(potentialWater.active, impactWater.active),
    baseline: multiplyArrayData(potentialWater.baseline ?? potentialWater.active, impactWater.baseline ?? impactWater.active),
    scenarioA: multiplyArrayData(
      potentialWater.scenarioA,
      impactWater.scenarioA,
    ),
    scenarioB: multiplyArrayData(
      potentialWater.scenarioB,
      impactWater.scenarioB,
    ),
  }),
);

export const selectActualCiPerScenario = createSelector(
  [selectImpactOfWaterAvailabilityForAgri, selectContextSpecificActive, selectContextSpecificBaseline, selectedContextSpecificA, selectedContextSpecificB],
  (impactAgri, activeState, baseline, scenarioA, scenarioB) => {
    const getCroppingInput = (scenario: ContextSpecificState) => (scenario?.agriculture?.croppingIntensity?.["2015-2030"] ?? 0);

    return {
      active: constantMultiply(impactAgri.active, getCroppingInput(activeState)),
      baseline: constantMultiply(impactAgri.baseline ?? impactAgri.active, getCroppingInput(baseline ?? activeState)),
      scenarioA: constantMultiply(impactAgri.scenarioA, getCroppingInput(scenarioA)),
      scenarioB: constantMultiply(impactAgri.scenarioB, getCroppingInput(scenarioB)),
    }
  }
)

export const selectFertilizerEmissionApplicationPerScenario = createSelector(
  [selectNpkApplicationPerScenario, selectActualCiPerScenario],
  (npkApplication, actualCi) => ({
    active: multiplyArrayData(constantMultiply(npkApplication.active, 0.49 * 298), actualCi.active),
    baseline: multiplyArrayData(constantMultiply(npkApplication.baseline ?? npkApplication.active, 0.49 * 298), actualCi.baseline ?? actualCi.active),
    scenarioA: multiplyArrayData(constantMultiply(npkApplication.scenarioA, 0.49 * 298), actualCi.scenarioA),
    scenarioB: multiplyArrayData(constantMultiply(npkApplication.scenarioB, 0.49 * 298), actualCi.scenarioB),
  }),
);

// energy

export const selectLandProcessingExcludeIrrigationPerScenario = createSelector(
  [selectActualCiPerScenario, selectEnergyLandProcessingDemandTotalPerScenario],
  (actualCi, landProcessing) => ({
    active: constantDevided(
      multiplyArrayData(
        constantDevided(actualCi.active, 36.9),
        landProcessing.active
      ),
      1000
    ),
    baseline: constantDevided(
      multiplyArrayData(
        constantDevided(actualCi.baseline ?? actualCi.active, 36.9),
        landProcessing.baseline ?? landProcessing.active
      ),
      1000
    ),
    scenarioA: constantDevided(
      multiplyArrayData(
        constantDevided(actualCi.scenarioA, 36.9),
        landProcessing.scenarioA
      ),
      1000
    ),
    scenarioB: constantDevided(
      multiplyArrayData(
        constantDevided(actualCi.scenarioB, 36.9),
        landProcessing.scenarioB
      ),
      1000
    ),
  })
)

export const selectPlantingAndMaintenanceExcludeIrrigationPerScenario = createSelector(
  [selectActualCiPerScenario, selectEnergyPlantingAndMaintenanceDemandTotalPerScenario],
  (actualCi, plantingMaintenance) => ({
    active: constantDevided(
      multiplyArrayData(
        constantDevided(actualCi.active, 36.9),
        plantingMaintenance.active
      ),
      1000
    ),
    baseline: constantDevided(
      multiplyArrayData(
        constantDevided(actualCi.baseline, 36.9),
        plantingMaintenance.baseline
      ),
      1000
    ),
    scenarioA: constantDevided(
      multiplyArrayData(
        constantDevided(actualCi.scenarioA, 36.9),
        plantingMaintenance.scenarioA
      ),
      1000
    ),
    scenarioB: constantDevided(
      multiplyArrayData(
        constantDevided(actualCi.scenarioB, 36.9),
        plantingMaintenance.scenarioB
      ),
      1000
    ),
  })
);

export const selectHarvestingAndTransportExcludeIrrigationPerScenario =
  createSelector(
    [
      selectActualCiPerScenario,
      selectEnergyIrrigationDemandTotalPerScenario,
      selectEnergyHarvestAndTransportDemandTotalPerScenario,
      selectContextSpecificActive,
      selectContextSpecificBaseline,
      selectedContextSpecificA,
      selectedContextSpecificB
    ],
    (actualCi, energyIri, energyHarvest, active, baseline, scenarioA, scenarioB) => {
      const DIVISOR = 36.9;

      const calculate = (
        energyIri: number[],
        energyHarvest: number[],
        actualCi: number[],
        solarWaterPump: number[]
      ): number[] =>
        energyIri.map((_, i) =>
          solarWaterPump[i] === 0
            ? ((energyIri[i] + energyHarvest[i]) / DIVISOR / 1000) *
            actualCi[i]
            : 0
        );

      return {
        active: calculate(
          energyIri.active,
          energyHarvest.active,
          actualCi.active,
          geothermalCapaccity(active)
        ),
        baseline: calculate(
          energyIri.baseline,
          energyHarvest.baseline,
          actualCi.baseline,
          geothermalCapaccity(baseline)
        ),
        scenarioA: calculate(
          energyIri.scenarioA,
          energyHarvest.scenarioA,
          actualCi.scenarioA,
          geothermalCapaccity(scenarioA)
        ),
        scenarioB: calculate(
          energyIri.scenarioB,
          energyHarvest.scenarioB,
          actualCi.scenarioB,
          geothermalCapaccity(scenarioB)
        ),
      };
    }
  );


export const selectSolarPumpElectricityPerGenerationPerScenario =
  createSelector([selectSolarPumpInputCapacitySelector], (solarPump) => {
    const calculate = (arr: number[]) =>
      constantDevided(
        constantMultiply(constantMultiply(constantMultiply(arr, 5), 0.8), 120),
        1000000,
      );
    return {
      active: calculate(solarPump.active),
      baseline: calculate(solarPump.baseline ?? solarPump.active),
      scenarioA: calculate(solarPump.scenarioA),
      scenarioB: calculate(solarPump.scenarioB),
    };
  });

export const selectChemicalFertillizerSupplyPerScenario = createSelector(
  [selectChemicalDemandPerScenario],
  (chemicalDemand) => {
    return {
      active: multiplyArrayData(chemicalDemand.active, ONE_ARRAY),
      baseline: multiplyArrayData(chemicalDemand.baseline, ONE_ARRAY),
      scenarioA: multiplyArrayData(chemicalDemand.scenarioA, ONE_ARRAY),
      scenarioB: multiplyArrayData(chemicalDemand.scenarioB, ONE_ARRAY),
    };
  },
);

export const selectOrganicFertillizerSupplyPerScenario = createSelector(
  [selectOrganicDemandPerScenario],
  (organicDemand) => {
    return {
      active: multiplyArrayData(organicDemand.active, ONE_ARRAY),
      baseline: multiplyArrayData(organicDemand.baseline, ONE_ARRAY),
      scenarioA: multiplyArrayData(organicDemand.scenarioA, ONE_ARRAY),
      scenarioB: multiplyArrayData(organicDemand.scenarioB, ONE_ARRAY),
    };
  },
);
export const selectChemicalFertillizerAvailabillityPerScenario = createSelector(
  [selectChemicalFertillizerSupplyPerScenario, selectChemicalDemandPerScenario],
  (supply, demand) => ({
    active: calculateDevidedArrays(supply.active, demand.active),
    baseline: calculateDevidedArrays(supply.baseline, demand.baseline),
    scenarioA: calculateDevidedArrays(supply.scenarioA, demand.scenarioA),
    scenarioB: calculateDevidedArrays(supply.scenarioB, demand.scenarioB),
  }),
);

export const selectOrganicFertillizerAvailabillityPerScenario = createSelector(
  [selectOrganicFertillizerSupplyPerScenario, selectOrganicDemandPerScenario],
  (supply, demand) => ({
    active: calculateDevidedArrays(supply.active, demand.active),
    baseline: calculateDevidedArrays(supply.baseline, demand.baseline),
    scenarioA: calculateDevidedArrays(supply.scenarioA, demand.scenarioA),
    scenarioB: calculateDevidedArrays(supply.scenarioB, demand.scenarioB),
  }),
);

export const selectFertillizerAvailabilityPerScenario = createSelector(
  [
    selectContextSpecificActive,
    selectContextSpecificBaseline,
    selectedContextSpecificA,
    selectedContextSpecificB,
    selectChemicalFertillizerAvailabillityPerScenario,
    selectOrganicFertillizerAvailabillityPerScenario,
  ],
  (active, baseline, scenarioA, scenarioB, chemicalAvail, organicAvail) => {
    const getChemicalPercentage = (scenario: ContextSpecificState) =>
      (scenario?.fertilizer?.percentageOfChemical?.["2015-2030"] ?? 0) / 100;

    const buildScenario = (
      scenario: ContextSpecificState,
      key: "active" | "baseline" | "scenarioA" | "scenarioB",
    ) => {
      const pct = getChemicalPercentage(scenario);

      return constantDevided(
        sumArrayData(
          constantMultiply(chemicalAvail[key], pct),
          constantMultiply(organicAvail[key], 1 - pct),
        ),
        100,
      );
    };

    return {
      active: buildScenario(active, "active"),
      baseline: buildScenario(baseline ?? active, "baseline"),
      scenarioA: buildScenario(scenarioA, "scenarioA"),
      scenarioB: buildScenario(scenarioB, "scenarioB"),
    };
  },
);

export const selectImpactOfFertillizerAvailabillity = createSelector(
  [selectFertillizerAvailabilityPerScenario],
  (fertilizerAvail) => {
    const formula = (value: number) => {
      if (value === 0) return 0;
      if (value >= 1) return 1;
      return 1 / (1 + Math.exp(-(value * 10 - 5)));
    };

    const applyFormulaToArray = (arr: number[]) => arr.map((v) => formula(v));

    return {
      active: applyFormulaToArray(fertilizerAvail.active),
      baseline: applyFormulaToArray(fertilizerAvail.baseline),
      scenarioA: applyFormulaToArray(fertilizerAvail.scenarioA),
      scenarioB: applyFormulaToArray(fertilizerAvail.scenarioB),
    };
  },
);

// Solves the array recursion crash by calculating Husk from the non-energy constrained ideal.
export const selectPotentialAgricultureLandProductionPerScenario = createDeepEqualSelector(
  [
    agricultureLandPerScenario,
    selectImpactOfWaterAvailabilityForAgri,
    selectImpactOfFertillizerAvailabillity,
    selectContextSpecificActive,
    selectContextSpecificBaseline,
    selectedContextSpecificA,
    selectedContextSpecificB,
  ],
  (land, waterAgriImpact, fertillizerImpact, active, baseline, scenarioA, scenarioB) => {
    const calculatePotentialProductivity = (input?: ContextSpecificState) => {
      if (!input) return 0;
      const base = input.agriculture?.baseYield["2015-2030"] ?? 0;
      const intensity = input.agriculture?.croppingIntensity["2015-2030"] ?? 0;
      return base * intensity;
    };

    const getBottleneckImpact = (
      water: number[],
      fertilizer: number[]
    ) => {
      const result = new Array(16);
      for (let i = 0; i < 16; i++) {
        result[i] = Math.min(water[i] ?? 0, fertilizer[i] ?? 0);
      }
      return result;
    }

    return {
      active: multiplyArrayData(
        constantMultiply(
          getBottleneckImpact(waterAgriImpact.active, fertillizerImpact.active),
          calculatePotentialProductivity(active),
        ),
        land.active,
      ),
      baseline: multiplyArrayData(
        constantMultiply(
          getBottleneckImpact(waterAgriImpact.baseline, fertillizerImpact.baseline),
          calculatePotentialProductivity(baseline)
        ),
        land.baseline
      ),
      scenarioA: multiplyArrayData(
        constantMultiply(
          getBottleneckImpact(waterAgriImpact.scenarioA, fertillizerImpact.scenarioA),
          calculatePotentialProductivity(scenarioA),
        ),
        land.scenarioA,
      ),
      scenarioB: multiplyArrayData(
        constantMultiply(
          getBottleneckImpact(waterAgriImpact.scenarioB, fertillizerImpact.scenarioB),
          calculatePotentialProductivity(scenarioB),
        ),
        land.scenarioB,
      ),
    }
  }
);

export const selectPotentialProductionTotalPerScenario = createSelector(
  [selectPotentialAgricultureLandProductionPerScenario],
  (land) => ({
    active: land.active,
    baseline: land.baseline,
    scenarioA: land.scenarioA,
    scenarioB: land.scenarioB,
  }),
);

export const selectHuskProductionPerScenario = createSelector(
  [selectPotentialProductionTotalPerScenario],
  (production) => {

    const shiftAndMultiply = (arr: number[], factor: number) => {
      return [0, ...arr.map((v) => v * factor)];
    };

    return {
      active: shiftAndMultiply(production.active, 0.23),
      baseline: shiftAndMultiply(production.baseline ?? production.active, 0.23),
      scenarioA: shiftAndMultiply(production.scenarioA, 0.23),
      scenarioB: shiftAndMultiply(production.scenarioB, 0.23),
    };
  }
);


export const selectHuskUtilizationPerScenario = createSelector(
  [
    selectHuskProductionPerScenario,
    selectContextSpecificActive,
    selectContextSpecificBaseline,
    selectedContextSpecificA,
    selectedContextSpecificB,
  ],
  (huskProduction, active, baseline, scenarioA, scenarioB) => {

    const toPercentage = (arr: number[]) => arr.map((v) => v / 100);

    return {
      active: multiplyArrayData(huskProduction.active, toPercentage(geothermalCapaccity(active))),
      baseline: multiplyArrayData(huskProduction.baseline ?? huskProduction.active, toPercentage(geothermalCapaccity(baseline))),
      scenarioA: multiplyArrayData(
        huskProduction.scenarioA,
        toPercentage(geothermalCapaccity(scenarioA)),
      ),
      scenarioB: multiplyArrayData(
        huskProduction.scenarioB,
        toPercentage(geothermalCapaccity(scenarioB)),
      ),
    };
  },
);

export const selectElectricityFromHuskPerScenario = createSelector(
  [selectHuskUtilizationPerScenario],
  (huskUtil) => ({
    active: constantDevided(
      constantMultiply(huskUtil.active, 3.8892 * 1000 * 0.25),
      1000000,
    ),
    baseline: constantDevided(constantMultiply(huskUtil.baseline ?? huskUtil.active, 3.8892 * 1000 * 0.25), 1000000),
    scenarioA: constantDevided(
      constantMultiply(huskUtil.scenarioA, 3.8892 * 1000 * 0.25),
      1000000,
    ),
    scenarioB: constantDevided(
      constantMultiply(huskUtil.scenarioB, 3.8892 * 1000 * 0.25),
      1000000,
    ),
  }),
);

export const selectServiceAreaOfSolarPumpPerScenario = createSelector(
  [
    selectSolarPumpInputCapacitySelector
  ],
  (solarpump) => ({
    active: constantMultiply(constantDevided(solarpump.active, 29.27246094), 50),
    baseline: constantMultiply(constantDevided(solarpump.baseline ?? solarpump.active, 29.27246094), 50),
    scenarioA: constantMultiply(constantDevided(solarpump.scenarioA, 29.27246094), 50),
    scenarioB: constantMultiply(constantDevided(solarpump.scenarioB, 29.27246094), 50),
  }),
);

// demand for pumping
export const selectPumpPowerDemandPerScenario = createSelector(
  [selectContextSpecificActive, selectContextSpecificBaseline, selectedContextSpecificA, selectedContextSpecificB],
  (active, baseline, scenarioA, scenarioB) => {
    const getInputValue = (scenario: ContextSpecificState) =>
      (scenario?.diesel?.installedCapacity?.["2015-2030"] ?? 0);
    return {
      active: Array(16).fill(getInputValue(active)),
      baseline: Array(16).fill(getInputValue(baseline ?? active)),
      scenarioA: Array(16).fill(getInputValue(scenarioA)),
      scenarioB: Array(16).fill(getInputValue(scenarioB)),
    }
  },
);

export const selectEnergyConsumptionDailyPerScenario = createSelector(
  [selectPumpPowerDemandPerScenario],
  (pumpPower) => ({
    active: constantDevided(constantMultiply(pumpPower.active, 6), 1000000),
    baseline: constantDevided(constantMultiply(pumpPower.baseline ?? pumpPower.active, 6), 1000000),
    scenarioA: constantDevided(
      constantMultiply(pumpPower.scenarioA, 6),
      1000000,
    ),
    scenarioB: constantDevided(
      constantMultiply(pumpPower.scenarioB, 6),
      1000000,
    ),
  }),
);

export const selectEnergyConsumptionYearlyPerScenario = createSelector(
  [selectEnergyConsumptionDailyPerScenario],
  (energyConsumptioDaily) => ({
    active: constantMultiply(energyConsumptioDaily.active, 60),
    baseline: constantMultiply(energyConsumptioDaily.baseline ?? energyConsumptioDaily.active, 60),
    scenarioA: constantMultiply(energyConsumptioDaily.scenarioA, 60),
    scenarioB: constantMultiply(energyConsumptioDaily.scenarioB, 60),
  }),
);

export const SelectEnergyConsumptionFromRenewableEnergyPerScenario =
  createSelector(
    [
      selectEnergyConsumptionYearlyPerScenario,
      selectSolarPumpElectricityPerGenerationPerScenario,
      selectElectricityFromHuskPerScenario,
      selectActualGenerationPerScenario,
    ],
    (
      energyConsum,
      solarPumpGeneration,
      electricityFromHusk,
      actualGeneration,
    ) => {
      const divideActualBy1000 = {
        active: constantDevided(actualGeneration.active, 1000),
        baseline: constantDevided(actualGeneration.baseline ?? actualGeneration.active, 1000),
        scenarioA: constantDevided(actualGeneration.scenarioA, 1000),
        scenarioB: constantDevided(actualGeneration.scenarioB, 1000),
      };

      const minArray = (a: number[], b: number[]) =>
        a.map((val, i) => Math.min(val, b[i]));

      return {
        active: minArray(
          energyConsum.active,
          sumArrayData(
            solarPumpGeneration.active,
            electricityFromHusk.active,
            divideActualBy1000.active,
          ),
        ),

        baseline: minArray(
          energyConsum.baseline ?? energyConsum.active,
          sumArrayData(
            solarPumpGeneration.baseline ?? solarPumpGeneration.active,
            electricityFromHusk.baseline ?? electricityFromHusk.active,
            divideActualBy1000.baseline,
          ),
        ),

        scenarioA: minArray(
          energyConsum.scenarioA,
          sumArrayData(
            solarPumpGeneration.scenarioA,
            electricityFromHusk.scenarioA,
            divideActualBy1000.scenarioA,
          ),
        ),

        scenarioB: minArray(
          energyConsum.scenarioB,
          sumArrayData(
            solarPumpGeneration.scenarioB,
            electricityFromHusk.scenarioB,
            divideActualBy1000.scenarioB,
          ),
        ),
      };
    },
  );

export const selectEnergyConsumptionFuelPerScenario = createSelector(
  [
    selectEnergyConsumptionYearlyPerScenario,
    SelectEnergyConsumptionFromRenewableEnergyPerScenario,
  ],
  (energyConsumptionYear, energyConsumptionRenewable) => ({
    active: minArrayData(
      energyConsumptionYear.active,
      energyConsumptionRenewable.active,
    ),
    baseline: minArrayData(energyConsumptionYear.baseline, energyConsumptionRenewable.baseline),
    scenarioA: minArrayData(
      energyConsumptionYear.scenarioA,
      energyConsumptionRenewable.scenarioA,
    ),
    scenarioB: minArrayData(
      energyConsumptionYear.scenarioB,
      energyConsumptionRenewable.scenarioB,
    ),
  }),
);

export const selectFuelDemandConsumptionPerScenario = createSelector(
  [selectEnergyConsumptionFuelPerScenario],
  (energyFuelConsumption) => ({
    active: constantDevided(
      constantDevided(
        constantMultiply(energyFuelConsumption.active, 1000000),
        3.6,
      ),
      1000,
    ),
    baseline: constantDevided(constantDevided(constantMultiply(energyFuelConsumption.baseline, 1000000), 3.6), 1000),
    scenarioA: constantDevided(
      constantDevided(
        constantMultiply(energyFuelConsumption.scenarioA, 1000000),
        3.6,
      ),
      1000,
    ),
    scenarioB: constantDevided(
      constantDevided(
        constantMultiply(energyFuelConsumption.scenarioB, 1000000),
        3.6,
      ),
      1000,
    ),
  }),
);

export const selectSekamDibakarPerScenario = createSelector(
  [selectHuskProductionPerScenario],
  (huskProduction) => ({
    active: constantMultiply(huskProduction.active, 0.4),
    baseline: constantMultiply(huskProduction.baseline ?? huskProduction.active, 0.4),
    scenarioA: constantMultiply(huskProduction.scenarioA, 0.4),
    scenarioB: constantMultiply(huskProduction.scenarioB, 0.4),
  }),
);

export const selectEmisiSekamPerScenario = createSelector(
  [selectSekamDibakarPerScenario],
  (sekamDibakar) => ({
    active: constantMultiply(sekamDibakar.active, 1.5),
    baseline: constantMultiply(sekamDibakar.baseline, 1.5),
    scenarioA: constantMultiply(sekamDibakar.scenarioA, 1.5),
    scenarioB: constantMultiply(sekamDibakar.scenarioB, 1.5),
  }),
);

export const selectDieselDemandPerScenario = createSelector(
  [
    selectLandProcessingExcludeIrrigationPerScenario,
    selectPlantingAndMaintenanceExcludeIrrigationPerScenario,
    selectHarvestingAndTransportExcludeIrrigationPerScenario,
    selectFuelDemandConsumptionPerScenario,
  ],
  (energyLand, energyPlanting, energyHarvest, energyFuel) => {
    const fastSum4 = (a: number[], b: number[], c: number[], d: number[]) => {
      const result = new Array(16);
      for (let i = 0; i < 16; i++) {
        result[i] = (a[i] ?? 0) + (b[i] ?? 0) + (c[i] ?? 0) + (d[i] ?? 0);
      }
      return result;
    }
    return {
      active: fastSum4(
        energyFuel.active,
        energyHarvest.active,
        energyPlanting.active,
        energyLand.active,
      ),
      baseline: fastSum4(
        energyFuel.baseline ?? energyFuel.active,
        energyHarvest.baseline ?? energyHarvest.active,
        energyPlanting.baseline ?? energyPlanting.active,
        energyLand.baseline ?? energyLand.active,
      ),
      scenarioA: fastSum4(
        energyFuel.scenarioA,
        energyHarvest.scenarioA,
        energyPlanting.scenarioA,
        energyLand.scenarioA,
      ),
      scenarioB: fastSum4(
        energyFuel.scenarioB,
        energyHarvest.scenarioB,
        energyPlanting.scenarioB,
        energyLand.scenarioB,
      ),
    }
  },
);

export const selectDieselSupplyPerScenario = createSelector(
  [selectDieselDemandPerScenario],
  (dieselDemand) => {
    return {
      active: multiplyArrayData(dieselDemand.active, ONE_ARRAY),
      baseline: multiplyArrayData(dieselDemand.baseline, ONE_ARRAY),
      scenarioA: multiplyArrayData(dieselDemand.scenarioA, ONE_ARRAY),
      scenarioB: multiplyArrayData(dieselDemand.scenarioB, ONE_ARRAY),
    };
  },
);

export const selectEnergyAvailabillityPerScenario = createSelector(
  [selectDieselDemandPerScenario, selectDieselSupplyPerScenario],
  (dieselDemand, dieselSupply) => ({
    active: calculateDevidedArrays(dieselDemand.active, dieselSupply.active),
    baseline: calculateDevidedArrays(dieselDemand.baseline, dieselSupply.baseline),
    scenarioA: calculateDevidedArrays(
      dieselDemand.scenarioA,
      dieselSupply.scenarioA,
    ),
    scenarioB: calculateDevidedArrays(
      dieselDemand.scenarioB,
      dieselSupply.scenarioB,
    ),
  }),
);

export const selectImpactOfEnergyAvailabillityProductionPerScenario =
  createSelector(
    [selectEnergyAvailabillityPerScenario],
    (energyAvailabillity) => ({
      active: applySigmoidToArray(energyAvailabillity.active),
      baseline: applySigmoidToArray(energyAvailabillity.baseline),
      scenarioA: applySigmoidToArray(energyAvailabillity.scenarioA),
      scenarioB: applySigmoidToArray(energyAvailabillity.scenarioB),
    }),
  );


// circular dependency from sigmoid function
export const selectAgricultureLandProductionPerScenario = createDeepEqualSelector(
  [
    agricultureLandPerScenario,
    selectImpactOfWaterAvailabilityForAgri,
    selectImpactOfEnergyAvailabillityProductionPerScenario,
    selectImpactOfFertillizerAvailabillity,
    selectContextSpecificActive,
    selectContextSpecificBaseline,
    selectedContextSpecificA,
    selectedContextSpecificB,
  ],
  (land, waterAgriImpact, energyImpact, fertillizerImpact, active, baseline, scenarioA, scenarioB) => {
    const calculatePotentialProductivity = (input?: ContextSpecificState) => {
      if (!input) return 0;

      const base =
        input.agriculture?.baseYield["2015-2030"] ?? 0;

      const intensity =
        input.agriculture?.croppingIntensity["2015-2030"] ?? 0;

      return base * intensity;
    };

    const getBottleneckImpact = (
      water: number[],
      energy: number[],
      fertilizer: number[]
    ) => {
      const result = new Array(16);
      for (let i = 0; i < 16; i++) {
        result[i] = Math.min(water[i] ?? 0, energy[i] ?? 0, fertilizer[i] ?? 0);
      }
      return result;
    }

    return {
      active: multiplyArrayData(
        constantMultiply(
          getBottleneckImpact(waterAgriImpact.active, energyImpact.active, fertillizerImpact.active),
          calculatePotentialProductivity(active),
        ),
        land.active,
      ),
      baseline: multiplyArrayData(
        constantMultiply(
          getBottleneckImpact(waterAgriImpact.baseline, energyImpact.baseline, fertillizerImpact.baseline),
          calculatePotentialProductivity(baseline)
        ),
        land.baseline
      ),
      scenarioA: multiplyArrayData(
        constantMultiply(
          getBottleneckImpact(waterAgriImpact.scenarioA, energyImpact.scenarioA, fertillizerImpact.scenarioA),
          calculatePotentialProductivity(scenarioA),
        ),
        land.scenarioA,
      ),
      scenarioB: multiplyArrayData(
        constantMultiply(
          getBottleneckImpact(waterAgriImpact.scenarioB, energyImpact.scenarioB, fertillizerImpact.scenarioB),
          calculatePotentialProductivity(scenarioB),
        ),
        land.scenarioB,
      ),
    }
  }
);

export const selectProductionTotalPerScenario = createSelector(
  [
    selectAgricultureLandProductionPerScenario,
  ],
  (land) => ({
    active: land.active,
    baseline: land.baseline,
    scenarioA: land.scenarioA,
    scenarioB: land.scenarioB,
  }),
);
