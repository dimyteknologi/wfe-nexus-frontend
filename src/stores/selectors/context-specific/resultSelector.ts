
import {
  selectProductionTotalPerScenario,
  selectSolarWaterPumpPerScenario,
  selectWaterAllocationForAgriPerScenario,
  selectWaterPumpDieselPerScenario,
} from "./resourceSupplySelector";
import { selectContextSpecificActive, selectContextSpecificBaseline } from "../baseSelector";
import { createDeepEqualSelector } from "../baseSelector";
const EMPTY_ARRAY = Array(16).fill(0);
import {
  selectedContextSpecificA,
  selectedContextSpecificB
} from "./scenarioProjectionSelector";
import {
  constantDevided,
  constantMultiply,
} from "@/lib/utils/formulas";
import { ContextSpecificState } from "@/stores/slicers/contextSpecificInputSlicer";
import {
  calculateDevidedArrays,
  selectWaterDemandPerScenario,
  sumArrayData,
  selectChemicalDemandPerScenario,
  selectOrganicDemandPerScenario,
  agricultureLandPerScenario,
} from "./foodAndSupplyInputDemandSelector";
import {
  selectSupplyWaterTotalPerScenario,
  selectDieselDemandPerScenario,
  selectDieselSupplyPerScenario,
  selectElectricityFromHuskPerScenario,
  selectSolarPumpElectricityPerGenerationPerScenario,
  selectChemicalFertillizerSupplyPerScenario,
  selectOrganicFertillizerSupplyPerScenario,
  selectEmisiSekamPerScenario,
  selectFertilizerEmissionApplicationPerScenario
} from "./resourceSupplySelector";
import { selectFoodDemandRicePerScenario } from "./foodDemandSelector";
import { selectBiayaBbmDieselPerScenario, selectCollectedFeePerScenario, selectCumulativeDepresiasi, selectCumulativeOfInstallmentCost } from "./solarPumpEconomicSelector";

export const selectRiceProductionPerScenario = createDeepEqualSelector(
  [
    selectContextSpecificActive,
    selectContextSpecificBaseline,
    selectedContextSpecificA,
    selectedContextSpecificB,
    selectProductionTotalPerScenario,
  ],
  (active, baseline, scenarioA, scenarioB, productionTotal) => {
    const getInputs = (scenario: ContextSpecificState) => {
      return scenario?.food?.convertionFactorToRice?.["2015-2030"] ?? 0;
    };
    return {
      active: constantMultiply(productionTotal.active, getInputs(active)),
      baseline: constantMultiply(productionTotal.baseline ?? productionTotal.active, getInputs(baseline)),
      scenarioA: constantMultiply(
        productionTotal.scenarioA,
        getInputs(scenarioA),
      ),
      scenarioB: constantMultiply(
        productionTotal.scenarioB,
        getInputs(scenarioB),
      ),
    };
  },
);

export const selectAverageProductivityPerScenario = createDeepEqualSelector(
  [selectProductionTotalPerScenario, agricultureLandPerScenario],
  (productionTotal, paddyYield) => ({
    active: constantDevided(
      calculateDevidedArrays(productionTotal.active, paddyYield.active),
      100,
    ),
    baseline: constantDevided(
      calculateDevidedArrays(productionTotal.baseline ?? productionTotal.active, paddyYield.baseline ?? paddyYield.active),
      100,
    ),
    scenarioA: constantDevided(
      calculateDevidedArrays(productionTotal.scenarioA, paddyYield.scenarioA),
      100,
    ),
    scenarioB: constantDevided(
      calculateDevidedArrays(productionTotal.scenarioB, paddyYield.scenarioB),
      100,
    ),
  }),
);

export const selectWaterConsumptionPerScenario = createDeepEqualSelector(
  [selectWaterDemandPerScenario, selectSupplyWaterTotalPerScenario],
  (waterDemand, supplyWater) => {
    const minArray = (a: number[], b: number[]) =>
      a.map((val, i) => Math.min(val, b[i]));

    return {
      active: minArray(waterDemand.active, supplyWater.active),
      baseline: minArray(waterDemand.baseline ?? waterDemand.active, supplyWater.baseline ?? supplyWater.active),
      scenarioA: minArray(waterDemand.scenarioA, supplyWater.scenarioA),
      scenarioB: minArray(waterDemand.scenarioB, supplyWater.scenarioB),
    };
  },
);

export const selectFuelConsumptionPerScenario = createDeepEqualSelector(
  [selectDieselDemandPerScenario, selectDieselSupplyPerScenario],
  (demand, supply) => {
    const minArray = (a: number[], b: number[]) =>
      a.map((val, i) => Math.min(val, b[i]));
    return {
      active: minArray(demand.active, supply.active),
      baseline: minArray(demand.baseline ?? demand.active, supply.baseline ?? supply.active),
      scenarioA: minArray(demand.scenarioA, supply.scenarioA),
      scenarioB: minArray(demand.scenarioB, supply.scenarioB),
    };
  },
);

export const selectRenewableConsumptionPerScenario = createDeepEqualSelector(
  [
    selectSolarPumpElectricityPerGenerationPerScenario,
    selectElectricityFromHuskPerScenario,
  ],
  (solarPump, electricityFromHusk) => ({
    active: sumArrayData(solarPump.active, electricityFromHusk.active),
    baseline: sumArrayData(solarPump.baseline ?? solarPump.active, electricityFromHusk.baseline ?? electricityFromHusk.active),
    scenarioA: sumArrayData(solarPump.scenarioA, electricityFromHusk.scenarioA),
    scenarioB: sumArrayData(solarPump.scenarioB, electricityFromHusk.scenarioB),
  }),
);

export const selectChemicalFertillizerPerScenario = createDeepEqualSelector(
  [selectChemicalDemandPerScenario, selectChemicalFertillizerSupplyPerScenario],
  (demand, supply) => {
    const minArray = (a: number[], b: number[]) =>
      a.map((val, i) => Math.min(val, b[i]));
    return {
      active: minArray(demand.active, supply.active),
      baseline: minArray(demand.baseline ?? demand.active, supply.baseline ?? supply.active),
      scenarioA: minArray(demand.scenarioA, supply.scenarioA),
      scenarioB: minArray(demand.scenarioB, supply.scenarioB),
    };
  },
);

export const selectOrganicFertillizerPerScenario = createDeepEqualSelector(
  [selectOrganicDemandPerScenario, selectOrganicFertillizerSupplyPerScenario],
  (demand, supply) => {
    const minArray = (a: number[], b: number[]) =>
      a.map((val, i) => Math.min(val, b[i]));
    return {
      active: minArray(demand.active, supply.active),
      baseline: minArray(demand.baseline ?? demand.active, supply.baseline ?? supply.active),
      scenarioA: minArray(demand.scenarioA, supply.scenarioA),
      scenarioB: minArray(demand.scenarioB, supply.scenarioB),
    };
  },
);

export const selectEnergyEmissionsPerScenario = createDeepEqualSelector(
  [selectFuelConsumptionPerScenario],
  (fuelConsumption) => ({
    active: constantDevided(
      constantMultiply(fuelConsumption.active, 1000 * 2.61),
      1000,
    ),
    baseline: constantDevided(
      constantMultiply(fuelConsumption.baseline ?? fuelConsumption.active, 1000 * 2.61),
      1000,
    ),
    scenarioA: constantDevided(
      constantMultiply(fuelConsumption.scenarioA, 1000 * 2.61),
      1000,
    ),
    scenarioB: constantDevided(
      constantMultiply(fuelConsumption.scenarioB, 1000 * 2.61),
      1000,
    ),
  }),
);

export const selectWaterTransportedPerScenario = createDeepEqualSelector(
  [
    selectSolarWaterPumpPerScenario,
    selectWaterPumpDieselPerScenario
  ],
  (solarWater, dieselWater) => {
    return {
      active: sumArrayData(solarWater.active, dieselWater.active),
      baseline: sumArrayData(solarWater.baseline ?? solarWater.active, dieselWater.baseline ?? dieselWater.active),
      scenarioA: sumArrayData(solarWater.scenarioA, dieselWater.scenarioA),
      scenarioB: sumArrayData(solarWater.scenarioB, dieselWater.scenarioB),
    }
  }
)

export const selectTotalEmissionPerScenario = createDeepEqualSelector(
  [
    selectEnergyEmissionsPerScenario,
    selectEmisiSekamPerScenario,
    selectFertilizerEmissionApplicationPerScenario,
  ],
  (energy, sekam, fertilizer) => ({
    active: sumArrayData(energy.active, sekam.active, fertilizer.active),
    baseline: sumArrayData(energy.baseline ?? energy.active, sekam.baseline ?? sekam.active, fertilizer.baseline ?? fertilizer.active),
    scenarioA: sumArrayData(
      energy.scenarioA,
      sekam.scenarioA,
      fertilizer.scenarioA,
    ),
    scenarioB: sumArrayData(
      energy.scenarioB,
      sekam.scenarioB,
      fertilizer.scenarioB,
    ),
  }),
);

export const selectFoodSuffiencyPerScenario = createDeepEqualSelector(
  [selectRiceProductionPerScenario, selectFoodDemandRicePerScenario],
  (riceProd, foodRiceDemand) => ({
    active: constantDevided(
      calculateDevidedArrays(riceProd.active, foodRiceDemand.active),
      100,
    ),
    baseline: constantDevided(
      calculateDevidedArrays(riceProd.baseline ?? riceProd.active, foodRiceDemand.baseline ?? foodRiceDemand.active),
      100,
    ),
    scenarioA: constantDevided(
      calculateDevidedArrays(riceProd.scenarioA, foodRiceDemand.scenarioA),
      100,
    ),
    scenarioB: constantDevided(
      calculateDevidedArrays(riceProd.scenarioB, foodRiceDemand.scenarioB),
      100,
    ),
  }),
);

export const selectEmissionIntensityPerScenario = createDeepEqualSelector(
  [selectRiceProductionPerScenario, selectTotalEmissionPerScenario],
  (riceProd, totalEmision) => ({
    active: constantMultiply(
      calculateDevidedArrays(totalEmision.active, riceProd.active),
      10,
    ),
    baseline: constantMultiply(
      calculateDevidedArrays(totalEmision.baseline ?? totalEmision.active, riceProd.baseline ?? riceProd.active),
      10,
    ),
    scenarioA: constantMultiply(
      calculateDevidedArrays(totalEmision.scenarioA, riceProd.scenarioA),
      10,
    ),
    scenarioB: constantMultiply(
      calculateDevidedArrays(totalEmision.scenarioB, riceProd.scenarioB),
      10,
    ),
  }),
);

export const selectEmissionReductionPerScenario = createDeepEqualSelector(
  [selectTotalEmissionPerScenario],
  (total) => {
    const baseline = [
      282.72791607519, 358.825655571352, 358.825655571352,
      358.825655571352, 358.825655571352, 358.825655571352,
      358.825655571352, 358.825655571352, 358.825655571352,
      358.825655571352
    ];

    const calculateEmissions = (scenario: number[]) =>
      scenario.map((v, i) => ((v - baseline[i]) / baseline[i]) * 100);

    return {
      active: calculateEmissions(total.active),
      baseline: calculateEmissions(total.baseline ?? total.active),
      scenarioA: calculateEmissions(total.scenarioA),
      scenarioB: calculateEmissions(total.scenarioB),
    };
  },
);

export const selectWaterIntensityPerScenario = createDeepEqualSelector(
  [selectWaterAllocationForAgriPerScenario, agricultureLandPerScenario],
  (waterAgri, landPaddy) => ({
    active: constantDevided(
      calculateDevidedArrays(waterAgri.active, landPaddy.active),
      100,
    ),
    baseline: constantDevided(
      calculateDevidedArrays(waterAgri.baseline ?? waterAgri.active, landPaddy.baseline ?? landPaddy.active),
      100,
    ),
    scenarioA: constantDevided(
      calculateDevidedArrays(waterAgri.scenarioA, landPaddy.scenarioA),
      100,
    ),
    scenarioB: constantDevided(
      calculateDevidedArrays(waterAgri.scenarioB, landPaddy.scenarioB),
      100,
    ),
  }),
);

export const selectFuelIntensityPerScenario = createDeepEqualSelector(
  [selectFuelConsumptionPerScenario, agricultureLandPerScenario],
  (fuelConsump, landPaddy) => ({
    active: constantMultiply(
      calculateDevidedArrays(fuelConsump.active, landPaddy.active),
      10,
    ),
    baseline: constantMultiply(
      calculateDevidedArrays(fuelConsump.baseline ?? fuelConsump.active, landPaddy.baseline ?? landPaddy.active),
      10,
    ),
    scenarioA: constantMultiply(
      calculateDevidedArrays(fuelConsump.scenarioA, landPaddy.scenarioA),
      10,
    ),
    scenarioB: constantMultiply(
      calculateDevidedArrays(fuelConsump.scenarioB, landPaddy.scenarioB),
      10,
    ),
  }),
);

export const selectTotalCumulativeCostPerScenario = createDeepEqualSelector(
  [selectCumulativeOfInstallmentCost, selectCumulativeDepresiasi],
  (installment, depresiasi) => {
    // () => {

    // return {
    //   active: Array(16).fill(0),
    //   scenarioA: Array(16).fill(0),
    //   scenarioB: Array(16).fill(0),
    // }
    return {
      active: sumArrayData(installment.active, depresiasi.active),
      baseline: sumArrayData(installment.baseline ?? installment.active, depresiasi.baseline ?? depresiasi.active),
      scenarioA: sumArrayData(installment.scenarioA, depresiasi.scenarioA),
      scenarioB: sumArrayData(installment.scenarioB, depresiasi.scenarioB)
    }
  },
);

const calculateTotalRevenue = (
  bbmDiesel: number[],
  collectedFee: number[],
): number[] => {
  if (!bbmDiesel || !collectedFee) return EMPTY_ARRAY;
  const result = new Array(16);
  for (let i = 0; i < 16; i++) {
    const sumAtI = (bbmDiesel[i] ?? 0) + (collectedFee[i] ?? 0);
    if (i === 0) result[i] = sumAtI;
    else result[i] = result[i - 1] + sumAtI;
  }
  return result;
};

export const selectTotalCumulativeRevenuePerScenario = createDeepEqualSelector(
  [selectBiayaBbmDieselPerScenario, selectCollectedFeePerScenario],
  (bbmDiesel, collectedFee) => {
    return {
      active: calculateTotalRevenue(bbmDiesel.active, collectedFee.active),
      baseline: calculateTotalRevenue(bbmDiesel.baseline ?? bbmDiesel.active, collectedFee.baseline ?? collectedFee.active),
      scenarioA: calculateTotalRevenue(
        bbmDiesel.scenarioA,
        collectedFee.scenarioA,
      ),
      scenarioB: calculateTotalRevenue(
        bbmDiesel.scenarioB,
        collectedFee.scenarioB,
      ),
    }
  },
);
