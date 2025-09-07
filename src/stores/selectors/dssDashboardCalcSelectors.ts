import { createSelector } from "@reduxjs/toolkit";
import { IRootState } from "../root-reducer";
import { Computation } from "@/lib/utils/formulas";
import {
  generateAvailabillityPerPerson,
  generateLocalFoodProductionYear,
  generateScenarioProjection,
} from "@/lib/utils/projections";
import { Params } from "@/lib/types/response";

// --- A. SELECTOR INPUT (BAHAN BAKU) ---
// SocieEconomy
const selectGdrpBaseline = (state: IRootState) => state.gdrp.baseline;
const selectPopulationBaseline = (state: IRootState) =>
  state.population.baseline;
const selectSimulationInputs = (state: IRootState) => state.simulation;
const selectIndustryInputs = (state: IRootState) => state.simulation.industry;
const selectDemographyInputs = (state: IRootState) =>
  state.simulation.demography;
const selectAgricultureInputs = (state: IRootState) =>
  state.simulation.agriculture;

// Food
// const selectLandPortionBaseline = (state: IRootState) => state.landPortion.baseline;
const selectLandCoverBaseline = (state: IRootState) => state.landCover.baseline;
const selectAgricultureLandConversion = (state: IRootState) =>
  state.agriculture.baseline;

// Selector untuk proyeksi PDRB dinamis
const selectScenarioProjection = createSelector(
  [
    selectGdrpBaseline,
    selectIndustryInputs,
    selectDemographyInputs,
    selectAgricultureInputs,
    selectSimulationInputs,
  ],
  (gdrpBaseline, industry, demography, agriculture, simulationInputs) => {
    if (!gdrpBaseline || !simulationInputs) return null;
    simulationInputs = { industry, demography, agriculture };
    return generateScenarioProjection(gdrpBaseline, simulationInputs);
  },
);

// Selector untuk proyeksi Populasi dinamis
const selectPopulationProjection = createSelector(
  [selectPopulationBaseline, selectSimulationInputs],
  (populationBaseline, simulationInputs) => {
    if (!populationBaseline || !simulationInputs) return null;
    return generateScenarioProjection(populationBaseline, simulationInputs);
  },
);

// --- B. SELECTOR PERANTARA (BAHAN SETENGAH JADI) ---
const selectProjectedGdrpTotal = createSelector(
  [selectScenarioProjection],
  (projection) => {
    if (!projection || !Array.isArray(projection.parameters)) return [];

    const { parameters, years } = projection;
    const aggregateKeysToExclude = new Set([
      "Produk Domestik Regional Bruto",
      "PDRB Tanpa Migas",
      "Produk Domestik Regional Bruto Non Pemerintahan",
    ]);
    const gdrpTotalByYear: number[] = new Array(years.length).fill(0);

    // Filter untuk mendapatkan hanya sektor individu
    const gdrpSectors = parameters.filter(
      (param) => !aggregateKeysToExclude.has(param.name),
    );

    // Lakukan agregasi (PENJUMLAHAN) dengan perulangan yang benar
    for (const sector of gdrpSectors) {
      sector.values.forEach((value, index) => {
        gdrpTotalByYear[index] += value ?? 0;
      });
    }

    return gdrpTotalByYear;
  },
);

const selectProjectedPopulationTotal = createSelector(
  [selectPopulationProjection],
  (projection) => {
    if (!projection || !Array.isArray(projection.parameters)) return [];

    const totalPopulationParam = projection.parameters.find(
      (param) => param.name === "total" || param.name === "total_population",
    );

    return totalPopulationParam?.values || [];
  },
);

const selectProjectedLocalFoodProduction = createSelector(
  [selectAgricultureLandConversion, selectSimulationInputs],
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

export const selectAvailabillityPerPerson = createSelector(
  [selectProjectedPopulationTotal, selectProjectedLocalFoodProduction],
  (populations, localFoods) => {
    if (!Array.isArray(populations) || !Array.isArray(localFoods)) return [];

    if (populations.length === 0 || localFoods.length === 0) return [];

    const safePopulations = populations.map((val) => val ?? 0);

    return generateAvailabillityPerPerson(safePopulations, localFoods);
  },
);
// --- C. SELECTOR METRIK FINAL (PRODUK JADI) ---

// 1. GDRP [Bilion Rp/year]
export const selectGdrpInBillions = createSelector(
  [selectProjectedGdrpTotal],
  (gdrpTotal) => gdrpTotal.map((val) => val.toFixed(2)), // Jutaan -> Miliar
);

// Select AgriculturelandProjection
const selectAgricultureLandProjection = createSelector(
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

// 2. Economic Growth [%/year]
export const selectEconomicGrowth = createSelector(
  [selectProjectedGdrpTotal],
  (gdrpTotal) => Computation.calculateGrowthRates(gdrpTotal),
);

// 3. GDRP Per capita [Milion Rp/cap/year]
export const selectGdrpPerCapita = createSelector(
  [selectProjectedGdrpTotal, selectProjectedPopulationTotal],
  (gdrpTotal, population) => {
    if (gdrpTotal.length !== population.length) return [];
    return gdrpTotal.map((gdrp, index) => {
      const pop = population[index];
      return pop ? gdrp / pop : 0;
    });
  },
);

// 4. Population [people]
export const selectPopulationData = selectProjectedPopulationTotal;

// --- D. SELECTOR MASTER (MENGEMAS SEMUA UNTUK UI) ---
export const selectFinalSocioEconomicData = createSelector(
  [
    selectScenarioProjection, // Ambil 'years' dari hasil proyeksi, bukan baseline statis
    selectGdrpInBillions,
    selectEconomicGrowth,
    selectGdrpPerCapita,
    selectPopulationData,
    selectAgricultureLandProjection,
    selectProjectedLocalFoodProduction,
    selectAvailabillityPerPerson,
  ],
  (
    projection,
    gdrpInBillions,
    economicGrowth,
    gdrpPerCapita,
    population,
    agricultureLand,
    localFoodProductionPerYear,
    availabilityPerson,
  ) => {
    const years = projection?.years || [];
    const finalLength = years.length;

    return {
      years: years.map(String),
      metrics: {
        gdrp: gdrpInBillions.slice(0, finalLength),
        economicGrowth: economicGrowth.slice(0, finalLength),
        gdrpPerCapita: gdrpPerCapita.slice(0, finalLength),
        population: population.slice(0, finalLength),
        agricultureLand: agricultureLand.slice(0, finalLength),
        localFoodProduction: localFoodProductionPerYear.slice(0, finalLength),
        availabilityPerson: availabilityPerson.slice(0, finalLength),
      },
    };
  },
);
