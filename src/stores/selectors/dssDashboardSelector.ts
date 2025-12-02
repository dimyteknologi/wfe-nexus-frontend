import { createSelector } from "@reduxjs/toolkit";
import {
  ALL_METRICS_CONTEXT_SPECIFICS,
  ALL_METRICS_SITE_SPECIFICS,
  Metric as MetricInterface,
} from "@/lib/constant/metrics";
import { selectDisplayedContextIds, selectDisplayedIds } from "./baseSelector";
import { IRootState } from "..";

type IdSelector = (state: IRootState) => string[];

const makeSelectDisplayedMetrics = (
  allMetrics: MetricInterface[],
  idSelector: IdSelector,
) =>
  createSelector([idSelector], (displayedIds) => {
    const map = new Map(displayedIds.map((id, index) => [id, index]));

    const filtered = allMetrics.filter((m) => map.has(m.id));

    return filtered.sort((a, b) => map.get(a.id)! - map.get(b.id)!);
  });

const makeSelectAvailableMetricsGrouped = (
  allMetrics: MetricInterface[],
  idSelector: IdSelector,
) =>
  createSelector([idSelector], (displayedIds) => {
    const set = new Set(displayedIds);

    const available = allMetrics.filter((m) => !set.has(m.id));

    return available.reduce(
      (acc, metric) => {
        let group = acc.find((g) => g.category === metric.category);
        if (!group) {
          group = { category: metric.category, options: [] };
          acc.push(group);
        }
        group.options.push(metric);
        return acc;
      },
      [] as { category: string; options: MetricInterface[] }[],
    );
  });

/* ==== SITE ==== */
export const selectDisplayedMetrics = makeSelectDisplayedMetrics(
  ALL_METRICS_SITE_SPECIFICS,
  selectDisplayedIds,
);

export const selectAvailableMetricsGrouped = makeSelectAvailableMetricsGrouped(
  ALL_METRICS_SITE_SPECIFICS,
  selectDisplayedIds,
);

/* ==== CONTEXT ==== */
export const selectDisplayedMetricsContext = makeSelectDisplayedMetrics(
  ALL_METRICS_CONTEXT_SPECIFICS,
  selectDisplayedContextIds,
);

export const selectAvailableMetricsGroupedContext =
  makeSelectAvailableMetricsGrouped(
    ALL_METRICS_CONTEXT_SPECIFICS,
    selectDisplayedContextIds,
  );
