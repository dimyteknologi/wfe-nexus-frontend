import { createSelector } from "@reduxjs/toolkit";
import { ALL_METRICS, Metric } from "@/lib/constant/metrics";
import { selectDisplayedIds } from "./baseSelector";

// export const selectDisplayedMetrics = createSelector(
//   [selectDisplayedIds], // input array string ['population', 'gdrp']
//   (displayedIds) => {
//     // filters
//     const filtered = ALL_METRICS.filter((metric) =>
//       displayedIds.includes(metric.id),
//     );

//     // sort
//     const sorted = filtered.sort((a, b) => {
//       const indexA = displayedIds.indexOf(a.id);
//       const indexB = displayedIds.indexOf(b.id);
//       return indexA - indexB;
//     });

//     return sorted;
//   },
// );

// export const selectAvailableMetrics = createSelector(
//   [selectDisplayedIds],
//   (displayedIds) => {
//     const displayedIdSet = new Set(displayedIds);
//     return ALL_METRICS.filter((metric) => !displayedIdSet.has(metric.id));
//   },
// );

export const selectDisplayedMetrics = createSelector(
  [selectDisplayedIds],
  (displayedIds) => {
    const displayedMap = new Map(
      displayedIds.map((id: string, index: number) => [id, index]),
    );
    const filtered = ALL_METRICS.filter((metric) =>
      displayedMap.has(metric.id),
    );
    const sorted = filtered.sort((a, b) => {
      const indexA = displayedIds.indexOf(a.id);
      const indexB = displayedIds.indexOf(b.id);
      return indexA - indexB;
    });
    return sorted;
  },
);

// export const selectAvailableMetrics = createSelector(
//   [selectDisplayedIds, selectActiveCategory],
//   (displayedIds, activeCategory) => {
//     const displayedIdSet = new Set(displayedIds);
//     return ALL_METRICS.filter(metric =>
//         metric.category === activeCategory &&
//         !displayedIdSet.has(metric.id)
//     );
//   }
// );

export const selectAvailableMetricsGrouped = createSelector(
  [selectDisplayedIds],
  (displayedIds) => {
    const displayedIdSet = new Set(displayedIds);
    const available = ALL_METRICS.filter(
      (metric) => !displayedIdSet.has(metric.id),
    );
    const grouped = available.reduce(
      (acc, metric) => {
        let group = acc.find((g) => g.category === metric.category);
        if (!group) {
          group = { category: metric.category, options: [] };
          acc.push(group);
        }
        group.options.push(metric);
        return acc;
      },
      [] as { category: string; options: Metric[] }[],
    );

    return grouped;
  },
);
