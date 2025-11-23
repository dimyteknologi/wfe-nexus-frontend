import { IBaseData } from "./response";

export interface IWaterDemand {
  domestic: number[];
  industrial: number[];
  cropsLand: number[];
  livestock: number[];
  aquacluture: number[];
  municipati: number[];
  totalWaterDemand: number[];
}

export type IWaterDemandData = IBaseData<IWaterDemand>;
export interface IEnergyDemand {
  domestic: number[];
  industrial: number[];
  aquaculture: number[];
  waterGeneration: number[];
  totalEnergyDemand: number[];
}

export type IEnergyDemandData = IBaseData<IEnergyDemand>;

export interface IFoodDemand {
  domesticFood: number[];
  foodDemand: number[];
}

export type IFoodDemandData = IBaseData<IFoodDemand>;

export interface ILandCover {
  industrialLand: number[];
  housingLand: number[];
  forestArea: number[];
  agricultureArea: number[];
  otherLand: number[];
  availableLand: number[];
}

export type ILandCoverData = IBaseData<ILandCover>;

export interface ILandPortion {
  industrialLand: number[];
  housingLand: number[];
  forestArea: number[];
  agricultureArea: number[];
  otherLand: number[];
  availableLand: number[];
}

export type ILandPortionData = IBaseData<ILandPortion>;
