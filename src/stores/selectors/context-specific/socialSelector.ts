import { createSelector } from "@reduxjs/toolkit";
import {
  selectContextSpecificActive,
  // selectContextSpecificBaseline,
} from "../baseSelector";

import {
  selectedContextSpecificA,
  selectedContextSpecificB,
} from "./scenarioProjectionSelector";

const calculateSocial = (value: number, growthPercent: number) => {
  const years = Array.from({ length: 16 }, (_, i) => 2015 + i);
  const values: number[] = [];

  const growth = growthPercent / 1000;

  const increasePerYear = value * growth;

  for (let i = 0; i < years.length; i++) {
    values.push(Number(value.toFixed(0)));
    value += increasePerYear;
  }

  return values;
};

export const selectSocialDataComparison = createSelector(
  [
    selectContextSpecificActive,
    // selectContextSpecificBaseline,
    selectedContextSpecificA,
    selectedContextSpecificB,
  ],
  (activeState, scenarioA, scenarioB) => {
    return {
      active: calculateSocial(
        activeState.food.populationInitial["2015-2030"],
        activeState.food.populationGrowth["2015-2030"],
      ),

      // baseline: calculateSocial(
      //   baselineState.food.populationInitial["2015-2030"],
      //   baselineState.food.populationGrowth["2015-2030"]
      // ),

      scenarioA: calculateSocial(
        scenarioA ? scenarioA.food.populationInitial["2015-2030"] : 0,
        scenarioA ? scenarioA.food.populationGrowth["2015-2030"] : 0,
      ),

      scenarioB: calculateSocial(
        scenarioB ? scenarioB.food.populationInitial["2015-2030"] : 0,
        scenarioB ? scenarioB.food.populationGrowth["2015-2030"] : 0,
      ),
    };
  },
);
