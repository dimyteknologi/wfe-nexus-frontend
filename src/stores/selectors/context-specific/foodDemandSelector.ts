import { createDeepEqualSelector } from "../baseSelector";
import { selectSocialDataComparison } from "./socialSelector";

const EMPTY_ARRAY = Array(16).fill(0);

const calculateFoodDemand = (socialData: number[], multiplier: number) => {
  if (!socialData || socialData.length === 0) return EMPTY_ARRAY;
  const result = new Array(16);
  for (let i = 0; i < 16; i++) {
    result[i] = ((socialData[i] ?? 0) * multiplier) / 1000;
  }
  return result;
};

export const selectFoodDemandRicePerScenario = createDeepEqualSelector(
  [selectSocialDataComparison],
  (social) => ({
    active: calculateFoodDemand(social.active, 79.2),
    baseline: calculateFoodDemand(social.baseline ?? social.active, 79.2),
    scenarioA: calculateFoodDemand(social.scenarioA, 79.2),
    scenarioB: calculateFoodDemand(social.scenarioB, 79.2),
  }),
);

export const selectFoodDemandMeizePerScenario = createDeepEqualSelector(
  [selectSocialDataComparison],
  (social) => ({
    active: calculateFoodDemand(social.active, 20),
    baseline: calculateFoodDemand(social.baseline ?? social.active, 20),
    scenarioA: calculateFoodDemand(social.scenarioA, 20),
    scenarioB: calculateFoodDemand(social.scenarioB, 20),
  }),
);
