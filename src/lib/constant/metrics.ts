export interface Metric {
  id: string;
  title: string;
  type: "area" | "line" | "bar" | "pie" | "donut" | "radialBar";
  unit: string;
  content: string;
}

export const ALL_METRICS: Metric[] = [
  {
    id: "gdrp",
    title: "GDRP",
    unit: "Bilion Rp/year",
    type: "bar",
    content:
      "GDP adalah nilai total seluruh barang dan jasa yang dihasilkan oleh suatu negara dalam periode tertentu (biasanya satu tahun)Indikator ini menggambarkan ukuran ekonomi suatu negara, semakin tinggi GDP berarti semakin besar aktivitas ekonominya.",
  },
  {
    id: "population",
    title: "Population",
    unit: "people",
    type: "line",
    content: "",
  },
  {
    id: "economicGrowth",
    title: "Economic Growth",
    unit: "%/year",
    type: "line",
    content:
      "Economic growth adalah peningkatan kapasitas suatu negara dalam menghasilkan barang dan jasa dari waktu ke waktu. Pertumbuhan ini biasanya diukur dengan persentase kenaikan GDP riil tahunan. Pertumbuhan ekonomi mencerminkan perkembangan produktivitas, investasi, dan kesejahteraan masyarakat.",
  },
  {
    id: "gdrpPerCapita",
    title: "GDRP Per Capita",
    unit: "Milion Rp/cap/year",
    type: "line",
    content: "",
  },
  {
    id: "agricultureLand",
    title: "Agriculture land",
    unit: "ha",
    type: "line",
    content: "",
  },
  {
    id: "localFoodProduction",
    title: "Local Food Production",
    unit: "ton/year",
    type: "bar",
    content: "",
  },
  {
    id: "availabilityPerson",
    title: "Availability per Person",
    unit: "kg/kap/year",
    type: "line",
    content: "",
  },
];
