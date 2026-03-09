import { ContextSpecificState } from "@/stores/slicers/contextSpecificInputSlicer";
import { GEOTHERMAL_INITIAL_DATA } from "@/lib/constant/initialDataContext.constans";

const EMPTY_ARRAY = Array(16).fill(0);

export const getGeothermalPotentialGeneration = (input?: ContextSpecificState): number[] => {
  if (!input) return EMPTY_ARRAY;
  const installedUnit = input.geothermal?.installedUnit?.["2025-2034"] ?? 0;
  const capacityPerUnit = input.geothermal?.capacityPerUnit?.["2025-2034"] ?? 0;

  const operationHour = GEOTHERMAL_INITIAL_DATA.OPERATION_HOURS;
  const capacityFactor = GEOTHERMAL_INITIAL_DATA.CAPACITY_FACTOR;

  const installedCapacity = installedUnit * capacityPerUnit;

  const maximalGeneration = installedCapacity * operationHour;

  const potentialGeneration = maximalGeneration * capacityFactor;
  if (potentialGeneration === 0) return EMPTY_ARRAY;

  return Array(16).fill(potentialGeneration);
};

export const getRatioSteamToElecticityGeneraion = (input?: ContextSpecificState): number[] => {
  if (!input) return EMPTY_ARRAY;

  const installedUnit = input.geothermal?.installedUnit?.["2025-2034"] ?? 0;
  const capacityPerUnit = input.geothermal?.capacityPerUnit?.["2025-2034"] ?? 0;
  const operationHour = GEOTHERMAL_INITIAL_DATA.OPERATION_HOURS;
  const capacityFactor = GEOTHERMAL_INITIAL_DATA.CAPACITY_FACTOR;
  const massFlowPerUnit = GEOTHERMAL_INITIAL_DATA.MASS_FLOW_STEAM_PER_UNIT;
  const steamFractionToTurbine = GEOTHERMAL_INITIAL_DATA.STEAM_FRACTION_TO_TURBIN;

  if (installedUnit === 0) return EMPTY_ARRAY;

  const res = (massFlowPerUnit * steamFractionToTurbine * operationHour * 3600 / 1000 * installedUnit) / (capacityPerUnit * installedUnit * capacityFactor * operationHour);
  if (res === 0) return EMPTY_ARRAY;
  return Array(16).fill(res);
};
