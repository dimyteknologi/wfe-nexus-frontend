"use client";

import React, { useState, useMemo, useEffect } from "react";
import Table from "@/components/table";
import MultiSelect, { SelectOption } from "@/components/select/multi-select";
import { Column } from "@/lib/types/table.typers";
import { Metric, ALL_METRICS } from "@/lib/constant/metrics";
import { useAppSelector } from "@/stores/root-reducer";
import { selectAllMetricsDataMap } from "@/stores/selectors/site-specific/dssChartSelector";
import {
  selectSiteSpecificScenarioAName,
  selectSiteSpecificScenarioBName,
} from "@/stores/selectors/baseSelector";
import { selectDisplayedMetrics } from "@/stores/selectors/dssDashboardSelector";

interface TableRow {
  year: string;
  scenario: string;
  [metricId: string]: string | number;
}

const SnapshotTableWidget: React.FC = () => {
  const allMetricsData = useAppSelector(selectAllMetricsDataMap);
  const metricsOptions = useAppSelector(selectDisplayedMetrics);
  const years = useAppSelector(
    (state) => state.gdrp.baseline?.years.map(String) || [],
  );
  const scenarioAName = useAppSelector(selectSiteSpecificScenarioAName);
  const scenarioBName = useAppSelector(selectSiteSpecificScenarioBName);
  const [selectedMetricIds, setSelectedMetricIds] = useState<string[]>([]);
  const [selectedScenarioKeys, setSelectedScenarioKeys] = useState<string[]>([
    "active",
  ]);

  useEffect(() => {
    setSelectedMetricIds(
      metricsOptions.length > 0 ? [metricsOptions[0].id] : [],
    );
  }, [metricsOptions]);

  const multiSelectMetricOptions = useMemo((): SelectOption[] => {
    return metricsOptions.map((metric) => ({
      value: metric.id,
      label: metric.title,
    }));
  }, [metricsOptions]);

  const multiSelectScenarioOptions = useMemo((): SelectOption[] => {
    const options = [
      { value: "baseline", label: "Baseline" },
      { value: "active", label: "Active" },
    ];
    if (scenarioAName)
      options.push({ value: "scenarioA", label: scenarioAName });
    if (scenarioBName)
      options.push({ value: "scenarioB", label: scenarioBName });
    return options;
  }, [scenarioAName, scenarioBName]);

  const tableColumns = useMemo((): Column<TableRow>[] => {
    const columns: Column<TableRow>[] = [
      { key: "year", label: "Year" },
      { key: "scenario", label: "Scenario" },
    ];
    selectedMetricIds.forEach((metricId) => {
      const metricConfig = ALL_METRICS.find((m) => m.id === metricId);
      if (metricConfig) {
        columns.push({
          key: metricId,
          label: `${metricConfig.title}`,
          render: (row) =>
            (row[metricId] as number)?.toLocaleString("id-ID") ?? "-",
        });
      }
    });
    return columns;
  }, [selectedMetricIds]);

  const tableData = useMemo((): TableRow[] => {
    if (!allMetricsData || years.length === 0) return [];

    const allRows: TableRow[] = [];
    const scenariosToDisplay = [
      { name: "Baseline", key: "baseline" },
      { name: "Active", key: "active" },
      { name: scenarioAName, key: "scenarioA" },
      { name: scenarioBName, key: "scenarioB" },
    ];

    years.forEach((year: string, index: number) => {
      for (const scenario of scenariosToDisplay) {
        if (scenario.name && selectedScenarioKeys.includes(scenario.key)) {
          const row: TableRow = { year, scenario: scenario.name };
          for (const metricId of selectedMetricIds) {
            const metricData = allMetricsData[metricId];
            if (metricData) {
              row[metricId] =
                metricData[scenario.key as keyof typeof metricData]?.[index] ??
                0;
            }
          }
          allRows.push(row);
        }
      }
    });
    return allRows;
  }, [
    allMetricsData,
    years,
    selectedMetricIds,
    selectedScenarioKeys,
    scenarioAName,
    scenarioBName,
  ]);

  return (
    <div className="w-full bg-white p-4 sm:p-6 rounded-lg shadow-md space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Select Metrics
          </label>
          <MultiSelect
            options={multiSelectMetricOptions}
            selectedValues={selectedMetricIds}
            onChange={setSelectedMetricIds}
            placeholder="Select"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Select Scenario
          </label>
          <MultiSelect
            options={multiSelectScenarioOptions}
            selectedValues={selectedScenarioKeys}
            onChange={setSelectedScenarioKeys}
            placeholder="Select"
          />
        </div>
      </div>

      <Table<TableRow> columns={tableColumns} data={tableData} />
    </div>
  );
};

export default SnapshotTableWidget;
