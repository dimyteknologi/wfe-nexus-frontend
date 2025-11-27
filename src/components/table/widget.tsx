"use client";

import React, { useState, useMemo, useEffect } from "react";
import Table from "@/components/table";
import MultiSelect, { SelectOption } from "@/components/select/multi-select";
import { Column } from "@/lib/types/table.typers";
import {
  ALL_METRICS_SITE_SPECIFICS,
  ALL_METRICS_CONTEXT_SPECIFICS,
} from "@/lib/constant/metrics";

import { useAppSelector } from "@/stores/root-reducer";

/** SITE selectors */
import { selectAllMetricsDataMap as selectAllMetricsSite } from "@/stores/selectors/site-specific/dssChartSelector";
import {
  selectSiteSpecificScenarioAName,
  selectSiteSpecificScenarioBName,
} from "@/stores/selectors/baseSelector";

/** CONTEXT selectors */
import { selectAllMetricsDataMap as selectAllMetricsContext } from "@/stores/selectors/context-specific/dssChartSelector";
import {
  selectContextSpecificAName,
  selectContextSpecificBName,
} from "@/stores/selectors/baseSelector";

import {
  selectDisplayedMetrics,
  selectDisplayedMetricsContext,
} from "@/stores/selectors/dssDashboardSelector";

interface TableRow {
  year: string;
  scenario: string;
  [metricId: string]: string | number;
}

type ScenarioKey = "active" | "baseline" | "scenarioA" | "scenarioB";

interface TableProps {
  category: "site" | "context";
}

const SnapshotTableWidget: React.FC<TableProps> = ({ category }) => {
  /** ------------------------------
   * CONFIG SELECTORS (NO CONDITIONAL HOOKS)
   * ------------------------------ */
  const selectorConfig = {
    site: {
      metricsData: selectAllMetricsSite,
      metricsList: selectDisplayedMetrics,
      scenarioA: selectSiteSpecificScenarioAName,
      scenarioB: selectSiteSpecificScenarioBName,
      metricConfigs: ALL_METRICS_SITE_SPECIFICS,
    },
    context: {
      metricsData: selectAllMetricsContext,
      metricsList: selectDisplayedMetricsContext,
      scenarioA: selectContextSpecificAName,
      scenarioB: selectContextSpecificBName,
      metricConfigs: ALL_METRICS_CONTEXT_SPECIFICS,
    },
  } as const;

  const config = selectorConfig[category];

  /** SAFE HOOK CALLS (UNCONDITIONAL) */
  const allMetricsData = useAppSelector(config.metricsData);
  const metricsOptions = useAppSelector(config.metricsList);
  const scenarioAName = useAppSelector(config.scenarioA);
  const scenarioBName = useAppSelector(config.scenarioB);

  const metricConfigList = config.metricConfigs;

  /** ---- SELECTED METRICS ---- */
  const [selectedMetricIds, setSelectedMetricIds] = useState<string[]>([]);
  const [selectedScenarioKeys, setSelectedScenarioKeys] = useState<string[]>([
    "active",
  ]);

  /** Auto select first metric */
  useEffect(() => {
    if (metricsOptions.length > 0) {
      setSelectedMetricIds([metricsOptions[0].id]);
    }
  }, [metricsOptions]);

  /** ---- METRIC MULTISELECT ---- */
  const multiSelectMetricOptions = useMemo<SelectOption[]>(() => {
    return metricsOptions.map((metric) => ({
      value: metric.id,
      label: metric.title,
    }));
  }, [metricsOptions]);

  /** ---- SCENARIO MULTISELECT ---- */
  const multiSelectScenarioOptions = useMemo<SelectOption[]>(() => {
    if (!metricsOptions.length) return [];

    const firstMetricId = metricsOptions[0].id;
    const opts: SelectOption[] = [];

    if (allMetricsData?.[firstMetricId]?.baseline) {
      opts.push({ value: "baseline", label: "Baseline" });
    }

    opts.push({ value: "active", label: "Active" });

    if (scenarioAName) opts.push({ value: "scenarioA", label: scenarioAName });

    if (scenarioBName) opts.push({ value: "scenarioB", label: scenarioBName });

    return opts;
  }, [allMetricsData, metricsOptions, scenarioAName, scenarioBName]);

  /** ---- TABLE COLUMNS ---- */
  const tableColumns = useMemo<Column<TableRow>[]>(() => {
    const columns: Column<TableRow>[] = [
      { key: "year", label: "Year" },
      { key: "scenario", label: "Scenario" },
    ];

    selectedMetricIds.forEach((metricId) => {
      const metricConfig = metricConfigList.find((m) => m.id === metricId);
      if (!metricConfig) return;

      columns.push({
        key: metricId,
        label: metricConfig.title,
        render: (row) =>
          (row[metricId] as number)?.toLocaleString("id-ID") ?? "-",
      });
    });

    return columns;
  }, [selectedMetricIds, metricConfigList]);

  const years = useMemo(() => {
    if (category === "site") {
      return Array.from({ length: 36 }, (_, i) => String(2010 + i));
    }
    return Array.from({ length: 10 }, (_, i) => String(2015 + i));
  }, [category]);

  /** ---- TABLE DATA ---- */
  const tableData = useMemo<TableRow[]>(() => {
    if (!allMetricsData) return [];

    const rows: TableRow[] = [];

    const rawScenarios = [
      { key: "baseline" as const, name: "Baseline" },
      { key: "active" as const, name: "Active" },
      { key: "scenarioA" as const, name: scenarioAName },
      { key: "scenarioB" as const, name: scenarioBName },
    ];

    const scenarios: { key: ScenarioKey; name: string }[] = rawScenarios
      .filter(
        (s) =>
          s.name &&
          selectedScenarioKeys.includes(s.key) &&
          selectedMetricIds.some(
            (metricId) => allMetricsData?.[metricId]?.[s.key] ?? 0,
          ),
      )
      .map((s) => ({
        key: s.key as ScenarioKey,
        name: s.name!,
      }));

    years.forEach((year: string, index: number) => {
      scenarios.forEach((scenario) => {
        const row: TableRow = { year, scenario: scenario.name };

        selectedMetricIds.forEach((metricId) => {
          const metricData = allMetricsData?.[metricId];

          const value = metricData?.[scenario.key]?.[index] ?? 0;

          row[metricId] = value;
        });

        rows.push(row);
      });
    });

    return rows;
  }, [
    allMetricsData,
    selectedMetricIds,
    selectedScenarioKeys,
    scenarioAName,
    scenarioBName,
  ]);

  return (
    <div className="w-full bg-white p-4 sm:p-6 rounded-lg shadow-md space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* METRIC SELECTOR */}
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

        {/* SCENARIO SELECTOR */}
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
