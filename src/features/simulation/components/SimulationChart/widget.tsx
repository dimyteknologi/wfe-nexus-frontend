"use client";

import React, { useMemo } from "react";
import ChartComponent from "./index";
import SelectCollapsible from "../SimulationSelect/index";
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

  if (metric.id === 'productionSolar') {
    categories = Array.from({ length: 10 }, (_, i) => 2025 + i);
  }

  const { series, type, colors, invalidScenarios } = useAppSelector(selectSeriesForThisChart);
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
      className={`relative w-full max-w-full mx-auto bg-white rounded-lg p-2 shadow-md ${isScenarioOpen
          ? "sm:col-span-1 xl:col-span-3"
          : "sm:col-span-1 lg:col-span-3"
        }`}
    >
      <SelectCollapsible
        groupedOptions={availableMetricsGrouped}
        selectedValue={metric}
        onSelect={handleSelectionChange}
      />

      {invalidScenarios && invalidScenarios.length > 0 && (
        <div className="absolute top-10 right-2 z-10 animate-fade-in-down max-w-[80%]">
          <div className="bg-red-50 border-l-4 border-red-500 rounded-r-md shadow-sm p-2 flex items-start gap-2">
            <div className="flex-shrink-0 mt-0.5">
              <svg className="h-4 w-4 text-red-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-red-800">No Data for Scenario</p>
              <p className="text-[10px] text-red-700 leading-tight mt-0.5">
                {invalidScenarios.join(", ")}
              </p>
            </div>
          </div>
        </div>
      )}

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
