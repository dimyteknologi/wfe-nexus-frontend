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
      "GDP adalah nilai total seluruh barang dan jasa yang dihasilkan oleh suatu negara dalam periode tertentu (biasanya satu tahun)Indikator ini menggambarkan ukuran ekonomi suatu negara, semakin tinggi GDP berarti semakin besar aktivitas ekonominya.",
  },
  {
    category: "SE",
    id: "population",
    title: "Population [people]",
    unit: "people",
    type: "line",
    content: "",
  },
  {
    category: "SE",
    id: "economicGrowth",
    title: "Economic Growth [%/year]",
    unit: "%/year",
    type: "line",
    content:
      "Economic growth adalah peningkatan kapasitas suatu negara dalam menghasilkan barang dan jasa dari waktu ke waktu. Pertumbuhan ini biasanya diukur dengan persentase kenaikan GDP riil tahunan. Pertumbuhan ekonomi mencerminkan perkembangan produktivitas, investasi, dan kesejahteraan masyarakat.",
  },
  {
    category: "SE",
    id: "gdrpPerCapita",
    title: "GDRP Per Capita [Milion Rp/cap/year]",
    unit: "Milion Rp/cap/year",
    type: "line",
    content: "",
  },
  {
    category: "FOOD",
    id: "agricultureLand",
    title: "Agriculture land [ha]",
    unit: "ha",
    type: "line",
    content: "",
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
    content: "",
  },
  {
    category: "FOOD",
    id: "availabilityPerson",
    title: "Availability per Person [kg/kap/year]",
    unit: "kg/kap/year",
    type: "line",
    content: "",
  },
  {
    category: "FOOD",
    id: "localFoodSuffiency",
    title: "Local Food Suffiency [%]",
    unit: "%",
    type: "line",
    content: "",
  },
  {
    category: "ENERGY",
    id: "localEnergySuffiency",
    title: "Local Energy Suffiency [%]",
    unit: "%",
    type: "line",
    content: "",
  },
  {
    category: "ENERGY",
    id: "electricityImport",
    title: "Electricity Import [GWh/year]",
    unit: "GWh/year",
    type: "line",
    content: "",
  },
  {
    category: "ENERGY",
    id: "localEnergyProduction",
    title: "Local Energy Production [GWh/year]",
    unit: "GWh/year",
    type: "line",
    content: "",
  },
  {
    category: "ENERGY",
    id: "localRenewableEnergy",
    title: "Local Renewable Energy Contribution [%]",
    unit: "%",
    type: "line",
    content: "",
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
    content: "",
  },
  {
    category: "WATER",
    id: "localWaterSuffiency",
    title: "Local Water Suffiency [%]",
    unit: "%",
    type: "line",
    content: "",
  },
  {
    id: "waterAvailability",
    title: "Water Availability per person [m3/cap/year]",
    category: "WATER",
    unit: "m3/cap/year",
    type: "line",
    content: "Ketersediaan air tahunan per kapita.",
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
