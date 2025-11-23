export interface Metric {
  id: string;
  title: string;
  type: "area" | "line" | "bar" | "pie" | "donut" | "radialBar";
  category: string;
  unit: string;
  content: string;
  additionalSeries?: {
    name: string;
    data: number[];
    color?: string;
  }[];
}

const nationalThresholdData = [
  610, 649, 734, 776, 804, 950, 807, 923, 925, 965, 993, 1044, 1269, 1278,
];
const noStressData = new Array(36).fill(1700);
const stressData = new Array(36).fill(1000);
const scarcityData = new Array(36).fill(500);

export const ALL_METRICS: Metric[] = [
  {
    category: "SE",
    id: "gdrp",
    title: "GDRP [Bilion Rp/year]",
    unit: "Bilion Rp/year",
    type: "bar",
    content:
      "The number of gross domestic regional product within one year, as economic performance of region",
  },
  {
    category: "SE",
    id: "population",
    title: "Population [people]",
    unit: "people",
    type: "line",
    content: "The number of populations in the region",
  },
  {
    category: "SE",
    id: "economicGrowth",
    title: "Economic Growth [%/year]",
    unit: "%/year",
    type: "line",
    content: "GDRP Growth rate",
  },
  {
    category: "SE",
    id: "gdrpPerCapita",
    title: "GDP Per Capita [Milion Rp/cap/year]",
    unit: "Milion Rp/cap/year",
    type: "line",
    content: "The number of GDRP divided by number of populations",
  },
  {
    category: "FOOD",
    id: "agricultureLand",
    title: "Agriculture land [ha]",
    unit: "ha",
    type: "line",
    content: "The number of harvested crops land within a year in the region",
  },
  {
    category: "FOOD",
    id: "productionSurplus",
    title: "Food Production Surplus [ton/year]",
    unit: "ton/year",
    type: "line",
    content: "",
  },
  {
    category: "FOOD",
    id: "localFoodProduction",
    title: "Local Food Production [ton/year]",
    unit: "ton/year",
    type: "bar",
    content:
      "The number production of staple food (crops, fish, meat, and egg) in the region",
  },
  {
    category: "FOOD",
    id: "availabilityPerson",
    title: "Availability per Person [kg/kap/year]",
    unit: "kg/kap/year",
    type: "line",
    content:
      "The number production of staple food divided by number of populations",
  },
  {
    category: "FOOD",
    id: "localFoodSuffiency",
    title: "Local Food Suffiency [%]",
    unit: "%",
    type: "line",
    content:
      "The number production of staple food divided by number of its demand—staple food unit times population",
  },
  {
    category: "ENERGY",
    id: "localEnergySuffiency",
    title: "Local Energy Suffiency [%]",
    unit: "%",
    type: "line",
    content:
      "The ratio between local energy production and region’s energy demand for social and economic purpose",
  },
  {
    category: "ENERGY",
    id: "electricityImport",
    title: "Electricity Import [GWh/year]",
    unit: "GWh/year",
    type: "line",
    content:
      "The number of gaps between local energy supply and local demand which be fulfilled from regional system",
  },
  {
    category: "ENERGY",
    id: "localEnergyProduction",
    title: "Local Energy Production [GWh/year]",
    unit: "GWh/year",
    type: "line",
    content: "The number of local energy production",
  },
  {
    category: "ENERGY",
    id: "localRenewableEnergy",
    title: "Local Renewable Energy Contribution [%]",
    unit: "%",
    type: "line",
    content:
      "The ratio between the number of local energy production which using renewable sources and total energy demand",
  },
  {
    category: "ENERGY",
    id: "electricityPerCapita",
    title: "Electricity per Capita [KWh/cap/year]",
    unit: "KWh/cap/year",
    type: "line",
    content: "",
    additionalSeries: [
      {
        name: "Electricity per Capita National [KWh/cap/year]",
        data: nationalThresholdData,
      },
    ],
  },
  {
    category: "WATER",
    id: "annualWaterSuply",
    title: "Annual Water Supply [million m3/year]",
    unit: "million m3/year",
    type: "line",
    content: "One year calculation regarding annual water supply",
  },
  {
    category: "WATER",
    id: "localWaterSuffiency",
    title: "Local Water Suffiency [%]",
    unit: "%",
    type: "line",
    content: "The ratio between local water production and its demand",
  },
  {
    id: "waterAvailability",
    title: "Water Availability per person [m3/cap/year]",
    category: "WATER",
    unit: "m3/cap/year",
    type: "line",
    content: "",
    additionalSeries: [
      {
        name: "Falkenmark: No stress",
        data: noStressData,
        color: "#2E8B57",
      },
      {
        name: "Falkenmark: Stress",
        data: stressData,
        color: "#FFD700",
      },
      {
        name: "Falkenmark: Scarcity",
        data: scarcityData,
        color: "#DC143C",
      },
    ],
  },
];
