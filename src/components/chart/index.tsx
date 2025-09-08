// components/ChartComponent.tsx
import React, { memo, useMemo } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });
interface ChartProps {
  type?: "line" | "bar" | "area" | "pie" | "donut" | "radialBar";
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  categories?: string[];
  height?: number | string;
  colors?: string[];
}

const ChartComponent: React.FC<ChartProps> = ({
  type = "line",
  series,
  categories = [],
  height = 300,
  colors,
}) => {
  const options: ApexOptions = useMemo(
    () => ({
      chart: {
        type,
        toolbar: { show: false },
        zoom: { enabled: false },
        animations: { enabled: false },
      },
      xaxis: {
        categories,
        tickAmount: 5,
        labels: {
          rotate: 0,
          style: {
            fontSize: "8px",
          },
        },
      },
      yaxis: {
        type: "decimal",
        opposite: false,
        labels: {
          offsetX: 0,
          formatter: (val: number) =>
            new Intl.NumberFormat("id-ID").format(val),
        },
      },
      colors,
      stroke: {
        curve: "smooth",
        width: type === "line" ? 3 : 0,
      },
      dataLabels: { enabled: false },
      legend: { show: true, offsetY: 10, fontSize: "9px", position: "bottom" },
      grid: {
        borderColor: "#e7e7e7",
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
    }),
    [type, categories, colors],
  );

  return (
    <ApexChart
      options={options}
      series={series}
      type={type}
      height={height}
      width={"100%"}
    />
  );
};

export default memo(ChartComponent);
