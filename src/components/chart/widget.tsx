"use client";

import React, { useMemo } from "react";
import SelectCollapsible from "@/components/select/index";
import ChartComponent from "@/components/chart/index";
import { useAppSelector, useAppDispatch } from "@/stores/root-reducer";
import { updateChartMetric } from "@/stores/slicers/dashboardSlicer";
import {
  selectAvailableMetricsGrouped,
  selectAvailableMetricsGroupedContext,
} from "@/stores/selectors/dssDashboardSelector";
import { makeSelectComparisonSeriesForMetric as ComparissonSiteSeries } from "@/stores/selectors/site-specific/dssChartSelector";
import { makeSelectComparisonSeriesForMetric as ComparissonContextSeries } from "@/stores/selectors/context-specific/dssChartSelector";
import { Metric } from "@/lib/constant/metrics";

interface ChartWidgetProps {
  metric: Metric;
  category: "site" | "context";
  chartIndex: number;
  categories: number[];
  isScenarioOpen: boolean;
}

const ChartWidget = ({
  metric,
  chartIndex,
  category,
  categories,
  isScenarioOpen,
}: ChartWidgetProps) => {
  const dispatch = useAppDispatch();
  const selectSeriesForThisChart = useMemo(
    () =>
      category === "site"
        ? ComparissonSiteSeries(metric.id)
        : ComparissonContextSeries(metric.id),
    [metric.id, category],
  );

  const { series, type, colors } = useAppSelector(selectSeriesForThisChart);

  const availableMetricsGrouped = useAppSelector(
    category === "site"
      ? selectAvailableMetricsGrouped
      : selectAvailableMetricsGroupedContext,
  );

  const handleSelectionChange = (selectedId: string) => {
    dispatch(
      updateChartMetric({
        target: category,
        chartIndex,
        newMetricId: selectedId,
      }),
    );
  };

  return (
    <div
      className={`w-full max-w-full mx-auto bg-white rounded-lg p-2 shadow-md ${
        isScenarioOpen
          ? "sm:col-span-1 xl:col-span-3"
          : "sm:col-span-1 lg:col-span-3"
      }`}
    >
      <SelectCollapsible
        groupedOptions={availableMetricsGrouped}
        selectedValue={metric}
        onSelect={handleSelectionChange}
      />

      <div className="mt-2">
        <ChartComponent
          colors={colors}
          type={type}
          series={series}
          categories={categories}
          height={200}
        />
      </div>
    </div>
  );
};

export default React.memo(ChartWidget);
