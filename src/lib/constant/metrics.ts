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
    type: "area" | "line" | "bar" | "pie" | "donut" | "radialBar";
    color?: string;
  }[];
}

const nationalThresholdData = [
  610, 649, 734, 776, 804, 950, 807, 923, 925, 965, 993, 1044, 1269, 1278,
];
const noStressData = new Array(36).fill(1700);
const stressData = new Array(36).fill(1000);
const scarcityData = new Array(36).fill(500);

export const ALL_METRICS_CONTEXT_SPECIFICS: Metric[] = [
  {
    category: "PRODUCTION",
    id: "productionTotal",
    title: "Production Total [ton/year]-GKG",
    unit: "[ton/year]-GKG",
    type: "bar",
    content: "",
  },
  {
    category: "PRODUCTION",
    id: "productionRice",
    title: "Rice Production [ton/year]-rice",
    unit: "[ton/year]-rice",
    type: "bar",
    content: "",
  },
  {
    category: "PRODUCTION",
    id: "productionSolar",
    title: "Solar Panel Pump Financial Performance",
    unit: "",
    type: "line",
    content: "",
    additionalSeries: [
      {
        name: "Total Cumulative Cost",
        type: "line",
        data: [],
      },
    ],
  },
  {
    category: "PRODUCTION",
    id: "productionAverage",
    title: "Average Productivity [ton/ha/year]",
    unit: " [ton/ha/year]",
    type: "bar",
    content: "",
  },
  {
    category: "RESOURCE",
    id: "waterConsumption",
    title: "Water Consumption [m3/year]",
    unit: "[m3/year]",
    type: "bar",
    content: "",
  },
  {
    category: "RESOURCE",
    id: "fuelConsumption",
    title: "Fuel Consumption [KL/year]",
    unit: "[KL/year]",
    type: "bar",
    content: "",
  },
  {
    category: "RESOURCE",
    id: "chemicalFertilizerConsumption",
    title: "Chemical Fertilizer [ton/year]",
    unit: "[KWh/year]",
    type: "bar",
    content: "",
  },
  {
    category: "RESOURCE",
    id: "renewableConsumption",
    title: "Renewable Consumption [KWh/year]",
    unit: "[KWh/year]",
    type: "bar",
    content: "",
  },
  {
    category: "RESOURCE",
    id: "organicFertilizereConsumption",
    title: "Organic Fertilize [ton/year]",
    unit: "[ton/year]",
    type: "bar",
    content: "",
  },
  {
    category: "IMPACT",
    id: "totalemissionImpact",
    title: "Total Emissions [ton/year]",
    unit: "[ton/year]",
    type: "bar",
    content: "",
    additionalSeries: [
      {
        name: "Emissions from Energy Baseline [ton/year]",
        type: "bar",
        data: [
          291471.527952091, 493957.780570471, 490094.176806213,
          486286.151698033, 482532.857386152, 478833.45958562, 475187.137360313,
          471593.082900802, 468050.501306047, 464558.61036883,
        ],
      },
    ],
  },
  {
    category: "IMPACT",
    id: "foodSuffiencyImpact",
    title: "Food Sufficiency []",
    unit: "[]",
    type: "line",
    content: "",
    additionalSeries: [
      {
        name: "Food Sufficiency Baseline []",
        type: "line",
        data: [
          12.5237854251012, 12.3558445836616, 12.1903065178016,
          12.0271348628776, 11.8662938308791, 11.7077482009324,
          11.5514633099642, 11.3974050435238, 11.2455398267622,
          11.0958346155627,
        ],
      },
    ],
  },
  {
    category: "IMPACT",
    id: "emissionIntensityProductionImpact",
    title: "Emissions Intensity from production [kg/ton]",
    unit: "[kg/ton]",
    type: "line",
    content: "",
    additionalSeries: [
      {
        name: "Emissions Intensity from production Baseline [kg/ton]",
        type: "line",
        data: [
          309.322657485852, 531.265095872406, 534.197047644488,
          537.166555269591, 540.174046582491, 543.219953874804,
          546.304713937286, 549.428768102516, 552.592562287966,
          555.796547039452,
        ],
      },
    ],
  },
  {
    category: "IMPACT",
    id: "emissionReductionImpact",
    title: "Emissions Reduction",
    unit: "%",
    type: "line",
    content: "",
  },
  {
    category: "IMPACT",
    id: "waterIntensityImpact",
    title: "Water Intensity [m3/ha/year]",
    unit: "[m3/ha/year]",
    type: "line",
    content: "",
    additionalSeries: [
      {
        name: "Water Intensity baseline [m3/ha/year]",
        type: "line",
        data: [
          975.815217391304, 976.001179316768, 976.185981951829,
          976.369623504398, 976.552102237996, 976.733416471887,
          976.913564581196, 977.092544997028, 977.270356206569,
          977.446996753191,
        ],
      },
    ],
  },
  {
    category: "IMPACT",
    id: "fuelIntensityImpact",
    title: "Fuel intensity [L/ha/tear]",
    unit: "[L/ha/tear]",
    type: "line",
    content: "",
    additionalSeries: [
      {
        name: "Fuel intensity BAseline [L/ha/tear]",
        type: "line",
        data: [
          241.850574513121, 241.881580259024, 241.912331399117,
          241.942827613355, 241.973068595109, 242.003054051184,
          242.032783701838, 242.0622572808, 242.091474535284, 242.120435226001,
        ],
      },
    ],
  },
];

export const ALL_METRICS_SITE_SPECIFICS: Metric[] = [
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
        type: "line",
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
        type: "line",
        data: noStressData,
        color: "#2E8B57",
      },
      {
        name: "Falkenmark: Stress",
        type: "line",
        data: stressData,
        color: "#FFD700",
      },
      {
        name: "Falkenmark: Scarcity",
        type: "line",
        data: scarcityData,
        color: "#DC143C",
      },
    ],
  },
];
