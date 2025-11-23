import {
  IPopResData,
  IGDPResData,
  IAgricultureResData,
  ILivestockResData,
  IFisheriesResData,
} from "../types/response";

export const TYPE_DATA_SELECT = {
  SELECT_TABLE: "SELECT_TABLE",
  SELECT_UNIT: "SELECT_UNIT",
  SELECT_YEAR: "SELECT_YEAR",
  SELECT_PARAMETERS: "SELECT_PARAMETERS",
} as const;

type DataType =
  | IPopResData
  | IGDPResData
  | IAgricultureResData
  | ILivestockResData
  | IFisheriesResData;

type SelectCategory = keyof typeof TYPE_DATA_SELECT;

export function selectData<T extends DataType>(
  data: T,
  category: "SELECT_TABLE",
): string;
export function selectData<T extends DataType>(
  data: T,
  category: "SELECT_UNIT",
): string;
export function selectData<T extends DataType>(
  data: T,
  category: "SELECT_YEAR",
): number[];
export function selectData<T extends DataType>(
  data: T,
  category: "SELECT_PARAMETERS",
): T["parameters"];
export function selectData<T extends DataType>(
  data: T,
  category: SelectCategory,
): string | number[] | T["parameters"] {
  switch (category) {
    case TYPE_DATA_SELECT.SELECT_TABLE:
      return data.label;
    case TYPE_DATA_SELECT.SELECT_UNIT:
      return data.unit;
    case TYPE_DATA_SELECT.SELECT_YEAR:
      return data.years;
    case TYPE_DATA_SELECT.SELECT_PARAMETERS:
      return data.parameters;
    default:
      throw new Error(`Category ${category} not found.`);
  }
}
