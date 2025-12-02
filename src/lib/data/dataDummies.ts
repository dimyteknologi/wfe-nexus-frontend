import { SectionConfig } from "../types/dss-input.dummy.types";

export const sections: SectionConfig[] = [
  {
    title: "Agriculture",
    inputs: [
      {
        label: "Growth scenario [%/year]",
        periods: ["2025-2030", "2031-2040", "2041-2045"],
        withValidation: true,
        id: "agriculture.growthScenario",
      },
      {
        label: "Agriculture land conversion [%/year]",
        periods: ["2025-2030", "2031-2040", "2041-2045"],
        withValidation: true,
        id: "agriculture.landConversion",
      },
    ],
  },
  {
    title: "Livestock",
    inputs: [
      {
        label: "Livestock growth: Cattle [%/year]",
        periods: ["2025-2030", "2031-2040", "2041-2045"],
        id: "livestock.cattleGrowth",
      },
      {
        label: "Livestock growth: Poultry [%/year]",
        periods: ["2025-2030", "2031-2040", "2041-2045"],
        id: "livestock.poultryGrowth",
      },
      {
        label: "Livestock growth: Goat [%/year]",
        periods: ["2025-2030", "2031-2040", "2041-2045"],
        id: "livestock.goatGrowth",
      },
    ],
  },
  {
    title: "Energy",
    inputs: [
      {
        label: "Solar PV Coverage (%)",
        periods: ["2025-2030", "2031-2040", "2041-2045"],
        withValidation: true,
        id: "energy.solarPvCoverage",
      },
      {
        label: "Solar PV Area Percentage on Industrial (%)",
        periods: ["2025-2030", "2031-2040", "2041-2045"],
        withValidation: true,
        id: "energy.solarPvIndustrial",
      },
      {
        label: "Solar PV Area Percentage on Housing (%)",
        periods: ["2025-2030", "2031-2040", "2041-2045"],
        withValidation: true,
        id: "energy.solarPvAreaHousing",
      },
    ],
  },
  {
    title: "Industry",
    inputs: [
      {
        label: "Industrial growth scenario [%/year]",
        periods: ["2025-2030", "2031-2040", "2041-2045"],
        withValidation: true,
        id: "industry.growth",
      },
    ],
  },
  {
    title: "Water Management",
    inputs: [
      {
        label: "Aquaculture land growth [%/year]",
        periods: ["2025-2030", "2031-2040", "2041-2045"],
        withValidation: true,
        id: "water.aquacultureLandGrowth",
      },
      {
        label: "Artificial Pond Percentage in Industrial Area (%)",
        periods: ["2025-2030", "2031-2040", "2041-2045"],
        withValidation: true,
        id: "water.artificialPondIndustrial",
      },
      {
        label: "Artificial Pond Percentage in Housing Area (%)",
        periods: ["2025-2030", "2031-2040", "2041-2045"],
        withValidation: true,
        id: "water.artificialPondHousing",
      },
    ],
  },
  {
    title: "Demography",
    inputs: [
      {
        label: "Population Growth [%/year]",
        periods: ["2025-2030", "2031-2040", "2041-2045"],
        withValidation: true,
        id: "demography-population-growth",
      },
    ],
  },
];
