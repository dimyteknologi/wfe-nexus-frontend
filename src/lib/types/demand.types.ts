import { IBaseData } from "./response";

export interface IWaterDemand {
  DOMESTIC_DEMANDl: number[];
  INDUSTRIAL_DEMAND: number[];
  CROPS_LAND: number[];
  LIVESTOCK: number[];
  AQUACULTURE: number[];
  MUNICIPAITY: number[];
}

export type IWaterDemandData = IBaseData<IWaterDemand>;
export interface IEnergyDemand {
  DOMESTIC_DEMANDl: number[];
  INDUSTRIAL_DEMAND: number[];
  AQUACULTURE: number[];
  WATER_GENERATION: number[];
}

export type IEnergyDemandData = IBaseData<IEnergyDemand>;
