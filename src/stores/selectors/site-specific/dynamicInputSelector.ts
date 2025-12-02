import {
  selectSiteSpecificActive,
  selectSiteSpecificBaseline,
} from "@/stores/selectors/baseSelector";
import {
  selectComparisonScenarioA,
  selectComparisonScenarioB,
} from "@/stores/selectors/site-specific/scenarioProjectionSelector";
import { createSelector } from "@reduxjs/toolkit";
// import { generateDynamicalSeries } from "@/lib/utils/projections";
import { RESOURCE_DEMAND_UNIT } from "@/lib/constant/resourceDemandUnit.constant";
import { resultConverter } from "@/lib/utils/formulas";

const transformPeriodInputs = (
  periods: { [key: string]: number },
  avg: number,
) => {
  const p2030 = periods?.["2025-2030"] ?? avg;
  const p2040 = periods?.["2031-2040"] ?? avg;
  const p2045 = periods?.["2041-2045"] ?? avg;

  const objData = {
    "2025-2030": (p2030 / avg) ** (1 / 5) - 1,
    "2031-2040": (p2040 / p2030) ** (1 / 10) - 1,
    "2041-2045": (p2045 / p2040) ** (1 / 5) - 1,
  };

  return objData;
};

const calculateEnergyPeriodInputs = (periods: {
  [key: string]: number;
}): number[] => {
  const projectionPeriods = [
    { start: 2025, end: 2030, key: "2025-2030" },
    { start: 2030, end: 2040, key: "2031-2040" },
    { start: 2040, end: 2045, key: "2041-2045" },
  ];

  if (!periods) return Array(36).fill(0);

  const result: number[] = Array(16).fill(0);

  for (const period of projectionPeriods) {
    const { start, end, key } = period;
    if (start >= end) continue;

    const startRate = result[result.length - 1];
    const endRate = (periods?.[key] ?? 0) / 100;
    const periodDuration = end - start;

    let currentValue = startRate;
    for (let i = 1; i <= periodDuration; i++) {
      const growthRateForThisYear =
        currentValue + (endRate - startRate) / periodDuration;
      result.push(growthRateForThisYear);
      currentValue = growthRateForThisYear;
    }
  }
  return result;
};

const generateResourceDynamicInput = (
  growthScenario: { [key: string]: number },
  constantValue: number,
): number[] => {
  const result: number[] = [];
  const startYear = 2010;
  const endYear = 2045;
  const historicalEndYear = 2025;

  for (let year = startYear; year <= historicalEndYear; year++) {
    result.push(constantValue);
  }

  let lastValue = result.length > 0 ? result[result.length - 1] : constantValue;
  for (let year = historicalEndYear + 1; year <= endYear; year++) {
    let growthValue = lastValue;
    let nextValue = growthValue;

    if (growthScenario) {
      if (year >= 2025 && year <= 2030 && growthScenario["2025-2030"] != null) {
        growthValue = growthScenario["2025-2030"];
      } else if (
        year >= 2031 &&
        year <= 2040 &&
        growthScenario["2031-2040"] != null
      ) {
        growthValue = growthScenario["2031-2040"];
      } else if (
        year >= 2041 &&
        year <= 2045 &&
        growthScenario["2041-2045"] != null
      ) {
        growthValue = growthScenario["2041-2045"];
      }
    }

    nextValue = lastValue * (1 + growthValue);
    result.push(nextValue);
    lastValue = nextValue;
  }
  return resultConverter(result.map((item) => item ?? 0));
};

const isAdd = (category: string, value: number) => {
  return category === "domestic" ? 1 + value : 1 - value;
};

const calculateEnergyResourceDynamicInput = (
  growthScenario: number[],
  avg: number,
  category: string,
): number[] => {
  const constantData = Array(36).fill(avg);
  if (!growthScenario) return constantData;

  const calculateMultiply = growthScenario.reduce<number[]>((acc, item) => {
    const prev = acc.length > 0 ? acc[acc.length - 1] : avg;
    const next = prev * isAdd(category, item);
    acc.push(next);
    return acc;
  }, []);

  return resultConverter(calculateMultiply);
};

const selectInputEnergyDomestic = createSelector(
  [
    selectSiteSpecificActive,
    selectSiteSpecificBaseline,
    selectComparisonScenarioA,
    selectComparisonScenarioB,
  ],
  (activeInputs, baselineInputs, inputsA, inputsB) => {
    return {
      active: calculateEnergyPeriodInputs(
        activeInputs.energy.domesticElectricity,
      ),
      baseline: calculateEnergyPeriodInputs(
        baselineInputs.energy.domesticElectricity,
      ),
      scenarioA: calculateEnergyPeriodInputs(
        inputsA?.energy?.domesticElectricity,
      ),
      scenarioB: calculateEnergyPeriodInputs(
        inputsB?.energy?.domesticElectricity,
      ),
    };
  },
);

const selectInputEnergyIndustry = createSelector(
  [
    selectSiteSpecificActive,
    selectSiteSpecificBaseline,
    selectComparisonScenarioA,
    selectComparisonScenarioB,
  ],
  (activeInputs, baselineInputs, inputsA, inputsB) => {
    return {
      active: calculateEnergyPeriodInputs(activeInputs.energy.industrialEnergy),
      baseline: calculateEnergyPeriodInputs(
        baselineInputs.energy.industrialEnergy,
      ),
      scenarioA: calculateEnergyPeriodInputs(inputsA?.energy?.industrialEnergy),
      scenarioB: calculateEnergyPeriodInputs(inputsB?.energy?.industrialEnergy),
    };
  },
);

const selectInputWaterIndustry = createSelector(
  [
    selectSiteSpecificActive,
    selectSiteSpecificBaseline,
    selectComparisonScenarioA,
    selectComparisonScenarioB,
  ],
  (activeInputs, baselineInputs, inputsA, inputsB) => {
    return {
      active: transformPeriodInputs(
        activeInputs.water.industrialWater,
        RESOURCE_DEMAND_UNIT.WATER.INDUSTRIAL_DEMAND,
      ),
      baseline: transformPeriodInputs(
        baselineInputs.water.industrialWater,
        RESOURCE_DEMAND_UNIT.WATER.INDUSTRIAL_DEMAND,
      ),
      scenarioA: transformPeriodInputs(
        inputsA?.water?.industrialWater,
        RESOURCE_DEMAND_UNIT.WATER.INDUSTRIAL_DEMAND,
      ),
      scenarioB: transformPeriodInputs(
        inputsB?.water?.industrialWater,
        RESOURCE_DEMAND_UNIT.WATER.INDUSTRIAL_DEMAND,
      ),
    };
  },
);

const selectInputWaterDomestic = createSelector(
  [
    selectSiteSpecificActive,
    selectSiteSpecificBaseline,
    selectComparisonScenarioA,
    selectComparisonScenarioB,
  ],
  (activeInputs, baselineInputs, inputsA, inputsB) => {
    return {
      active: transformPeriodInputs(
        activeInputs.water.domesticWaterDemand,
        (RESOURCE_DEMAND_UNIT.WATER.DOMESTIC_DEMAND / 365) * 1000,
      ),
      baseline: transformPeriodInputs(
        baselineInputs.water.domesticWaterDemand,
        (RESOURCE_DEMAND_UNIT.WATER.DOMESTIC_DEMAND / 365) * 1000,
      ),
      scenarioA: transformPeriodInputs(
        inputsA?.water?.domesticWaterDemand,
        (RESOURCE_DEMAND_UNIT.WATER.DOMESTIC_DEMAND / 365) * 1000,
      ),
      scenarioB: transformPeriodInputs(
        inputsB?.water?.domesticWaterDemand,
        (RESOURCE_DEMAND_UNIT.WATER.DOMESTIC_DEMAND / 365) * 1000,
      ),
    };
  },
);

const selectInputProductivityTarget = createSelector(
  [
    selectSiteSpecificActive,
    selectSiteSpecificBaseline,
    selectComparisonScenarioA,
    selectComparisonScenarioB,
  ],
  (activeInputs, baselineInputs, inputsA, inputsB) => {
    return {
      active: transformPeriodInputs(
        activeInputs.agriculture.productivityTarget,
        RESOURCE_DEMAND_UNIT.FOOD.PRODUCTIVTY_PADDY_YEAR,
      ),
      baseline: transformPeriodInputs(
        baselineInputs.agriculture.productivityTarget,
        RESOURCE_DEMAND_UNIT.FOOD.PRODUCTIVTY_PADDY_YEAR,
      ),
      scenarioA: transformPeriodInputs(
        inputsA?.agriculture?.productivityTarget,
        RESOURCE_DEMAND_UNIT.FOOD.PRODUCTIVTY_PADDY_YEAR,
      ),
      scenarioB: transformPeriodInputs(
        inputsB?.agriculture?.productivityTarget,
        RESOURCE_DEMAND_UNIT.FOOD.PRODUCTIVTY_PADDY_YEAR,
      ),
    };
  },
);

export const dynamicInputWaterDemand = createSelector(
  [selectInputWaterDomestic],
  (inputDomesticWater) => {
    return {
      active: generateResourceDynamicInput(
        inputDomesticWater.active,
        (RESOURCE_DEMAND_UNIT.WATER.DOMESTIC_DEMAND / 365) * 1000,
      ),
      baseline: generateResourceDynamicInput(
        inputDomesticWater.baseline,
        (RESOURCE_DEMAND_UNIT.WATER.DOMESTIC_DEMAND / 365) * 1000,
      ),
      scenarioA: generateResourceDynamicInput(
        inputDomesticWater.scenarioA,
        (RESOURCE_DEMAND_UNIT.WATER.DOMESTIC_DEMAND / 365) * 1000,
      ),
      scenarioB: generateResourceDynamicInput(
        inputDomesticWater.scenarioB,
        (RESOURCE_DEMAND_UNIT.WATER.DOMESTIC_DEMAND / 365) * 1000,
      ),
    };
  },
);

export const dynamicInputWaterIndustrial = createSelector(
  [selectInputWaterIndustry],
  (inputIndustrial) => {
    return {
      active: generateResourceDynamicInput(
        inputIndustrial.active,
        RESOURCE_DEMAND_UNIT.WATER.INDUSTRIAL_DEMAND,
      ),
      baseline: generateResourceDynamicInput(
        inputIndustrial.baseline,
        RESOURCE_DEMAND_UNIT.WATER.INDUSTRIAL_DEMAND,
      ),
      scenarioA: generateResourceDynamicInput(
        inputIndustrial.scenarioA,
        RESOURCE_DEMAND_UNIT.WATER.INDUSTRIAL_DEMAND,
      ),
      scenarioB: generateResourceDynamicInput(
        inputIndustrial.scenarioB,
        RESOURCE_DEMAND_UNIT.WATER.INDUSTRIAL_DEMAND,
      ),
    };
  },
);

export const dynamicInputPaddyProductivity = createSelector(
  [selectInputProductivityTarget],
  (inputProductivity) => {
    return {
      active: generateResourceDynamicInput(
        inputProductivity.active,
        RESOURCE_DEMAND_UNIT.FOOD.PRODUCTIVTY_PADDY_YEAR,
      ),
      baseline: generateResourceDynamicInput(
        inputProductivity.baseline,
        RESOURCE_DEMAND_UNIT.FOOD.PRODUCTIVTY_PADDY_YEAR,
      ),
      scenarioA: generateResourceDynamicInput(
        inputProductivity.scenarioA,
        RESOURCE_DEMAND_UNIT.FOOD.PRODUCTIVTY_PADDY_YEAR,
      ),
      scenarioB: generateResourceDynamicInput(
        inputProductivity.scenarioB,
        RESOURCE_DEMAND_UNIT.FOOD.PRODUCTIVTY_PADDY_YEAR,
      ),
    };
  },
);

export const dynamicInputEnergyDomestic = createSelector(
  [selectInputEnergyDomestic],
  (inputEnergyDomestic) => {
    return {
      active: calculateEnergyResourceDynamicInput(
        inputEnergyDomestic.active,
        RESOURCE_DEMAND_UNIT.ENERGY.DOMESTIC_DEMAND,
        "domestic",
      ),
      baseline: calculateEnergyResourceDynamicInput(
        inputEnergyDomestic.baseline,
        RESOURCE_DEMAND_UNIT.ENERGY.DOMESTIC_DEMAND,
        "domestic",
      ),
      scenarioA: calculateEnergyResourceDynamicInput(
        inputEnergyDomestic.scenarioA,
        RESOURCE_DEMAND_UNIT.ENERGY.DOMESTIC_DEMAND,
        "domestic",
      ),
      scenarioB: calculateEnergyResourceDynamicInput(
        inputEnergyDomestic.scenarioB,
        RESOURCE_DEMAND_UNIT.ENERGY.DOMESTIC_DEMAND,
        "domestic",
      ),
    };
  },
);

export const dynamicInputEnergyIndustrialIntensity = createSelector(
  [selectInputEnergyIndustry],
  (inputEnergyIndustry) => {
    return {
      active: calculateEnergyResourceDynamicInput(
        inputEnergyIndustry.active,
        RESOURCE_DEMAND_UNIT.ENERGY.INDUSTRIAL_ENERGY_INTENSITY,
        "industrial",
      ),
      baseline: calculateEnergyResourceDynamicInput(
        inputEnergyIndustry.baseline,
        RESOURCE_DEMAND_UNIT.ENERGY.INDUSTRIAL_ENERGY_INTENSITY,
        "industrial",
      ),
      scenarioA: calculateEnergyResourceDynamicInput(
        inputEnergyIndustry.scenarioA,
        RESOURCE_DEMAND_UNIT.ENERGY.INDUSTRIAL_ENERGY_INTENSITY,
        "industrial",
      ),
      scenarioB: calculateEnergyResourceDynamicInput(
        inputEnergyIndustry.scenarioB,
        RESOURCE_DEMAND_UNIT.ENERGY.INDUSTRIAL_ENERGY_INTENSITY,
        "industrial",
      ),
    };
  },
);
