import { ContextSpecificState } from "@/stores/slicers/contextSpecificInputSlicer";
import { GEOTHERMAL_INITIAL_DATA } from "@/lib/constant/initialDataContext.constans";
import { createSelector } from "@reduxjs/toolkit";
import { selectContextSpecificActive } from "../baseSelector";
import { selectedContextSpecificA, selectedContextSpecificB } from "./scenarioProjectionSelector";
import { selectImpactOfWaterAvailabilityForGeothermal } from "./resourceSupplySelector";
import { multiplyArrayData } from "./foodAndSupplyInputDemandSelector";
import { constantMultiply, constantDevided } from "@/lib/utils/formulas";

const getGeothermalPotentialGeneration = (input?: ContextSpecificState) :number[] =>  {
  if (!input) return Array(16).fill(0);
  const installedUnit = input.geothermal?.installedUnit?.["2025-2034"] ?? 0;
  const capacityPerUnit = input.geothermal?.capacityPerUnit?.["2025-2034"] ?? 0;

  const operationHour = GEOTHERMAL_INITIAL_DATA.OPERATION_HOURS;
  const capacityFactor = GEOTHERMAL_INITIAL_DATA.CAPACITY_FACTOR;
  


  const installedCapacity = installedUnit * capacityPerUnit;

  const maximalGeneration = installedCapacity * operationHour;

  const potentialGeneration = maximalGeneration * capacityFactor;

  return Array(16).fill(potentialGeneration) ;
};

const getRatioSteamToElecticityGeneraion = (input?: ContextSpecificState) :number[] =>  {
  if (!input) return Array(16).fill(0);

  const installedUnit = input.geothermal?.installedUnit?.["2025-2034"] ?? 0;
  const capacityPerUnit = input.geothermal?.capacityPerUnit?.["2025-2034"] ?? 0;
  const operationHour = GEOTHERMAL_INITIAL_DATA.OPERATION_HOURS;
  const capacityFactor = GEOTHERMAL_INITIAL_DATA.CAPACITY_FACTOR;
  const massFlowPerUnit = GEOTHERMAL_INITIAL_DATA.MASS_FLOW_STEAM_PER_UNIT;
  const steamFractionToTurbine = GEOTHERMAL_INITIAL_DATA.STEAM_FRACTION_TO_TURBIN;

  if(installedUnit === 0 ) return Array(16).fill(0);

  return Array(16).fill((massFlowPerUnit * steamFractionToTurbine*3600/1000*installedUnit)/(capacityPerUnit*installedUnit*capacityFactor*operationHour));
};

export const selectGeothermalActualGenerationPerScenario = createSelector(
  [
    selectContextSpecificActive,
    selectedContextSpecificA,
    selectedContextSpecificB,
    selectImpactOfWaterAvailabilityForGeothermal
  ],
  (active, scenarioA, scenarioB, waterImpactGeo) => {
    return {
      active: multiplyArrayData(
        waterImpactGeo.active,
        getGeothermalPotentialGeneration(active)
      ),

      scenarioA: multiplyArrayData(
        waterImpactGeo.scenarioA,
        getGeothermalPotentialGeneration(scenarioA)
      ),

      scenarioB: multiplyArrayData(
        waterImpactGeo.scenarioB,
        getGeothermalPotentialGeneration(scenarioB)
      ),
    };
  }
);


export const selectPotentialExcessSteamToUse = createSelector(
  [
    selectContextSpecificActive,
    selectedContextSpecificA,
    selectedContextSpecificB,
    selectGeothermalActualGenerationPerScenario
  ],
  (active, scenarioA, scenarioB, geoActualGeneration) => {
    const conversionFactor = 0.7 * 2450 / 1000 / 3600;
    
    return {
      active: constantMultiply(
        multiplyArrayData(
          geoActualGeneration.active, 
          getRatioSteamToElecticityGeneraion(active)
        ),
        conversionFactor
      ),

      scenarioA: constantMultiply(
        multiplyArrayData(
          geoActualGeneration.scenarioA,
          getRatioSteamToElecticityGeneraion(scenarioA)
        ),
        conversionFactor
      ),

      scenarioB: constantMultiply(
        multiplyArrayData(
          geoActualGeneration.scenarioB,
          getRatioSteamToElecticityGeneraion(scenarioB)
        ),
        conversionFactor
      ),
    };
  }
);

export const potentialDryingAgriAndFinalProcessing = createSelector(
  [
    selectContextSpecificActive,
    selectedContextSpecificA,
    selectedContextSpecificB,
    selectPotentialExcessSteamToUse
  ],
  (active, scenarioA, scenarioB, potentialExcessSteamToUse) => {
    const constantFactor = GEOTHERMAL_INITIAL_DATA.STANDARD_ENERGY_FOR_RICE_DRYING;
  
    return {
      active: constantDevided(constantMultiply(potentialExcessSteamToUse.active, 1000000), constantFactor),
      scenarioA: constantDevided(constantMultiply(potentialExcessSteamToUse.scenarioA, 1000000), constantFactor),
      scenarioB: constantDevided(constantMultiply(potentialExcessSteamToUse.scenarioB, 1000000), constantFactor),
    };
  }
);
