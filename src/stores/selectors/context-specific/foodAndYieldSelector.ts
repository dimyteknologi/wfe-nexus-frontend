import { createSelector } from "@reduxjs/toolkit";
import { FOOD_AND_YIELD } from "@/lib/constant/initialDataContext.constans";
import { selectPaddyPerFieldPerYieldComparisson } from "./foodAndSupplyInputDemandSelector";

export const PLANTING_SESSIONS = {
  INPARI32: FOOD_AND_YIELD.INPARI_32.PLANTING_SESSION_PER_YEAR,
  CIHERANG: FOOD_AND_YIELD.CIHERANG.PLANTING_SESSION_PER_YEAR,
  MEKONGGA: FOOD_AND_YIELD.MEKONGGA.PLANTING_SESSION_PER_YEAR,
  HIPASERRIES: FOOD_AND_YIELD.HIPASERRIES.PLANTING_SESSION_PER_YEAR,
  LOKAL: FOOD_AND_YIELD.LOKAL.PLANTING_SESSION_PER_YEAR,
} as const;

const calculateAveragePlantingSession = (
  shares: Record<string, number[]>,
  plantingSessions: Record<string, number>,
) => {
  const years = shares.Inpari32.length;
  const result = Array(years).fill(0);

  for (let i = 0; i < years; i++) {
    const inpari32 = shares.Inpari32[i] / 100;
    const ciherang = shares.Ciherang[i] / 100;
    const mekongga = shares.Mekongga[i] / 100;
    const hipa = shares.HipaSeries[i] / 100;
    const lokal = shares.Lokal[i] / 100;

    result[i] = Number(
      (
        inpari32 * plantingSessions.INPARI32 +
        ciherang * plantingSessions.CIHERANG +
        mekongga * plantingSessions.MEKONGGA +
        hipa * plantingSessions.HIPASERRIES +
        lokal * plantingSessions.LOKAL
      ).toFixed(10),
    );
  }

  return result;
};

export const selectAveragePlantingSessions = createSelector(
  [selectPaddyPerFieldPerYieldComparisson],
  (comparison) => ({
    active: calculateAveragePlantingSession(
      comparison.active,
      PLANTING_SESSIONS,
    ),
    // baseline: calculateAveragePlantingSession(comparison.baseline, PLANTING_SESSIONS),
    scenarioA: calculateAveragePlantingSession(
      comparison.scenarioA,
      PLANTING_SESSIONS,
    ),
    scenarioB: calculateAveragePlantingSession(
      comparison.scenarioB,
      PLANTING_SESSIONS,
    ),
  }),
);
