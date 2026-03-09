import { createSelector } from "@reduxjs/toolkit";
import { constantMultiply } from "@/lib/utils/formulas";
import { selectServiceAreaOfSolarPumpPerScenario } from "./resourceSupplySelector";
import { selectedContextSpecificA, selectedContextSpecificB, selectSolarPumpInputCapacitySelector } from "./scenarioProjectionSelector";
import { selectContextSpecificActive, selectContextSpecificBaseline, createDeepEqualSelector } from "../baseSelector";
import { selectAveragePlantingSessions } from "./foodAndYieldSelector";
import {
  multiplyArrayData,
  sumArrayData,
} from "./foodAndSupplyInputDemandSelector";
import { ContextSpecificState } from "@/stores/slicers/contextSpecificInputSlicer";

const EMPTY_ARRAY = Array(16).fill(0);

const calculateAdd = (arr: number[]) => {
  if (!arr || arr.length === 0) return EMPTY_ARRAY;
  const result = new Array(16);
  for (let i = 0; i < 16; i++) {
    const val = arr[i] ?? 0;
    if (i === 0) result[i] = val;
    else result[i] = (result[i - 1] ?? 0) + val;
  }
  return result;
}

const calculateMinInRow = (arr: number[]) => {
  if (!arr || arr.length === 0) return EMPTY_ARRAY;
  const result = new Array(16);
  for (let i = 0; i < 16; i++) {
    const value = arr[i] ?? 0;
    if (i === 0) {
      result[i] = value;
    } else if (value === 0) {
      result[i] = 0;
    } else {
      const diff = value - (arr[i - 1] ?? 0);
      result[i] = diff === 0 ? 0 : diff;
    }
  }
  return result;
};

export const selectInstallmentCapacity = createDeepEqualSelector(
  [
    selectSolarPumpInputCapacitySelector
  ],
  (solarPumpInput) => {
    return {
      active: calculateMinInRow(solarPumpInput.active),
      baseline: calculateMinInRow(solarPumpInput.baseline ?? solarPumpInput.active),
      scenarioA: calculateMinInRow(solarPumpInput.scenarioA),
      scenarioB: calculateMinInRow(solarPumpInput.scenarioB),
    }
  }
)

export const selectInstallmentCost = createDeepEqualSelector(
  [selectInstallmentCapacity],
  (installmentCapacity) => {
    return {
      active: constantMultiply(installmentCapacity.active, 88217207.9365079),
      baseline: constantMultiply(installmentCapacity.baseline ?? installmentCapacity.active, 88217207.9365079),
      scenarioA: constantMultiply(installmentCapacity.scenarioA, 88217207.9365079),
      scenarioB: constantMultiply(installmentCapacity.scenarioB, 88217207.9365079),
    };
  },
);

export const selectCumulativeOfInstallmentCost = createDeepEqualSelector(
  [selectInstallmentCost],
  (installmentCost) => {
    return {
      active: calculateAdd(installmentCost.active),
      baseline: calculateAdd(installmentCost.baseline ?? installmentCost.active),
      scenarioA: calculateAdd(installmentCost.scenarioA),
      scenarioB: calculateAdd(installmentCost.scenarioB),
    }
  },
);

export const selectDepresiasiOAndM = createDeepEqualSelector(
  [selectCumulativeOfInstallmentCost],
  (cumullativeInstallment) => {
    return {
      active: constantMultiply(cumullativeInstallment.active, 0.1),
      baseline: constantMultiply(cumullativeInstallment.baseline ?? cumullativeInstallment.active, 0.1),
      scenarioA: constantMultiply(cumullativeInstallment.scenarioA, 0.1),
      scenarioB: constantMultiply(cumullativeInstallment.scenarioB, 0.1),
    };
  },
);

export const selectCumulativeDepresiasi = createDeepEqualSelector(
  [selectDepresiasiOAndM],
  (depresiasi) => {
    return {
      active: calculateAdd(depresiasi.active),
      baseline: calculateAdd(depresiasi.baseline ?? depresiasi.active),
      scenarioA: calculateAdd(depresiasi.scenarioA),
      scenarioB: calculateAdd(depresiasi.scenarioB)
    }
  },
);

export const selectDieselUsePerScenario = createDeepEqualSelector(
  [
    selectServiceAreaOfSolarPumpPerScenario, selectAveragePlantingSessions,
    selectContextSpecificActive, selectContextSpecificBaseline, selectedContextSpecificA, selectedContextSpecificB
  ],
  (serviceArea, averagePlanting, active, baseline, scenarioA, scenarioB) => {
    const getInput = (scenario: ContextSpecificState) =>
      scenario?.diesel?.installedCapacity?.["2015-2030"] ?? 0;
    return {
      active: multiplyArrayData(
        constantMultiply(serviceArea.active, getInput(active)),
        averagePlanting.active,
      ),
      baseline: multiplyArrayData(
        constantMultiply(serviceArea.baseline ?? serviceArea.active, getInput(baseline ?? active)),
        averagePlanting.baseline ?? averagePlanting.active,
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

export const selectBiayaBbmDieselPerScenario = createDeepEqualSelector(
  [selectDieselUsePerScenario],
  (diesel) => ({
    active: constantMultiply(diesel.active, 10000),
    baseline: constantMultiply(diesel.baseline ?? diesel.active, 10000),
    scenarioA: constantMultiply(diesel.scenarioA, 10000),
    scenarioB: constantMultiply(diesel.scenarioB, 10000),
  }),
);

export const selectCollectedFeePerScenario = createDeepEqualSelector(
  [
    selectServiceAreaOfSolarPumpPerScenario, selectAveragePlantingSessions,
    selectContextSpecificActive, selectContextSpecificBaseline, selectedContextSpecificA, selectedContextSpecificB
  ],
  (serviceArea, averagePlanting, active, baseline, scenarioA, scenarioB) => {
    const getInput = (scenario: ContextSpecificState) =>
      scenario?.solarPV?.fee?.["2025-2034"] ?? 0;

    return {
      active:
        multiplyArrayData(
          constantMultiply(serviceArea.active, getInput(active)),
          averagePlanting.active,
        ),
      baseline:
        multiplyArrayData(
          constantMultiply(serviceArea.baseline ?? serviceArea.active, getInput(baseline ?? active)),
          averagePlanting.baseline ?? averagePlanting.active,
        ),
      scenarioA:
        multiplyArrayData(
          constantMultiply(serviceArea.scenarioA, getInput(scenarioA)),
          averagePlanting.scenarioA,
        ),
      scenarioB:
        multiplyArrayData(
          constantMultiply(serviceArea.scenarioB, getInput(scenarioB)),
          averagePlanting.scenarioB,
        ),
    };
  },
);