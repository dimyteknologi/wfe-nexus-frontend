"use client";

import React, { useMemo } from "react";
import SelectCollapsible from "@/components/select/index";
import ChartComponent from "@/components/chart/index";
import { useAppSelector, useAppDispatch } from "@/stores/root-reducer";
import { updateChartMetric } from "@/stores/slicers/dashboardSlicer";
import { selectAvailableMetricsGrouped } from "@/stores/selectors/dssDashboardSelector";
import { makeSelectComparisonSeriesForMetric } from "@/stores/selectors/site-specific/dssChartSelector";
import { Metric } from "@/lib/constant/metrics";

import { OptionType } from "@/lib/types/select.types";

interface ChartWidgetProps {
  metric: Metric;
  chartIndex: number;
  categories: number[];
  isScenarioOpen: boolean;
}

const ChartWidget = ({
  metric,
  chartIndex,
  categories,
  isScenarioOpen,
}: ChartWidgetProps) => {
  const dispatch = useAppDispatch();
  const selectSeriesForThisChart = useMemo(
    () => makeSelectComparisonSeriesForMetric(metric.id),
    [metric.id],
  );
  const { series, type, colors } = useAppSelector(selectSeriesForThisChart);
  const availableMetricsGrouped = useAppSelector(selectAvailableMetricsGrouped);

  const handleSelectionChange = (selectedId: string) => {
    dispatch(
      updateChartMetric({
        chartIndex: chartIndex,
        newMetricId: selectedId,
      }),
    );
  };

  // const selectOptions = availableMetrics.map((m) => ({
  //   id: m.id,
  //   title: `${m.title} (${m.unit})`,
  //   content: m.content,
  // }));

  return (
    <div
      className={`w-full max-w-full mx-auto bg-white rounded-lg p-2 shadow-md ${
        isScenarioOpen
          ? "sm:col-span-1 xl:col-span-3"
          : "sm:col-span-1  lg:col-span-3"
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
