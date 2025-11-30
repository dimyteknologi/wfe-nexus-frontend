import { createSelector } from "@reduxjs/toolkit";
import { RESOURCE_SUPPLY_INPUT } from "@/lib/constant/resourceSupplyInput.constant";
import { constantMultiply, resultConverter } from "@/lib/utils/formulas";
import { selectServiceAreaOfSolarPumpPerScenario } from "./resourceSupplySelector";
import { selectAveragePlantingSessions } from "./foodAndYieldSelector";
import {
  multiplyArrayData,
  sumArrayData,
} from "./foodAndSupplyInputDemandSelector";

export const selectInstallmentCapacity = createSelector(
  [() => RESOURCE_SUPPLY_INPUT],
  (resourceInput) => {
    const solarPump =
      resourceInput.find((item) => item.title === "Solar Water Pump Capacity")
        ?.values ?? Array(16).fill(0);
    const installment = solarPump.map((value, index, arr) => {
      if (index === 0) return value;
      return value - arr[index - 1];
    });

    return installment.slice(0, 10).concat(Array(16 - 10).fill(0));
  },
);

export const selectInstallmentCost = createSelector(
  [selectInstallmentCapacity],
  (installmentCapacity) => {
    return constantMultiply(installmentCapacity, 14000000);
  },
);

export const selectCumulativeOfInstallmentCost = createSelector(
  [selectInstallmentCost],
  (installmentCost) => {
    const arr: number[] = Array(16).fill(0);

    for (let i = 0; i < installmentCost.length; i++) {
      if (i === 0) {
        arr[i] = installmentCost[i];
      } else {
        arr[i] = arr[i - 1] + installmentCost[i];
      }
    }

    return arr;
  },
);

export const selectDepresiasiOAndM = createSelector(
  [selectCumulativeOfInstallmentCost],
  (cumullativeInstallment) => {
    return constantMultiply(cumullativeInstallment, 0.1);
  },
);

export const selectCumulativeDepresiasi = createSelector(
  [selectDepresiasiOAndM],
  (depresiasi) => {
    const arr: number[] = Array(16).fill(0);

    for (let i = 0; i < depresiasi.length; i++) {
      if (i === 0) {
        arr[i] = depresiasi[i];
      } else {
        arr[i] = arr[i - 1] + depresiasi[i];
      }
    }

    return arr;
  },
);

export const selectDieselUsePerScenario = createSelector(
  [selectServiceAreaOfSolarPumpPerScenario, selectAveragePlantingSessions],
  (serviceArea, averagePlanting) => {
    return {
      active: multiplyArrayData(
        constantMultiply(serviceArea.active, 60),
        averagePlanting.active,
      ),
      // baseline: multiplyArrayData(constantMultiply(serviceArea.baseline, 60), averagePlanting.baseline),
      scenarioA: multiplyArrayData(
        constantMultiply(serviceArea.scenarioA, 60),
        averagePlanting.scenarioA,
      ),
      scenarioB: multiplyArrayData(
        constantMultiply(serviceArea.scenarioB, 60),
        averagePlanting.scenarioB,
      ),
    };
  },
);

export const selectBiayaBbmDieselPerScenario = createSelector(
  [selectDieselUsePerScenario],
  (diesel) => ({
    active: constantMultiply(diesel.active, 10000),
    // baseline: constantMultiply(diesel.baseline, 10000),
    scenarioA: constantMultiply(diesel.scenarioA, 10000),
    scenarioB: constantMultiply(diesel.scenarioB, 10000),
  }),
);

export const selectCollectedFeePerScenario = createSelector(
  [selectServiceAreaOfSolarPumpPerScenario, selectAveragePlantingSessions],
  (serviceArea, averagePlanting) => {
    return {
      active: resultConverter(
        multiplyArrayData(
          constantMultiply(serviceArea.active, 150000),
          averagePlanting.active,
        ),
      ),
      // baseline: resultConverter(multiplyArrayData(constantMultiply(serviceArea.baseline, 150000), averagePlanting.baseline)),
      scenarioA: resultConverter(
        multiplyArrayData(
          constantMultiply(serviceArea.scenarioA, 150000),
          averagePlanting.scenarioA,
        ),
      ),
      scenarioB: resultConverter(
        multiplyArrayData(
          constantMultiply(serviceArea.scenarioB, 150000),
          averagePlanting.scenarioB,
        ),
      ),
    };
  },
);

export const selectTotalCumulativeCostPerScenario = createSelector(
  [selectCumulativeOfInstallmentCost, selectCumulativeDepresiasi],
  (installment, depresiasi) => {
    return sumArrayData(installment, depresiasi);
  },
);

export const selectTotalCumulativeRevenuePerScenario = createSelector(
  [selectBiayaBbmDieselPerScenario, selectCollectedFeePerScenario],
  (bbmDiesel, collectedFee) => {
    const calculateTotalRevenue = (
      bbmDiesel: number[],
      collectedFee: number[],
    ): number[] => {
      const arr: number[] = Array(16).fill(0);
      const sumDieselCollectedFee = sumArrayData(bbmDiesel, collectedFee);

      for (let i = 0; i < sumDieselCollectedFee.length; i++) {
        if (i === 0) {
          arr[i] = sumDieselCollectedFee[i];
        } else {
          arr[i] = arr[i - 1] + sumDieselCollectedFee[i];
        }
      }

      return resultConverter(arr);
    };

    return {
      active: calculateTotalRevenue(bbmDiesel.active, collectedFee.active),
      // baseline: calculateTotalRevenue(bbmDiesel.baseline, collectedFee.baseline),
      scenarioA: calculateTotalRevenue(
        bbmDiesel.scenarioA,
        collectedFee.scenarioA,
      ),
      scenarioB: calculateTotalRevenue(
        bbmDiesel.scenarioB,
        collectedFee.scenarioB,
      ),
    };
  },
);
