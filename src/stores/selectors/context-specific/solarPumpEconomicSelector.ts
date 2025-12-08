import { createSelector } from "@reduxjs/toolkit";
import { constantMultiply, resultConverter } from "@/lib/utils/formulas";
import { selectServiceAreaOfSolarPumpPerScenario } from "./resourceSupplySelector";
import { selectedContextSpecificA, selectedContextSpecificB, selectSolarPumpInputCapacitySelector } from "./scenarioProjectionSelector";
import { selectContextSpecificActive } from "../baseSelector";
import { selectAveragePlantingSessions } from "./foodAndYieldSelector";
import {
  multiplyArrayData,
  sumArrayData,
} from "./foodAndSupplyInputDemandSelector";
import { ContextSpecificState } from "@/stores/slicers/contextSpecificInputSlicer";

const calculateAdd = (arr: number[]) =>  {
  let result: number[] = [];
  for (let i = 0; i < arr.length; i++) {
    if (i === 0) result[i] = arr[i]
    else result[i] = result[i-1] + arr[i]
  }
  return result
}

const calculateMinInRow = (arr: number[]) => {
  return arr.map((value, index) => {
    if (index === 0) return value;
    if (value === 0) return 0;

    const diff = value - arr[index - 1];
    return diff === 0 ? 0 : diff;
  });
};

export const selectInstallmentCapacity = createSelector(
  [
    selectSolarPumpInputCapacitySelector
  ],
  (solarPumpInput) => {
    return {
      active: calculateMinInRow(solarPumpInput.active),
      scenarioA: calculateMinInRow(solarPumpInput.scenarioA),
      scenarioB: calculateMinInRow(solarPumpInput.scenarioB),
    }
  }
)

export const selectInstallmentCost = createSelector(
  [selectInstallmentCapacity],
  (installmentCapacity) => {
    return {
      active: constantMultiply(installmentCapacity.active, 88217207.9365079),
      scenarioA: constantMultiply(installmentCapacity.scenarioA, 88217207.9365079),
      scenarioB: constantMultiply(installmentCapacity.scenarioB, 88217207.9365079),
    };
  },
);

export const selectCumulativeOfInstallmentCost = createSelector(
  [selectInstallmentCost],
  (installmentCost) => {
    return {
      active: calculateAdd(installmentCost.active),
      scenarioA: calculateAdd(installmentCost.scenarioA),
      scenarioB: calculateAdd(installmentCost.scenarioB),
    }
  },
);

export const selectDepresiasiOAndM = createSelector(
  [selectCumulativeOfInstallmentCost],
  (cumullativeInstallment) => {
    return {
      active: constantMultiply(cumullativeInstallment.active, 0.1),
      scenarioA: constantMultiply(cumullativeInstallment.scenarioA, 0.1),
      scenarioB: constantMultiply(cumullativeInstallment.scenarioB, 0.1),
    };
  },
);

export const selectCumulativeDepresiasi = createSelector(
  [selectDepresiasiOAndM],
  (depresiasi) => {
    return {
      active: calculateAdd(depresiasi.active),
      scenarioA: calculateAdd(depresiasi.scenarioA),
      scenarioB: calculateAdd(depresiasi.scenarioB)
    }
  },
);

export const selectDieselUsePerScenario = createSelector(
  [
    selectServiceAreaOfSolarPumpPerScenario, selectAveragePlantingSessions,
    selectContextSpecificActive, selectedContextSpecificA, selectedContextSpecificB
  ],
  (serviceArea, averagePlanting, active, scenarioA, scenarioB) => {
    const getInput = (scenario: ContextSpecificState) =>
    scenario?.diesel?.installedCapacity?.["2015-2030"] ?? 0;
    return {
      active: multiplyArrayData(
        constantMultiply(serviceArea.active, getInput(active)),
        averagePlanting.active,
      ),
      scenarioA: multiplyArrayData(
        constantMultiply(serviceArea.scenarioA, getInput(scenarioA)),
        averagePlanting.scenarioA,
      ),
      scenarioB: multiplyArrayData(
        constantMultiply(serviceArea.scenarioB, getInput(scenarioB)),
        averagePlanting.scenarioB,
      ),
    };
  },
);

export const selectBiayaBbmDieselPerScenario = createSelector(
  [selectDieselUsePerScenario],
  (diesel) => ({
    active: constantMultiply(diesel.active, 10000),
    scenarioA: constantMultiply(diesel.scenarioA, 10000),
    scenarioB: constantMultiply(diesel.scenarioB, 10000),
  }),
);

export const selectCollectedFeePerScenario = createSelector(
  [
    selectServiceAreaOfSolarPumpPerScenario, selectAveragePlantingSessions,
    selectContextSpecificActive, selectedContextSpecificA, selectedContextSpecificB
  ],
  (serviceArea, averagePlanting, active, scenarioA, scenarioB) => {
    const getInput = (scenario: ContextSpecificState) =>
    scenario?.solarPV?.fee?.["2025-2034"] ?? 0;
    return {
      active: resultConverter(
        multiplyArrayData(
          constantMultiply(serviceArea.active, getInput(active)),
          averagePlanting.active,
        ),
      ),
      scenarioA: resultConverter(
        multiplyArrayData(
          constantMultiply(serviceArea.scenarioA, getInput(scenarioA)),
          averagePlanting.scenarioA,
        ),
      ),
      scenarioB: resultConverter(
        multiplyArrayData(
          constantMultiply(serviceArea.scenarioB, getInput(scenarioB)),
          averagePlanting.scenarioB,
        ),
      ),
    };
  },
);