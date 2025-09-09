import { createSelector } from "@reduxjs/toolkit";
import { ALL_METRICS } from "@/lib/constant/metrics";
import { selectDisplayedIds } from "./baseSelector";

export const selectDisplayedMetrics = createSelector(
  [selectDisplayedIds], // input array string ['population', 'gdrp']
  (displayedIds) => {
    // filters
    const filtered = ALL_METRICS.filter((metric) =>
      displayedIds.includes(metric.id),
    );

    // sort
    const sorted = filtered.sort((a, b) => {
      const indexA = displayedIds.indexOf(a.id);
      const indexB = displayedIds.indexOf(b.id);
      return indexA - indexB;
    });

    return sorted;
  },
);

export const selectAvailableMetrics = createSelector(
  [selectDisplayedIds],
  (displayedIds) => {
    const displayedIdSet = new Set(displayedIds);
    return ALL_METRICS.filter((metric) => !displayedIdSet.has(metric.id));
  },
);
