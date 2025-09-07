"use client";

import React from "react";
import SelectCollapsible from "@/components/select/index";
import ChartComponent from "@/components/chart/index";
import { useAppSelector, useAppDispatch } from "@/stores/root-reducer";
import { updateChartMetric } from "@/stores/slicers/dashboardSlicer";
import { selectAvailableMetrics } from "@/stores/selectors/dssDashboardSelector";
import { Metric } from "@/lib/constant/metrics";
import { OptionType } from "@/lib/types/select.types";

interface ChartWidgetProps {
  metric: Metric;
  chartIndex: number;
  type: "area" | "line" | "bar" | "pie" | "donut" | "radialBar";
  categories: string[];
  isScenarioOpen: boolean;
  series: ApexAxisChartSeries;
}

const ChartWidget = ({
  metric,
  chartIndex,
  categories,
  type,
  isScenarioOpen,
  series,
}: ChartWidgetProps) => {
  const dispatch = useAppDispatch();

  const availableMetrics = useAppSelector(selectAvailableMetrics);
  const handleSelectionChange = (selected: OptionType) => {
    dispatch(
      updateChartMetric({
        chartIndex: chartIndex,
        newMetricId: selected.id,
      }),
    );
  };

  const selectOptions = availableMetrics.map((m) => ({
    id: m.id,
    title: `${m.title} (${m.unit})`,
    content: m.content,
  }));

  return (
    <div
      className={`w-full max-w-full mx-auto bg-white rounded-lg p-2 shadow-md ${
        isScenarioOpen
          ? "sm:col-span-1 xl:col-span-3"
          : "sm:col-span-1  lg:col-span-3"
      }`}
    >
      <SelectCollapsible
        options={selectOptions}
        initialSelected={{
          id: `${metric.id}`,
          title: `${metric.title} (${metric.unit})`,
          content: metric.content,
        }}
        height={200}
        onSelect={handleSelectionChange}
      />
      <div className="mt-2">
        <ChartComponent
          type={type}
          series={series}
          categories={categories}
          height={200}
        />
      </div>
    </div>
  );
};

export default ChartWidget;
