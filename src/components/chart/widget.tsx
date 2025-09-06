"use client";

import { useState } from "react";
import SelectCollapsible from "@/components/select";
import { OptionType } from "@/lib/types/select.types";
import ChartComponent from "@/components/chart/index";

interface ChartData {
  id: string;
  title: string;
  content: React.ReactNode;
  type: "line" | "bar" | "area";
  series: ApexAxisChartSeries;
}

interface ChartWidgetProps {
  data: ChartData[] | [];
  categories: string[];
  isScenarioOpen: boolean;
}

const ChartWidget = ({
  data,
  categories,
  isScenarioOpen,
}: ChartWidgetProps) => {
  const [activeChart, setActiveChart] = useState<ChartData>(data[0]);

  const handleSelectionChange = (selected: OptionType) => {
    const newActiveChart = data.find((chart) => chart.title === selected.title);
    if (newActiveChart) {
      setActiveChart(newActiveChart);
    }
  };

  const selectOptions: OptionType[] = data.map((chart) => ({
    title: chart.title,
    content: chart.content,
  }));

  return (
    <div
      className={`w-full  max-w-full mx-auto bg-white rounded-lg ${
        isScenarioOpen
          ? "sm:col-span-1 xl:col-span-3"
          : "sm:col-span-1  lg:col-span-3"
      }`}
    >
      <SelectCollapsible
        options={selectOptions}
        initialSelected={activeChart}
        onSelect={handleSelectionChange}
      />
      <div className="mt-2">
        <ChartComponent
          type={activeChart?.type}
          series={activeChart?.series}
          categories={categories}
          height={200}
        />
      </div>
    </div>
  );
};

export default ChartWidget;
