import { createSelector } from "@reduxjs/toolkit";
import {
  generateLocalFoodProductionYear,
  generateAvailabillityPerPerson,
  generateScenarioProjection,
} from "@/lib/utils/projections";
import { selectProjectedPopulationTotal } from "./socioEconomySelector";
import {
  selectAgricultureBaseline,
  selectLandCoverBaseline,
  selectSimulationInputs,
} from "./baseSelector";
import { Params } from "@/lib/types/response";

export const selectProjectedLocalFoodProduction = createSelector(
  [selectAgricultureBaseline, selectSimulationInputs],
  (agriculture, inputs) => {
    if (!agriculture || !Array.isArray(agriculture.parameters)) return [];
    const newAgriculture = generateScenarioProjection(agriculture, inputs);
    const selectLahanPanenPadi = newAgriculture
      ? newAgriculture.parameters.find(
          (item: Params) => item.name == "Lahan Panen Padi",
        )
      : agriculture.parameters.find(
          (item: Params) => item.name == "Lahan Panen Padi",
        );
    return generateLocalFoodProductionYear(selectLahanPanenPadi);
  },
);

export const selectAgricultureLandProjection = createSelector(
  [selectLandCoverBaseline],
  (landCover) => {
    if (!landCover || !Array.isArray(landCover.parameters)) return [];
    const agricultureLand = landCover.parameters.find(
      (param: Params) =>
        param.name === "Agriculture Area" || param.name === "Agriculture Land",
    );
    return agricultureLand?.values || [];
  },
);

export const selectAvailabillityPerPerson = createSelector(
  [selectProjectedLocalFoodProduction, selectProjectedPopulationTotal],
  (localFoods, populations) => {
    if (!localFoods || !populations || localFoods.length !== populations.length)
      return [];
    if (populations.length === 0 || localFoods.length === 0) return [];

    const safePopulations = populations.map((val) => val ?? 0);
    return generateAvailabillityPerPerson(safePopulations, localFoods);
  },
);
