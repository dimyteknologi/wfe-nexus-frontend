import { TimePeriod } from "@/stores/slicers/dssInputSlicer";

interface FormInput {
  id: string;
  label: string;
  periods: TimePeriod[];
  withValidation?: boolean;
}

interface FormSection {
  title: string;
  inputs: FormInput[];
}

const timePeriods: TimePeriod[] = ["2025-2030", "2031-2040", "2041-2045"];
export const simulationFormConfig: FormSection[] = [
  {
    title: "Agriculture",
    inputs: [
      {
        label: "Growth scenario [%/year]",
        periods: timePeriods,
        withValidation: true,
        id: "agriculture.growthScenario",
      },
      {
        label: "Agriculture land conversion [%/year]",
        periods: timePeriods,
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
        periods: timePeriods,
        withValidation: true,
        id: "livestock.cattleGrowth",
      },
      {
        label: "Livestock growth: Poultry [%/year]",
        periods: timePeriods,
        withValidation: true,
        id: "livestock.poultryGrowth",
      },
      {
        label: "Livestock growth: Goat [%/year]",
        periods: timePeriods,
        withValidation: true,
        id: "livestock.goatGrowth",
      },
    ],
  },
  {
    title: "Energy",
    inputs: [
      {
        label: "Solar PV Coverage (%)",
        periods: timePeriods,
        withValidation: true,
        id: "energy.solarPvCoverage",
      },
      {
        label: "Solar PV Area Percentage on Industrial (%)",
        periods: timePeriods,
        withValidation: true,
        id: "energy.solarPvAreaIndustrial",
      },
      {
        label: "Solar PV Area Percentage on Housing (%)",
        periods: timePeriods,
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
        periods: timePeriods,
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
        periods: timePeriods,
        withValidation: true,
        id: "water.aquacultureLandGrowth",
      },
      {
        label: "Artificial Pond Percentage in Industrial Area (%)",
        periods: timePeriods,
        withValidation: true,
        id: "water.artificialPondIndustrial",
      },
      {
        label: "Artificial Pond Percentage in Housing Area (%)",
        periods: timePeriods,
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
        periods: timePeriods,
        withValidation: true,
        id: "demography.populationGrowth",
      },
    ],
  },
];
