export interface BaselinePayload {
  [key: string]: number;
}
export type TimePeriod = "2025-2030" | "2031-2040" | "2041-2045";
export type TimePeriodData = Record<TimePeriod, number | null>;
export interface AgricultureState {
  growthScenario: TimePeriodData;
  landConversion: TimePeriodData;
  aquacultureLandGrowth: TimePeriodData;
  productivityTarget: TimePeriodData;
}
export interface LivestockState {
  cattleGrowth: TimePeriodData;
  poultryGrowth: TimePeriodData;
  goatGrowth: TimePeriodData;
}
export interface EnergyState {
  solarPvCoverage: TimePeriodData;
  solarPvAreaIndustrial: TimePeriodData;
  solarPvAreaHousing: TimePeriodData;
  onGrid: TimePeriodData;
  offGrid: TimePeriodData;
  electricitySupply: TimePeriodData;
  electricityDemand: TimePeriodData;
  industrialEnergy: TimePeriodData;
  domesticElectricity: TimePeriodData;
}
export interface IndustryState {
  growth: TimePeriodData;
}
export interface WaterState {
  artificialPondIndustrial: TimePeriodData;
  artificialPondHousing: TimePeriodData;
  surfaceWaterCapacity: TimePeriodData;
  groundWaterCapacity: TimePeriodData;
  domesticWaterDemand: TimePeriodData;
  industrialWater: TimePeriodData;
}
export interface DemographyState {
  populationGrowth: TimePeriodData;
}
export interface FoodDemandState {
  populationInitial: TimePeriodDataContext;
  populationGrowth: TimePeriodDataContext;
  riceDemandPerPerson: TimePeriodDataContext;
  convertionFactorToRice: TimePeriodDataContext;
  convertionFactoTOGkg: TimePeriodDataContext;
}
export interface RainfallState {
  annualRainfall: TimePeriodDataContext;
  areaSize: TimePeriodDataContext;
}
export interface FertilizerState {
  percentageOfChemical: TimePeriodDataContext;
  ratioOrganic: TimePeriodDataContext;
}
export interface AgricultureProductionState {
  areaInpari32: TimePeriodDataContext;
  conversionInpari32: TimePeriodDataContext;
  areaCiherang: TimePeriodDataContext;
  conversionCiherang: TimePeriodDataContext;
  areaHipaSeries: TimePeriodDataContext;
  conversionHipaSeries: TimePeriodDataContext;
  areaMekongga: TimePeriodDataContext;
  conversionMekongga: TimePeriodDataContext;
  areaLokal: TimePeriodDataContext;
  conversionLokal: TimePeriodDataContext;
}
export interface UpdatePayload {
  path: string[];
  value: number | string | null;
}
export const initialTimePeriodData: TimePeriodData = {
  "2025-2030": 0,
  "2031-2040": 0,
  "2041-2045": 0,
};
export type TimePeriodContext = "2015-2030";
export type TimePeriodDataContext = Record<TimePeriodContext, number | null>;
export const initialTimePeriodDataContext: TimePeriodDataContext = {
  "2015-2030": 0,
};
