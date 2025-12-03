import { createSelector } from "@reduxjs/toolkit";
import {
  calculateDevidedArrays,
  multiplyArrayData,
  selectChemicalDemandPerScenario,
  // selectCiherang,
  selectEnergyHarvestAndTransportDemandTotalPerScenario,
  selectEnergyLandProcessingDemandTotalPerScenario,
  selectEnergyPlantingAndMaintenanceDemandTotalPerScenario,
  // selectHipaSeries,
  // selectInpari32,
  agricultureLandPaddyPerscenario,
  selectLandPaddyFieldPerScenario,
  // selectLokal,
  // selectMekongga,
  selectOrganicDemandPerScenario,
  selectWaterDemandPerScenario,
  sumArrayData,
  selectNpkApplicationPerScenario,
  agricultureLandPerScenario,
  selectEnergyLandProcessingDemandAveragePerScenario,
  selectTotalEnergyDemandPerScenario,
  selectEnergyIrrigationDemandTotalPerScenario,
} from "./foodAndSupplyInputDemandSelector";
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
import { RESOURCE_SUPPLY_INPUT } from "@/lib/constant/resourceSupplyInput.constant";
import { ContextSpecific, ContextSpecificState } from "@/stores/slicers/contextSpecificInputSlicer";
import { FOOD_AND_YIELD } from "@/lib/constant/initialDataContext.constans";

export const findResourceSupplyByTitle = (title: string) => {
  return RESOURCE_SUPPLY_INPUT.find((item) => item.title === title);
};

export const divideEnergy = (data: Record<string, number[]>) => ({
  active: constantDevided(constantDevided(data.active, 36.9), 1000),
  //   baseline: constantDevided(constantDevided(data.baseline, 36.9), 1000),
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

const calculateWaterGap = (demandArr: number[], supplyArr: number[]) => {
  return demandArr.map((demand, i) => Math.max(0, demand - supplyArr[i]));
};

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

const calculateImpactWaterAgri = (allocation: number[], demand: number[]) => {
  return allocation.map((alloc, i) => {
    const dem = demand[i] ?? 0;

    if (dem === 0) return 0;

    const ratio = alloc / dem;

    if (ratio === 0) return 0;
    if (ratio >= 1) return 1;

    return 1 / (1 + Math.exp(-(ratio * 10 - 5)));
  });
};

const calculateImpactWaterGeothermal = (
  allocationGeo: number[],
  demandGeo: number[],
) => {
  return allocationGeo.map((alloc, i) => {
    const demand = demandGeo[i] ?? 0;

    if (demand === 0) return 0;

    const ratio = alloc / demand;

    if (ratio === 0) return 0;

    if (ratio >= 1) return 1;

    return 1 / (1 + Math.exp(-(ratio * 10 - 5)));
  });
};

const sigmoidImpact = (value: number): number => {
  if (value === 0) return 0;
  if (value >= 1) return 1;
  return 1 / (1 + Math.exp(-(value * 10 - 5)));
};

const applySigmoidToArray = (arr: number[]) => {
  return arr.map((v) => sigmoidImpact(v));
};

const getWaterPumpDiesel = (input?: ContextSpecificState) => {
  if (!input) return Array(16).fill(0);

  const installedCapacity = input.diesel?.installedCapacity?.["2015-2030"] ?? 0;

  return Array(16).fill(installedCapacity * 1000/(1000*9.81*30)*(60*6*3600));
}

const getRainfallDebit = (input?: ContextSpecificState) :number[] =>  {
  if (!input) return Array(16).fill(0);

  const annualRainfall = input.rainfall?.annualRainfall?.["2015-2030"] ?? 0;
  const areaSize = input.rainfall?.areaSize?.["2015-2030"] ?? 0;

  return Array(16).fill((annualRainfall / 1000) * areaSize * 10000);
};

export const selectInstalledCapacityPerScenario = createSelector(
  [() => RESOURCE_SUPPLY_INPUT],
  (resourceInput) => {
    const geothermal =
      resourceInput.find((item) => item.title === "Geothermal capacity")
        ?.values ?? Array(16).fill(0);

    return {
      active: geothermal,
      //   baseline: geothermal,
      scenarioA: geothermal,
      scenarioB: geothermal,
    };
  },
);

export const selectMaximalGenerationPerScenario = createSelector(
  [selectInstalledCapacityPerScenario],
  (installedCapacityPerScenario) => ({
    active: constantMultiply(installedCapacityPerScenario.active, 8760),
    scenarioA: constantMultiply(installedCapacityPerScenario.scenarioA, 8760),
    scenarioB: constantMultiply(installedCapacityPerScenario.scenarioB, 8760),
  }),
);

export const selectPotentialGenerationPerScenario = createSelector(
  [selectMaximalGenerationPerScenario],
  (maximalGenerationPerScenario) => ({
    active: constantMultiply(maximalGenerationPerScenario.active, 0.92),
    scenarioA: constantMultiply(maximalGenerationPerScenario.scenarioA, 0.92),
    scenarioB: constantMultiply(maximalGenerationPerScenario.scenarioB, 0.92),
  }),
);

export const selectWaterDemandforGeothermalPerScenario = createSelector(
  [selectPotentialGenerationPerScenario],
  (potentialGenerationPerScenario) => {
    const factor = 0.72 * 3.785;
    return {
      active: constantMultiply(potentialGenerationPerScenario.active, factor),
      // baseline: constantMultiply(potentialGenerationPerScenario.baseline, factor),
      scenarioA: constantMultiply(
        potentialGenerationPerScenario.scenarioA,
        factor,
      ),
      scenarioB: constantMultiply(
        potentialGenerationPerScenario.scenarioB,
        factor,
      ),
    };
  },
);

// water consumption demand input as water demand for agriculture
export const selectTotalWaterDemandPerScenario = createSelector(
  selectWaterDemandPerScenario,
  selectWaterDemandforGeothermalPerScenario,
  (waterDemandForAgriculture, geothermalWaterDemandPerScenario) => ({
    active: sumArrayData(
      waterDemandForAgriculture.active,
      geothermalWaterDemandPerScenario.active,
    ),
    // baseline: sumArrayData(waterDemandForAgriculture.baseline, geothermalWaterDemandPerScenario.baseline),
    scenarioA: sumArrayData(
      waterDemandForAgriculture.scenarioA,
      geothermalWaterDemandPerScenario.scenarioA,
    ),
    scenarioB: sumArrayData(
      waterDemandForAgriculture.scenarioB,
      geothermalWaterDemandPerScenario.scenarioB,
    ),
  }),
);

// rainfall debit & surface water
export const selectWaterRainfallDebitPerScenario = createSelector(
  selectContextSpecificActive,
  // selectContextSpecificBaseline,
  selectedContextSpecificA,
  selectedContextSpecificB,
  (active, scenarioA, scenarioB) => ({
    active: getRainfallDebit(active),
    // baseline: getRainfallDebit(baseline),
    scenarioA: getRainfallDebit(scenarioA),
    scenarioB: getRainfallDebit(scenarioB),
  }),
);

export const selectSurfaceWaterPerScenario = createSelector(
  [selectWaterRainfallDebitPerScenario],
  (rainfalldebit) => ({
    active: constantMultiply(rainfalldebit.active, 0.74),
    scenarioA: constantMultiply(rainfalldebit.scenarioA, 0.74),
    scenarioB: constantMultiply(rainfalldebit.scenarioB, 0.74),
  })
)

export const selectWaterAvailableSurfacePerScenario = createSelector(
  selectSurfaceWaterPerScenario,
  (surfaceWater) => ({
    active: constantMultiply(surfaceWater.active, 1.0),
    // baseline: constantMultiply(surfaceWater.baseline, 1.00),
    scenarioA: constantMultiply(surfaceWater.scenarioA, 1.0),
    scenarioB: constantMultiply(surfaceWater.scenarioB, 1.0),
  }),
);

export const selectWaterPumpDieselPerScenario = createSelector(
  [selectContextSpecificActive,selectedContextSpecificA,selectedContextSpecificB],
  (activeState, scenarioA, scenarioB) => ({
    active: getWaterPumpDiesel(activeState),
    scenarioA: getWaterPumpDiesel(scenarioA),
    scenarioB: getWaterPumpDiesel(scenarioB),
  })
)

// current static value 0
const groundWaters = Array(16).fill(0);

export const selectGroundWaterPerScenario = createSelector(
  () => groundWaters,
  (gw) => ({
    active: gw,
    // baseline: gw,
    scenarioA: gw,
    scenarioB: gw,
  }),
);

export const selectGroundWaterWithdrawalPerScenario = createSelector(
  () => RESOURCE_SUPPLY_INPUT, // input selector static
  (resourceSupplyInput) => {
    const groundWaterSupply =
      resourceSupplyInput.find((item) => item.title === "Ground Water Supply")
        ?.values ?? Array(16).fill(0);

    return {
      active: groundWaterSupply,
      // baseline: groundWaterSupply,
      scenarioA: groundWaterSupply,
      scenarioB: groundWaterSupply,
    };
  },
);

// sum Available surface water, Ground water, Ground water withdrawal
export const selectSumWaterGroundWaterWithdrawal = createSelector(
  selectWaterAvailableSurfacePerScenario,
  selectGroundWaterPerScenario,
  selectGroundWaterWithdrawalPerScenario,
  (surfaceWater, groundWater, groundWaterWithdrawal) => ({
    active: sumArrayData(
      surfaceWater.active,
      groundWater.active,
      groundWaterWithdrawal.active,
    ),
    // baseline: sumArrayData(surfaceWater.baseline, groundWater.baseline, groundWaterWithdrawal.baseline),
    scenarioA: sumArrayData(
      surfaceWater.scenarioA,
      groundWater.scenarioA,
      groundWaterWithdrawal.scenarioA,
    ),
    scenarioB: sumArrayData(
      surfaceWater.scenarioB,
      groundWater.scenarioB,
      groundWaterWithdrawal.scenarioB,
    ),
  }),
);

export const selectWaterGapPerScenario = createSelector(
  selectTotalWaterDemandPerScenario,
  selectWaterPumpDieselPerScenario,
  selectWaterAvailableSurfacePerScenario,
  (totalWaterDemand,waterDiesel, waterSurface) => ({
    active: minArrayData(totalWaterDemand.active, sumArrayData(
      waterDiesel.active,
      waterSurface.active,
    )),
    scenarioA: minArrayData(totalWaterDemand.scenarioA,sumArrayData(
      waterDiesel.scenarioA,
      waterSurface.scenarioA,
    )),
    scenarioB: minArrayData(totalWaterDemand.scenarioB, sumArrayData(
      waterDiesel.scenarioB,
      waterSurface.scenarioB,
    ))
  }),
);

export const selectSolarWaterPumpPerScenario = createSelector(
  [],
  () => {
    const solarWaterPump =
      findResourceSupplyByTitle("Solar Water Pump Capacity")?.values ??
      Array(16).fill(0);

    const factor = (0.8 * 6 * 365 * 3600) / (9.81 * 30);

    const computed = constantMultiply(solarWaterPump, factor);

    return {
      active: computed,
      scenarioA: computed,
      scenarioB: computed,
    };
  }
);


export const selectSupplyWaterTotalPerScenario = createSelector(
  [
    // selectSolarWaterPumpPerScenario,
    selectWaterAvailableSurfacePerScenario,
    selectWaterPumpDieselPerScenario
  ],
  (surfaceWater, waterDiesel) => ({
    active: sumArrayData(surfaceWater.active, waterDiesel.active),
    scenarioA: sumArrayData(
      surfaceWater.scenarioA,
      waterDiesel.scenarioA,
    ),
    scenarioB: sumArrayData(
      surfaceWater.scenarioB,
      waterDiesel.scenarioB,
    ),
  }),
);

export const selectRainfallAvailabilltyPerScenario = createSelector(
  [selectSupplyWaterTotalPerScenario, selectTotalWaterDemandPerScenario],
  (supplyWater, totalWater) => ({
    active: calculateRainfallAvailabillity(
      supplyWater.active,
      totalWater.active,
    ),
    // baseline: calculateRainfallAvailabillity(supplyWater.baseline, totalWater.baseline),
    scenarioA: calculateRainfallAvailabillity(
      supplyWater.scenarioA,
      totalWater.scenarioA,
    ),
    scenarioB: calculateRainfallAvailabillity(
      supplyWater.scenarioB,
      totalWater.scenarioB,
    ),
  }),
);

export const selectWaterAllocationForAgriPerScenario = createSelector(
  [
    selectSupplyWaterTotalPerScenario,
    selectWaterDemandforGeothermalPerScenario,
    selectWaterDemandPerScenario,
  ],
  (supplyWater, waterGeothermal, waterDemandAgri) => ({
    active: calculateWaterAllocationAgri(
      minArrayData(supplyWater.active, waterGeothermal.active),
      waterDemandAgri.active,
    ),
    // baseline: calculateWaterAllocationAgri(minArrayData(supplyWater.baseline, waterGeothermal.baseline),waterDemandAgri.baseline),
    scenarioA: calculateWaterAllocationAgri(
      minArrayData(supplyWater.scenarioA, waterGeothermal.scenarioA),
      waterDemandAgri.scenarioA,
    ),
    scenarioB: calculateWaterAllocationAgri(
      minArrayData(supplyWater.scenarioB, waterGeothermal.scenarioB),
      waterDemandAgri.scenarioB,
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
    // baseline: calculateGeothermalAllocation(
    //     supplyWater.baseline,
    //     demandGeothermal.baseline,
    //     availability.baseline
    // ),
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

export const selectImpactOfWaterAvailabilityForAgri = createSelector(
  [selectWaterAllocationForAgriPerScenario, selectWaterDemandPerScenario],
  (allocationAgri, demandAgri) => ({
    active: calculateImpactWaterAgri(allocationAgri.active, demandAgri.active),
    scenarioA: calculateImpactWaterAgri(
      allocationAgri.scenarioA,
      demandAgri.scenarioA,
    ),
    scenarioB: calculateImpactWaterAgri(
      allocationAgri.scenarioB,
      demandAgri.scenarioB,
    ),
  }),
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

// circular dependency from sigmoid function
export const selectAgricultureLandProductionPerScenario = createSelector(
  [agricultureLandPerScenario, selectImpactOfWaterAvailabilityForAgri],
  (land, waterAgri) => ({
    active: multiplyArrayData(
      constantMultiply(
        waterAgri.active,
        FOOD_AND_YIELD.INPARI_32.POTENTIAL_PRODUCTIVITY,
      ),
      land.active,
    ),
    // baseline: multiplyArrayData(constantMultiply(waterAgri.baseline, FOOD_AND_YIELD.INPARI_32.POTENTIAL_PRODUCTIVITY), land.baseline),
    scenarioA: multiplyArrayData(
      constantMultiply(
        waterAgri.scenarioA,
        FOOD_AND_YIELD.INPARI_32.POTENTIAL_PRODUCTIVITY,
      ),
      land.scenarioA,
    ),
    scenarioB: multiplyArrayData(
      constantMultiply(
        waterAgri.scenarioB,
        FOOD_AND_YIELD.INPARI_32.POTENTIAL_PRODUCTIVITY,
      ),
      land.scenarioB,
    ),
  }),
);

export const selectProductionTotalPerScenario = createSelector(
  [
    selectAgricultureLandProductionPerScenario,
  ],
  (land) => ({
    active: land.active,
    scenarioA: land.scenarioA,
    scenarioB: land.scenarioB,
  }),
);

export const selectActualGenerationPerScenario = createSelector(
  [
    selectPotentialGenerationPerScenario,
    selectImpactOfWaterAvailabilityForGeothermal,
  ],
  (potentialWater, impactWater) => ({
    active: multiplyArrayData(potentialWater.active, impactWater.active),
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
  [selectImpactOfWaterAvailabilityForAgri, selectContextSpecificActive, selectedContextSpecificA, selectedContextSpecificB],
  (impactAgri, activeState, scenarioA, scenarioB) => {
     const getCroppingInput = (scenario: ContextSpecificState) => (scenario?.agriculture?.croppingIntensity?.["2015-2030"] ?? 0);
    
     return {
        active: constantMultiply(impactAgri.active, getCroppingInput(activeState)),
        scenarioA: constantMultiply(impactAgri.scenarioA, getCroppingInput(scenarioA)),
        scenarioB: constantMultiply(impactAgri.scenarioB, getCroppingInput(scenarioB)),
     }
  }
)

export const selectFertilizerEmissionApplicationPerScenario = createSelector(
  [selectNpkApplicationPerScenario, selectActualCiPerScenario],
  (npkApplication, actualCi) => ({
    active: multiplyArrayData(constantMultiply(npkApplication.active, 0.49 * 298), actualCi.active),
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
      () => RESOURCE_SUPPLY_INPUT
    ],
    (actualCi, energyIri, energyHarvest, resourceInput) => {
      const solarWaterPump =
        resourceInput.find((item) => item.title === "Geothermal capacity")
          ?.values ?? Array(16).fill(0);
      
          const calculateHarvestingAndTransport = (
        energyIri: number[],
        energyHarvest: number[],
        actualCi: number[],
        solarWaterPump: number[],
        divisor: number
      ): number[] => {
        return energyIri.map((_, i) => {
          if (solarWaterPump[i] === 0) {
            return ((energyIri[i] + energyHarvest[i]) / divisor / 1000) * actualCi[i];
          }
          return 0;
        });
      };

      return {
        active: calculateHarvestingAndTransport(
          energyIri.active,
          energyHarvest.active,
          actualCi.active,
          solarWaterPump,
           36.9
        ),
        scenarioA: calculateHarvestingAndTransport(
          energyIri.scenarioA,
          energyHarvest.scenarioA,
          actualCi.scenarioA,
          solarWaterPump,
           36.9
        ),
        scenarioB: calculateHarvestingAndTransport(
          energyIri.scenarioB,
          energyHarvest.scenarioB,
          actualCi.scenarioB,
          solarWaterPump,
           36.9
        ),
      };
    }
  );


const solarPumpSelector = () =>
  findResourceSupplyByTitle("Solar Water Pump Capacity")?.values ??
  Array(16).fill(0);

const calculate = (arr: number[]) =>
  constantDevided(
    constantMultiply(constantMultiply(constantMultiply(arr, 5), 0.8), 120),
    1_000_000,
  );

export const selectSolarPumpElectricityPerGenerationPerScenario =
  createSelector([solarPumpSelector], (solarPump) => {
    const value = calculate(solarPump);
  
    return {
      active: value,
      //   baseline: value,
      scenarioA: value,
      scenarioB: value,
    };
  });

export const selectHuskProductionPerScenario = createSelector(
  [selectProductionTotalPerScenario],
  (production) => {
    const shiftAndMultiply = (arr: number[], factor: number) => {
      return [0, ...arr.map((v) => v * factor)];
    };

    return {
      active: shiftAndMultiply(production.active, 0.23),
      scenarioA: shiftAndMultiply(production.scenarioA, 0.23),
      scenarioB: shiftAndMultiply(production.scenarioB, 0.23),
    };
  }
);


export const selectHuskUtilizationPerScenario = createSelector(
  [selectHuskProductionPerScenario],
  (huskProduction) => {
    const geotermalcapaccityPercentage =
      findResourceSupplyByTitle("Geothermal capacity")?.values ??
      Array(16).fill(0);
    const geotermalcapaccity = constantDevided(
      geotermalcapaccityPercentage,
      100,
    );
    return {
      active: multiplyArrayData(huskProduction.active, geotermalcapaccity),
      // //   baseline: multiplyArrayData(huskProduction.baseline, geotermalcapaccity),
      scenarioA: multiplyArrayData(
        huskProduction.scenarioA,
        geotermalcapaccity,
      ),
      scenarioB: multiplyArrayData(
        huskProduction.scenarioB,
        geotermalcapaccity,
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
    // // baseline: constantDevided(constantMultiply(huskUtil.baseline, 3.8892 * 1000 * 0.25),1000000),
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
    () =>
      findResourceSupplyByTitle("Solar Water Pump Capacity")?.values ??
      Array(16).fill(0),
  ],
  (solarpump) => ({
    active: constantMultiply(constantDevided(solarpump, 33.45424107), 50),
    // baseline: constantMultiply(constantDevided(solarpump, 33.45424107), 50),
    scenarioA: constantMultiply(constantDevided(solarpump, 33.45424107), 50),
    scenarioB: constantMultiply(constantDevided(solarpump, 33.45424107), 50),
  }),
);

// demand for pumping
export const selectPumpPowerDemandPerScenario = createSelector(
  [selectContextSpecificActive, selectedContextSpecificA, selectedContextSpecificB],
  (active, scenarioA, scenarioB) => {
    const getInputValue = (scenario: ContextSpecificState) =>
      (scenario?.diesel?.installedCapacity?.["2015-2030"] ?? 0);
    return {
    active: Array(16).fill(getInputValue(active)),
    scenarioA: Array(16).fill(getInputValue(scenarioA)),
    scenarioB: Array(16).fill(getInputValue(scenarioB)),
  }
  },
);

export const selectEnergyConsumptionDailyPerScenario = createSelector(
  [selectPumpPowerDemandPerScenario],
  (pumpPower) => ({
    active: constantDevided(constantMultiply(pumpPower.active, 6), 1000000),
    // // baseline: constantDevided(constantMultiply(pumpPower.baseline, 6 ),1000000),
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
    // baseline: minArrayData(energyConsumptionYear.baseline, energyConsumptionRenewable.baseline),
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
    // baseline: constantDevided(constantDevided(constantMultiply(energyFuelConsumption.baseline, 1000000),3.6),1000),
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
    // baseline: constantMultiply(huskProduction.baseline, 0.4),
    scenarioA: constantMultiply(huskProduction.scenarioA, 0.4),
    scenarioB: constantMultiply(huskProduction.scenarioB, 0.4),
  }),
);

export const selectEmisiSekamPerScenario = createSelector(
  [selectSekamDibakarPerScenario],
  (sekamDibakar) => ({
    active: constantMultiply(sekamDibakar.active, 1.5),
    // baseline: constantMultiply(sekamDibakar.baseline, 1.5),
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
  (energyLand, energyPlanting, energyHarvest, energyFuel) => ({
    active: sumArrayData(
      energyFuel.active,
      energyHarvest.active,
      energyPlanting.active,
      energyLand.active,
    ),
    scenarioA: sumArrayData(
      energyFuel.scenarioA,
      energyHarvest.scenarioA,
      energyPlanting.scenarioA,
      energyLand.scenarioA,
    ),
    scenarioB: sumArrayData(
      energyFuel.scenarioB,
      energyHarvest.scenarioB,
      energyPlanting.scenarioB,
      energyLand.scenarioB,
    ),
  }),
);

export const selectDieselSupplyPerScenario = createSelector(
  [selectDieselDemandPerScenario, () => RESOURCE_SUPPLY_INPUT],
  (dieselDemand, resourceInput) => {
    const supplyFactor =
      resourceInput.find((item) => item.title === "Supply Factor for Fuel")
        ?.values ?? Array(16).fill(0);

    return {
      active: multiplyArrayData(dieselDemand.active, supplyFactor),
      // baseline: multiplyArrayData(dieselDemand.baseline, supplyFactor),
      scenarioA: multiplyArrayData(dieselDemand.scenarioA, supplyFactor),
      scenarioB: multiplyArrayData(dieselDemand.scenarioB, supplyFactor),
    };
  },
);

export const selectEnergyAvailabillityPerScenario = createSelector(
  [selectDieselDemandPerScenario, selectDieselSupplyPerScenario],
  (dieselDemand, dieselSupply) => ({
    active: calculateDevidedArrays(dieselDemand.active, dieselSupply.active),
    // baseline: calculateDevidedArrays(dieselDemand.baseline, dieselSupply.baseline),
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
      // baseline: applySigmoidToArray(energyAvailabillity.baseline),
      scenarioA: applySigmoidToArray(energyAvailabillity.scenarioA),
      scenarioB: applySigmoidToArray(energyAvailabillity.scenarioB),
    }),
  );

export const selectChemicalFertillizerSupplyPerScenario = createSelector(
  [selectChemicalDemandPerScenario, () => RESOURCE_SUPPLY_INPUT],
  (chemicalDemand, resourceInput) => {
    const supplyFactor =
      resourceInput.find((item) => item.title === "Chemical Supply Factor")
        ?.values ?? Array(16).fill(0);

    return {
      active: multiplyArrayData(chemicalDemand.active, supplyFactor),
      // baseline: multiplyArrayData(chemicalDemand.baseline, supplyFactor),
      scenarioA: multiplyArrayData(chemicalDemand.scenarioA, supplyFactor),
      scenarioB: multiplyArrayData(chemicalDemand.scenarioB, supplyFactor),
    };
  },
);

export const selectOrganicFertillizerSupplyPerScenario = createSelector(
  [selectOrganicDemandPerScenario, () => RESOURCE_SUPPLY_INPUT],
  (organicDemand, resourceInput) => {
    const supplyFactor =
      resourceInput.find((item) => item.title === "Organic Supply Factor")
        ?.values ?? Array(16).fill(0);

    return {
      active: multiplyArrayData(organicDemand.active, supplyFactor),
      // baseline: multiplyArrayData(organicDemand.baseline, supplyFactor),
      scenarioA: multiplyArrayData(organicDemand.scenarioA, supplyFactor),
      scenarioB: multiplyArrayData(organicDemand.scenarioB, supplyFactor),
    };
  },
);
export const selectChemicalFertillizerAvailabillityPerScenario = createSelector(
  [selectChemicalFertillizerSupplyPerScenario, selectChemicalDemandPerScenario],
  (supply, demand) => ({
    active: calculateDevidedArrays(supply.active, demand.active),
    // baseline: calculateDevidedArrays(supply.baseline, demand.baseline),
    scenarioA: calculateDevidedArrays(supply.scenarioA, demand.scenarioA),
    scenarioB: calculateDevidedArrays(supply.scenarioB, demand.scenarioB),
  }),
);

export const selectOrganicFertillizerAvailabillityPerScenario = createSelector(
  [selectOrganicFertillizerSupplyPerScenario, selectOrganicDemandPerScenario],
  (supply, demand) => ({
    active: calculateDevidedArrays(supply.active, demand.active),
    // baseline: calculateDevidedArrays(supply.baseline, demand.baseline),
    scenarioA: calculateDevidedArrays(supply.scenarioA, demand.scenarioA),
    scenarioB: calculateDevidedArrays(supply.scenarioB, demand.scenarioB),
  }),
);

export const selectFertillizerAvailabilityPerScenario = createSelector(
  [
    selectContextSpecificActive,
    // selectContextSpecificBaseline,
    selectedContextSpecificA,
    selectedContextSpecificB,
    selectChemicalFertillizerAvailabillityPerScenario,
    selectOrganicFertillizerAvailabillityPerScenario,
  ],
  (active, scenarioA, scenarioB, chemicalAvail, organicAvail) => {
    const getChemicalPercentage = (scenario: ContextSpecificState) =>
      (scenario?.fertilizer?.percentageOfChemical?.["2015-2030"] ?? 0) / 100;

    const buildScenario = (
      scenario: ContextSpecificState,
      key: "active" | "scenarioA" | "scenarioB",
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
      // baseline: buildScenario(baseline, "baseline"),
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
      // baseline: applyFormulaToArray(fertilizerAvail.baseline),
      scenarioA: applyFormulaToArray(fertilizerAvail.scenarioA),
      scenarioB: applyFormulaToArray(fertilizerAvail.scenarioB),
    };
  },
);
