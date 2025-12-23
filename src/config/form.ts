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
          "The number of populations in the village or district.",
      },
      {
        label: "Population Growth [%/year]",
        min: 0.5,
        max: 2.5,
        periods: ["2015-2030"],
        withValidation: false,
        id: "food.populationGrowth",
        information:
          "The number of population growth for the village or district",
      },
      {
        label: "Rice Demand Per Person [kg/kap/year]",
        min: 50,
        max: 200,
        periods: ["2015-2030"],
        withValidation: false,
        id: "food.riceDemandPerPerson",
        information:
          "Number of rice consumption per capita",
      },
      {
        label: "Convertion Factor GKG to rice [dmnl]",
        min: 0.5,
        max: 1.5,
        periods: ["2015-2030"],
        withValidation: false,
        id: "food.convertionFactorToRice",
        information:
          "Conversion Factor Gabah Kering GIling (GKG) to rice",
      },
      {
        label: "Convertion Factor GKP to GKG [dmnl]",
        min: 0.5,
        max: 1.5,
        periods: ["2015-2030"],
        withValidation: false,
        id: "food.convertionFactoTOGkg",
        information:
          "Conversion Factor Gabah Kering Panen (GKP) to Gabah Kering GIling (GKG)",
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
          "The number of agriculture land in village/district in hectares",
      },
      {
        label: "Land Conversion",
        min: 2,
        max: 12,
        periods: ["2015-2030"],
        withValidation: false,
        id: "agriculture.conversionLandProduction",
        information:
          "The land conversion trend of agriculture land in village/district in %/year",
      },
      {
        label: "Base Yield [ton/ha]",
        min: 2,
        max: 12,
        periods: ["2015-2030"],
        withValidation: false,
        id: "agriculture.baseYield",
        information:
          "Potential yield of rice seeds if all resources available",
      },
      {
        label: "Cropping Intensity [1/year]",
        min: 2,
        max: 12,
        periods: ["2015-2030"],
        withValidation: false,
        id: "agriculture.croppingIntensity",
        information:
          "Target of cropping intensity base on type of seeds; the actual cropping intensity will be determined by water availability ",
      },
      {
        label: "Water intensity [m3/ha/season]",
        min: 2,
        max: 12,
        periods: ["2015-2030"],
        withValidation: false,
        id: "agriculture.waterIntensity",
        information:
          "Unit of water consumption for agriculture area",
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
          "The water pump power in Kilo Watt",
      },
      {
        label: "Head Unit [m]",
        min: 0,
        max: 1,
        periods: ["2015-2030"],
        withValidation: false,
        id: "diesel.headUnit",
        information:
          "Total height of water to be transported",
      },
    ],
  },
  // {
  //   title: "Fertilizer",
  //   inputs: [
  //     {
  //       label: "Percentage of Chemical Fertilizer [%]",
  //       min: 0,
  //       max: 100,
  //       periods: ["2015-2030"],
  //       withValidation: false,
  //       id: "fertilizer.percentageOfChemical",
  //       information:
  //         "Percentage of chemical fertilizer usage from total consumption of fertilizer",
  //     },
  //     {
  //       label: "Ratio Organic Fertilizer to Chemical Fertilizer [dmnl]",
  //       min: 0,
  //       max: 1,
  //       periods: ["2015-2030"],
  //       withValidation: false,
  //       id: "fertilizer.ratioOrganic",
  //       information:
  //         "Means that organic fertilizer will be X times from chemical fertilizer, for instance if the ratio value is 17, then 1 ton of chemical equal to 17 ton of organic according to the fertilizer content.",
  //     },
  //   ],
  // },
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
          "The annual rainfall intensity within the area",
      },
      {
        label: "Rainfall Duration [days]",
        min: 0,
        max: 365,
        periods: ["2015-2030"],
        withValidation: false,
        id: "rainfall.areaSize",
        information:
          "The annual rainfall intensity within the area",
      },
    ],
  },
  {
    title: "Solar PV",
    inputs: [
      {
        label: "Solar PV Installed Capacity",
        min: 0,
        max: 500,
        periods: ["2025-2034"],
        withValidation: false,
        id: "solarPV.installedCapacity",
        information:
          "The number of capacity of Solar PV Installed",
      },
      {
        label: "Solar PV Fee (Rp/ha/musim tanam)",
        min: 0,
        max: 365,
        periods: ["2025-2034"],
        withValidation: false,
        id: "solarPV.fee",
        information:
          "The number of fee charged for farmer using solar PV",
      },
    ],
  },
   {
    title: "Geothermal",
    inputs: [
      {
        label: "Installed Unit [unit]",
        min: 0,
        max: 500,
        periods: ["2025-2034"],
        withValidation: false,
        id: "geothermal.installedUnit",
        information:
          "The number of installed unit of Geothermal",
      },
      {
        label: "Capacity per unit [MW/unit]",
        min: 0,
        max: 300,
        periods: ["2025-2034"],
        withValidation: false,
        id: "geothermal.capacityPerUnit",
        information:
          "The number of fee charged for farmer using solar PV",
      },
      {
        label: "Utilization of surface water for geothermal [ ]",
        min: 0,
        max: 1,
        periods: ["2025-2034"],
        withValidation: false,
        id: "geothermal.utilizationOfSurfaceWater",
        information:
          "0 means water sources from deep water table, 1 means water from surface water",
      },
    ],
  }
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
