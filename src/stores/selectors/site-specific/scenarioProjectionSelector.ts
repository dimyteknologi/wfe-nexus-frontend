import { createSelector } from "@reduxjs/toolkit";
import {
  generateApAreaProjection,
  generatePvAreaProjection,
  generateScenarioProjection,
} from "@/lib/utils/projections";
import {
  // input
  selectSiteSpecificActive as selectActiveScenarioInput,
  selectSavedSiteSpecificScenarios,
  selectSiteSpecificScenarioAName,
  selectSiteSpecificScenarioBName,
  selectSiteSpecificBaseline,
  // basedata
  selectGdrpBaseline,
  selectPopulationBaseline,
  selectAgricultureBaseline,
  selectLandCoverBaseline,
  selectFoodDemandBaseline,
  selectEnergyDemandBaseline,
  selectResourceBaseline,
  selectFisheryBaseline,
  selectLivestockBaseline,
} from "@/stores/selectors/baseSelector";
import { SiteSpecificState } from "@/stores/slicers/siteSpecificInputSlicer";
import { IRootState } from "@/stores";
import { IBaselineData } from "@/lib/types/response";
import { Selector } from "react-redux";

const createProjectionSelector = (
  selectBaseline: Selector<IRootState, IBaselineData | null>,
  selectInputs: Selector<IRootState, SiteSpecificState | null>,
) =>
  createSelector([selectBaseline, selectInputs], (baseData, inputs) => {
    if (!baseData || !inputs) return null;
    return generateScenarioProjection(baseData, inputs);
  });

const createApAreaIndustrialProjectionSelector = (
  selectBaseline: Selector<IRootState, IBaselineData | null>,
  selectInputs: Selector<IRootState, SiteSpecificState | null>,
) =>
  createSelector([selectBaseline, selectInputs], (baseData, inputs) => {
    if (!baseData || !inputs) return Array(36).fill(0);

    const industrialBaseline = baseData.parameters.find(
      (item) => item.name == "Industrial Land",
    );
    if (!industrialBaseline) return Array(36).fill(0);
    if (!industrialBaseline?.values) return Array(36).fill(0);
    return generateApAreaProjection(industrialBaseline, inputs);
  });

const createSolarPVAreaProjectionSelector = (
  name: string | null,
  selectInputs: Selector<IRootState, SiteSpecificState | null>,
) =>
  createSelector([selectInputs], (inputs) => {
    if (!name || !inputs) return Array(36).fill(0);
    return generatePvAreaProjection(name, inputs);
  });

const createApAreaHousingProjectionSelector = (
  selectBaseline: Selector<IRootState, IBaselineData | null>,
  selectInputs: Selector<IRootState, SiteSpecificState | null>,
) =>
  createSelector([selectBaseline, selectInputs], (baseData, inputs) => {
    if (!baseData || !inputs) return null;
    const housingBaseline = baseData.parameters.find(
      (item) => item.name == "Housing Land",
    );
    if (!housingBaseline) return Array(36).fill(0);
    if (!housingBaseline?.values) return Array(36).fill(0);
    return generateApAreaProjection(housingBaseline, inputs);
  });

export const selectComparisonScenarioA = createSelector(
  [selectSavedSiteSpecificScenarios, selectSiteSpecificScenarioAName],
  (saved, name) =>
    saved.find((s: SiteSpecificState) => s.simulationName === name)?.data ||
    null,
);

export const selectComparisonScenarioB = createSelector(
  [selectSavedSiteSpecificScenarios, selectSiteSpecificScenarioBName],
  (saved, name) =>
    saved.find((s: SiteSpecificState) => s.simulationName === name)?.data ||
    null,
);

// resources livestock selectors generate livestockData with input active
export const selectLivestockProjection = createProjectionSelector(
  selectLivestockBaseline,
  selectActiveScenarioInput,
);

// resources livestock selectors generate livestockData with baseline
export const selectLivestockProjectionBaseline = createProjectionSelector(
  selectLivestockBaseline,
  selectSiteSpecificBaseline,
);

// resources livestock selectors generate livestockData with scenarioA
export const selectLivestockProjectionA = createProjectionSelector(
  selectLivestockBaseline,
  selectComparisonScenarioA,
);

// resources livestock selectors generate livestockData with scenarioB
export const selectLivestockProjectionB = createProjectionSelector(
  selectLivestockBaseline,
  selectComparisonScenarioB,
);

// resources fishery selectors generate fisheryData with input active
export const selectFisheryProjection = createProjectionSelector(
  selectFisheryBaseline,
  selectActiveScenarioInput,
);

// resources fishery selectors generate fisheryData with baseline
export const selectFisheryProjectionBaseline = createProjectionSelector(
  selectFisheryBaseline,
  selectSiteSpecificBaseline,
);

// resources fishery selectors generate fisheryData with scenarioA
export const selectFisheryProjectionA = createProjectionSelector(
  selectFisheryBaseline,
  selectComparisonScenarioA,
);

// resources fishery selectors generate fisheryData with scenarioB
export const selectFisheryProjectionB = createProjectionSelector(
  selectFisheryBaseline,
  selectComparisonScenarioB,
);

// foodDemand selectors generate foodDemand Baseline with baselineInput
export const selectResourceScenarioProjectionBaseline =
  createProjectionSelector(selectResourceBaseline, selectSiteSpecificBaseline);

// foodDemand selectors generate foodDemand Baseline with activeInput
export const selectResourceScenarioProjection = createProjectionSelector(
  selectResourceBaseline,
  selectActiveScenarioInput,
);

// foodDemand selectors generate foodDemand Baseline with scenarioA
export const selectResourceScenarioProjectionA = createProjectionSelector(
  selectResourceBaseline,
  selectComparisonScenarioA,
);

// foodDemand selectors generate foodDemand Baseline with ScenarioB
export const selectResourceScenarioProjectionB = createProjectionSelector(
  selectResourceBaseline,
  selectComparisonScenarioB,
);

// foodDemand selectors generate foodDemand Baseline with baselineInput
export const selectEnergyDemandScenarioProjectionBaseline =
  createProjectionSelector(
    selectEnergyDemandBaseline,
    selectSiteSpecificBaseline,
  );

// foodDemand selectors generate foodDemand Baseline with activeInput
export const selectEnergyDemandScenarioProjection = createProjectionSelector(
  selectEnergyDemandBaseline,
  selectActiveScenarioInput,
);

// foodDemand selectors generate foodDemand Baseline with scenarioA
export const selectEnergyDemandScenarioProjectionA = createProjectionSelector(
  selectEnergyDemandBaseline,
  selectComparisonScenarioA,
);

// foodDemand selectors generate foodDemand Baseline with ScenarioB
export const selectEnergyDemandScenarioProjectionB = createProjectionSelector(
  selectEnergyDemandBaseline,
  selectComparisonScenarioB,
);

// foodDemand selectors generate foodDemand Baseline with baselineInput
export const selectFoodSuffiencyScenarioProjectionBaseline =
  createProjectionSelector(
    selectFoodDemandBaseline,
    selectSiteSpecificBaseline,
  );

// foodDemand selectors generate foodDemand Baseline with activeInput
export const selectFoodSuffiencyScenarioProjection = createProjectionSelector(
  selectFoodDemandBaseline,
  selectActiveScenarioInput,
);

// foodDemand selectors generate foodDemand Baseline with scenarioA
export const selectFoodSuffiencyScenarioProjectionA = createProjectionSelector(
  selectFoodDemandBaseline,
  selectComparisonScenarioA,
);

// foodDemand selectors generate foodDemand Baseline with ScenarioB
export const selectFoodSuffiencyScenarioProjectionB = createProjectionSelector(
  selectFoodDemandBaseline,
  selectComparisonScenarioB,
);

// gdrp selectors generate gdrp with baselineInput
export const selectGdrpScenarioProjectionBaseline = createProjectionSelector(
  selectGdrpBaseline,
  selectSiteSpecificBaseline,
);

// gdrp selectors generate gdrp with activeInput
export const selectGdrpScenarioProjection = createProjectionSelector(
  selectGdrpBaseline,
  selectActiveScenarioInput,
);

// gdrp selectors generate gdrp with scenarioA
export const selectGdrpScenarioProjectionA = createProjectionSelector(
  selectGdrpBaseline,
  selectComparisonScenarioA,
);

// gdrp selectors generate gdrp with ScenarioB
export const selectGdrpScenarioProjectionB = createProjectionSelector(
  selectGdrpBaseline,
  selectComparisonScenarioB,
);

// population selectors generate population with baselineInput
export const selectPopulationScenarioProjectionBaseline =
  createProjectionSelector(
    selectPopulationBaseline,
    selectSiteSpecificBaseline,
  );

// population selectors generate population with activeInput
export const selectPopulationScenarioProjection = createProjectionSelector(
  selectPopulationBaseline,
  selectActiveScenarioInput,
);

// population selectors generate population with scenarioA
export const selectPopulationScenarioProjectionA = createProjectionSelector(
  selectPopulationBaseline,
  selectComparisonScenarioA,
);

// population selectors generate population with ScenarioB
export const selectPopulationScenarioProjectionB = createProjectionSelector(
  selectPopulationBaseline,
  selectComparisonScenarioB,
);

// agriculture selectors generate agriculture with baselineInput
export const selectAgricultureScenarioProjectionBaseline =
  createProjectionSelector(
    selectAgricultureBaseline,
    selectSiteSpecificBaseline,
  );

// agriculture selectors generate agriculture with activeInput
export const selectAgricultureScenarioProjection = createProjectionSelector(
  selectAgricultureBaseline,
  selectActiveScenarioInput,
);

// agriculture selectors generate agriculture with scenarioA
export const selectAgricultureScenarioProjectionA = createProjectionSelector(
  selectAgricultureBaseline,
  selectComparisonScenarioA,
);

// agriculture selectors generate agriculture with ScenarioB
export const selectAgricultureScenarioProjectionB = createProjectionSelector(
  selectAgricultureBaseline,
  selectComparisonScenarioB,
);

// agriculture selectors generate land conversion with activeInput
export const selectLandCoverProjectionBaseline = createProjectionSelector(
  selectLandCoverBaseline,
  selectSiteSpecificBaseline,
);

// agriculture selectors generate land conversion with activeInput
export const selectLandCoverProjection = createProjectionSelector(
  selectLandCoverBaseline,
  selectActiveScenarioInput,
);

// agriculture selectors generate land conversion with scenarioA
export const selectLandCoverProjectionA = createProjectionSelector(
  selectLandCoverBaseline,
  selectComparisonScenarioA,
);

// agriculture selectors generate land conversion with scenarioB
export const selectLandCoverProjectionB = createProjectionSelector(
  selectLandCoverBaseline,
  selectComparisonScenarioB,
);

// resources housing selectors generate apArea with activeInput
export const selectApAreaHousingProjectionBaseline =
  createApAreaHousingProjectionSelector(
    selectLandCoverBaseline,
    selectSiteSpecificBaseline,
  );

// resources housing selectors generate apArea with activeInput
export const selectApAreaHousingProjection =
  createApAreaHousingProjectionSelector(
    selectLandCoverBaseline,
    selectActiveScenarioInput,
  );

// resources housing selectors generate apArea with scenarioA
export const selectApAreaHousingProjectionA =
  createApAreaHousingProjectionSelector(
    selectLandCoverBaseline,
    selectComparisonScenarioA,
  );

// resources housing selectors generate apArea with scenarioB
export const selectApAreaHousingProjectionB =
  createApAreaHousingProjectionSelector(
    selectLandCoverBaseline,
    selectComparisonScenarioB,
  );

// resources industrial selectors generate apArea with activeInput
export const selectApAreaIndustrialProjectionBaseline =
  createApAreaIndustrialProjectionSelector(
    selectLandCoverBaseline,
    selectSiteSpecificBaseline,
  );

// resources industrial selectors generate apArea with activeInput
export const selectApAreaIndustrialProjection =
  createApAreaIndustrialProjectionSelector(
    selectLandCoverBaseline,
    selectActiveScenarioInput,
  );

// resources industrial selectors generate apArea with scenarioA
export const selectApAreaIndustrialProjectionA =
  createApAreaIndustrialProjectionSelector(
    selectLandCoverBaseline,
    selectComparisonScenarioA,
  );

// resources industrial selectors generate apArea with scenarioB
export const selectApAreaIndustrialProjectionB =
  createApAreaIndustrialProjectionSelector(
    selectLandCoverBaseline,
    selectComparisonScenarioB,
  );

// PV industrial selectors generate solar pv with activeInput
export const selectPvAreaIndustrialProjectionBaseline =
  createSolarPVAreaProjectionSelector(
    "Solar Pv Area on Industrial",
    selectSiteSpecificBaseline,
  );

// PV industrial selectors generate solar pv with activeInput
export const selectPvAreaIndustrialProjection =
  createSolarPVAreaProjectionSelector(
    "Solar Pv Area on Industrial",
    selectActiveScenarioInput,
  );

// PV industrial selectors generate solar pv with scenarioA
export const selectPvAreaIndustrialProjectionA =
  createSolarPVAreaProjectionSelector(
    "Solar Pv Area on Industrial",
    selectComparisonScenarioA,
  );

// PV industrial selectors generate solar pv with scenarioB
export const selectPvAreaIndustrialProjectionB =
  createSolarPVAreaProjectionSelector(
    "Solar Pv Area on Industrial",
    selectComparisonScenarioB,
  );

// PV industrial selectors generate solar pv with activeInput
export const selectPvAreaHousingProjectionBaseline =
  createSolarPVAreaProjectionSelector(
    "Solar PV Area Percentage on Housing",
    selectSiteSpecificBaseline,
  );

// PV industrial selectors generate solar pv with activeInput
export const selectPvAreaHousingProjection =
  createSolarPVAreaProjectionSelector(
    "Solar PV Area Percentage on Housing",
    selectActiveScenarioInput,
  );

// PV industrial selectors generate solar pv with scenarioA
export const selectPvAreaHousingProjectionA =
  createSolarPVAreaProjectionSelector(
    "Solar PV Area Percentage on Housing",
    selectComparisonScenarioA,
  );

// PV industrial selectors generate solar pv with scenarioB
export const selectPvAreaHousingProjectionB =
  createSolarPVAreaProjectionSelector(
    "Solar PV Area Percentage on Housing",
    selectComparisonScenarioB,
  );
