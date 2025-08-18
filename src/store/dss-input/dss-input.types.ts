type Periode = "2025-2030" | "2031-2040" | "2041-2045";
type Sektor =
  | "AGRICULTURE"
  | "LIVESTOCK"
  | "ENERGY"
  | "INDUSTRY"
  | "WATER_MANAGEMENT"
  | "DEMOGRAPHY";

interface DataSkenario {
  nilai: number;
  periode: Periode;
}

interface Skenario {
  nama: string;
  data: DataSkenario[];
}

interface SektorData {
  sektor: Sektor;
  skenario: Skenario[];
}

type StateSimulasi = SektorData[];
