import { createSelector } from "@reduxjs/toolkit";
import { selectSocialDataComparison } from "./socialSelector";
import { constantDevided, constantMultiply } from "@/lib/utils/formulas";

export const selectFoodDemandRicePerScenario = createSelector(
  [selectSocialDataComparison],
  (social) => ({
    active: constantDevided(constantMultiply(social.active, 79.2), 1000),
    // baseline: constantDevided(constantMultiply(social.baseline, 79.2), 1000),
    scenarioA: constantDevided(constantMultiply(social.scenarioA, 79.2), 1000),
    scenarioB: constantDevided(constantMultiply(social.scenarioB, 79.2), 1000),
  }),
);

export const selectFoodDemandMeizePerScenario = createSelector(
  [selectSocialDataComparison],
  (social) => ({
    active: constantDevided(constantMultiply(social.active, 20), 1000),
    // baseline: constantDevided(constantMultiply(social.baseline, 20), 1000),
    scenarioA: constantDevided(constantMultiply(social.scenarioA, 20), 1000),
    scenarioB: constantDevided(constantMultiply(social.scenarioB, 20), 1000),
  }),
);
