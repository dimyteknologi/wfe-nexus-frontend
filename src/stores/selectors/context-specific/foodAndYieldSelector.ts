import { createDeepEqualSelector } from "../baseSelector";
import { FOOD_AND_YIELD } from "@/lib/constant/initialDataContext.constans";
import { agricultureLandPaddyPerscenario } from "./foodAndSupplyInputDemandSelector";
import { selectContextSpecificActive, selectContextSpecificBaseline } from "../baseSelector";
import { selectedContextSpecificA, selectedContextSpecificB } from "./scenarioProjectionSelector";
import { ContextSpecificState } from "@/stores/slicers/contextSpecificInputSlicer";

export const PLANTING_SESSIONS = {
  INPARI32: FOOD_AND_YIELD.INPARI_32.PLANTING_SESSION_PER_YEAR,
  CIHERANG: FOOD_AND_YIELD.CIHERANG.PLANTING_SESSION_PER_YEAR,
  MEKONGGA: FOOD_AND_YIELD.MEKONGGA.PLANTING_SESSION_PER_YEAR,
  HIPASERRIES: FOOD_AND_YIELD.HIPASERRIES.PLANTING_SESSION_PER_YEAR,
  LOKAL: FOOD_AND_YIELD.LOKAL.PLANTING_SESSION_PER_YEAR,
} as const;


const calculateAveragePlantingSession = (
  shares: number[],
  intensity: number,
) => {
  const years = shares.length;
  const result = Array(years).fill(0);

  for (let i = 0; i < years; i++) {
    result[i] = intensity;
  }
  return result;
};

export const selectAveragePlantingSessions = createDeepEqualSelector(
  [agricultureLandPaddyPerscenario,
    selectContextSpecificActive, selectContextSpecificBaseline,
    selectedContextSpecificA, selectedContextSpecificB
  ],
  (comparison, active, baseline, scenarioA, scenarioB) => {
    const getInput = (scenario: ContextSpecificState) => {
      return scenario?.agriculture?.croppingIntensity?.["2015-2030"] ?? 0;
    };
    return {
      active: calculateAveragePlantingSession(
        comparison.active,
        getInput(active),
      ),
      baseline: calculateAveragePlantingSession(
        comparison.baseline ?? comparison.active,
        getInput(baseline ?? active),
      ),
      scenarioA: calculateAveragePlantingSession(
        comparison.scenarioA,
        getInput(scenarioA),
      ),
      scenarioB: calculateAveragePlantingSession(
        comparison.scenarioB,
        getInput(scenarioB),
      ),
    }
  },
);
