import React, { memo, useMemo } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import CollapsibleTitle from "../basic/CollapsibleTitle";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface iChartProps {
  type?: "line" | "bar" | "area" | "pie" | "donut" | "radialBar";
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  categories?: string[];
  height?: number | string;
  colors?: string[];
  title?: string;
  content?: string;
}

const ChartComponent: React.FC<iChartProps> = ({
  type = "line",
  series,
  categories = [],
  height = 300,
  colors,
  title,
  content,
}) => {
  const options: ApexOptions = useMemo(
    () => ({
      chart: {
        type,
        enableOnSeries: true,
        toolbar: { show: false },
        zoom: { enabled: false },
        animations: {
          enabled: false,
        },
        stroke: {
          width: [5, 7, 5],
          curve: "straight",
        },
      },
      xaxis: {
        categories,
        labels: {
          style: {
            fontSize: "6px",
          },
        },
      },
      colors,
      stroke: { curve: "smooth" },
      dataLabels: { enabled: false },
      legend: { show: true, position: "bottom" },
    }),
    [type, categories, colors],
  );

  return (
    <>
      <CollapsibleTitle onClick={() => {}} title={title} content={content} />
      <ApexChart
        options={options}
        series={series}
        type={type}
        height={height}
        width={"100%"}
      />
    </>
  );
};

export default memo(ChartComponent);
