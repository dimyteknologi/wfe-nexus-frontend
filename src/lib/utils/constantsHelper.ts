import {
  INITIAL_DATA_CONSTANT,
  INITIAL_DATA_CONSTANT_SIDOWARJO,
} from "../constant/initialData.constant";
import {
  RESOURCE_DEMAND_UNIT,
  RESOURCE_DEMAND_UNIT_SIDOWARJO,
} from "../constant/resourceDemandUnit.constant";

export const getConstants = (region: "KARAWANG" | "SIDOARJO") => {
  if (region === "SIDOARJO") {
    return {
      initialData: INITIAL_DATA_CONSTANT_SIDOWARJO,
      resourceDemandUnit: RESOURCE_DEMAND_UNIT_SIDOWARJO,
    };
  }
  return {
    initialData: INITIAL_DATA_CONSTANT,
    resourceDemandUnit: RESOURCE_DEMAND_UNIT,
  };
};
