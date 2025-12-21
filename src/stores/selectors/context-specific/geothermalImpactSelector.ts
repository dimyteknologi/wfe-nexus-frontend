import { ContextSpecificState } from "@/stores/slicers/contextSpecificInputSlicer";
import { GEOTHERMAL_INITIAL_DATA } from "@/lib/constant/initialDataContext.constans";

const getGeothermalPotentialGeneration = (input?: ContextSpecificState) :number[] =>  {
  if (!input) return Array(16).fill(0);

  const installedUnit = input.geothermal?.installedUnit?.["2025-2034"] ?? 0;
  const capacityPerUnit = input.geothermal?.capacityPerUnit?.["2025-2034"] ?? 0;
  const operationHour = GEOTHERMAL_INITIAL_DATA.OPERATION_HOURS;
  const capacityFactor = GEOTHERMAL_INITIAL_DATA.CAPACITY_FACTOR;
  


  const installedCapacity = installedUnit * capacityPerUnit;

  const maximalGeneration = installedCapacity * operationHour;

  const potentialGeneration = maximalGeneration * capacityFactor;
  // const actualGeneration = 

  return Array(16).fill(potentialGeneration) ;
};


