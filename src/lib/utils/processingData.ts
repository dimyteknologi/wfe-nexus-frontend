import { RESOURCE_DEMAND_UNIT } from "../constant/resourceDemandUnit.constant";
import { constantMultiply, sumData } from "./formulas";

//  WATER DEMAND
const generateDomesticWaterDemandProcess = (data: number[]) => {
  const constant = RESOURCE_DEMAND_UNIT.WATER.DOMESTIC_DEMAND;
  return constantMultiply(data, constant);
};
const generateIndustrialWaterDemandProcess = (data: number[]) => {
  const constant = RESOURCE_DEMAND_UNIT.WATER.INDUSTRIAL_DEMAND;
  return constantMultiply(data, constant);
};
const generateCropsLandWaterDemandProcess = (data: number[]) => {
  const constant = RESOURCE_DEMAND_UNIT.WATER.CROPS_LAND_DEMAND;
  return constantMultiply(data, constant);
};
const generateAquacultureWaterDemandProcess = (data: number[]) => {
  const constant = RESOURCE_DEMAND_UNIT.WATER.AQUACULTURE_DEMAND;
  return constantMultiply(data, constant);
};
const generateMunicipalityWaterDemandProcess = (data: number[]) => {
  const constant = RESOURCE_DEMAND_UNIT.WATER.MUNICIPALITY;
  return constantMultiply(data, constant);
};
const generateLivestockWaterDemandProcess = (data: number[]) => {
  const constantLargeCattle = RESOURCE_DEMAND_UNIT.WATER.LARGE_CATTLE;
  const constantSmallCattle = RESOURCE_DEMAND_UNIT.WATER.SMALL_CATTLE;
  const constantPoultry = RESOURCE_DEMAND_UNIT.WATER.POULTRY;
  const waterDemandLargeCattle = constantMultiply(data, constantLargeCattle);
  const waterDemandSmallCattle = constantMultiply(data, constantSmallCattle);
  const waterDemandPoultry = constantMultiply(data, constantPoultry);

  return sumData(
    waterDemandLargeCattle,
    waterDemandSmallCattle,
    waterDemandPoultry,
  );
};

// ENERGY DEMAND
const generateDomesticEnergyDemand = (data: number[]) => {
  const constant = RESOURCE_DEMAND_UNIT.ENERGY.DOMESTIC_DEMAND;
  const result = constantMultiply(data, constant);

  return result.map((data) => data / 1000000);
};
const generateIndustrialEnergyDemand = (data: number[]) => {
  const constant = RESOURCE_DEMAND_UNIT.ENERGY.INDUSTRIAL_ENERGY_INTENSITY;
  const result = constantMultiply(data, constant);

  return result.map((data) => data / 1000000);
};
const generateAgricultureEnergyDemand = (data: number[]) => {
  const constant = RESOURCE_DEMAND_UNIT.ENERGY.AGRICULTURE_ENERGY_INTENSITY;
  const result = constantMultiply(data, constant);

  return result.map((data) => data / 1000000);
};
const generateWaterGenerationEnergyDemand = (data: number[]) => {
  const constant = RESOURCE_DEMAND_UNIT.ENERGY.ENERGY_FOR_WATER;
  const result = constantMultiply(data, constant);

  return result.map((data) => data / 1000000);
};
