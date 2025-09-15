import { TimePeriod } from "@/stores/slicers/dssInputSlicer";

export interface FormInput {
  id: string;
  label: string;
  min?: number;
  max?: number;
  periods: TimePeriod[];
  withValidation?: boolean;
  information: string;
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
        min: -5,
        max: 5,
        periods: timePeriods,
        withValidation: true,
        id: "agriculture.growthScenario",
        information:
          "Scenario for Agriculture economy growth between 2025-2045 in % p.a of GDRP, divided into three phase period; 2025-2030, 2031-2040, and 2041-2045. The number is average value between 2010-2024",
      },
      {
        label: "Agriculture land conversion [%/year]",
        min: 0,
        max: 2,
        periods: timePeriods,
        withValidation: true,
        id: "agriculture.landConversion",
        information:
          "Scenario for agriculture land conversion rate between 2025-2045 in % p.a from agriculture land cover. The number is average value between 2010-2024",
      },
      {
        label: "Livestock growth: Cattle [%/year]",
        min: -5,
        max: 5,
        periods: timePeriods,
        withValidation: true,
        id: "livestock.cattleGrowth",
        information:
          "Scenario for livestock growth between 2025-2045 in %/year. The number is average value between 2010-2024",
      },
      {
        label: "Livestock growth: Poultry [%/year]",
        min: -5,
        max: 5,
        periods: timePeriods,
        withValidation: true,
        id: "livestock.poultryGrowth",
        information:
          "Scenario for livestock growth between 2025-2045 in %/year. The number is average value between 2010-2024",
      },
      {
        label: "Livestock growth: Goat [%/year]",
        min: -5,
        max: 5,
        periods: timePeriods,
        withValidation: true,
        id: "livestock.goatGrowth",
        information:
          "Scenario for livestock growth between 2025-2045 in %/year. The number is average value between 2010-2024",
      },
      {
        label: "Aquaculture land growth [%/year]",
        min: -5,
        max: 5,
        periods: timePeriods,
        withValidation: true,
        id: "agriculture.aquacultureLandGrowth",
        information:
          "Scenario for aquaculture area increase or decrease between 2025-2045 in %/year. The number is average value between 2010-2024",
      },
      {
        label: "Productivity target [ton/ha/year]",
        min: 2,
        max: 12,
        periods: timePeriods,
        withValidation: true,
        id: "agriculture.productivityTarget",
        information:
          "Scenario for agriculture productivity for paddy production between 2025-2045 in ton/ha/year. The number is average value between 2010-2024",
      },
    ],
  },
  {
    title: "Energy",
    inputs: [
      // {
      //   label: "Solar PV Coverage (%)",
      //   periods: timePeriods,
      //   withValidation: true,
      //   id: "energy.solarPvCoverage",
      // },
      {
        label: "Solar PV Area Percentage on Industrial (%)",
        min: 0,
        max: 50,
        periods: timePeriods,
        withValidation: true,
        id: "energy.solarPvAreaIndustrial",
        information:
          "Percentage of industrial area equipped with solar PV for electricity production, that will increase local energy resilience",
      },
      {
        label: "Solar PV Area Percentage on Housing (%)",
        min: 0,
        max: 50,
        periods: timePeriods,
        withValidation: true,
        id: "energy.solarPvAreaHousing",
        information:
          "Percentage of housing area equipped with solar PV for electricity production, that will increase local energy resilience",
      },
      {
        label: "Industrial Energy efficiency rate",
        min: 0,
        max: 5,
        periods: timePeriods,
        withValidation: true,
        id: "energy.industrialEnergy",
        information:
          "Increase of industrial energy efficiency indicated by decreasing rate of energy intensity, in %/year of intensity decrease",
      },
      {
        label: "Domestic electricity consumption increase rate",
        min: 0,
        max: 3,
        periods: timePeriods,
        withValidation: true,
        id: "energy.domesticElectricity",
        information:
          "Increase of domestic electricity per capita, indicated increase in society wellbeing in %/year of per capita increase",
      },

      // {
      //   label: "On Grid",
      //   periods: timePeriods,
      //   withValidation: true,
      //   id: "energy.onGrid",
      // },
      // {
      //   label: "Off Grid",
      //   periods: timePeriods,
      //   withValidation: true,
      //   id: "energy.offGrid",
      // },
      // {
      //   label: "Electricity Supply",
      //   periods: timePeriods,
      //   withValidation: true,
      //   id: "energy.electricitySupply",
      // },
      // {
      //   label: "Electricity Demand",
      //   periods: timePeriods,
      //   withValidation: true,
      //   id: "energy.electricityDemand",
      // },
    ],
  },
  {
    title: "Industry",
    inputs: [
      {
        label: "Industrial growth scenario [%/year]",
        min: 0,
        max: 10,
        periods: timePeriods,
        withValidation: true,
        id: "industry.growth",
        information:
          "Scenario for industrial economy growth between 2025-2045 in % p.a of GDRP, divided into three phase period; 2025-2030, 2031-2040, and 2041-2045. The number is average value between 2010-2024",
      },
    ],
  },
  {
    title: "Water Management",
    inputs: [
      {
        label: "Artificial Pond Percentage in Industrial Area (%)",
        min: 0,
        max: 30,
        periods: timePeriods,
        withValidation: true,
        id: "water.artificialPondIndustrial",
        information:
          "Percentage of industrial area developed as artificial pond (retention pond, detention pond, water storage, embung, etc)",
      },
      {
        label: "Artificial Pond Percentage in Housing Area (%)",
        min: 0,
        max: 30,
        periods: timePeriods,
        withValidation: true,
        id: "water.artificialPondHousing",
        information:
          "Percentage of housing area developed as artificial pond (urban retention pond, rainwater harvesting pond, infiltration pond, etc)",
      },
      {
        label: "Domestic water demand unit",
        min: 70,
        max: 200,
        periods: timePeriods,
        withValidation: true,
        id: "water.domesticWaterDemand",
        information:
          "The number of domestic demand water per capita (Litre/kapital/day], represent of water in",
      },
      {
        label: "Industrial Water intensity",
        min: 0.2,
        max: 5,
        periods: timePeriods,
        withValidation: true,
        id: "water.industrialWater",
        information:
          "Represent on how many waters unit consumed to produce one unit of industrial value added [m3/Million Rp]",
      },
      // {
      //   label: "Surface Water Capacity",
      //   periods: timePeriods,
      //   withValidation: true,
      //   id: "water.surfaceWaterCapacity",
      // },
      // {
      //   label: "Ground Water Capacity",
      //   periods: timePeriods,
      //   withValidation: true,
      //   id: "water.groundWaterCapacity",
      // },
    ],
  },
  {
    title: "Demography",
    inputs: [
      {
        label: "Population Growth [%/year]",
        min: 0.5,
        max: 2.5,
        periods: timePeriods,
        withValidation: true,
        id: "demography.populationGrowth",
        information:
          "Scenario for population growth rate of area in %/year, divided into three period phases; 2025-2030, 2031-2040, and 2041-2045. The number is average value between 2010-2024",
      },
    ],
  },
];
