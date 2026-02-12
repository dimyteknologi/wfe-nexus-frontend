//
// export const selectSimulationInputs = (state: IRootState) =>
//   state.simulation.active;
// export const selectIndustryInputs = (state: IRootState) =>
//   state.simulation.active.industry;
// export const selectDemographyInputs = (state: IRootState) =>
//   state.simulation.active.demography;
// export const selectAgricultureInputs = (state: IRootState) =>
//   state.simulation.active.agriculture;

// baseline active & scenario
// export const selectScenarioAName = (state: IRootState) =>
//   state.simulation.active.scenario_a;
// export const selectScenarioBName = (state: IRootState) =>
//   state.simulation.active.scenario_b;
// export const selectBaselineInput = (state: IRootState) =>
//   state.simulation.baseline;

// base data from state
// export const selectGdrpBaseline = (state: IRootState) => state.gdrp.baseline;
// export const selectFisheryBaseline = (state: IRootState) =>
//   state.fishery.baseline;
// export const selectResourceBaseline = (state: IRootState) =>
//   state.resource.baseline;
// export const selectLivestockBaseline = (state: IRootState) =>
//   state.livestock.baseline;
// export const selectPopulationBaseline = (state: IRootState) =>
//   state.population.baseline;
// export const selectLandPortionBaseline = (state: IRootState) =>
//   state.landPortion.baseline;
// export const selectLandCoverBaseline = (state: IRootState) =>
//   state.landCover.baseline;
// export const selectAgricultureBaseline = (state: IRootState) =>
//   state.agriculture.baseline;
// export const selectEnergyDemandBaseline = (state: IRootState) =>
//   state.energyDemand.baseline;
// export const selectWaterDemandBaseline = (state: IRootState) =>
//   state.waterDemand.baseline;
// export const selectFoodDemandBaseline = (state: IRootState) =>
//   state.foodDemand.baseline;


// export const createPaddySelector = (varietyKey: string) => {
//   return createSelector(
//     [
//       selectContextSpecificActive,
//       // selectContextSpecificBaseline,
//       selectedContextSpecificA,
//       selectedContextSpecificB,
//     ],
//     (activeState, scenarioAState, scenarioBState) => {
//       const areaKey = `area${varietyKey}`;
//       const convKey = `conversion${varietyKey}`;

//       return {
//         active: calculatePaddyPeryieldPerseed(
//           activeState.agriculture[areaKey]["2015-2030"],
//           activeState.agriculture[convKey]["2015-2030"],
//         ),

//         // baseline: calculatePaddyPeryieldPerseed(
//         //     baselineState.agriculture[areaKey]["2015-2030"],
//         //     baselineState.agriculture[convKey]["2015-2030"]
//         // ),

//         scenarioA: calculatePaddyPeryieldPerseed(
//           scenarioAState ? scenarioAState.agriculture[areaKey]["2015-2030"] : 0,
//           scenarioAState ? scenarioAState.agriculture[convKey]["2015-2030"] : 0,
//         ),

//         scenarioB: calculatePaddyPeryieldPerseed(
//           scenarioBState ? scenarioBState.agriculture[areaKey]["2015-2030"] : 0,
//           scenarioBState ? scenarioBState.agriculture[convKey]["2015-2030"] : 0,
//         ),
//       };
//     },
//   );
// };

// export const selectLandConversion = createPaddySelector("landConversion");
// export const selectCiherang = createPaddySelector("Ciherang");
// export const selectLokal = createPaddySelector("Lokal");
// export const selectMekongga = createPaddySelector("Mekongga");
// export const selectHipaSeries = createPaddySelector("HipaSeries");


// export const selectPaddyPerFieldPerYieldComparisson = createSelector(
//   [
//     agriculturLandConversionPerScenario,
//     // selectCiherang,
//     // selectLokal,
//     // selectHipaSeries,
//     // selectMekongga,
//   ],
//   (
//     landConversion,
//     // Ciherang: VarietasData,
//     // Lokal: VarietasData,
//     // HipaSeries: VarietasData,
//     // Mekongga: VarietasData,
//   ) => {
//     const dataMap: Record<Varietas, VarietasData> = {
//       landConversion,
//       // Ciherang,
//       // Lokal,
//       // HipaSeries,
//       // Mekongga,
//     };

//     const result = {} as PaddyFieldComparison;

//     scenarios.forEach((scenario) => {
//       const total = sumArrayData(...varietas.map((v) => dataMap[v][scenario]));

//       result[scenario] = Object.fromEntries(
//         varietas.map((v) => [
//           v,
//           calculateDevidedArrays(dataMap[v][scenario], total),
//         ]),
//       ) as Record<Varietas, number[]>;
//     });

//     return result;
//   },
// );


// const VARIETY_KEYS = [
//   "landConversion",
// ] as const;
// type Variety = (typeof VARIETY_KEYS)[number];

// const DEMAND_KEYS = {
//   WATER_CONSUMPTION_UNIT: "WATER_CONSUMPTION_UNIT",
//   CHEMICAL_FERTILIZER_DEMAND: "CHEMICAL_FERTILIZER_DEMAND",
//   ORGANIC_FERTILIZER_DEMAND: "ORGANIC_FERTILIZER_DEMAND",
// } as const;

// type DemandKey = keyof typeof DEMAND_KEYS;

// const ENERGY_KEYS = {
//   LAND_PROCESSING: "LAND_PROCESSING",
//   PLANTING_AND_MAINTENANCE: "PLANTING_AND_MAINTENANCE",
//   IRRIGATION: "IRRIGATION",
//   HARVEST_AND_TRANSPORT: "HARVEST_AND_TRANSPORT",
// } as const;

// type EnergyKey = keyof typeof ENERGY_KEYS;
// export type Varietas = (typeof varietas)[number];


// export type Scenario = (typeof scenarios)[number];

// export type VarietasData = Record<Scenario, number[]>;

// export type PaddyFieldComparison = Record<Scenario, Record<Varietas, number[]>>;

// const DEMAND_INPUT: Record<Variety, Record<DemandKey, number>> = {
//   landConversion: {
//     WATER_CONSUMPTION_UNIT: FOOD_AND_YIELD.INPARI_32.WATER_CONSUMPTION_UNIT,
//     CHEMICAL_FERTILIZER_DEMAND:
//       FOOD_AND_YIELD.INPARI_32.CHEMICAL_FERTILIZER_DEMAND,
//     ORGANIC_FERTILIZER_DEMAND:
//       FOOD_AND_YIELD.INPARI_32.ORGANIC_FERTILIZER_DEMAND,
//   },
// };

// const ENERGY_INPUT: Record<Variety, Record<EnergyKey, number>> = {
//   landConversion: FOOD_AND_YIELD.INPARI_32.ENERGY_DEMAND,
// };

// const calculateDemand = (
//   shares: Record<Variety, number[]>,
//   key: DemandKey,
//   extraKey?: ContextSpecificState,
// ) => {
//   const years = shares.landConversion.length;
//   const result = Array(years).fill(0);
//   for (let i = 0; i < years; i++) {
//     let total = 0;
//     for (const variety of VARIETY_KEYS) {
//       total +=
//         (shares[variety][i] / 100) *
//         additionalCompute(key, DEMAND_INPUT[variety][key], extraKey, variety);
//     }
//     result[i] = Number(total.toFixed(10));
//   }

//   return result;
// };

// const calculateEnergyDemand = (
//   shares: Record<Variety, number[]>,
//   key: EnergyKey,
// ) => {
//   const years = shares.landConversion.length;
//   const result = Array(years).fill(0);
//   for (let i = 0; i < years; i++) {
//     let total = 0;
//     for (const variety of VARIETY_KEYS) {
//       total += (shares[variety][i] / 100) * ENERGY_INPUT[variety][key];
//     }
//     result[i] = Number(total.toFixed(10));
//   }

//   return result;
// };
