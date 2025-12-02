import { TimePeriod } from "@/lib/constant/inputType.constant";
export interface FormInput {
  id: string;
  label: string;
  min: number;
  max: number;
  periods: TimePeriod[] | string[];
  withValidation?: boolean;
  information: string;
}

export interface FormSection {
  title: string;
  inputs: FormInput[];
}

const timePeriods: TimePeriod[] = ["2025-2030", "2031-2040", "2041-2045"];

export const contextSpecificInput: FormSection[] = [
  {
    title: "Food Demand Side",
    inputs: [
      {
        label: "Population Initial [people]",
        min: 1000000,
        max: 50000000,
        periods: ["2015-2030"],
        withValidation: false,
        id: "food.populationInitial",
        information:
          "Initial population of the area in 2025, used to calculate food demand.",
      },
      {
        label: "Population Growth [%/year]",
        min: 0.5,
        max: 2.5,
        periods: ["2015-2030"],
        withValidation: false,
        id: "food.populationGrowth",
        information:
          "Scenario for population growth rate of area in %/year, divided into three period phases; 2025-2030, 2031-2040, and 2041-2045. The number is average value between 2010-2024.",
      },
      {
        label: "Rice Demand Per Person [kg/kap/year]",
        min: 50,
        max: 200,
        periods: ["2015-2030"],
        withValidation: false,
        id: "food.riceDemandPerPerson",
        information:
          "Average rice demand per person in kg/kap/year, used to calculate total rice demand.",
      },
      {
        label: "Convertion Factor GKG to rice [dmnl]",
        min: 0.5,
        max: 1.5,
        periods: ["2015-2030"],
        withValidation: false,
        id: "food.convertionFactorToRice",
        information:
          "Conversion factor from GKG (Greenhouse Gas Equivalent) to rice production, used to calculate the impact of rice production on GHG emissions.",
      },
      {
        label: "Convertion Factor GKP to GKG [dmnl]",
        min: 0.5,
        max: 1.5,
        periods: ["2015-2030"],
        withValidation: false,
        id: "food.convertionFactoTOGkg",
        information:
          "Conversion factor from GKP (Greenhouse Gas Production) to GKG (Greenhouse Gas Equivalent), used to calculate the impact of rice production on GHG emissions.",
      },
    ],
  },
  {
    title: "Agriculture Production Demand",
    inputs: [
      {
        label: "Agriculture Land",
        min: 2,
        max: 12,
        periods: ["2015-2030"],
        withValidation: false,
        id: "agriculture.landProduction",
        information:
          "",
      },
      {
        label: "Conversion",
        min: 2,
        max: 12,
        periods: ["2015-2030"],
        withValidation: false,
        id: "agriculture.conversionLandProduction",
        information:
          "",
      },
      {
        label: "Base Yield [ton/ha]",
        min: 2,
        max: 12,
        periods: ["2015-2030"],
        withValidation: false,
        id: "agriculture.baseYield",
        information:
          "",
      },
      {
        label: "Cropping Intensity [1/year]",
        min: 2,
        max: 12,
        periods: ["2015-2030"],
        withValidation: false,
        id: "agriculture.croppingIntensity",
        information:
          "",
      },
      {
        label: "Water intensity [m3/ha/season]",
        min: 2,
        max: 12,
        periods: ["2015-2030"],
        withValidation: false,
        id: "agriculture.waterIntensity",
        information:
          "",
      },
      // Ciherang
      // {
      //   label: "Ciherang Area",
      //   min: 2,
      //   max: 12,
      //   periods: ["2015-2030"],
      //   withValidation: false,
      //   id: "agriculture.areaCiherang",
      //   information:
      //     "Average productivity area of Ciherang rice variety in ha, used to calculate total rice production.",
      // },
      // {
      //   label: "Conversion",
      //   min: 2,
      //   max: 12,
      //   periods: ["2015-2030"],
      //   withValidation: false,
      //   id: "agriculture.conversionCiherang",
      //   information:
      //     "Average productivity conversion of Ciherang rice variety in %, used to calculate total rice production.",
      // },

      // Hipa Series
      // {
      //   label: "Hipa Series Area",
      //   min: 2,
      //   max: 12,
      //   periods: ["2015-2030"],
      //   withValidation: false,
      //   id: "agriculture.areaHipaSeries",
      //   information:
      //     "Average productivity area of Hipa Series rice variety in ha, used to calculate total rice production.",
      // },
      // {
      //   label: "Conversion",
      //   min: 2,
      //   max: 12,
      //   periods: ["2015-2030"],
      //   withValidation: false,
      //   id: "agriculture.conversionHipaSeries",
      //   information:
      //     "Average productivity conversion of Hipa Series rice variety in %, used to calculate total rice production.",
      // },

      // Mekongga
      // {
      //   label: "Mekongga Area",
      //   min: 2,
      //   max: 12,
      //   periods: ["2015-2030"],
      //   withValidation: false,
      //   id: "agriculture.areaMekongga",
      //   information:
      //     "Average productivity area of Mekongga rice variety in ha, used to calculate total rice production.",
      // },
      // {
      //   label: "Conversion",
      //   min: 2,
      //   max: 12,
      //   periods: ["2015-2030"],
      //   withValidation: false,
      //   id: "agriculture.conversionMekongga",
      //   information:
      //     "Average productivity conversion of Mekongga rice variety in %, used to calculate total rice production.",
      // },

      // Lokal
      // {
      //   label: "Lokal Area",
      //   min: 2,
      //   max: 12,
      //   periods: ["2015-2030"],
      //   withValidation: false,
      //   id: "agriculture.areaLokal",
      //   information:
      //     "Average productivity area of local rice variety in ha, used to calculate total rice production.",
      // },
      // {
      //   label: "Conversion",
      //   min: 2,
      //   max: 12,
      //   periods: ["2015-2030"],
      //   withValidation: false,
      //   id: "agriculture.conversionLokal",
      //   information:
      //     "Average productivity conversion of local rice variety in %, used to calculate total rice production.",
      // },
    ],
  },
  {
    title: "Diesel Pump",
    inputs: [
      {
        label: "Installed Capacity [KWp]",
        min: 0,
        max: 100,
        periods: ["2015-2030"],
        withValidation: false,
        id: "diesel.installedCapacity",
        information:
          "",
      },
      {
        label: "Head Unit [m]",
        min: 0,
        max: 1,
        periods: ["2015-2030"],
        withValidation: false,
        id: "diesel.headUnit",
        information:
          "",
      },
    ],
  },
  {
    title: "Fertilizer",
    inputs: [
      {
        label: "Percentage of Chemical Fertilizer [%]",
        min: 0,
        max: 100,
        periods: ["2015-2030"],
        withValidation: false,
        id: "fertilizer.percentageOfChemical",
        information:
          "Percentage of chemical fertilizer used in agriculture, used to calculate fertilizer demand.",
      },
      {
        label: "Ratio Organic Fertilizer to Chemical Fertilizer [dmnl]",
        min: 0,
        max: 1,
        periods: ["2015-2030"],
        withValidation: false,
        id: "fertilizer.ratioOrganic",
        information:
          "Ratio of organic fertilizer to chemical fertilizer used in agriculture, used to calculate fertilizer demand.",
      },
    ],
  },
  {
    title: "Rainfall",
    inputs: [
      {
        label: "Rainfall Intensity [mm/day]",
        min: 0,
        max: 500,
        periods: ["2015-2030"],
        withValidation: false,
        id: "rainfall.annualRainfall",
        information:
          "Average rainfall intensity in mm/day, used to calculate water availability for agriculture.",
      },
      {
        label: "Rainfall Duration [days]",
        min: 0,
        max: 365,
        periods: ["2015-2030"],
        withValidation: false,
        id: "rainfall.areaSize",
        information:
          "Average rainfall duration in days, used to calculate water availability for agriculture.",
      },
    ],
  },
];

export const siteSpecificInput: FormSection[] = [
  {
    title: "Agriculture",
    inputs: [
      // {
      //   label: "Growth scenario [%/year]",
      //   min: -5,
      //   max: 5,
      //   periods: ["2015-2030"],
      //   withValidation: true,
      //   id: "agriculture.growthScenario",
      //   information:
      //     "Scenario for Agriculture economy growth between 2025-2045 in % p.a of GDRP, divided into three phase period; 2025-2030, 2031-2040, and 2041-2045. The number is average value between 2010-2024. MIN: -5 || MAX : 5",
      // },
      {
        label: "Agriculture land conversion [%/year]",
        min: 0,
        max: 2,
        periods: timePeriods,
        withValidation: true,
        id: "agriculture.landConversion",
        information:
          "Scenario for agriculture land conversion rate between 2025-2045 in % p.a from agriculture land cover. The number is average value between 2010-2024.",
      },
      {
        label: "Livestock growth: Cattle [%/year]",
        min: -5,
        max: 5,
        periods: timePeriods,
        withValidation: true,
        id: "livestock.cattleGrowth",
        information:
          "Scenario for livestock growth between 2025-2045 in %/year. The number is average value between 2010-2024.",
      },
      {
        label: "Livestock growth: Poultry [%/year]",
        min: -5,
        max: 5,
        periods: timePeriods,
        withValidation: true,
        id: "livestock.poultryGrowth",
        information:
          "Scenario for livestock growth between 2025-2045 in %/year. The number is average value between 2010-2024.",
      },
      {
        label: "Livestock growth: Goat [%/year]",
        min: -5,
        max: 5,
        periods: timePeriods,
        withValidation: true,
        id: "livestock.goatGrowth",
        information:
          "Scenario for livestock growth between 2025-2045 in %/year. The number is average value between 2010-2024.",
      },
      {
        label: "Aquaculture land growth [%/year]",
        min: -5,
        max: 5,
        periods: timePeriods,
        withValidation: true,
        id: "agriculture.aquacultureLandGrowth",
        information:
          "Scenario for aquaculture area increase or decrease between 2025-2045 in %/year. The number is average value between 2010-2024.",
      },
      {
        label: "Productivity target [ton/ha/year]",
        min: 2,
        max: 12,
        periods: timePeriods,
        withValidation: true,
        id: "agriculture.productivityTarget",
        information:
          "Scenario for agriculture productivity for paddy production between 2025-2045 in ton/ha/year. The number is average value between 2010-2024.",
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
          "Percentage of industrial area equipped with solar PV for electricity production, that will increase local energy resilience.",
      },
      {
        label: "Solar PV Area Percentage on Housing (%)",
        min: 0,
        max: 50,
        periods: timePeriods,
        withValidation: true,
        id: "energy.solarPvAreaHousing",
        information:
          "Percentage of housing area equipped with solar PV for electricity production, that will increase local energy resilience.",
      },
      {
        label: "Industrial Energy efficiency rate",
        min: 0,
        max: 5,
        periods: timePeriods,
        withValidation: true,
        id: "energy.industrialEnergy",
        information:
          "Increase of industrial energy efficiency indicated by decreasing rate of energy intensity, in %/year of intensity decrease.",
      },
      {
        label: "Domestic electricity consumption increase rate",
        min: 0,
        max: 3,
        periods: timePeriods,
        withValidation: true,
        id: "energy.domesticElectricity",
        information:
          "Increase of domestic electricity per capita, indicated increase in society wellbeing in %/year of per capita increase.",
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
          "Scenario for industrial economy growth between 2025-2045 in % p.a of GDRP, divided into three phase period; 2025-2030, 2031-2040, and 2041-2045. The number is average value between 2010-2024.",
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
          "Percentage of industrial area developed as artificial pond (retention pond, detention pond, water storage, embung, etc).",
      },
      {
        label: "Artificial Pond Percentage in Housing Area (%)",
        min: 0,
        max: 30,
        periods: timePeriods,
        withValidation: true,
        id: "water.artificialPondHousing",
        information:
          "Percentage of housing area developed as artificial pond (urban retention pond, rainwater harvesting pond, infiltration pond, etc).",
      },
      {
        label: "Domestic water demand unit",
        min: 70,
        max: 200,
        periods: timePeriods,
        withValidation: true,
        id: "water.domesticWaterDemand",
        information:
          "The number of domestic demand water per capita (Litre/kapital/day], represent of water in.",
      },
      {
        label: "Industrial Water intensity",
        min: 0.2,
        max: 5,
        periods: timePeriods,
        withValidation: true,
        id: "water.industrialWater",
        information:
          "Represent on how many waters unit consumed to produce one unit of industrial value added [m3/Million Rp].",
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
          "Scenario for population growth rate of area in %/year, divided into three period phases; 2025-2030, 2031-2040, and 2041-2045. The number is average value between 2010-2024.",
      },
    ],
  },
];
