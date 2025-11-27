export const RESOURCE_SUPPLY_INPUT = [
  {
    title: "Water Surface Debit",
    unit: "L/s",
    values: Array.from({ length: 16 }, () => 12500),
  },
  {
    title: "Ground Water Supply",
    unit: "m3/year",
    values: Array.from({ length: 16 }, () => 0),
  },
  {
    title: "Accesibility Factor of surface water",
    unit: "[]",
    values: [0.55, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  {
    title: "Supply Factor for Fuel",
    unit: "[]",
    values: Array.from({ length: 16 }, () => 1),
  },
  {
    title: "Solar Water Pump Capacity",
    unit: "kWp",
    values: [0, 0, 0, 2, 4, 5, 15, 22, 23, 25, 0, 0, 0, 0, 0, 0],
  },
  {
    title: "Geothermal capacity",
    unit: "Mw",
    values: [0, 0, 0, 0.5, 1, 1, 2, 3, 4, 5, 0, 0, 0, 0, 0, 0],
  },
  {
    title: "Utilization rate of rice husk for renewable energy",
    unit: "%",
    values: [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 0, 0, 0, 0, 0, 0],
  },
  {
    title: "Chemical Supply Factor",
    unit: "[]",
    values: Array.from({ length: 16 }, () => 1),
  },
  {
    title: "Organic Supply Factor",
    unit: "[]",
    values: Array.from({ length: 16 }, () => 1),
  },
];
